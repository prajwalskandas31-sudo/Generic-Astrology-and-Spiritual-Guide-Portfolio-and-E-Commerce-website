import datetime
from typing import Optional, List, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models.models import Customer, Request, MessageLog, Offering, Workshop, Enquiry
from app.services.whatsapp import send_whatsapp_message, send_whatsapp_buttons, send_whatsapp_list

def validate_status_transition(current_status: str, new_status: str) -> bool:
    """
    Validates state machine transitions to prevent invalid actions.
    E.g. CANCELLED, REJECTED, COMPLETED requests cannot be directly CONFIRMED.
    """
    curr = current_status.upper()
    nxt = new_status.upper()

    if curr == nxt:
        return True

    # Terminal or inactive states
    if curr in ["CANCELLED", "REJECTED", "COMPLETED"]:
        if nxt in ["CONFIRMED", "PENDING", "RESCHEDULE_REQUESTED"]:
            return False

    return True


async def generate_request_id(request_type: str, db: AsyncSession) -> str:
    """
    Generates deterministic Request ID format: TYPE-YYYY-NNNNN
    Examples: CONSULT-2026-00427, SERVICE-2026-00428, WORKSHOP-2026-00429
    """
    r_type = request_type.upper().strip()
    if "CONSULT" in r_type:
        prefix = "CONSULT"
    elif "SERVICE" in r_type:
        prefix = "SERVICE"
    elif "WORKSHOP" in r_type:
        prefix = "WORKSHOP"
    elif "CLASS" in r_type:
        prefix = "CLASS"
    else:
        prefix = "REQ"

    year = datetime.datetime.utcnow().year
    pattern = f"{prefix}-{year}-%"

    result = await db.execute(
        select(Request.request_id).where(Request.request_id.like(pattern)).order_by(Request.id.desc()).limit(1)
    )
    last_id = result.scalar_one_or_none()

    if last_id:
        try:
            num_part = int(last_id.split("-")[-1])
            next_num = num_part + 1
        except Exception:
            next_num = 1
    else:
        next_num = 1

    return f"{prefix}-{year}-{next_num:05d}"


async def get_or_create_customer(
    phone: str,
    name: str,
    email: Optional[str] = None,
    language: str = "English",
    db: AsyncSession = None
) -> Customer:
    """
    Finds existing customer by phone number or creates a new customer record.
    """
    clean_phone = phone.replace("+", "").replace(" ", "").replace("-", "").strip()

    res = await db.execute(select(Customer).where(Customer.phone == clean_phone))
    customer = res.scalar_one_or_none()

    if customer:
        updated = False
        if name and customer.name != name:
            customer.name = name
            updated = True
        if email and customer.email != email:
            customer.email = email
            updated = True
        if language and customer.preferred_language != language:
            customer.preferred_language = language
            updated = True
        if updated:
            customer.updated_at = datetime.datetime.utcnow()
            await db.commit()
            await db.refresh(customer)
        return customer

    # Create new customer
    count_res = await db.execute(select(Customer))
    total_cust = len(count_res.scalars().all())
    cust_code = f"CUST-{datetime.datetime.utcnow().year}-{total_cust + 1:05d}"

    customer = Customer(
        customer_id=cust_code,
        name=name.strip() if name else "Valued Client",
        phone=clean_phone,
        email=email.strip() if email else None,
        preferred_language=language
    )
    db.add(customer)
    await db.commit()
    await db.refresh(customer)
    return customer


