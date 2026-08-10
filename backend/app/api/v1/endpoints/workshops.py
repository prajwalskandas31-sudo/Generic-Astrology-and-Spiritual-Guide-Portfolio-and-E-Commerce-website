from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Workshop, WorkshopBatch, WorkshopRegistration
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

    # Generate Razorpay Order ID (try real Razorpay API if credentials exist)
    order_id = f"order_{uuid.uuid4().hex[:12]}"
    is_real_order = False
    rzp_key = settings.RAZORPAY_KEY_ID.strip() if settings.RAZORPAY_KEY_ID else None
    rzp_secret = settings.RAZORPAY_SECRET.strip() if settings.RAZORPAY_SECRET else None

    if rzp_key and rzp_secret:
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
        payment_status="Pending",
        amount=workshop.price,
        razorpay_order_id=order_id,
        additional_notes=data.additional_notes
    )
    
    db.add(registration)
    await db.commit()
    await db.refresh(registration)

    # Automatically create Workshop Request thread (suppress immediate WhatsApp dispatch until payment is verified)
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
        amount=workshop.price,
        payment_status="Pending",
        razorpay_order_id=order_id,
        send_whatsapp=False,
        db=db
    )
    
    return WorkshopRegisterResponse(
        registration_id=registration.id,
        request_id=req_obj.request_id,
        razorpay_order_id=order_id,
        amount=workshop.price,
        currency="INR",
        key_id=rzp_key,
        is_real_order=is_real_order
    )


@router.post("", response_model=WorkshopResponse, status_code=status.HTTP_201_CREATED)
async def create_workshop(
    data: WorkshopCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    existing = await db.execute(select(Workshop).where(Workshop.slug == data.slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Workshop slug already exists")
    
    workshop_data = data.model_dump()
    batches_data = workshop_data.pop("batches", [])
    
    workshop = Workshop(**workshop_data)
    db.add(workshop)
    await db.flush()
    
    for b_data in batches_data:
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
    if not workshop:
        raise HTTPException(status_code=404, detail="Workshop not found")
    
    workshop_data = data.model_dump()
    batches_data = workshop_data.pop("batches", [])
    
    for key, value in workshop_data.items():
        setattr(workshop, key, value)
        
    await db.commit()
    res = await db.execute(select(Workshop).options(selectinload(Workshop.batches)).where(Workshop.id == id))
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

