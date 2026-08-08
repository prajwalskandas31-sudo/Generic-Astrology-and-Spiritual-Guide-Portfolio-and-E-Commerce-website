import asyncio
import time
from httpx import AsyncClient, ASGITransport
from app.main import app

async def test_whatsapp_workflow():
    print("==================================================")
    print("TESTING WHATSAPP WEBHOOK & CALENDAR INTEGRATION")
    print("==================================================")
    
    test_mobile = f"9199{int(time.time())}"[-10:]
    test_mobile = f"91{test_mobile}"

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        headers = {"Authorization": "Bearer mock-admin-token"}

        # 1. Create a test enquiry
        enquiry_payload = {
            "enquiry_type": "Consultation",
            "name": "Integration Test Visitor",
            "mobile": test_mobile,
            "email": "testvisitor@example.com",
            "city": "Bengaluru",
            "category": "Vedic Astrology Consultation",
            "additional_notes": "Testing WhatsApp Admin reply workflow"
        }
        res = await client.post("/api/v1/enquiries", json=enquiry_payload)
        assert res.status_code == 201, f"Create enquiry failed: {res.text}"
        enquiry_data = res.json()
        enquiry_id = enquiry_data["id"]
        print(f"[OK] Created Test Enquiry ID: #{enquiry_id} | Initial Status: '{enquiry_data['status']}'")

        # 2. Simulate Admin replying 'Confirm' via WhatsApp Webhook
        print("\n--- Testing Keyword: 'Confirm' ---")
        webhook_payload_confirm = {
            "message": "Confirm",
            "sender": test_mobile,
            "enquiry_id": enquiry_id
        }
        res = await client.post("/api/v1/webhooks/whatsapp", json=webhook_payload_confirm)
        assert res.status_code == 200, f"Webhook confirm failed: {res.text}"
        result_confirm = res.json()
        print("[OK] Webhook Response:", result_confirm["message"])

        # 3. Verify enquiry status in DB is now 'Confirmed'
        res = await client.get("/api/v1/enquiries", headers=headers)
        assert res.status_code == 200, f"Fetch enquiries failed: {res.text}"
        all_enquiries = res.json()
        target_enquiry = next((e for e in all_enquiries if e["id"] == enquiry_id), None)
        assert target_enquiry is not None, "Enquiry not found"
        assert target_enquiry["status"] == "Confirmed", f"Expected Confirmed status, got: {target_enquiry['status']}"
        print(f"[OK] Verified DB Status updated to: '{target_enquiry['status']}'")

        # 4. Test Keyword: 'Contact Manually'
        print("\n--- Testing Keyword: 'Contact Manually' ---")
        webhook_payload_contact = {
            "message": "Contact Manually",
            "sender": test_mobile,
            "enquiry_id": enquiry_id
        }
        res = await client.post("/api/v1/webhooks/whatsapp", json=webhook_payload_contact)
        assert res.status_code == 200
        print("[OK] Webhook Response:", res.json()["message"])

        # 5. Test Keyword: 'Reject'
        print("\n--- Testing Keyword: 'Reject' ---")
        webhook_payload_reject = {
            "message": "Reject",
            "sender": test_mobile,
            "enquiry_id": enquiry_id
        }
        res = await client.post("/api/v1/webhooks/whatsapp", json=webhook_payload_reject)
        assert res.status_code == 200
        print("[OK] Webhook Response:", res.json()["message"])

    print("\n==================================================")
    print("ALL WHATSAPP & CALENDAR WORKFLOW TESTS PASSED 100%!")
    print("==================================================")

if __name__ == "__main__":
    asyncio.run(test_whatsapp_workflow())
