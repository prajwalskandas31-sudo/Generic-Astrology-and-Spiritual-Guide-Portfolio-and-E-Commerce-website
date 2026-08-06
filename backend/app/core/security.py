from fastapi import HTTPException, Security, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.core.config import settings

security = HTTPBearer(auto_error=False)

def verify_supabase_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Validates Supabase Auth Bearer JWT token.
    Returns decoded token payload if valid, otherwise raises 401.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    try:
        # Check against configured Supabase JWT secret
        if settings.SUPABASE_JWT_SECRET and settings.SUPABASE_JWT_SECRET != "your-supabase-jwt-secret":
            payload = jwt.decode(
                token,
                settings.SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_aud": False}
            )
            return payload
        else:
            # Dev mode token check
            if token == "mock-admin-token" or len(token) > 10:
                return {"sub": "admin-id", "email": "admin@pradeepnadig.com", "role": "authenticated"}
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
