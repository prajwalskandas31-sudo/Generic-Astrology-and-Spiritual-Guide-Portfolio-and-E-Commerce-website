from contextlib import asynccontextmanager
import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from seed import seed_database

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        from app.db.session import migrate_db_schema
        await migrate_db_schema()
        await seed_database()
    except Exception as err:
        logger.warning(f"Startup DB migration notice: {err}")
    yield

# Determine environment: disable docs in production
_is_production = os.environ.get("ENVIRONMENT", "production").lower() == "production"

app = FastAPI(
    title=settings.PROJECT_NAME,
    # SECURITY: Disable OpenAPI schema and docs UI in production
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if not _is_production else None,
    docs_url="/docs" if not _is_production else None,
    redoc_url="/redoc" if not _is_production else None,
    lifespan=lifespan,
)

# SECURITY: Restrict CORS to known origins only
_allowed_origins = [
    "https://pradeepnadig.in",
    "https://www.pradeepnadig.in",
]
if not _is_production:
    _allowed_origins.extend([
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"],
)

@app.middleware("http")
async def normalize_path_middleware(request, call_next):
    path = request.scope.get("path", "")
    if "//" in path:
        import re
        request.scope["path"] = re.sub(r"/+", "/", path)
    return await call_next(request)

from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    # SECURITY: Log full trace server-side, return generic error to client
    import traceback
    error_trace = traceback.format_exc()
    logger.error(f"Unhandled exception on {request.url.path}: {error_trace}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please try again later."}
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to Veda Brahma Shri Pradeep Nadig API",
        "health": f"{settings.API_V1_STR}/health"
    }

@app.get(f"{settings.API_V1_STR}/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
    }


