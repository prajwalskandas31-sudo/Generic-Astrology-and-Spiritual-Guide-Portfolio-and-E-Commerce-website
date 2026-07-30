from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.session import get_db
from app.models.models import Enquiry, Workshop, WorkshopRegistration
from app.schemas.schemas import DashboardStats
from app.core.security import verify_supabase_token

router = APIRouter()

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
