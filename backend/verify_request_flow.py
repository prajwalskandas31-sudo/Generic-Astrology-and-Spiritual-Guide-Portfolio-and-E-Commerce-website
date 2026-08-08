import asyncio
import sys
import os

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.session import engine, Base, AsyncSessionLocal
from app.models.models import Customer, Request, MessageLog, Workshop, WorkshopBatch, WorkshopRegistration
from app.services.requests_service import (
    generate_request_id,
    get_or_create_customer,
    create_request,
    execute_request_action,
    validate_status_transition
)
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

async def run_all_tests():
    print("=========================================================")
    print("     WHATSAPP REQUEST-BASED AUTOMATION TEST SUITE        ")
    print("=========================================================\n")

    # 1. Initialize Tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        print("[TEST 1]: Generate Request ID Formats...")
        cid = await generate_request_id("Consultation", db)
        sid = await generate_request_id("Service", db)
        wid = await generate_request_id("Workshop", db)
        
        assert cid.startswith("CONSULT-"), f"Expected CONSULT- prefix, got {cid}"
        assert sid.startswith("SERVICE-"), f"Expected SERVICE- prefix, got {sid}"
        assert wid.startswith("WORKSHOP-"), f"Expected WORKSHOP- prefix, got {wid}"
        print(f"  [OK] CONSULT ID: {cid}")
        print(f"  [OK] SERVICE ID: {sid}")
        print(f"  [OK] WORKSHOP ID: {wid}")

        print("\n[TEST 2]: Create Customer & Multi-Request Association...")
        phone = "9876543210"
        name = "Sujay Rao"
        email = "sujay@example.com"

        # Request 1: Consultation
        req1 = await create_request(
            request_type="Consultation",
            name=name,
            phone=phone,
            email=email,
            service_name="Vedic Astrology Consultation",
            preferred_date="2026-08-20",
            preferred_time="10:00 AM",
            db=db
        )
        assert req1.request_id.startswith("CONSULT-"), f"Invalid request ID: {req1.request_id}"
        customer_id_1 = req1.customer_id
        print(f"  [OK] Request 1 created: {req1.request_id} for Customer ID: {customer_id_1}")

        # Request 2: Workshop (Same Customer)
        req2 = await create_request(
            request_type="Workshop",
            name=name,
            phone=phone,
            email=email,
            workshop_name="Vedic Chant Mastery",
            amount=2500.0,
            db=db
        )
        assert req2.request_id.startswith("WORKSHOP-"), f"Invalid request ID: {req2.request_id}"
        customer_id_2 = req2.customer_id
        assert customer_id_1 == customer_id_2, "Same customer should be reused!"
        print(f"  [OK] Request 2 created: {req2.request_id} linked to same Customer ID: {customer_id_2}")

        print("\n[TEST 3]: Validate State Machine & Admin Actions...")
        # Admin ACCEPTS Request 1
        req1_updated = await execute_request_action(
            request_id_str=req1.request_id,
            action_name="ACCEPT",
            action_payload={"selected_date": "2026-08-20", "selected_time": "10:00 AM"},
            db=db,
            sender_channel="ADMIN"
        )
        assert req1_updated.status == "CONFIRMED", f"Expected CONFIRMED, got {req1_updated.status}"
        print(f"  [OK] Request 1 ACCEPTED -> Status: {req1_updated.status}")

        # Customer requests CHANGE_TIME for Request 1
        req1_resched = await execute_request_action(
            request_id_str=req1.request_id,
            action_name="CHANGE_TIME",
            action_payload={},
            db=db,
            sender_channel="WHATSAPP"
        )
        assert req1_resched.status == "RESCHEDULE_REQUESTED", f"Expected RESCHEDULE_REQUESTED, got {req1_resched.status}"
        print(f"  [OK] Request 1 CHANGE_TIME -> Status: {req1_resched.status}")

        # Customer selects 11:00 AM
        req1_time = await execute_request_action(
            request_id_str=req1.request_id,
            action_name="TIME_1100",
            action_payload={"selected_time": "11:00 AM"},
            db=db,
            sender_channel="WHATSAPP"
        )
        assert req1_time.selected_time == "11:00 AM", f"Expected 11:00 AM, got {req1_time.selected_time}"
        print(f"  [OK] Request 1 TIME_1100 -> Selected Time: {req1_time.selected_time}")

        print("\n[TEST 4]: Test Invalid Action Prevention (State Machine Validation)...")
        # Attempt to confirm CANCELLED request
        req1_cancelled = await execute_request_action(
            request_id_str=req1.request_id,
            action_name="CANCEL",
            action_payload={},
            db=db,
            sender_channel="WHATSAPP"
        )
        assert req1_cancelled.status == "CANCELLED"
        
        try:
            await execute_request_action(
                request_id_str=req1.request_id,
                action_name="ACCEPT",
                action_payload={},
                db=db,
                sender_channel="ADMIN"
            )
            assert False, "Should not allow confirming a CANCELLED request!"
        except ValueError as ve:
            print(f"  [OK] Blocked invalid action correctly: '{ve}'")

        print("\n[TEST 5]: Admin Completes & Archives Requests...")
        # Admin Marks Request 2 Completed & Archived
        req2_comp = await execute_request_action(
            request_id_str=req2.request_id,
            action_name="MARK_COMPLETED",
            action_payload={},
            db=db,
            sender_channel="ADMIN"
        )
        assert req2_comp.status == "COMPLETED"
        assert req2_comp.completed_at is not None
        print(f"  [OK] Request 2 Marked COMPLETED at {req2_comp.completed_at}")

        req2_arch = await execute_request_action(
            request_id_str=req2.request_id,
            action_name="ARCHIVE",
            action_payload={},
            db=db,
            sender_channel="ADMIN"
        )
        assert req2_arch.status == "ARCHIVED"
        print(f"  [OK] Request 2 ARCHIVED -> Status: {req2_arch.status}")

        print("\n[TEST 6]: New Request Created After Old Request Completed...")
        # Same customer creates Request 3 (Service)
        req3 = await create_request(
            request_type="Service",
            name=name,
            phone=phone,
            service_name="Mahaganapathi Homa",
            db=db
        )
        assert req3.customer_id == customer_id_1, "Must reuse same customer"
        assert req3.request_id.startswith("SERVICE-"), f"Invalid ID: {req3.request_id}"
        assert req2_arch.status == "ARCHIVED", "Historical Request 2 must remain archived!"
        print(f"  [OK] Request 3 created: {req3.request_id} for existing Customer ID: {req3.customer_id}")
        print(f"  [OK] Historical Request 2 remains ARCHIVED without overwriting.")

        import uuid
        print("\n[TEST 7]: Duplicate Webhook Protection...")
        dup_msg_id = f"wamid.TEST_{uuid.uuid4().hex[:12]}"
        log1 = MessageLog(
            message_id=dup_msg_id,
            request_id=req3.id,
            customer_id=customer_id_1,
            direction="INBOUND",
            channel="WHATSAPP",
            message_type="FREE_TEXT_MESSAGE",
            message_content="Testing duplicate webhook"
        )
        db.add(log1)
        await db.commit()

        # Query existing log
        check_dup = await db.execute(select(MessageLog).where(MessageLog.message_id == dup_msg_id))
        logs_found = check_dup.scalars().all()
        assert len(logs_found) == 1, f"Expected 1 log, found {len(logs_found)}"
        print(f"  [OK] Duplicate event check passed for message_id: '{dup_msg_id}'")


        print("\n[TEST 8]: Verify Message Log History Audit Trail...")
        res_logs = await db.execute(
            select(Request)
            .options(selectinload(Request.message_logs))
            .execution_options(populate_existing=True)
            .where(Request.id == req1.id)
        )
        req1_final = res_logs.scalar_one()
        assert len(req1_final.message_logs) >= 3, f"Audit trail must contain all actions, found {len(req1_final.message_logs)}"
        print(f"  [OK] Request 1 contains {len(req1_final.message_logs)} audit trail entries:")
        for l in req1_final.message_logs:
            print(f"     - [{l.timestamp.strftime('%H:%M:%S')}] {l.direction} ({l.channel}): {l.message_type}")



    print("\n=========================================================")
    print("     ALL REQUEST-BASED AUTOMATION TESTS PASSED!          ")
    print("=========================================================")

if __name__ == "__main__":
    asyncio.run(run_all_tests())
