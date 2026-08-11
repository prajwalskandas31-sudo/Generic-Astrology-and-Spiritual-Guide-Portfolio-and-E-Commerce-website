from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel

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
        "cover_image": "/images/services/vedic-astrology-consultation.jpg",
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
        "cover_image": "/images/services/sundarakanda-parayana-pooja.jpg",
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

@router.post("/{course_id}/register")
def register_course(course_id: int, payload: dict):
    return {"registration_id": 101, "message": "Enrollment successful"}
