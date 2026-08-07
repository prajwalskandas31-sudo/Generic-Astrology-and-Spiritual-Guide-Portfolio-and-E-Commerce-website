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

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
