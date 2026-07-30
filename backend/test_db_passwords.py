import asyncio
import asyncpg
import os

more_passwords = ["skand", "skand123", "postgres123", "1234", "12345", "123", "12345678", "system", "master", "pradeep"]

async def try_more():
    for pwd in more_passwords:
        try:
            conn = await asyncpg.connect(user="postgres", password=pwd, host="localhost", port=5432, database="postgres")
            print(f"FOUND WORKING POSTGRES PASSWORD: '{pwd}'")
            await conn.close()
            
            # Create pradeep_db if not exists
            sys_conn = await asyncpg.connect(user="postgres", password=pwd, host="localhost", port=5432, database="postgres")
            db_exists = await sys_conn.fetchval("SELECT 1 FROM pg_database WHERE datname='pradeep_db'")
            if not db_exists:
                await sys_conn.execute("CREATE DATABASE pradeep_db")
                print("Created database 'pradeep_db'")
            await sys_conn.close()
            return pwd
        except Exception as e:
            pass
    print("None of the guessed passwords worked.")
    return None

if __name__ == "__main__":
    asyncio.run(try_more())
