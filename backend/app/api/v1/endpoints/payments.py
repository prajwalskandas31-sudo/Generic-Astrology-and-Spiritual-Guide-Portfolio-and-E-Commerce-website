from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.models import WorkshopRegistration, WorkshopBatch, Workshop
from app.schemas.schemas import PaymentVerifyRequest, MessageResponse
import hmac
import hashlib
from app.core.config import settings

from app.services.whatsapp import send_whatsapp_message

router = APIRouter()

from app.models.models import Request as RequestModel, MessageLog

@router.post("/verify", response_model=MessageResponse)
async def verify_payment(
    data: PaymentVerifyRequest,
    db: AsyncSession = Depends(get_db)
):
    registration = await db.get(WorkshopRegistration, data.registration_id)
    if not registration:
        raise HTTPException(status_code=404, detail="Registration record not found")
    
    if registration.payment_status == "Paid":
        return MessageResponse(message="Payment already verified and registration confirmed")

    # Verification check: If real credentials set, verify Razorpay HMAC signature
    rzp_secret = settings.RAZORPAY_SECRET.strip() if settings.RAZORPAY_SECRET else None
    if rzp_secret:
        generated_signature = hmac.new(
            rzp_secret.encode(),
            f"{data.razorpay_order_id}|{data.razorpay_payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()
        if generated_signature != data.razorpay_signature:
            registration.payment_status = "Failed"
            await db.commit()
            raise HTTPException(status_code=400, detail="Invalid Razorpay payment signature")
    
    # Signature valid! Update registration to Paid
    registration.payment_status = "Paid"
    registration.razorpay_payment_id = data.razorpay_payment_id
    registration.razorpay_signature = data.razorpay_signature
    
    # Decrement available seats in Workshop Batch
    if registration.batch_id:
        batch = await db.get(WorkshopBatch, registration.batch_id)
        if batch:
            batch.remaining_seats = max(0, batch.remaining_seats - 1)
            if batch.remaining_seats == 0:
                batch.status = "Full"
    
    # Update associated Request thread
    req_res = await db.execute(
        select(RequestModel).where(
            (RequestModel.razorpay_order_id == data.razorpay_order_id) |
            (RequestModel.workshop_id == registration.workshop_id)
        ).order_by(RequestModel.id.desc())
    )
    req_obj = req_res.scalars().first()

    if req_obj:
        req_obj.payment_status = "Paid"
        req_obj.razorpay_payment_id = data.razorpay_payment_id
        req_obj.razorpay_signature = data.razorpay_signature
        req_obj.status = "CONFIRMED"

        pay_log = MessageLog(
            request_id=req_obj.id,
            customer_id=req_obj.customer_id,
            direction="INBOUND",
            channel="ADMIN",
            message_type="PAYMENT_CONFIRMED",
            message_content=f"Payment of ₹{registration.amount} verified for {req_obj.request_id}. Payment ID: {data.razorpay_payment_id}",
            action_id=f"req:{req_obj.request_id}:PAYMENT"
        )
        db.add(pay_log)

    await db.commit()

    # Fetch Workshop details for accurate title
    workshop_title = "Vedic Workshop"
    if registration.workshop_id:
        w_obj = await db.get(Workshop, registration.workshop_id)
        if w_obj and w_obj.title:
            workshop_title = w_obj.title
    elif req_obj and req_obj.workshop_name:
        workshop_title = req_obj.workshop_name

    # Dispatch WhatsApp Confirmation Message to Participant
    confirm_text = (
        f"🙏 Namaste {registration.name},\n\n"
        f"Your workshop seat has been successfully confirmed!\n\n"
        f"🌸 Workshop: {workshop_title}\n"
        f"📋 Registration ID: #{registration.id}\n"
        f"💳 Amount Paid: ₹{registration.amount}\n"
        f"🔑 Payment Reference: {data.razorpay_payment_id}\n\n"
        f"We look forward to welcoming you to the session."
    )
    try:
        ws_res = await send_whatsapp_message(to_phone=registration.mobile, text=confirm_text)
        print(f"[WhatsApp Payment Confirmation Sent] Phone: {registration.mobile} | Res: {ws_res}")
    except Exception as e:
        print(f"[WhatsApp Confirmation Notice Error]: {e}")

    # Trigger Google Calendar Event Creation for Workshop Participant
    try:
        from app.services.calendar_service import create_google_calendar_event
        reg_loc = f"{registration.city}, {registration.state}"
        reg_date = "Workshop Batch Date"
        if registration.batch_id:
            batch_obj = await db.get(WorkshopBatch, registration.batch_id)
            if batch_obj and batch_obj.start_time:
                reg_date = batch_obj.start_time

        gcal_res = await create_google_calendar_event(
            summary=f"[Paid Participant] {workshop_title} - {registration.name}",
            description=f"Workshop Registration Details:\nParticipant: {registration.name}\nPhone: +{registration.mobile}\nEmail: {registration.email or 'N/A'}\nRegistration ID: #{registration.id}\nAmount Paid: ₹{registration.amount}\nPayment ID: {data.razorpay_payment_id}",
            location=reg_loc,
            start_time=reg_date,
            end_time=reg_date,
            attendee_emails=[registration.email] if registration.email else [],
            create_meet_link=False
        )
        print(f"[Google Calendar Workshop Auto-Sync Result]: {gcal_res}")

        gcal_link = gcal_res.get("html_link")
        if gcal_link:
            cal_msg = f"📅 Workshop Calendar Invitation:\n🌸 {workshop_title}\n🔗 View Calendar Event: {gcal_link}"
            try:
                await send_whatsapp_message(to_phone=registration.mobile, text=cal_msg)
            except Exception as werr:
                print(f"[WhatsApp Workshop Calendar Link Dispatch Error]: {werr}")
    except Exception as gerr:
        print(f"[Google Calendar Workshop Auto-Sync Notice]: {gerr}")


    return MessageResponse(message="Payment verification successful. Workshop registration confirmed!")


