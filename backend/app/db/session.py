from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

def format_db_url(url: str) -> str:
    if not url:
        return url

    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)

    try:
        parsed = urlparse(url)
        if parsed.query:
            qs = parse_qs(parsed.query)
            # Remove libpq parameters that cause TargetServerAttributeNotMatched or pooler issues in asyncpg
            qs.pop("target_session_attrs", None)
            qs.pop("channel_binding", None)
            qs.pop("sslmode", None)
            
            new_query = urlencode(qs, doseq=True)
            parsed = parsed._replace(query=new_query)
            url = urlunparse(parsed)
    except Exception:
        pass

    return url

primary_url = format_db_url(settings.DATABASE_URL)

import ssl
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

connect_args = {
    "statement_cache_size": 0,
    "prepared_statement_cache_size": 0,
}
if "supabase" in primary_url or "onrender" in primary_url or "postgres" in primary_url:
    connect_args["ssl"] = ssl_ctx

from sqlalchemy.pool import NullPool

engine = create_async_engine(
    primary_url,
    echo=False,
    future=True,
    poolclass=NullPool,
    connect_args=connect_args
)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

from sqlalchemy import text

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def migrate_db_schema():
    """
    Ensures newly added table columns exist in PostgreSQL/Supabase database.
    Runs idempotently with IF NOT EXISTS and purges test entries.
    """
    try:
        async with engine.begin() as conn:
            await conn.execute(text("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS has_payment BOOLEAN DEFAULT TRUE;"))
            await conn.execute(text("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS payment_mode VARCHAR(50) DEFAULT 'RAZORPAY';"))
            await conn.execute(text("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS custom_payment_link VARCHAR(500);"))
            
            # Purge internal developer test records
            await conn.execute(text("DELETE FROM workshop_registrations WHERE name ILIKE '%prajwal%' OR name ILIKE '%test%' OR name ILIKE '%demo%';"))
            await conn.execute(text("DELETE FROM enquiries WHERE name ILIKE '%prajwal%' OR name ILIKE '%test%' OR name ILIKE '%demo%';"))
            await conn.execute(text("DELETE FROM requests WHERE customer_id IN (SELECT id FROM customers WHERE name ILIKE '%prajwal%' OR name ILIKE '%test%' OR name ILIKE '%demo%');"))
            await conn.execute(text("DELETE FROM customers WHERE name ILIKE '%prajwal%' OR name ILIKE '%test%' OR name ILIKE '%demo%';"))
            print("[DB Auto-Migration]: Verified workshops columns & purged test data.")
    except Exception as e:
        print(f"[DB Auto-Migration Warning]: {e}")
