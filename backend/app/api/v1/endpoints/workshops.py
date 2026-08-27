from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete, update
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Workshop, WorkshopBatch, WorkshopRegistration, Request
from app.schemas.schemas import (
    WorkshopCreate, WorkshopResponse, WorkshopRegisterRequest,
    WorkshopRegisterResponse, MessageResponse, WorkshopRegistrationResponse,
    WorkshopBroadcastRequest
)
from app.services.whatsapp import send_whatsapp_message, send_whatsapp_image
from app.core.security import verify_supabase_token
from app.core.config import settings
import uuid

router = APIRouter()

from fastapi.responses import JSONResponse

@router.get("", response_model=List[WorkshopResponse])
async def get_workshops(status_filter: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    try:
        query = select(Workshop).options(selectinload(Workshop.batches))
        if status_filter:
            if status_filter.lower() != "all":
                query = query.where(Workshop.status == status_filter)
        else:
            query = query.where(Workshop.status.in_(["Published", "Completed"]))
        query = query.order_by(Workshop.featured.desc(), Workshop.id.desc())
        result = await db.execute(query)
        return result.scalars().all()
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Workshops Error: {str(e)}", "error_type": type(e).__name__})

@router.get("/{slug}", response_model=WorkshopResponse)
async def get_workshop_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    try:
        query = select(Workshop).options(selectinload(Workshop.batches)).where(Workshop.slug == slug)
        result = await db.execute(query)
        workshop = result.scalar_one_or_none()
        if not workshop:
            raise HTTPException(status_code=404, detail="Workshop not found")
        return workshop
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Workshop Detail Error: {str(e)}", "error_type": type(e).__name__})

from app.services.requests_service import create_request

@router.post("/{id}/register", response_model=WorkshopRegisterResponse)
async def register_for_workshop(
    id: int,
    data: WorkshopRegisterRequest,
    db: AsyncSession = Depends(get_db)
):
    workshop = await db.get(Workshop, id)
    if not workshop or workshop.status != "Published":
        raise HTTPException(status_code=404, detail="Workshop not available for registration")
    
    batch = None
    if data.batch_id:
        batch = await db.get(WorkshopBatch, data.batch_id)
        if not batch or batch.workshop_id != id:
            raise HTTPException(status_code=400, detail="Invalid batch selected")
        if batch.remaining_seats <= 0 or batch.status != "Active":
            raise HTTPException(status_code=400, detail="Selected batch is fully booked or closed")
    else:
        # Fetch batches for workshop
        batches_res = await db.execute(select(WorkshopBatch).where(WorkshopBatch.workshop_id == id))
        batches = batches_res.scalars().all()
        if len(batches) == 1:
            batch = batches[0]
            if batch.remaining_seats <= 0:
                raise HTTPException(status_code=400, detail="Workshop batch is fully booked")
        elif len(batches) > 1:
            raise HTTPException(status_code=400, detail="Batch selection is required")

    has_payment = getattr(workshop, "has_payment", True)
    if has_payment is None:
        has_payment = True
    payment_mode = getattr(workshop, "payment_mode", "RAZORPAY") or "RAZORPAY"
    custom_payment_link = getattr(workshop, "custom_payment_link", None)

    if not has_payment:
        payment_mode = "FREE"

    order_id = f"order_{uuid.uuid4().hex[:12]}"
    is_real_order = False
    rzp_key = settings.RAZORPAY_KEY_ID.strip() if settings.RAZORPAY_KEY_ID else None
    rzp_secret = settings.RAZORPAY_SECRET.strip() if settings.RAZORPAY_SECRET else None

    # If paid via Razorpay, generate real order ID if credentials exist
    if has_payment and payment_mode == "RAZORPAY" and rzp_key and rzp_secret:
        try:
            import razorpay
            client = razorpay.Client(auth=(rzp_key, rzp_secret))
            order_data = {
                "amount": int(workshop.price * 100),
                "currency": "INR",
                "receipt": f"reg_{uuid.uuid4().hex[:8]}",
                "notes": {
                    "workshop_id": str(id),
                    "workshop_title": workshop.title,
                    "customer_name": data.name,
                    "customer_mobile": data.mobile
                }
            }
            rzp_order = client.order.create(data=order_data)
            order_id = rzp_order.get("id", order_id)
            is_real_order = True
        except Exception as e:
            print(f"[Razorpay Order Creation Warning]: {e}")

    initial_payment_status = "Pending" if has_payment else "Paid"
    actual_amount = workshop.price if has_payment else 0.0

    registration = WorkshopRegistration(
        workshop_id=id,
        batch_id=batch.id if batch else None,
        name=data.name,
        mobile=data.mobile,
        email=data.email,
        address=data.address,
        city=data.city,
        state=data.state,
        pin_code=data.pin_code,
        payment_status=initial_payment_status,
        amount=actual_amount,
        razorpay_order_id=order_id,
        additional_notes=data.additional_notes
    )
    
    db.add(registration)

    # Decrement available seats if free registration
    if not has_payment and batch:
        batch.remaining_seats = max(0, batch.remaining_seats - 1)
        if batch.remaining_seats == 0:
            batch.status = "Full"

    await db.commit()
    await db.refresh(registration)

    # Automatically create Workshop Request thread
    req_obj = await create_request(
        request_type="Workshop",
        name=data.name,
        phone=data.mobile,
        email=data.email,
        workshop_id=id,
        batch_id=batch.id if batch else None,
        workshop_name=workshop.title,
        address=data.address,
        city=data.city,
        state=data.state,
        pin_code=data.pin_code,
        notes=data.additional_notes,
        amount=actual_amount,
        payment_status=initial_payment_status,
        razorpay_order_id=order_id,
        send_whatsapp=True if not has_payment else False,
        db=db
    )
    
    return WorkshopRegisterResponse(
        registration_id=registration.id,
        request_id=req_obj.request_id,
        razorpay_order_id=order_id,
        amount=actual_amount,
        currency="INR",
        key_id=rzp_key,
        is_real_order=is_real_order,
        has_payment=has_payment,
        payment_mode=payment_mode,
        custom_payment_link=custom_payment_link
    )


@router.post("", response_model=WorkshopResponse, status_code=status.HTTP_201_CREATED)
async def create_workshop(
    data: WorkshopCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    existing_res = await db.execute(select(Workshop).where(Workshop.slug == data.slug))
    existing = existing_res.scalar_one_or_none()
    
    workshop_data = data.model_dump()
    batches_data = workshop_data.pop("batches", [])
    
    if existing:
        workshop = existing
        for key, value in workshop_data.items():
            setattr(workshop, key, value)
        if batches_data:
            await db.execute(delete(WorkshopBatch).where(WorkshopBatch.workshop_id == workshop.id))
            for b_data in batches_data:
                b_data.pop("id", None)
                batch = WorkshopBatch(workshop_id=workshop.id, **b_data)
                db.add(batch)
    else:
        workshop = Workshop(**workshop_data)
        db.add(workshop)
        await db.flush()
        
        for b_data in batches_data:
            b_data.pop("id", None)
            batch = WorkshopBatch(workshop_id=workshop.id, **b_data)
            db.add(batch)
        
    await db.commit()
    
    # Reload with batches
    res = await db.execute(select(Workshop).options(selectinload(Workshop.batches)).where(Workshop.id == workshop.id))
    return res.scalar_one()

@router.put("/{id}", response_model=WorkshopResponse)
async def update_workshop(
    id: int,
    data: WorkshopCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    workshop = await db.get(Workshop, id)
    if not workshop and data.slug:
        slug_res = await db.execute(select(Workshop).where(Workshop.slug == data.slug))
        workshop = slug_res.scalar_one_or_none()
    
    workshop_data = data.model_dump()
    batches_data = workshop_data.pop("batches", [])
    
    if not workshop:
        workshop = Workshop(**workshop_data)
        db.add(workshop)
        await db.flush()
        for b_data in batches_data:
            b_data.pop("id", None)
            batch = WorkshopBatch(workshop_id=workshop.id, **b_data)
            db.add(batch)
    else:
        for key, value in workshop_data.items():
            setattr(workshop, key, value)
        if batches_data:
            await db.execute(delete(WorkshopBatch).where(WorkshopBatch.workshop_id == workshop.id))
            for b_data in batches_data:
                b_data.pop("id", None)
                batch = WorkshopBatch(workshop_id=workshop.id, **b_data)
                db.add(batch)
        
    await db.commit()
    res = await db.execute(select(Workshop).options(selectinload(Workshop.batches)).where(Workshop.id == workshop.id))
    return res.scalar_one()

@router.delete("/{id}", response_model=MessageResponse)
async def delete_workshop(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    workshop = await db.get(Workshop, id)
    if not workshop:
        raise HTTPException(status_code=404, detail="Workshop not found")
    
    # Clean up linked records prior to deleting workshop
    await db.execute(delete(WorkshopRegistration).where(WorkshopRegistration.workshop_id == id))
    await db.execute(delete(WorkshopBatch).where(WorkshopBatch.workshop_id == id))
    await db.execute(
        update(Request)
        .where(Request.workshop_id == id)
        .values(workshop_id=None, batch_id=None)
    )
    
    await db.delete(workshop)
    await db.commit()
    return MessageResponse(message="Workshop deleted successfully")

@router.get("/{id}/registrations", response_model=List[WorkshopRegistrationResponse])
async def get_workshop_registrations_by_id(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    res = await db.execute(
        select(WorkshopRegistration)
        .where(WorkshopRegistration.workshop_id == id)
        .order_by(WorkshopRegistration.id.desc())
    )
    return res.scalars().all()

@router.post("/{id}/broadcast", response_model=MessageResponse)
async def broadcast_workshop_whatsapp(
    id: int,
    data: WorkshopBroadcastRequest,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    workshop = await db.get(Workshop, id)
    if not workshop:
        raise HTTPException(status_code=404, detail="Workshop not found")
    
    sent_count = 0
    for phone in data.recipient_phones:
        if data.image_url:
            await send_whatsapp_image(phone, data.image_url, caption=data.message_text)
        else:
            await send_whatsapp_message(phone, data.message_text)
        sent_count += 1
        
    return MessageResponse(message=f"WhatsApp broadcast dispatched successfully to {sent_count} participants.")


from app.schemas.schemas import BulkDeleteRequest

@router.delete("/registrations/{reg_id}", response_model=MessageResponse)
async def delete_workshop_registration(
    reg_id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Admin endpoint to delete a workshop registration record.
    """
    reg = await db.get(WorkshopRegistration, reg_id)
    if not reg:
        raise HTTPException(status_code=404, detail=f"Workshop registration #{reg_id} not found")
        
    await db.delete(reg)
    await db.commit()
    return MessageResponse(message=f"Workshop registration #{reg_id} successfully deleted")


@router.post("/registrations/bulk-delete", response_model=MessageResponse)
async def bulk_delete_workshop_registrations(
    data: BulkDeleteRequest,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    if not data.ids:
        return MessageResponse(message="No registration IDs provided.")
    
    query = select(WorkshopRegistration).where(WorkshopRegistration.id.in_(data.ids))
    res = await db.execute(query)
    regs = res.scalars().all()
    count = len(regs)
    
    for r in regs:
        await db.delete(r)
        
    await db.commit()
    return MessageResponse(message=f"Successfully deleted {count} workshop registrations.")

