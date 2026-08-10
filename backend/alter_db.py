import asyncio
from app.db.session import engine
from sqlalchemy import text

async def alter_tables():
    columns = [
        "who_benefits TEXT",
        "where_performed TEXT",
        "when_performed TEXT",
        "who_should_attend TEXT",
        "vidhi_details TEXT"
    ]
    async with engine.begin() as conn:
        for col in columns:
            col_name = col.split()[0]
            try:
                await conn.execute(text(f"ALTER TABLE offerings ADD COLUMN IF NOT EXISTS {col};"))
                print(f"Added column {col_name} to offerings table.")
            except Exception as e:
                print(f"Error adding {col_name}: {e}")

if __name__ == "__main__":
    asyncio.run(alter_tables())
