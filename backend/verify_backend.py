import asyncio
from httpx import AsyncClient, ASGITransport
from app.main import app

async def test_backend():
    print("Testing FastAPI backend endpoints...")
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Health check
        res = await client.get("/api/v1/health")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        print("[OK] Health check endpoint OK:", res.json())

        # 2. Settings API
        res = await client.get("/api/v1/settings")
        assert res.status_code == 200, f"Settings failed: {res.text}"
        settings = res.json()
        print(f"[OK] Settings API OK. Site Name: {settings.get('site_name')}")

        # 3. Offerings API
        res = await client.get("/api/v1/offerings")
        assert res.status_code == 200, f"Offerings failed: {res.text}"
        offerings = res.json()
        print(f"[OK] Offerings API OK. Total items: {len(offerings)}")

        # 4. Workshops API
        res = await client.get("/api/v1/workshops")
        assert res.status_code == 200, f"Workshops failed: {res.text}"
        workshops = res.json()
        print(f"[OK] Workshops API OK. Featured Workshop: {workshops[0]['title'] if workshops else 'None'}")

        # 5. Classes API
        res = await client.get("/api/v1/classes")
        assert res.status_code == 200, f"Classes failed: {res.text}"
        classes_data = res.json()
        print(f"[OK] Classes API OK. Classes count: {len(classes_data)}")

        # 6. Blogs API
        res = await client.get("/api/v1/blogs")
        assert res.status_code == 200, f"Blogs failed: {res.text}"
        blogs = res.json()
        print(f"[OK] Blogs API OK. Blogs count: {len(blogs)}")

        # 7. FAQ API
        res = await client.get("/api/v1/faq")
        assert res.status_code == 200, f"FAQ failed: {res.text}"
        faq = res.json()
        print(f"[OK] FAQ API OK. FAQs count: {len(faq)}")

        # 8. Webhook GET verification
        res = await client.get("/api/v1/webhooks/whatsapp?hub.mode=subscribe&hub.challenge=12345&hub.verify_token=pradeep_whatsapp_webhook_verify_token")
        assert res.status_code == 200, f"Webhook failed: {res.text}"
        print("[OK] WhatsApp Webhook verification OK!")

    print("ALL BACKEND APIS VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(test_backend())
