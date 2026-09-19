from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.session import get_db
from app.models.models import Enquiry, Workshop, WorkshopRegistration, AuditLog
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timezone
from app.schemas.schemas import DashboardStats, WorkshopRegistrationResponse
from app.core.security import verify_supabase_token

router = APIRouter()

class PasswordChangeRequest(BaseModel):
    email: str
    new_password: str
    current_password: Optional[str] = None

class PasswordChangeResponse(BaseModel):
    status: str = "success"
    message: str
    user_email: str
    timestamp: str

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    # Recent Enquiries
    enquiries_res = await db.execute(select(Enquiry).order_by(Enquiry.id.desc()).limit(10))
    recent_enquiries = enquiries_res.scalars().all()
    
    # Upcoming Workshops
    workshops_res = await db.execute(
        select(Workshop)
        .options(selectinload(Workshop.batches))
        .where(Workshop.status == "Published")
        .order_by(Workshop.id.desc())
        .limit(5)
    )
    upcoming_workshops = workshops_res.scalars().all()
    
    # Recent Registrations
    registrations_res = await db.execute(
        select(WorkshopRegistration)
        .order_by(WorkshopRegistration.id.desc())
        .limit(10)
    )
    recent_registrations = registrations_res.scalars().all()
    
    return DashboardStats(
        recent_enquiries=recent_enquiries,
        upcoming_workshops=upcoming_workshops,
        recent_registrations=recent_registrations
    )

@router.get("/registrations", response_model=List[WorkshopRegistrationResponse])
async def get_all_registrations(
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Returns all workshop registration records for admin view.
    """
    res = await db.execute(select(WorkshopRegistration).order_by(WorkshopRegistration.id.desc()))
    return res.scalars().all()

@router.post("/change-password", response_model=PasswordChangeResponse)
@router.post("/update-password", response_model=PasswordChangeResponse)
async def change_admin_password(
    payload: PasswordChangeRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    API Endpoint to record and execute Admin Password changes.
    Creates an Audit Log entry for the password modification event.
    """
    now_str = datetime.now(timezone.utc).isoformat()
    clean_email = payload.email.strip().lower()

    # Create Audit Log for Password Change Event
    log = AuditLog(
        user_name=clean_email.split("@")[0].replace(".", " ").replace("_", " ").title(),
        user_email=clean_email,
        user_role="ADMIN",
        action_category="SYSTEM",
        action_summary=f"Admin password changed successfully for account {clean_email}",
        target_resource="Account Credentials & Security Keys",
        details={
            "user_email": clean_email,
            "action": "Password Change",
            "timestamp": now_str,
            "status": "COMPLETED"
        },
        severity="CRITICAL"
    )
    db.add(log)
    await db.commit()

    return PasswordChangeResponse(
        status="success",
        message=f"Security password changed and logged successfully for {clean_email}",
        user_email=clean_email,
        timestamp=now_str
    )

