import hashlib
import time

import httpx
import jwt
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import settings

security = HTTPBearer(auto_error=False)

# Remote verification results, keyed by token hash, so each admin request
# does not round-trip to Supabase. Short TTL keeps revoked sessions short-lived.
_REMOTE_CACHE_TTL_SECONDS = 60
_REMOTE_CACHE_MAX_ENTRIES = 256
_remote_cache: dict = {}


def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def _configured(value) -> bool:
    return bool(value and value.strip() and not value.strip().lower().startswith("your"))


def _verify_with_secret(token: str, jwt_secret: str) -> dict:
    try:
        return jwt.decode(token, jwt_secret, algorithms=["HS256"], options={"verify_aud": False})
    except jwt.ExpiredSignatureError:
        raise _unauthorized("Token has expired")
    except jwt.PyJWTError:
        raise _unauthorized("Could not validate credentials")


def _verify_with_supabase(token: str, supabase_url: str, anon_key: str) -> dict:
    """Asks Supabase Auth itself whether the token is a live session (no shared secret needed)."""
    cache_key = hashlib.sha256(token.encode()).hexdigest()
    cached = _remote_cache.get(cache_key)
    if cached and cached[0] > time.time():
        return cached[1]

    try:
        res = httpx.get(
            f"{supabase_url.rstrip('/')}/auth/v1/user",
            headers={"apikey": anon_key, "Authorization": f"Bearer {token}"},
            timeout=8.0,
        )
    except httpx.HTTPError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service unreachable. Try again shortly.",
        )
    if res.status_code != 200:
        raise _unauthorized("Session is invalid or expired. Sign in again.")

    user = res.json()
    payload = {
        "sub": user.get("id"),
        "email": user.get("email"),
        "role": user.get("role"),
        "app_metadata": user.get("app_metadata") or {},
    }
    if len(_remote_cache) >= _REMOTE_CACHE_MAX_ENTRIES:
        _remote_cache.clear()
    _remote_cache[cache_key] = (time.time() + _REMOTE_CACHE_TTL_SECONDS, payload)
    return payload


def verify_supabase_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Validates the Supabase Auth Bearer token and that it belongs to an admin.

    Verification uses SUPABASE_JWT_SECRET when configured, otherwise asks the
    Supabase Auth API directly (needs only the project URL + anon key).
    SECURITY: No mock tokens. If neither method is configured, all requests are rejected.
    """
    if not credentials:
        raise _unauthorized("Missing Authorization header")

    token = credentials.credentials
    supabase_url = settings.SUPABASE_URL or settings.NEXT_PUBLIC_SUPABASE_URL
    anon_key = settings.SUPABASE_ANON_KEY or settings.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if _configured(settings.SUPABASE_JWT_SECRET):
        payload = _verify_with_secret(token, settings.SUPABASE_JWT_SECRET)
    elif _configured(supabase_url) and _configured(anon_key):
        payload = _verify_with_supabase(token, supabase_url, anon_key)
    else:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service not configured. Contact administrator.",
        )

    # Any visitor could self-register in the Supabase project, so a valid
    # session alone is not enough — the account must be an allowlisted admin.
    allowed = {e.strip().lower() for e in (settings.ADMIN_EMAILS or "").split(",") if e.strip()}
    email = (payload.get("email") or "").lower()
    if allowed and email not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account is not an authorised admin.",
        )
    return payload
