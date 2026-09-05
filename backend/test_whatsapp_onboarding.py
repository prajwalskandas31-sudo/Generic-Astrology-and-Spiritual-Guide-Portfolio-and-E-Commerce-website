import asyncio
import time
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.config import settings

async def run_whatsapp_onboarding_tests():
    print("==================================================================")
    print("TESTING META WHATSAPP EMBEDDED SIGNUP & COEXISTENCE INTEGRATION")
    print("==================================================================")

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        admin_headers = {"Authorization": "Bearer mock-admin-token"}

        # -------------------------------------------------------------
        # TEST 1: Endpoint Authentication Protection
        # -------------------------------------------------------------
        print("\n--- Test 1: Endpoint Security & Auth Checks ---")
        unauth_status = await client.get("/api/v1/whatsapp/status")
        assert unauth_status.status_code == 401, f"Expected 401 for unauthenticated GET /whatsapp/status, got {unauth_status.status_code}"
        print("[OK] GET /api/v1/whatsapp/status correctly rejected unauthenticated request (401)")

        unauth_onboard = await client.post("/api/v1/whatsapp/embedded-signup", json={"code": "test_code"})
        assert unauth_onboard.status_code == 401, f"Expected 401 for unauthenticated POST /whatsapp/embedded-signup, got {unauth_onboard.status_code}"
        print("[OK] POST /api/v1/whatsapp/embedded-signup correctly rejected unauthenticated request (401)")

        # -------------------------------------------------------------
        # TEST 2: Status Endpoint with Admin Token
        # -------------------------------------------------------------
        print("\n--- Test 2: Admin GET /api/v1/whatsapp/status ---")
        status_resp = await client.get("/api/v1/whatsapp/status", headers=admin_headers)
        assert status_resp.status_code == 200, f"Status check failed: {status_resp.text}"
        status_data = status_resp.json()
        assert status_data["config_id"] == "1516112060284880", f"Unexpected config_id: {status_data.get('config_id')}"
        assert status_data["feature_type"] == "whatsapp_business_app_onboarding", f"Unexpected feature_type: {status_data.get('feature_type')}"
        print(f"[OK] Status check succeeded: Config ID '{status_data['config_id']}' | Feature '{status_data['feature_type']}' | Connected: {status_data['connected']}")

        # -------------------------------------------------------------
        # TEST 3: Embedded Signup Onboarding Code Exchange
        # -------------------------------------------------------------
        print("\n--- Test 3: POST /api/v1/whatsapp/embedded-signup ---")
        onboard_payload = {
            "code": "sample_meta_auth_code_12345",
            "waba_id": "1516112060284880",
            "phone_number_id": "919844042068"
        }
        onboard_resp = await client.post("/api/v1/whatsapp/embedded-signup", json=onboard_payload, headers=admin_headers)
        assert onboard_resp.status_code == 200, f"Onboarding code exchange failed: {onboard_resp.text}"
        onboard_data = onboard_resp.json()
        assert onboard_data["success"] is True
        assert onboard_data["status"] == "CONNECTED"
        assert onboard_data["waba_id"] == "1516112060284880"
        print(f"[OK] Embedded signup recorded successfully: WABA '{onboard_data['waba_id']}' | Phone: '{onboard_data['display_phone_number']}'")

        # -------------------------------------------------------------
        # TEST 4: Verified Status After Onboarding
        # -------------------------------------------------------------
        print("\n--- Test 4: Verify DB Status After Onboarding ---")
        post_onboard_status = await client.get("/api/v1/whatsapp/status", headers=admin_headers)
        assert post_onboard_status.status_code == 200
        post_data = post_onboard_status.json()
        assert post_data["connected"] is True
        print(f"[OK] Post-onboarding verified: Status = Connected | WABA = {post_data['waba_id']}")

        # -------------------------------------------------------------
        # TEST 5: Webhook GET Verification Request
        # -------------------------------------------------------------
        print("\n--- Test 5: Webhook GET Verification Request ---")
        verify_token = settings.WHATSAPP_VERIFY_TOKEN or "pradeep_whatsapp_webhook_verify_token"
        verify_resp = await client.get(f"/api/v1/webhooks/whatsapp?hub.mode=subscribe&hub.challenge=test_challenge_123&hub.verify_token={verify_token}")
        assert verify_resp.status_code == 200, f"Webhook GET verification failed: {verify_resp.text}"
        assert verify_resp.text == "test_challenge_123"
        print(f"[OK] Webhook GET verification passed with challenge response: '{verify_resp.text}'")

        # -------------------------------------------------------------
        # TEST 6: Webhook POST Standard Customer Message
        # -------------------------------------------------------------
        print("\n--- Test 6: Webhook POST Standard Customer Message ---")
        test_phone = f"9198{int(time.time())}"[-10:]
        test_phone = f"91{test_phone}"
        standard_payload = {
            "object": "whatsapp_business_account",
            "entry": [
                {
                    "id": "1516112060284880",
                    "changes": [
                        {
                            "field": "messages",
                            "value": {
                                "messaging_product": "whatsapp",
                                "metadata": {
                                    "display_phone_number": "919844042068",
                                    "phone_number_id": "919844042068"
                                },
                                "messages": [
                                    {
                                        "from": test_phone,
                                        "id": f"wamid.{int(time.time())}",
                                        "timestamp": str(int(time.time())),
                                        "type": "text",
                                        "text": {"body": "Hari Om, testing WhatsApp inquiry."}
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
        std_msg_resp = await client.post("/api/v1/webhooks/whatsapp", json=standard_payload)
        assert std_msg_resp.status_code == 200, f"Standard message webhook failed: {std_msg_resp.text}"
        print(f"[OK] Standard message webhook processed cleanly: {std_msg_resp.json()['message']}")

        # -------------------------------------------------------------
        # TEST 7: Webhook POST Coexistence Payload Events
        # -------------------------------------------------------------
        print("\n--- Test 7: Webhook POST Coexistence Payloads (smb_app_state_sync, history, smb_message_echoes) ---")
        coexistence_fields = ["history", "smb_app_state_sync", "smb_message_echoes", "account_update", "statuses"]
        for c_field in coexistence_fields:
            coexist_payload = {
                "object": "whatsapp_business_account",
                "entry": [
                    {
                        "id": "1516112060284880",
                        "changes": [
                            {
                                "field": c_field,
                                "value": {
                                    "messaging_product": "whatsapp",
                                    "metadata": {
                                        "display_phone_number": "919844042068",
                                        "phone_number_id": "919844042068"
                                    },
                                    "event": c_field
                                }
                            }
                        ]
                    }
                ]
            }
            coexist_resp = await client.post("/api/v1/webhooks/whatsapp", json=coexist_payload)
            assert coexist_resp.status_code == 200, f"Coexistence event '{c_field}' failed: {coexist_resp.text}"
            c_msg = coexist_resp.json()["message"]
            print(f"[OK] Coexistence event '{c_field}' acknowledged (200 OK): {c_msg}")

        # -------------------------------------------------------------
        # TEST 8: Disconnect Endpoint
        # -------------------------------------------------------------
        print("\n--- Test 8: POST /api/v1/whatsapp/disconnect ---")
        dc_resp = await client.post("/api/v1/whatsapp/disconnect", headers=admin_headers)
        assert dc_resp.status_code == 200
        assert dc_resp.json()["success"] is True
        print("[OK] Disconnect endpoint executed cleanly.")

    print("\n==================================================================")
    print("ALL WHATSAPP EMBEDDED SIGNUP & COEXISTENCE TESTS PASSED 100%!")
    print("==================================================================")

if __name__ == "__main__":
    asyncio.run(run_whatsapp_onboarding_tests())
