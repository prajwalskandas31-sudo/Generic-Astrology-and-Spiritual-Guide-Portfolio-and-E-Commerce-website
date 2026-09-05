import httpx
import sys
import logging
from typing import List, Dict, Optional
from app.core.config import settings

logger = logging.getLogger("uvicorn")

def safe_print(msg: str):
    try:
        print(msg, flush=True)
        logger.info(msg)
    except Exception:
        pass

def format_whatsapp_phone(phone: str) -> str:
    if not phone:
        return ""
    clean = phone.replace("+", "").replace(" ", "").replace("-", "").replace("(", "").replace(")", "").strip()
    if len(clean) == 10 and clean[0] in ["6", "7", "8", "9"]:
        clean = "91" + clean
    return clean

from sqlalchemy.future import select
from app.db.session import AsyncSessionLocal, SQLiteSessionLocal
from app.models.models import Setting

async def get_whatsapp_credentials() -> tuple[Optional[str], Optional[str]]:
    token = settings.WHATSAPP_TOKEN
    phone_id = settings.WHATSAPP_PHONE_ID
    if token and phone_id:
        return token, phone_id

    try:
        async with AsyncSessionLocal() as session:
            res = await session.execute(select(Setting).where(Setting.key == "whatsapp_onboarding"))
            setting_obj = res.scalar_one_or_none()
            if setting_obj and isinstance(setting_obj.value, dict):
                val = setting_obj.value
                db_token = val.get("access_token") or token
                db_phone_id = val.get("phone_number_id") or phone_id
                if db_token and db_phone_id:
                    return db_token, db_phone_id
    except Exception:
        pass

    try:
        async with SQLiteSessionLocal() as session:
            res = await session.execute(select(Setting).where(Setting.key == "whatsapp_onboarding"))
            setting_obj = res.scalar_one_or_none()
            if setting_obj and isinstance(setting_obj.value, dict):
                val = setting_obj.value
                db_token = val.get("access_token") or token
                db_phone_id = val.get("phone_number_id") or phone_id
                if db_token and db_phone_id:
                    return db_token, db_phone_id
    except Exception:
        pass

    return token, phone_id


async def send_whatsapp_message(to_phone: str, text: str):
    """
    Sends a text WhatsApp message via WhatsApp Cloud API.
    Uses mock sandbox output if token is not configured.
    """
    clean_phone = format_whatsapp_phone(to_phone)
    safe_print(f"[WHATSAPP OUTBOUND TEXT] To: +{clean_phone} | Message:\n{text}\n")

    wa_token, wa_phone_id = await get_whatsapp_credentials()

    if wa_token and wa_phone_id:
        url = f"https://graph.facebook.com/v20.0/{wa_phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {wa_token}",
            "Content-Type": "application/json"
        }
        payload = {
            "messaging_product": "whatsapp",
            "to": clean_phone,
            "type": "text",
            "text": {"body": text}
        }
        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
                safe_print(f"[WHATSAPP API RESPONSE] Status: {res.status_code} | Body: {res.text}")
                return res.json()
            except Exception as e:
                safe_print(f"[WHATSAPP API ERROR]: {e}")
                return None
    return {"status": "mock_sent", "to": clean_phone, "text": text}


