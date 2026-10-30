import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.rate_limit import get_client_ip, login_limiter
from app.core.security import (
    hash_password,
    issue_admin_token,
    verify_admin_token,
    verify_password,
)
from app.db.session import get_db
from app.models.models import AdminUser, AuditLog

router = APIRouter()

MIN_PASSWORD_LENGTH = 10
# Spent on unknown emails too, so response time does not reveal which accounts exist
_DUMMY_HASH = hash_password("timing-equaliser-not-a-real-password")


class LoginRequest(BaseModel):
    email: str
    password: str


class AdminProfile(BaseModel):
    email: str
    name: str
    role: str


class LoginResponse(BaseModel):
    access_token: str
    expires_at: datetime.datetime
    user: AdminProfile


class PasswordChangeRequest(BaseModel):
    email: str
    new_password: str
    current_password: Optional[str] = None


class PasswordChangeResponse(BaseModel):
    status: str = "success"
    message: str
    user_email: str
    # Present when the caller changed their own password (their old session is revoked)
    access_token: Optional[str] = None
    expires_at: Optional[datetime.datetime] = None


class VerifyPasswordRequest(BaseModel):
    password: str


def _audit(db: AsyncSession, request: Request, email: str, name: str, role: str,
           category: str, summary: str, severity: str = "INFO", details: Optional[dict] = None):
    db.add(AuditLog(
        user_name=name,
        user_email=email,
        user_role=role,
        action_category=category,
        action_summary=summary,
        target_resource="System Authentication",
        details=details or {},
        ip_address=get_client_ip(request),
        user_agent=request.headers.get("user-agent"),
        severity=severity,
    ))


def _check_rate_limit(request: Request, email: str):
    if login_limiter.is_rate_limited(f"ip:{get_client_ip(request)}") or login_limiter.is_rate_limited(f"email:{email}"):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many sign-in attempts. Wait a minute and try again.",
            headers={"Retry-After": "60"},
        )


async def _get_admin(db: AsyncSession, email: str) -> Optional[AdminUser]:
    res = await db.execute(select(AdminUser).where(AdminUser.email == email))
    return res.scalar_one_or_none()


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest, request: Request, db: AsyncSession = Depends(get_db)):
    email = payload.email.strip().lower()
    _check_rate_limit(request, email)

    admin = await _get_admin(db, email)
    password_ok = verify_password(payload.password, admin.password_hash if admin else _DUMMY_HASH)

    if not admin or not admin.is_active or not password_ok:
        _audit(db, request, email, admin.name if admin else email, admin.role if admin else "UNKNOWN",
               "LOGIN", f"Failed admin sign-in attempt for {email}", severity="WARNING")
        await db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password.")

    token, expires_at = issue_admin_token(admin)
    admin.last_login_at = datetime.datetime.utcnow()
    _audit(db, request, admin.email, admin.name, admin.role,
           "LOGIN", f"{admin.name} signed in to the Admin Portal")
    await db.commit()
    return LoginResponse(
        access_token=token,
        expires_at=expires_at,
        user=AdminProfile(email=admin.email, name=admin.name, role=admin.role),
    )


@router.get("/me", response_model=AdminProfile)
async def me(auth: dict = Depends(verify_admin_token)):
    return AdminProfile(email=auth["email"], name=auth["name"], role=auth["role"])


@router.post("/verify-password")
async def verify_own_password(
    payload: VerifyPasswordRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_admin_token),
):
    _check_rate_limit(request, auth["email"])
    admin = await db.get(AdminUser, int(auth["sub"]))
    return {"valid": bool(admin and verify_password(payload.password, admin.password_hash))}


@router.post("/change-password", response_model=PasswordChangeResponse)
async def change_password(
    payload: PasswordChangeRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_admin_token),
):
    target_email = payload.email.strip().lower()
    is_self = target_email == auth["email"].lower()

    if not is_self and auth["role"] != "PRINCIPAL_ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Only the Principal Admin can reset another account's password.")
    if len(payload.new_password) < MIN_PASSWORD_LENGTH:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"New password must be at least {MIN_PASSWORD_LENGTH} characters.")

    target = await _get_admin(db, target_email)
    if not target:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin account not found.")

    if is_self:
        _check_rate_limit(request, target_email)
        if not payload.current_password or not verify_password(payload.current_password, target.password_hash):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Current password is incorrect.")

    target.password_hash = hash_password(payload.new_password)
    target.token_version = (target.token_version or 1) + 1
    _audit(db, request, auth["email"], auth["name"], auth["role"], "SYSTEM",
           f"{auth['name']} changed the password for {target.email}", severity="CRITICAL",
           details={"target_email": target.email})
    await db.commit()

    response = PasswordChangeResponse(
        message=f"Password changed for {target.email}. Other sessions for this account were signed out.",
        user_email=target.email,
    )
    if is_self:
        await db.refresh(target)
        response.access_token, response.expires_at = issue_admin_token(target)
    return response