async def create_request(
    request_type: str,
    name: str,
    phone: str,
    email: Optional[str] = None,
    offering_id: Optional[int] = None,
    workshop_id: Optional[int] = None,
    batch_id: Optional[int] = None,
    service_name: Optional[str] = None,
    workshop_name: Optional[str] = None,
    preferred_date: Optional[str] = None,
    preferred_time: Optional[str] = None,
    language: str = "English",
    notes: Optional[str] = None,
    address: Optional[str] = None,
    city: Optional[str] = None,
    state: Optional[str] = None,
    pin_code: Optional[str] = None,
    amount: float = 0.0,
    payment_status: str = "Pending",
    razorpay_order_id: Optional[str] = None,
    send_whatsapp: bool = True,
    db: AsyncSession = None
) -> Request:
    """
    Step 1: Validate & Get/Create Customer
    Step 2: Generate unique Request ID
    Step 3: Save Request record
    Step 4: Log initial message
    Step 5: Send WhatsApp confirmation with interactive buttons (optional)
    """
    customer = await get_or_create_customer(
        phone=phone,
        name=name,
        email=email,
        language=language,
        db=db
    )

    req_id = await generate_request_id(request_type, db)

    item_name = service_name or workshop_name or request_type

    req_obj = Request(
        request_id=req_id,
        customer_id=customer.id,
        request_type=request_type,
        offering_id=offering_id,
        workshop_id=workshop_id,
        batch_id=batch_id,
        service_name=service_name,
        workshop_name=workshop_name,
        preferred_date=preferred_date,
        preferred_time=preferred_time,
        language=language,
        notes=notes,
        address=address,
        city=city,
        state=state,
        pin_code=pin_code,
        amount=amount,
        payment_status=payment_status,
        razorpay_order_id=razorpay_order_id,
        status="NEW"
    )
    db.add(req_obj)
    await db.commit()
    await db.refresh(req_obj)

    # Initial WhatsApp Message Content
    body_text = (
        f"🙏 Namaste {customer.name},\n\n"
        f"Your {request_type.lower()} request has been received successfully.\n\n"
        f"📋 Request ID: {req_id}\n"
        f"🌸 Service: {item_name}\n"
        f"📅 Preferred Date: {preferred_date or 'To be confirmed'}\n"
        f"⏰ Preferred Time: {preferred_time or 'To be confirmed'}\n\n"
        f"We will review your request and confirm it shortly."
    )

    # Log initial message
    msg_log = MessageLog(
        request_id=req_obj.id,
        customer_id=customer.id,
        direction="OUTBOUND",
        channel="WHATSAPP",
        message_type="REQUEST_CREATED",
        message_content=body_text,
        action_id=f"req:{req_id}:INIT"
    )
    db.add(msg_log)
    await db.commit()

    # Dispatch WhatsApp Interactive Buttons if requested
    if send_whatsapp:
        buttons = [
            {"id": f"req:{req_id}:CONFIRM_REQUEST", "title": "CONFIRM"},
            {"id": f"req:{req_id}:CHANGE_REQUEST_TIME", "title": "CHANGE TIME"},
            {"id": f"req:{req_id}:CANCEL_REQUEST", "title": "CANCEL"}
        ]

        await send_whatsapp_buttons(
            to_phone=customer.phone,
            body_text=body_text,
            buttons=buttons,
            header_text="Veda Brahma Shri Pradeep Nadig"
        )

    # Reload with relations
    res = await db.execute(
        select(Request)
        .options(selectinload(Request.customer), selectinload(Request.message_logs))
        .where(Request.id == req_obj.id)
    )
    return res.scalar_one()


