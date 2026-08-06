from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from seed import seed_database

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        logger.info("Initializing database tables and seed data...")
        await seed_database()
        logger.info("Database initialization complete.")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to Veda Brahma Shri Pradeep Nadig API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }

@app.get(f"{settings.API_V1_STR}/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "database": "PostgreSQL (Supabase)"
    }


