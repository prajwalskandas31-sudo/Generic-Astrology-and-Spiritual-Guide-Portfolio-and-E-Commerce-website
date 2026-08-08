import httpx
import sys
from typing import List, Dict, Optional
from app.core.config import settings

def safe_print(msg: str):
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode("ascii", "replace").decode("ascii"))

async def send_whatsapp_message(to_phone: str, text: str):
    """
    Sends a text WhatsApp message via WhatsApp Cloud API.
    Uses mock sandbox output if token is not configured.
    """
    clean_phone = to_phone.replace("+", "").replace(" ", "").replace("-", "")
    safe_print(f"[WHATSAPP OUTBOUND TEXT] To: +{clean_phone} | Message:\n{text}\n")

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
    clean_phone = to_phone.replace("+", "").replace(" ", "").replace("-", "")
    button_titles = ", ".join([f"[{b['title']}]" for b in buttons])
    safe_print(f"[WHATSAPP OUTBOUND BUTTONS] To: +{clean_phone} | Body: {body_text} | Buttons: {button_titles}")

    if settings.WHATSAPP_TOKEN and settings.WHATSAPP_TOKEN != "mock_whatsapp_token":
        url = f"https://graph.facebook.com/v18.0/{settings.WHATSAPP_PHONE_ID}/messages"
        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
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

        async with httpx.AsyncClient() as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
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
    clean_phone = to_phone.replace("+", "").replace(" ", "").replace("-", "")
    safe_print(f"[WHATSAPP OUTBOUND LIST] To: +{clean_phone} | Body: {body_text} | Button: {button_title}")

    if settings.WHATSAPP_TOKEN and settings.WHATSAPP_TOKEN != "mock_whatsapp_token":
        url = f"https://graph.facebook.com/v18.0/{settings.WHATSAPP_PHONE_ID}/messages"
        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
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

        async with httpx.AsyncClient() as client:
            try:
                res = await client.post(url, json=payload, headers=headers)
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
