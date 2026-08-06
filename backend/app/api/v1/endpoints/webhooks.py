from fastapi import APIRouter, Depends, Request, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.models import Enquiry
from app.schemas.schemas import MessageResponse
from app.core.config import settings
from app.services.whatsapp import send_whatsapp_message
from app.services.calendar_service import create_google_calendar_event

router = APIRouter()

@router.get("/whatsapp")
async def verify_whatsapp_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    if hub_mode == "subscribe" and hub_verify_token == settings.WHATSAPP_VERIFY_TOKEN:
        return int(hub_challenge) if hub_challenge and hub_challenge.isdigit() else hub_challenge
    raise HTTPException(status_code=403, detail="Verification token mismatch")

@router.post("/whatsapp", response_model=MessageResponse)
async def process_whatsapp_reply(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    body = await request.json()
    
    message_text = ""
    sender = ""
    enquiry_id = None
    
    if "entry" in body and len(body["entry"]) > 0:
        changes = body["entry"][0].get("changes", [])
        if changes and "value" in changes[0]:
            val = changes[0]["value"]
            messages = val.get("messages", [])
            if messages:
                msg = messages[0]
                sender = msg.get("from", "")
                if msg.get("type") == "text":
                    message_text = msg.get("text", {}).get("body", "").strip()
    elif "message" in body:
        message_text = body.get("message", "").strip()
        sender = body.get("sender", "")
        enquiry_id = body.get("enquiry_id")

    if not message_text:
        return MessageResponse(message="No text message parsed from webhook")

    first_word = message_text.split()[0].capitalize() if message_text else ""
    action_taken = "Message processed"

    enquiry = None
    if enquiry_id:
        enquiry = await db.get(Enquiry, enquiry_id)

    # KEYWORD 1: CONFIRM
    if first_word == "Confirm":
        if enquiry:
            enquiry.status = "Confirmed"
            await db.commit()
            
            # Trigger Google Calendar Event Creation
            await create_google_calendar_event(
                summary=f"Vedic {enquiry.enquiry_type}: {enquiry.category} with {enquiry.name}",
                description=f"Confirmed enquiry #{enquiry.id}. Notes: {enquiry.additional_notes or 'N/A'}",
                location=f"{enquiry.city or 'Bengaluru'}",
                start_time="2026-08-10T10:00:00+05:30",
                end_time="2026-08-10T11:30:00+05:30",
                attendee_emails=[enquiry.email, "pradeep@vedabrahma.com"]
            )
            
            # Trigger WhatsApp Message to Visitor
            await send_whatsapp_message(
                to_phone=enquiry.mobile,
                text=f"Hari Om {enquiry.name}! Your request for '{enquiry.category}' has been CONFIRMED by Shri Pradeep Nadig. Calendar invitation has been dispatched."
            )
            action_taken = "Confirmed enquiry, created Calendar event & notified visitor"
        else:
            action_taken = "Keyword 'Confirm' detected"

    # KEYWORD 2: REJECT
    elif first_word in ["Reject", "Declined"]:
        if enquiry:
            enquiry.status = "Rejected"
            await db.commit()
            
            await send_whatsapp_message(
                to_phone=enquiry.mobile,
                text=f"Hari Om {enquiry.name}. Regarding your request for '{enquiry.category}', Shri Pradeep is currently unavailable for the requested slot. Thank you."
            )
            action_taken = "Rejected enquiry & sent polite notification to visitor"
        else:
            action_taken = "Keyword 'Reject' detected"

    # KEYWORD 3: CONTACT MANUALLY
    elif "Contact" in first_word or "Contact Manually" in message_text:
        if enquiry:
            enquiry.status = "Contacted"
            await db.commit()
            
            await send_whatsapp_message(
                to_phone=enquiry.mobile,
                text=f"Hari Om {enquiry.name}! Shri Pradeep Nadig will contact you directly on {enquiry.mobile} shortly regarding '{enquiry.category}'."
            )
            action_taken = "Set status to Contacted & sent manual contact notification"
        else:
            action_taken = "Keyword 'Contact Manually' detected"

    # DEFAULT: TEXT FORWARDING
    else:
        if enquiry:
            await send_whatsapp_message(
                to_phone=enquiry.mobile,
                text=f"Message from Shri Pradeep: {message_text}"
            )
            action_taken = f"Forwarded admin reply to visitor: {message_text}"

    return MessageResponse(
        message=f"WhatsApp webhook processed successfully. Action: {action_taken}. Received: '{message_text}'"
    )
