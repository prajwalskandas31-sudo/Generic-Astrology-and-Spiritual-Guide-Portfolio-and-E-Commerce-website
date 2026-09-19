from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.models import AuditLog
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class AuditLogCreate(BaseModel):
    user_name: str
    user_email: str
    user_role: str
    action_category: str
    action_summary: str
    target_resource: Optional[str] = None
    details: Optional[dict] = None
    ip_address: Optional[str] = "127.0.0.1"
    user_agent: Optional[str] = None
    severity: Optional[str] = "INFO"

class AuditLogResponse(BaseModel):
    id: int
    user_name: str
    user_email: str
    user_role: str
    action_category: str
    action_summary: str
    target_resource: Optional[str] = None
    details: Optional[dict] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    timestamp: datetime
    severity: str

    class Config:
        from_attributes = True

@router.get("", response_model=List[AuditLogResponse])
async def list_audit_logs(
    category: Optional[str] = Query(None),
    role: Optional[str] = Query(None),
    user_email: Optional[str] = Query(None),
    limit: int = Query(100, le=500),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(AuditLog).order_by(AuditLog.id.desc())
    if category and category != "ALL":
        stmt = stmt.where(AuditLog.action_category == category)
    if role and role != "ALL":
        stmt = stmt.where(AuditLog.user_role == role)
    if user_email:
        stmt = stmt.where(AuditLog.user_email == user_email)
    
    stmt = stmt.limit(limit)
    res = await db.execute(stmt)
    return res.scalars().all()

@router.post("", response_model=AuditLogResponse, status_code=status.HTTP_201_CREATED)
async def create_audit_log(
    payload: AuditLogCreate,
    db: AsyncSession = Depends(get_db)
):
    log = AuditLog(
        user_name=payload.user_name,
        user_email=payload.user_email,
        user_role=payload.user_role,
        action_category=payload.action_category,
        action_summary=payload.action_summary,
        target_resource=payload.target_resource,
        details=payload.details,
        ip_address=payload.ip_address,
        user_agent=payload.user_agent,
        severity=payload.severity or "INFO"
    )
    db.add(log)
    await db.commit()
    await db.refresh(log)
    return log
