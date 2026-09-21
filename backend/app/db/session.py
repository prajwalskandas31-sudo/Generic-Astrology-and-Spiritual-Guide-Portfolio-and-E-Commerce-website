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

sqlite_url = "sqlite+aiosqlite:///./pradeep_dev.db"
sqlite_engine = create_async_engine(sqlite_url, echo=False, future=True)
SQLiteSessionLocal = async_sessionmaker(sqlite_engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    use_sqlite = False
    db_session = None

    try:
        session = AsyncSessionLocal()
        await session.execute(text("SELECT 1"))
        db_session = session
    except Exception as e:
        print(f"[DB Session Warning]: Primary PostgreSQL failed ({e}). Falling back to SQLite.")
        if session:
            try:
                await session.close()
            except Exception:
                pass
        db_session = None
        use_sqlite = True

    if not use_sqlite and db_session is not None:
        async with db_session:
            try:
                yield db_session
            except Exception:
                await db_session.rollback()
                raise
    else:
        async with SQLiteSessionLocal() as session:
            try:
                yield session
            except Exception:
                await session.rollback()
                raise

async def migrate_db_schema():
    """
    Ensures newly added tables (like reviews) and columns exist in PostgreSQL/Supabase & SQLite fallback databases.
    Runs idempotently with IF NOT EXISTS.
    """
    try:
        import app.models.models  # noqa
    except Exception as import_err:
        print(f"[DB Auto-Migration Import Warning]: {import_err}")

    # Create & migrate PostgreSQL tables
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            await conn.execute(text("""
                CREATE TABLE IF NOT EXISTS reviews (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255),
                    city VARCHAR(100),
                    rating INTEGER DEFAULT 5,
                    service_type VARCHAR(255),
                    comment TEXT NOT NULL,
                    status VARCHAR(50) DEFAULT 'Pending',
                    display_order INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """))
            await conn.execute(text("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS email VARCHAR(255);"))
            await conn.execute(text("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS city VARCHAR(100);"))
            await conn.execute(text("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS service_type VARCHAR(255);"))
            await conn.execute(text("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS has_payment BOOLEAN DEFAULT TRUE;"))
            await conn.execute(text("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS payment_mode VARCHAR(50) DEFAULT 'RAZORPAY';"))
            await conn.execute(text("ALTER TABLE workshops ADD COLUMN IF NOT EXISTS custom_payment_link VARCHAR(500);"))
            await conn.execute(text("ALTER TABLE workshops ALTER COLUMN cover_image TYPE TEXT;"))
            await conn.execute(text("ALTER TABLE blogs ALTER COLUMN cover_image TYPE TEXT;"))
            await conn.execute(text("ALTER TABLE gallery_items ALTER COLUMN media_url TYPE TEXT;"))
            await conn.execute(text("ALTER TABLE media_library ALTER COLUMN file_url TYPE TEXT;"))
            print("[DB Auto-Migration]: Verified PostgreSQL tables including reviews.")
    except Exception as e:
        print(f"[DB Auto-Migration Warning - PostgreSQL]: {e}")

    # Create & migrate SQLite fallback tables
    try:
        async with sqlite_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            print("[DB Auto-Migration]: Verified SQLite fallback tables including reviews.")
    except Exception as e:
        print(f"[DB Auto-Migration Warning - SQLite]: {e}")

