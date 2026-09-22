from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.services.requests_service import create_request
from app.core.config import settings
import uuid

router = APIRouter()

class SyllabusModule(BaseModel):
    title: str
    duration: Optional[str] = None
    topics: List[str]

class CourseSchema(BaseModel):
    id: int
    title: str
    slug: str
    short_description: str
    full_description: str
    instructor: str
    duration: str
    level: str
    mode: str
    price: float
    has_payment: bool = True
    payment_mode: str = "RAZORPAY"
    custom_payment_link: Optional[str] = None
    cover_image: str
    prerequisites: Optional[str] = None
    schedule: Optional[str] = None
    status: str = "Active"
    featured: bool = True
    syllabus_modules: List[SyllabusModule]

COURSES_DATA: List[dict] = [
    {
        "id": 1,
        "title": "Jyotish Praveena - Foundation in Vedic Astrology",
        "slug": "vedic-astrology-foundation",
        "short_description": "A comprehensive 12-week course mastering Janma Kundali analysis, Bhavas, Rasis, Grahas, Dasha systems, and Gochara transit interpretations.",
        "full_description": "Immerse yourself in authentic Vedic Astrology under the personal guidance of Veda Brahma Shri Pradeep Nadig. Designed for serious seekers, practitioners, and enthusiasts.",
        "instructor": "Veda Brahma Shri Pradeep Nadig",
        "duration": "12 Weeks (36 Live Hours)",
        "level": "Beginner",
        "mode": "Online Live",
        "price": 14999,
        "has_payment": True,
        "payment_mode": "RAZORPAY",
        "custom_payment_link": None,
        "cover_image": "/images/courses/vedic-astrology-foundation.jpg",
        "prerequisites": "Open to all enthusiasts; basic interest in Vedic tradition recommended.",
        "schedule": "Every Saturday & Sunday, 7:00 AM - 8:30 AM IST",
        "status": "Active",
        "featured": True,
        "syllabus_modules": [
            {
                "title": "Module 1: Fundamentals of Parashari Astrology",
                "duration": "Weeks 1-3",
                "topics": [
                    "Introduction to Jyotish Vedanga & Astronomical Foundations",
                    "The 12 Rasis (Zodiac Signs), Elements, and Gunas",
                    "The 9 Grahas (Planets): Karakatvas, Dignities & Combustion",
                    "The 27 Nakshatras: Deities, Stars & Pada Divisions"
                ]
            },
            {
                "title": "Module 2: Bhavas (Houses) & Chart Construction",
                "duration": "Weeks 4-6",
                "topics": [
                    "Understanding the 12 Bhavas & Life Dimensions",
                    "Kendra, Trikona, Dusthana, and Upachaya Houses",
                    "Ascendant (Lagna) determination & House Lordships",
                    "Planetary Drishti (Aspects) and Conjunction Effects"
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "Sacred Vedic Chanting & Swara Shuddhi Mastery",
        "slug": "sacred-vedic-chanting-mastery",
        "short_description": "Master authentic Veda Mantras with precise Udaatta, Anudaatta, and Svarita accents alongside deep esoteric Sukta meanings.",
        "full_description": "Vedic recitation requires exact phonetics (Shiksha Shastra) and intonation (Swara). Guided by Shri Pradeep Nadig.",
        "instructor": "Veda Brahma Shri Pradeep Nadig",
        "duration": "8 Weeks (24 Live Hours)",
        "level": "All Levels",
        "mode": "Online Live",
        "price": 9999,
        "has_payment": True,
        "payment_mode": "RAZORPAY",
        "custom_payment_link": None,
        "cover_image": "/images/courses/sacred-vedic-chanting-mastery.jpg",
        "prerequisites": "Basic familiarity with Sanskrit script or Devanagari transliteration.",
        "schedule": "Every Tuesday & Thursday, 6:30 PM - 8:00 PM IST",
        "status": "Active",
        "featured": True,
        "syllabus_modules": [
            {
                "title": "Module 1: Shiksha & Swara Shuddhi Fundamentals",
                "duration": "Weeks 1-2",
                "topics": [
                    "Vedic Phonetics (Sanskrit Varnamala & Articulation places)",
                    "Mastering the 3 primary Swaras: Udaatta, Anudaatta, Svarita",
                    "Pranayama & vocal technique for sustained Vedic recitation"
                ]
            }
        ]
    }
]

@router.get("", response_model=List[CourseSchema])
def list_courses():
    return COURSES_DATA

@router.get("/{slug}", response_model=CourseSchema)
def get_course(slug: str):
    for c in COURSES_DATA:
        if c["slug"] == slug:
            return c
    raise HTTPException(status_code=404, detail="Course not found")

@router.post("", response_model=CourseSchema)
def create_course(payload: dict):
    new_id = max([c["id"] for c in COURSES_DATA], default=0) + 1
    payload["id"] = new_id
    COURSES_DATA.append(payload)
    return payload

@router.put("/{course_id}", response_model=CourseSchema)
def update_course(course_id: int, payload: dict):
    for idx, c in enumerate(COURSES_DATA):
        if c["id"] == course_id:
            payload["id"] = course_id
            COURSES_DATA[idx] = payload
            return payload
    payload["id"] = course_id
    COURSES_DATA.append(payload)
    return payload

@router.delete("/{course_id}")
def delete_course(course_id: int):
    global COURSES_DATA
    COURSES_DATA = [c for c in COURSES_DATA if c["id"] != course_id]
    return {"message": "Course deleted successfully"}

@router.post("/{course_id}/register")
async def register_course(
    course_id: int,
    payload: dict,
    db: AsyncSession = Depends(get_db)
):
    course_title = f"Course #{course_id}"
    for c in COURSES_DATA:
        if c.get("id") == course_id:
            course_title = c.get("title", course_title)
            break

    amount = float(payload.get("amount", payload.get("price", 0)))
    is_paid = amount > 0
    payment_mode = payload.get("payment_mode", "RAZORPAY") if is_paid else "FREE"

    order_id = f"order_{uuid.uuid4().hex[:12]}"
    is_real_order = False
    rzp_key = settings.RAZORPAY_KEY_ID.strip() if settings.RAZORPAY_KEY_ID else None
    rzp_secret = settings.RAZORPAY_SECRET.strip() if settings.RAZORPAY_SECRET else None

    if is_paid and payment_mode == "RAZORPAY" and rzp_key and rzp_secret:
        try:
            import razorpay
            client = razorpay.Client(auth=(rzp_key, rzp_secret))
            order_data = {
                "amount": int(amount * 100),
                "currency": "INR",
                "receipt": f"crs_{uuid.uuid4().hex[:8]}",
                "notes": {
                    "course_id": str(course_id),
                    "course_title": course_title,
                    "customer_name": payload.get("name"),
                    "customer_mobile": payload.get("mobile")
                }
            }
            rzp_order = client.order.create(data=order_data)
            order_id = rzp_order.get("id", order_id)
            is_real_order = True
        except Exception as e:
            print(f"[Razorpay Course Order Creation Warning]: {e}")

    notes_parts = []
    if payload.get("preferred_batch"):
        notes_parts.append(f"Preferred Batch: {payload.get('preferred_batch')}")
    if payload.get("additional_notes"):
        notes_parts.append(payload.get("additional_notes"))
    combined_notes = " | ".join(notes_parts) if notes_parts else None

    req_obj = await create_request(
        request_type="Course",
        name=payload.get("name", "Student"),
        phone=payload.get("mobile", payload.get("phone", "")),
        email=payload.get("email"),
        service_name=course_title,
        notes=combined_notes,
        amount=amount if is_paid else 0.0,
        payment_status="Pending" if is_paid else "Paid",
        razorpay_order_id=order_id if is_paid else None,
        db=db
    )

    return {
        "registration_id": req_obj.id,
        "request_id": req_obj.request_id,
        "message": "Course enrollment received and stored successfully!",
        "razorpay_order_id": order_id if is_paid else None,
        "is_real_order": is_real_order,
        "key_id": rzp_key,
        "amount": int(amount * 100) if is_paid else 0
    }
