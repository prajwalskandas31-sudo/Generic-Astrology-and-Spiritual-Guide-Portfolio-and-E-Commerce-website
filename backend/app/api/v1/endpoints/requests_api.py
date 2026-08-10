from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Optional

from app.db.session import get_db
from app.models.models import Request, Customer, MessageLog
from app.schemas.schemas import RequestCreate, RequestResponse, RequestActionRequest, MessageResponse
from app.services.requests_service import create_request, execute_request_action
from app.core.security import verify_supabase_token

router = APIRouter()

@router.get("", response_model=List[RequestResponse])
async def list_requests(
    status_filter: Optional[str] = Query(None),
    tab: Optional[str] = Query("active"),  # active | archived | all
    request_type: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Returns admin request threads separated into ACTIVE and COMPLETED/ARCHIVED.
    Includes customer profile and complete message logs timeline for each thread.
    """
    query = select(Request).options(
        selectinload(Request.customer),
        selectinload(Request.message_logs)
    )

    if tab == "active":
        query = query.where(Request.status.not_in(["COMPLETED", "ARCHIVED", "REJECTED", "CANCELLED"]))
    elif tab == "rejected":
        query = query.where(Request.status.in_(["REJECTED", "CANCELLED"]))
    elif tab == "archived":
        query = query.where(Request.status.in_(["COMPLETED", "ARCHIVED"]))
    elif tab == "accepted":
        query = query.where(Request.status == "CONFIRMED")

    if status_filter:
        query = query.where(Request.status == status_filter.upper())

    if request_type:
        query = query.where(Request.request_type == request_type)

    if search:
        s_term = f"%{search.strip()}%"
        query = query.join(Customer).where(
            (Request.request_id.ilike(s_term)) |
            (Customer.name.ilike(s_term)) |
            (Customer.phone.ilike(s_term)) |
            (Customer.email.ilike(s_term))
        )

    query = query.order_by(Request.id.desc())
    result = await db.execute(query)
    requests_list = result.scalars().all()
    return requests_list


@router.get("/{request_id_str}", response_model=RequestResponse)
async def get_request_detail(
    request_id_str: str,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Retrieves full details of a specific request thread with customer data and message history.
    """
    query = select(Request).options(
        selectinload(Request.customer),
        selectinload(Request.message_logs)
    ).where(Request.request_id == request_id_str)
    
    result = await db.execute(query)
    req = result.scalar_one_or_none()
    
    if not req:
        raise HTTPException(status_code=404, detail=f"Request '{request_id_str}' not found")
        
    return req


@router.post("", response_model=RequestResponse, status_code=status.HTTP_201_CREATED)
async def create_new_request(
    data: RequestCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Public customer endpoint to submit a consultation/service/workshop request.
    Creates Customer (if not exists), generates Request ID, logs message, and triggers WhatsApp automation.
    """
    try:
        req = await create_request(
            request_type=data.request_type,
            name=data.name,
            phone=data.phone,
            email=data.email,
            offering_id=data.offering_id,
            workshop_id=data.workshop_id,
            batch_id=data.batch_id,
            service_name=data.service_name,
            workshop_name=data.workshop_name,
            preferred_date=data.preferred_date,
            preferred_time=data.preferred_time,
            language=data.language or "English",
            notes=data.notes,
            address=data.address,
            city=data.city,
            state=data.state,
            pin_code=data.pin_code,
            db=db
        )
        return req
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create request: {str(e)}")


@router.post("/{request_id_str}/action", response_model=RequestResponse)
async def perform_request_action(
    request_id_str: str,
    data: RequestActionRequest,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Admin endpoint to trigger simple deterministic action buttons:
    ACCEPT, CHANGE_TIME, REJECT, MARK_COMPLETED, ARCHIVE, SELECT_TIME.
    """
    try:
        updated_req = await execute_request_action(
            request_id_str=request_id_str,
            action_name=data.action,
            action_payload=data.model_dump(),
            db=db,
            sender_channel="ADMIN"
        )
        return updated_req
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Action error: {str(e)}")


@router.delete("/{request_id_str}", response_model=MessageResponse)
async def delete_request_thread(
    request_id_str: str,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Admin endpoint to permanently delete a request thread and its associated message logs.
    """
    query = select(Request).where(Request.request_id == request_id_str)
    result = await db.execute(query)
    req = result.scalar_one_or_none()
    
    if not req:
        raise HTTPException(status_code=404, detail=f"Request '{request_id_str}' not found")
        
    # Delete associated message logs
    logs_res = await db.execute(select(MessageLog).where(MessageLog.request_id == req.id))
    for log in logs_res.scalars().all():
        await db.delete(log)
        
    await db.delete(req)
    await db.commit()
    
    return MessageResponse(message=f"Request '{request_id_str}' successfully deleted")
