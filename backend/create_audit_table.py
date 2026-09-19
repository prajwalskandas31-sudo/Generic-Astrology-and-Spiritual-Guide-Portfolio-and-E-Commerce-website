import asyncio
from app.db.session import engine
from app.models.models import Base

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables initialized successfully including audit_logs!")

if __name__ == "__main__":
    asyncio.run(init_db())
