from fastapi import APIRouter, Depends, Request, HTTPException, Query, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
import datetime

from app.db.session import get_db
from app.models.models import Customer, Request as RequestModel, MessageLog
from app.schemas.schemas import MessageResponse
from app.core.config import settings
from app.services.whatsapp import send_whatsapp_message, send_whatsapp_buttons, send_whatsapp_list
from app.services.requests_service import execute_request_action

router = APIRouter()

@router.get("/whatsapp")
async def verify_whatsapp_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    if hub_mode == "subscribe" and hub_verify_token == settings.WHATSAPP_VERIFY_TOKEN:
        return Response(content=str(hub_challenge), media_type="text/plain")
    raise HTTPException(status_code=403, detail="Verification token mismatch")


@router.post("/whatsapp", response_model=MessageResponse)
async def process_whatsapp_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    body = await request.json()
    
    wa_msg_id = None
    sender = ""
    message_text = ""
    interactive_action_id = None
    
    coexistence_field = None
    
    # Parse Meta WhatsApp Cloud API Structure
    if "entry" in body and len(body["entry"]) > 0:
        changes = body["entry"][0].get("changes", [])
        if changes and "value" in changes[0]:
            change_item = changes[0]
            field_name = change_item.get("field", "")
            val = change_item.get("value", {})

            # Check for Coexistence and System Events
            if field_name in ["history", "smb_app_state_sync", "smb_message_echoes", "account_update", "statuses", "security_code_notification"]:
                coexistence_field = field_name
                print(f"[WHATSAPP WEBHOOK COEXISTENCE EVENT] Field: '{field_name}' | Entry ID: {body['entry'][0].get('id')}")

            messages = val.get("messages", [])
            if messages:
                msg = messages[0]
                wa_msg_id = msg.get("id")
                sender = msg.get("from", "")
                m_type = msg.get("type", "")
                
                if m_type == "text":
                    message_text = msg.get("text", {}).get("body", "").strip()
                elif m_type == "interactive":
                    interactive_obj = msg.get("interactive", {})
                    i_type = interactive_obj.get("type")
                    if i_type == "button_reply":
                        interactive_action_id = interactive_obj.get("button_reply", {}).get("id")
                        message_text = interactive_obj.get("button_reply", {}).get("title", "")
                    elif i_type == "list_reply":
                        interactive_action_id = interactive_obj.get("list_reply", {}).get("id")
                        message_text = interactive_obj.get("list_reply", {}).get("title", "")

    # Fallback parsing for custom webhook payloads
    elif "message" in body or "action_id" in body:
        message_text = body.get("message", "").strip()
        sender = body.get("sender", body.get("from", ""))
        wa_msg_id = body.get("message_id", body.get("event_id"))
        interactive_action_id = body.get("action_id", body.get("button_id"))

    clean_sender = sender.replace("+", "").replace(" ", "").replace("-", "").strip()

    if coexistence_field and not clean_sender and not interactive_action_id:
        return MessageResponse(message=f"WhatsApp coexistence event '{coexistence_field}' acknowledged successfully")

    if not clean_sender and not interactive_action_id:
        return MessageResponse(message="No sender or valid message payload in webhook")

    # DUPLICATE PROTECTION: Check if message_id has already been processed
    if wa_msg_id:
        existing_log = await db.execute(
            select(MessageLog).where(MessageLog.message_id == wa_msg_id)
        )
        if existing_log.scalar_one_or_none():
            return MessageResponse(message=f"Duplicate event '{wa_msg_id}' ignored.")

    action_taken = "Processed"

    # SCENARIO 1: Interactive Button / List Click (Carries req:<request_id>:<action_name>)
    if interactive_action_id and interactive_action_id.startswith("req:"):
        parts = interactive_action_id.split(":")
        if len(parts) >= 3:
            req_id_str = parts[1]
            act_name = parts[2]
            
            try:
                updated_req = await execute_request_action(
                    request_id_str=req_id_str,
                    action_name=act_name,
                    action_payload={"selected_time": message_text if "TIME_" in act_name else None},
                    db=db,
                    sender_channel="WHATSAPP"
                )
                if wa_msg_id and updated_req:
                    btn_log = MessageLog(
                        request_id=updated_req.id,
                        customer_id=updated_req.customer_id,
                        direction="INBOUND",
                        channel="WHATSAPP",
                        message_type=f"BUTTON_REPLY_{act_name}",
                        message_content=message_text,
                        message_id=wa_msg_id,
                        action_id=interactive_action_id
                    )
                    db.add(btn_log)
                    await db.commit()

                action_taken = f"Executed interactive action '{act_name}' for Request '{req_id_str}'"
                return MessageResponse(message=f"Success: {action_taken}")
            except Exception as e:
                return MessageResponse(message=f"Action execution error: {str(e)}")

    # SCENARIO 2: Free-text WhatsApp Customer Reply
    if clean_sender:
        # Step A: Locate Customer
        cust_res = await db.execute(select(Customer).where(Customer.phone == clean_sender))
        customer = cust_res.scalar_one_or_none()

        if not customer:
            await send_whatsapp_message(
                to_phone=clean_sender,
                text="Hari Om! Thank you for reaching out to Veda Brahma Shri Pradeep Nadig. Please submit a request on our website to begin."
            )
            return MessageResponse(message="Unknown customer, sent greeting.")

        # Step B: Locate active requests for this customer
        req_res = await db.execute(
            select(RequestModel)
            .where(
                (RequestModel.customer_id == customer.id) &
                (RequestModel.status.in_(["NEW", "PENDING", "CONFIRMED", "RESCHEDULE_REQUESTED"]))
            )
            .order_by(RequestModel.id.desc())
        )
        active_requests = req_res.scalars().all()

        if len(active_requests) == 0:
            # No active requests
            await send_whatsapp_message(
                to_phone=clean_sender,
                text=f"Hari Om {customer.name}! We have received your message. You currently have no active requests. To book a consultation or workshop, please visit our website."
            )
            action_taken = "No active requests found, sent guidance message."

        elif len(active_requests) == 1:
            # Exactly 1 active request -> Associate message directly
            target_req = active_requests[0]
            
            first_word = message_text.split()[0].capitalize() if message_text else ""
            if first_word in ["Confirm", "Accepted"]:
                await execute_request_action(target_req.request_id, "CONFIRM_REQUEST", {}, db, sender_channel="WHATSAPP")
                action_taken = f"Confirmed active request {target_req.request_id}"
            elif first_word in ["Reject", "Cancel", "Declined"]:
                await execute_request_action(target_req.request_id, "CANCEL_REQUEST", {}, db, sender_channel="WHATSAPP")
                action_taken = f"Cancelled active request {target_req.request_id}"
            else:
                # Log inbound message against request
                log = MessageLog(
                    message_id=wa_msg_id,
                    request_id=target_req.id,
                    customer_id=customer.id,
                    direction="INBOUND",
                    channel="WHATSAPP",
                    message_type="FREE_TEXT_MESSAGE",
                    message_content=message_text,
                    action_id=f"req:{target_req.request_id}:TEXT"
                )
                db.add(log)
                await db.commit()
                
                await send_whatsapp_message(
                    to_phone=clean_sender,
                    text=f"Hari Om {customer.name}! Message received regarding Request {target_req.request_id}. We will get back to you shortly."
                )
                action_taken = f"Logged message against request {target_req.request_id}"

        else:
            # Multiple active requests -> Disambiguate without using AI!
            prompt_msg = (
                f"🙏 Hari Om {customer.name}!\n\n"
                f"We found multiple active requests for your mobile number.\n"
                f"Please tap below to select the request you are referring to:"
            )

            buttons = []
            for req_item in active_requests[:3]:  # WhatsApp max 3 buttons
                lbl = f"{req_item.request_type[:7]} {req_item.request_id[-5:]}"
                buttons.append({
                    "id": f"req:{req_item.request_id}:SELECT_REQ",
                    "title": lbl
                })

            # Log disambiguation prompt
            disambig_log = MessageLog(
                message_id=wa_msg_id,
                request_id=None,
                customer_id=customer.id,
                direction="OUTBOUND",
                channel="WHATSAPP",
                message_type="DISAMBIGUATION",
                message_content=prompt_msg,
                action_id="req:DISAMBIGUATE"
            )
            db.add(disambig_log)
            await db.commit()

            await send_whatsapp_buttons(
                to_phone=clean_sender,
                body_text=prompt_msg,
                buttons=buttons
            )
            action_taken = f"Sent interactive disambiguation menu for {len(active_requests)} active requests."

    return MessageResponse(message=f"WhatsApp webhook processed. Action: {action_taken}")