async def send_whatsapp_buttons(
    to_phone: str,
    body_text: str,
    buttons: List[Dict[str, str]],
    header_text: Optional[str] = None,
    footer_text: Optional[str] = "Veda Brahma Shri Pradeep Nadig"
):
    """
    Sends an interactive button message via WhatsApp Cloud API.
    `buttons` format: [{"id": "action_id", "title": "Button Title"}]
    WhatsApp limits to maximum 3 quick reply buttons per message.
    """
    clean_phone = format_whatsapp_phone(to_phone)
    button_titles = ", ".join([f"[{b['title']}]" for b in buttons])
    safe_print(f"[WHATSAPP OUTBOUND BUTTONS] To: +{clean_phone} | Body: {body_text} | Buttons: {button_titles}")

    wa_token, wa_phone_id = await get_whatsapp_credentials()

    if wa_token and wa_phone_id:
        url = f"https://graph.facebook.com/v20.0/{wa_phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {wa_token}",
            "Content-Type": "application/json"
        }

        formatted_buttons = [
            {
                "type": "reply",
                "reply": {
                    "id": b["id"],
                    "title": b["title"][:20]  # Meta max 20 chars
                }
            }
            for b in buttons[:3]  # Meta max 3 buttons
        ]

        interactive_obj: Dict = {
            "type": "button",
            "body": {"text": body_text},
            "action": {"buttons": formatted_buttons}
        }

        if header_text:
            interactive_obj["header"] = {"type": "text", "text": header_text}
        if footer_text:
            interactive_obj["footer"] = {"text": footer_text}

        payload = {
            "messaging_product": "whatsapp",
            "to": clean_phone,
            "type": "interactive",
            "interactive": interactive_obj
        }

        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
                safe_print(f"[WHATSAPP API RESPONSE] Status: {res.status_code} | Body: {res.text}")
                return res.json()
            except Exception as e:
                safe_print(f"[WHATSAPP API ERROR]: {e}")
                return None

    return {
        "status": "mock_sent",
        "to": clean_phone,
        "body": body_text,
        "buttons": buttons
    }


async def send_whatsapp_list(
    to_phone: str,
    body_text: str,
    button_title: str,
    sections: List[Dict],
    header_text: Optional[str] = None,
    footer_text: Optional[str] = "Veda Brahma Shri Pradeep Nadig"
):
    """
    Sends an interactive list message via WhatsApp Cloud API (for >3 options like time slots or active requests).
    `sections` format: [{"title": "Section Title", "rows": [{"id": "row_id", "title": "Row Title", "description": "Optional"}]}]
    """
    clean_phone = format_whatsapp_phone(to_phone)
    safe_print(f"[WHATSAPP OUTBOUND LIST] To: +{clean_phone} | Body: {body_text} | Button: {button_title}")

    wa_token, wa_phone_id = await get_whatsapp_credentials()

    if wa_token and wa_phone_id:
        url = f"https://graph.facebook.com/v20.0/{wa_phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {wa_token}",
            "Content-Type": "application/json"
        }

        interactive_obj: Dict = {
            "type": "list",
            "body": {"text": body_text},
            "action": {
                "button": button_title[:20],
                "sections": sections
            }
        }

        if header_text:
            interactive_obj["header"] = {"type": "text", "text": header_text}
        if footer_text:
            interactive_obj["footer"] = {"text": footer_text}

        payload = {
            "messaging_product": "whatsapp",
            "to": clean_phone,
            "type": "interactive",
            "interactive": interactive_obj
        }

        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
                safe_print(f"[WHATSAPP API RESPONSE] Status: {res.status_code} | Body: {res.text}")
                return res.json()
            except Exception as e:
                safe_print(f"[WHATSAPP API ERROR]: {e}")
                return None

    return {
        "status": "mock_sent",
        "to": clean_phone,
        "body": body_text,
        "button_title": button_title,
        "sections": sections
    }


async def send_whatsapp_image(to_phone: str, image_url: str, caption: Optional[str] = None):
    """
    Sends an image WhatsApp message with optional caption via WhatsApp Cloud API.
    """
    clean_phone = format_whatsapp_phone(to_phone)
    safe_print(f"[WHATSAPP OUTBOUND IMAGE] To: +{clean_phone} | Image: {image_url} | Caption: {caption}")

    wa_token, wa_phone_id = await get_whatsapp_credentials()

    if wa_token and wa_phone_id:
        url = f"https://graph.facebook.com/v20.0/{wa_phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {wa_token}",
            "Content-Type": "application/json"
        }
        image_obj: Dict = {"link": image_url}
        if caption:
            image_obj["caption"] = caption

        payload = {
            "messaging_product": "whatsapp",
            "to": clean_phone,
            "type": "image",
            "image": image_obj
        }

        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
                safe_print(f"[WHATSAPP API RESPONSE] Status: {res.status_code} | Body: {res.text}")
                return res.json()
            except Exception as e:
                safe_print(f"[WHATSAPP API ERROR]: {e}")
                return None

    return {"status": "mock_sent", "to": clean_phone, "image_url": image_url, "caption": caption}

