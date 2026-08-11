from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Enquiry
from app.schemas.schemas import EnquiryCreate, EnquiryResponse, EnquiryUpdateStatus, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

from app.services.requests_service import create_request

@router.post("", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_enquiry(
    data: EnquiryCreate,
    db: AsyncSession = Depends(get_db)
):
    enquiry = Enquiry(**data.model_dump())
    db.add(enquiry)
    await db.commit()
    await db.refresh(enquiry)

    # Automatically create request thread & Customer record
    req_obj = await create_request(
        request_type=data.enquiry_type,
        name=data.name,
        phone=data.mobile,
        email=data.email,
        service_name=data.category,
        notes=data.additional_notes,
        city=data.city,
        db=db
    )

    enq_resp = EnquiryResponse.model_validate(enquiry)
    enq_resp.request_id = req_obj.request_id
    return enq_resp


@router.get("", response_model=List[EnquiryResponse])
async def list_enquiries(
    status_filter: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    query = select(Enquiry)
    if status_filter:
        query = query.where(Enquiry.status == status_filter)
    query = query.order_by(Enquiry.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.put("/{id}/status", response_model=EnquiryResponse)
async def update_enquiry_status(
    id: int,
    data: EnquiryUpdateStatus,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    enquiry = await db.get(Enquiry, id)
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
from app.schemas.schemas import BulkDeleteRequest

@router.delete("/{id}", response_model=MessageResponse)
async def delete_enquiry(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    enquiry = await db.get(Enquiry, id)
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    await db.delete(enquiry)
    await db.commit()
    return MessageResponse(message="Enquiry deleted successfully")

@router.post("/bulk-delete", response_model=MessageResponse)
async def bulk_delete_enquiries(
    data: BulkDeleteRequest,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    if not data.ids:
        return MessageResponse(message="No IDs provided.")
    query = select(Enquiry).where(Enquiry.id.in_(data.ids))
    res = await db.execute(query)
    items = res.scalars().all()
    count = len(items)
    for item in items:
        await db.delete(item)
    await db.commit()
    return MessageResponse(message=f"Successfully deleted {count} enquiries.")
