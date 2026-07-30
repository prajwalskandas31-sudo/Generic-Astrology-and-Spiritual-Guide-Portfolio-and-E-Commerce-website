import asyncio
import asyncpg

passwords = ["postgres", "", "admin", "root", "123456", "password"]

async def try_connect():
    found = False
    for pwd in passwords:
        try:
            conn = await asyncpg.connect(user="postgres", password=pwd, host="localhost", port=5432, database="postgres")
            print(f"SUCCESS: Connected to PostgreSQL with password: '{pwd}'")
            await conn.close()
            found = True
            
            # Create pradeep_db if not exists
            sys_conn = await asyncpg.connect(user="postgres", password=pwd, host="localhost", port=5432, database="postgres")
            db_exists = await sys_conn.fetchval("SELECT 1 FROM pg_database WHERE datname='pradeep_db'")
            if not db_exists:
                await sys_conn.execute("CREATE DATABASE pradeep_db")
                print("Created database 'pradeep_db'")
            await sys_conn.close()
            return pwd
        except Exception as e:
            print(f"Failed password '{pwd}': {e}")
    if not found:
        print("Could not connect to local PostgreSQL with default passwords.")
    return None

if __name__ == "__main__":
    asyncio.run(try_connect())
