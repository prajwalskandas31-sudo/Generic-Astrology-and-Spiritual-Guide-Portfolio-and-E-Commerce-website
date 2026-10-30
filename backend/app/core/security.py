import base64
import datetime
import hashlib
import hmac
import secrets

import jwt
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db

security = HTTPBearer(auto_error=False)

TOKEN_ISSUER = "pradeepnadig-admin"
TOKEN_TTL_HOURS = 12
_PBKDF2_ITERATIONS = 600_000
_MIN_SECRET_LENGTH = 32


# --- Password hashing (stdlib PBKDF2-SHA256, no extra dependency) ---

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, _PBKDF2_ITERATIONS)
    return "pbkdf2_sha256${}${}${}".format(
        _PBKDF2_ITERATIONS,
        base64.b64encode(salt).decode(),
        base64.b64encode(digest).decode(),
    )


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        algorithm, iterations, salt_b64, digest_b64 = stored_hash.split("$")
        if algorithm != "pbkdf2_sha256":
            return False
        digest = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), base64.b64decode(salt_b64), int(iterations)
        )
        return hmac.compare_digest(digest, base64.b64decode(digest_b64))
    except (ValueError, TypeError):
        return False


# --- Admin session tokens (HS256 JWTs signed by this server) ---

def _signing_secret() -> str:
    secret = (settings.ADMIN_JWT_SECRET or "").strip()
    if len(secret) < _MIN_SECRET_LENGTH:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service not configured. Contact administrator.",
        )
    return secret


def issue_admin_token(admin) -> tuple[str, datetime.datetime]:
    now = datetime.datetime.now(datetime.timezone.utc)
    expires_at = now + datetime.timedelta(hours=TOKEN_TTL_HOURS)
    token = jwt.encode(
        {
            "iss": TOKEN_ISSUER,
            "sub": str(admin.id),
            "email": admin.email,
            "role": admin.role,
            "ver": admin.token_version,
            "iat": int(now.timestamp()),
            "exp": int(expires_at.timestamp()),
        },
        _signing_secret(),
        algorithm="HS256",
    )
    return token, expires_at


def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


async def verify_admin_token(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """
    Validates the admin session token issued by /admin/auth/login.
    SECURITY: No mock tokens. The account must still exist, be active and not
    have changed its password since the token was issued.
    """
    from app.models.models import AdminUser

    if not credentials:
        raise _unauthorized("Missing Authorization header")

    try:
        payload = jwt.decode(
            credentials.credentials,
            _signing_secret(),
            algorithms=["HS256"],
            issuer=TOKEN_ISSUER,
            options={"require": ["exp", "iat", "sub", "iss"]},
        )
    except jwt.ExpiredSignatureError:
        raise _unauthorized("Session expired. Sign in again.")
    except jwt.PyJWTError:
        raise _unauthorized("Could not validate credentials")

    try:
        admin = await db.get(AdminUser, int(payload["sub"]))
    except (TypeError, ValueError):
        admin = None
    if not admin or not admin.is_active or admin.token_version != payload.get("ver"):
        raise _unauthorized("Session is no longer valid. Sign in again.")

    return {
        "sub": str(admin.id),
        "email": admin.email,
        "name": admin.name,
        "role": admin.role,
        "app_metadata": {"role": admin.role},
    }


# Existing endpoints depend on this name
verify_supabase_token = verify_admin_token
