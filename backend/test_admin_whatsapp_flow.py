import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.session import sqlite_engine, SQLiteSessionLocal, Base
from app.services.whatsapp import get_admin_whatsapp_phone
from app.services.requests_service import create_request, execute_request_action

async def test_flow():
    print("--- TESTING ADMIN WHATSAPP AUTOMATION FLOW ---")
    
    # 1. Initialize SQLite Tables
    async with sqlite_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Test Admin Phone Resolution
    admin_phone = await get_admin_whatsapp_phone()
    print(f"[1] Resolved Admin Phone: {admin_phone}")
    assert admin_phone == "919844042068", f"Expected 919844042068, got {admin_phone}"
    
    async with SQLiteSessionLocal() as db:
        # 3. Test Request Creation with Admin Intimation
        print("\n[2] Creating test request with Admin intimation...")
        req = await create_request(
            request_type="Consultation",
            name="Test Client",
            phone="919876543210",
            email="testclient@example.com",
            service_name="Kundali Astrology Consultation",
            preferred_date="2026-10-15",
            preferred_time="10:00 AM",
            send_whatsapp=True,
            db=db
        )
        print(f"-> Created Request ID: {req.request_id} | Status: {req.status}")
        assert req.request_id.startswith("CONSULT-"), f"Unexpected ID format: {req.request_id}"
        
        # 4. Test Executing Admin Action (Simulating Admin button click via WhatsApp webhook)
        print(f"\n[3] Executing Admin CONFIRM action for Request {req.request_id}...")
        updated_req = await execute_request_action(
            request_id_str=req.request_id,
            action_name="CONFIRM_REQUEST",
            action_payload={},
            db=db,
            sender_channel="ADMIN"
        )
        print(f"-> Updated Status: {updated_req.status}")
        assert updated_req.status == "CONFIRMED", f"Expected CONFIRMED, got {updated_req.status}"
        
        print("\n[OK] ALL ADMIN WHATSAPP AUTOMATION TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(test_flow())