async def execute_request_action(
    request_id_str: str,
    action_name: str,
    action_payload: dict,
    db: AsyncSession,
    sender_channel: str = "ADMIN"
) -> Request:
    """
    Executes deterministic backend action for a specific Request.
    Actions: ACCEPT, CHANGE_TIME, REJECT, MARK_COMPLETED, ARCHIVE, SELECT_TIME, CANCEL_REQUEST, CONFIRM_REQUEST
    """
    res = await db.execute(
        select(Request)
        .options(selectinload(Request.customer), selectinload(Request.message_logs))
        .where(Request.request_id == request_id_str)
    )
    req = res.scalar_one_or_none()

    if not req:
        raise ValueError(f"Request '{request_id_str}' not found")

    cust = req.customer
    act = action_name.upper().strip()

    if act in ["ACCEPT", "CONFIRM_REQUEST", "ADMIN_ACCEPTED"]:
        if not validate_status_transition(req.status, "CONFIRMED"):
            raise ValueError(f"Cannot confirm request in current status '{req.status}'")

        req.status = "CONFIRMED"
        if action_payload.get("selected_date"):
            req.selected_date = action_payload.get("selected_date")
        if action_payload.get("selected_time"):
            req.selected_time = action_payload.get("selected_time")
        req.updated_at = datetime.datetime.utcnow()

        enq_res = await db.execute(
            select(Enquiry).where(Enquiry.mobile == cust.phone).order_by(Enquiry.id.desc())
        )
        for enq in enq_res.scalars().all():
            enq.status = "Confirmed"

        confirm_msg = (
            f"🙏 Namaste {cust.name},\n\n"
            f"Your {req.request_type.lower()} request has been CONFIRMED!\n\n"
            f"📋 Request ID: {req.request_id}\n"
            f"🌸 Service: {req.service_name or req.workshop_name or req.request_type}\n"
            f"📅 Date: {req.selected_date or req.preferred_date or 'As agreed'}\n"
            f"⏰ Time: {req.selected_time or req.preferred_time or 'As agreed'}\n\n"
            f"We look forward to serving you."
        )

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="OUTBOUND" if sender_channel == "ADMIN" else "INBOUND",
            channel=sender_channel,
            message_type="ADMIN_ACCEPTED" if sender_channel == "ADMIN" else "CUSTOMER_CONFIRMED",
            message_content=confirm_msg,
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

        # Send WhatsApp confirmation to client
        try:
            await send_whatsapp_message(to_phone=cust.phone, text=confirm_msg)
        except Exception as e:
            print(f"[WhatsApp Notice Warning]: {e}")

    elif act in ["CHANGE_TIME", "CHANGE_REQUEST_TIME", "RESCHEDULE_REQUESTED"]:
        if not validate_status_transition(req.status, "RESCHEDULE_REQUESTED"):
            raise ValueError(f"Cannot reschedule request in current status '{req.status}'")

        req.status = "RESCHEDULE_REQUESTED"
        req.updated_at = datetime.datetime.utcnow()

        reschedule_msg = (
            f"🙏 Namaste {cust.name},\n\n"
            f"Please select your preferred time for Request ID: {req.request_id}:"
        )

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="OUTBOUND",
            channel=sender_channel,
            message_type="RESCHEDULE_REQUESTED",
            message_content=reschedule_msg,
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

        # Send interactive time options
        time_buttons = [
            {"id": f"req:{req.request_id}:TIME_1000", "title": "10:00 AM"},
            {"id": f"req:{req.request_id}:TIME_1100", "title": "11:00 AM"},
            {"id": f"req:{req.request_id}:TIME_1200", "title": "12:00 PM"}
        ]
        try:
            await send_whatsapp_buttons(to_phone=cust.phone, body_text=reschedule_msg, buttons=time_buttons)
        except Exception as e:
            print(f"[WhatsApp Notice Warning]: {e}")

    elif act.startswith("TIME_") or act == "SELECT_TIME":
        raw_time = action_payload.get("selected_time")
        if not raw_time:
            if "TIME_1000" in act:
                raw_time = "10:00 AM"
            elif "TIME_1100" in act:
                raw_time = "11:00 AM"
            elif "TIME_1200" in act:
                raw_time = "12:00 PM"
            else:
                raw_time = "10:00 AM"

        req.selected_time = raw_time
        req.status = "PENDING"
        req.updated_at = datetime.datetime.utcnow()

        time_msg = (
            f"🙏 Namaste {cust.name},\n\n"
            f"Selected time updated to {raw_time} for Request ID: {req.request_id}.\n"
            f"We will confirm your updated slot shortly."
        )

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="INBOUND" if sender_channel == "WHATSAPP" else "OUTBOUND",
            channel=sender_channel,
            message_type="TIME_SELECTED",
            message_content=time_msg,
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

        try:
            await send_whatsapp_message(to_phone=cust.phone, text=time_msg)
        except Exception as e:
            print(f"[WhatsApp Notice Warning]: {e}")

    elif act in ["REJECT", "REJECTED", "ADMIN_REJECTED"]:
        req.status = "REJECTED"
        req.updated_at = datetime.datetime.utcnow()

        reject_msg = (
            f"Hari Om {cust.name}.\n\n"
            f"Regarding your request {req.request_id} for '{req.service_name or req.workshop_name or req.request_type}', "
            f"Shri Pradeep Nadig is currently unavailable for the requested slot. Thank you."
        )

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="OUTBOUND",
            channel=sender_channel,
            message_type="ADMIN_REJECTED",
            message_content=reject_msg,
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

        try:
            await send_whatsapp_message(to_phone=cust.phone, text=reject_msg)
        except Exception as e:
            print(f"[WhatsApp Notice Warning]: {e}")

    elif act in ["CANCEL", "CANCEL_REQUEST", "CANCELLED"]:
        req.status = "CANCELLED"
        req.updated_at = datetime.datetime.utcnow()

        cancel_msg = f"Your request {req.request_id} has been cancelled."

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="INBOUND" if sender_channel == "WHATSAPP" else "OUTBOUND",
            channel=sender_channel,
            message_type="CANCEL_REQUEST",
            message_content=cancel_msg,
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

        try:
            await send_whatsapp_message(to_phone=cust.phone, text=cancel_msg)
        except Exception as e:
            print(f"[WhatsApp Notice Warning]: {e}")

    elif act in ["MARK_COMPLETED", "COMPLETED"]:
        req.status = "COMPLETED"
        req.completed_at = datetime.datetime.utcnow()
        req.updated_at = datetime.datetime.utcnow()

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="OUTBOUND",
            channel=sender_channel,
            message_type="MARK_COMPLETED",
            message_content=f"Request {req.request_id} marked as COMPLETED by admin.",
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

    elif act in ["ARCHIVE", "ARCHIVED"]:
        req.status = "ARCHIVED"
        req.updated_at = datetime.datetime.utcnow()

        log = MessageLog(
            request_id=req.id,
            customer_id=cust.id,
            direction="OUTBOUND",
            channel=sender_channel,
            message_type="ARCHIVE",
            message_content=f"Request {req.request_id} archived by admin.",
            action_id=f"req:{req.request_id}:{act}"
        )
        db.add(log)
        await db.commit()

    # Re-fetch updated request
    res = await db.execute(
        select(Request)
        .options(selectinload(Request.customer), selectinload(Request.message_logs))
        .where(Request.request_id == request_id_str)
    )
    return res.scalar_one()
