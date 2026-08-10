from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.models import Request as RequestModel, WorkshopRegistration, WorkshopBatch, Workshop, MessageLog
from app.core.security import verify_supabase_token
from app.services.calendar_service import (
    check_google_calendar_status,
    create_google_calendar_event
)
from app.services.whatsapp import send_whatsapp_message

router = APIRouter()


@router.get("/status")
async def get_calendar_status(
    auth: dict = Depends(verify_supabase_token)
):
    """
    Admin endpoint to verify Google Calendar API credentials & connection status.
    """
    status_info = await check_google_calendar_status()
    return status_info


@router.post("/sync-request/{request_id_str}")
async def sync_request_to_calendar(
    request_id_str: str,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Admin endpoint to manually trigger server-side Google Calendar event creation for a specific request thread
    and send a WhatsApp notification to the user.
    """
    res = await db.execute(
        select(RequestModel)
        .options(selectinload(RequestModel.customer))
        .where(RequestModel.request_id == request_id_str)
    )
    req = res.scalar_one_or_none()

    if not req:
        raise HTTPException(status_code=404, detail=f"Request '{request_id_str}' not found")

    cust = req.customer
    c_date = req.selected_date or req.preferred_date or "2026-08-10"
    c_time = req.selected_time or req.preferred_time or "10:00 AM"
    loc_str = req.city or "Bengaluru, Karnataka, India"
    item_lbl = req.service_name or req.workshop_name or req.request_type

    result = await create_google_calendar_event(
        summary=f"[Confirmed] {req.request_type}: {item_lbl} - {cust.name if cust else 'Client'}",
        description=f"Veda Brahma Shri Pradeep Nadig Booking\n\nClient: {cust.name if cust else 'Client'}\nPhone: +{cust.phone if cust else ''}\nEmail: {cust.email if cust else 'N/A'}\nRequest ID: {req.request_id}\nNotes: {req.notes or 'None'}",
        location=loc_str,
        start_time=c_date,
        end_time=c_date,
        attendee_emails=[cust.email] if (cust and cust.email) else [],
        create_meet_link=True if "consult" in req.request_type.lower() else False
    )

    if cust:
        meet_link = result.get("meet_link")
        gcal_link = result.get("html_link")

        wa_text = (
            f"🙏 Namaste {cust.name},\n\n"
            f"Your appointment schedule has been added to the calendar!\n\n"
            f"📋 Request ID: {req.request_id}\n"
            f"🌸 Service: {item_lbl}\n"
            f"📅 Date: {c_date}\n"
            f"⏰ Time Slot: {c_time}\n"
            f"📍 Location: {loc_str}\n"
        )
        if meet_link:
            wa_text += f"🎥 Online Join Link: {meet_link}\n"
        if gcal_link:
            wa_text += f"📅 Calendar Invitation: {gcal_link}\n"

        wa_text += "\nWe look forward to serving you.\n— Veda Brahma Shri Pradeep Nadig"

        try:
            await send_whatsapp_message(to_phone=cust.phone, text=wa_text)
            print(f"[WhatsApp Calendar Sync Notification Sent] Phone: {cust.phone}")
        except Exception as wa_err:
            print(f"[WhatsApp Calendar Sync Notification Error]: {wa_err}")

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="OUTBOUND",
            channel="WHATSAPP",
            message_type="GCAL_SYNC_NOTIF",
            message_content=wa_text,
            action_id=f"req:{req.request_id}:GCAL_NOTIF"
        )
        db.add(log)
        await db.commit()

    return result


@router.post("/sync-registration/{registration_id}")
async def sync_registration_to_calendar(
    registration_id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    """
    Admin endpoint to manually trigger server-side Google Calendar event creation for a workshop registration
    and send a WhatsApp notification to the participant.
    """
    reg = await db.get(WorkshopRegistration, registration_id)
    if not reg:
        raise HTTPException(status_code=404, detail=f"Registration #{registration_id} not found")

    workshop_title = "Vedic Workshop"
    if reg.workshop_id:
        w_obj = await db.get(Workshop, reg.workshop_id)
        if w_obj and w_obj.title:
            workshop_title = w_obj.title

    reg_date = "Workshop Date"
    if reg.batch_id:
        batch_obj = await db.get(WorkshopBatch, reg.batch_id)
        if batch_obj and batch_obj.start_time:
            reg_date = batch_obj.start_time

    loc_str = f"{reg.city}, {reg.state}"

    result = await create_google_calendar_event(
        summary=f"[Workshop Participant] {workshop_title} - {reg.name}",
        description=f"Participant: {reg.name}\nPhone: +{reg.mobile}\nEmail: {reg.email or 'N/A'}\nRegistration ID: #{reg.id}\nAmount: ₹{reg.amount}",
        location=loc_str,
        start_time=reg_date,
        end_time=reg_date,
        attendee_emails=[reg.email] if reg.email else [],
        create_meet_link=False
    )

    gcal_link = result.get("html_link")
    wa_text = (
        f"🙏 Namaste {reg.name},\n\n"
        f"Your workshop schedule has been added to the official calendar!\n\n"
        f"🌸 Workshop: {workshop_title}\n"
        f"📋 Registration ID: #{reg.id}\n"
        f"📅 Date & Time: {reg_date}\n"
        f"📍 Location: {loc_str}\n"
    )
    if gcal_link:
        wa_text += f"📅 Calendar Invitation: {gcal_link}\n"

    wa_text += "\nWe look forward to welcoming you to the session.\n— Veda Brahma Shri Pradeep Nadig"

    try:
        await send_whatsapp_message(to_phone=reg.mobile, text=wa_text)
        print(f"[WhatsApp Workshop Calendar Sync Notification Sent] Phone: {reg.mobile}")
    except Exception as wa_err:
        print(f"[WhatsApp Workshop Calendar Sync Notification Error]: {wa_err}")

    return result

