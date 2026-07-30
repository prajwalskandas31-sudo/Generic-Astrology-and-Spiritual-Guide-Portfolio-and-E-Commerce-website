import httpx
from app.core.config import settings

async def send_whatsapp_message(to_phone: str, text: str):
    """
    Sends a WhatsApp message via WhatsApp Cloud API.
    Uses mock sandbox output if token is not configured.
    """
    clean_phone = to_phone.replace("+", "").replace(" ", "").replace("-", "")
    print(f"[WHATSAPP OUTBOUND] To: +{clean_phone} | Message: {text}")

    if settings.WHATSAPP_TOKEN and settings.WHATSAPP_TOKEN != "mock_whatsapp_token":
        url = f"https://graph.facebook.com/v18.0/{settings.WHATSAPP_PHONE_ID}/messages"
        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
            "Content-Type": "application/json"
        }
        payload = {
            "messaging_product": "whatsapp",
            "to": clean_phone,
            "type": "text",
            "text": {"body": text}
        }
        async with httpx.AsyncClient() as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
                return res.json()
            except Exception as e:
                print(f"[WHATSAPP API ERROR]: {e}")
                return None
    return {"status": "mock_sent", "to": clean_phone, "text": text}
