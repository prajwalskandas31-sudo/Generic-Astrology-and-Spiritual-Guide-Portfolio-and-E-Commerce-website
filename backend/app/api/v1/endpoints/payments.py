from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.models import WorkshopRegistration, WorkshopBatch, Workshop
from app.schemas.schemas import PaymentVerifyRequest, MessageResponse
import hmac
import hashlib
from app.core.config import settings

router = APIRouter()

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
    if settings.RAZORPAY_SECRET and settings.RAZORPAY_SECRET != "rzp_test_secret":
        generated_signature = hmac.new(
            settings.RAZORPAY_SECRET.encode(),
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
    
    await db.commit()
    return MessageResponse(message="Payment verification successful. Workshop registration confirmed!")
