from fastapi import HTTPException, Security, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.core.config import settings

security = HTTPBearer(auto_error=False)

def verify_supabase_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Validates Supabase Auth Bearer JWT token.
    Returns decoded token payload if valid, otherwise raises 401.

    SECURITY: No mock tokens, no fallbacks. Requires a valid JWT signed
    with the SUPABASE_JWT_SECRET. If the secret is not configured,
    all requests are rejected.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    jwt_secret = settings.SUPABASE_JWT_SECRET
    if not jwt_secret or jwt_secret in ("your-supabase-jwt-secret", ""):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service not configured. Contact administrator.",
        )

    try:
        payload = jwt.decode(
            token,
            jwt_secret,
            algorithms=["HS256"],
            options={"verify_aud": False}
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
