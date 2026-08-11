from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class AgendaItem(BaseModel):
    time: str
    title: str
    description: str

class LiveEventSchema(BaseModel):
    id: int
    title: str
    slug: str
    short_description: str
    full_description: str
    event_date: str
    event_time: str
    venue_type: str
    venue_address: Optional[str] = None
    stream_url: Optional[str] = None
    price: float
    cover_image: str
    featured: bool = True
    status: str = "Upcoming"
    pandits_count: Optional[int] = 11
    agenda: List[AgendaItem]

LIVE_EVENTS_DATA: List[dict] = [
    {
        "id": 1,
        "title": "Mahashivaratri Grand Night 2026 - 4 Prahara Live Rituals",
        "slug": "mahashivaratri-grand-night-2026",
        "short_description": "Join the sacred all-night live stream of 4 Prahara Maha Rudrabhishekam, Bilvarchana, and continuous Vedic chanting dedicated to Lord Shiva.",
        "full_description": "Mahashivaratri is the most auspicious night of spiritual awakening and divine grace. Shri Pradeep Nadig along with esteemed Vedic Ghanapathis will perform continuous 4 Prahara rituals from dusk till dawn.",
        "event_date": "2026-02-15",
        "event_time": "06:00 PM - 06:00 AM IST (All Night)",
        "venue_type": "In-Person & Live Stream",
        "venue_address": "Shaankari Creations Ashram, Asharaya layout, K.G.Vaderahalli, Bengaluru",
        "stream_url": "https://youtube.com/live/mahashivaratri-2026-pradeep-nadig",
        "price": 0,
        "cover_image": "/images/live-events/mahashivaratri-grand-night-2026.jpg",
        "featured": True,
        "status": "Upcoming",
        "pandits_count": 11,
        "agenda": [
            {"time": "06:00 PM - 07:30 PM", "title": "1st Prahara: Ksheerabhishekam & Ganapathi Pooja", "description": "Invocational prayers and milk panchamrutha bathing."},
            {"time": "09:30 PM - 11:00 PM", "title": "2nd Prahara: Dahi & Madhu Abhishekam", "description": "Curd and honey sacred bathing with Rigvedic Sukta chants."}
        ]
    },
    {
        "id": 2,
        "title": "Sharada Navratri Chandi Homa & Saptashati Live Stream",
        "slug": "navratri-chandi-homa-live",
        "short_description": "Experience the monumental Maha Chandi Yajna and 700 Sloka Durga Saptashati Parayana performed live during Sharada Navratri.",
        "full_description": "Maha Chandi Homa is the ultimate Vedic yajna for overcoming obstacles and invoking Divine Mother Chandika's supreme blessings.",
        "event_date": "2026-10-18",
        "event_time": "07:30 AM - 01:30 PM IST",
        "venue_type": "In-Person & Live Stream",
        "venue_address": "Asharaya layout, K.G.Vaderahalli, Bengaluru",
        "stream_url": "https://youtube.com/live/chandi-homa-navratri-2026",
        "price": 1100,
        "cover_image": "/images/live-events/navratri-chandi-homa-live.jpg",
        "featured": True,
        "status": "Upcoming",
        "pandits_count": 9,
        "agenda": [
            {"time": "07:30 AM - 08:30 AM", "title": "Maha Ganapathi Pooja & Navakshari Japa", "description": "Opening invocation and consecration."}
        ]
    }
]

@router.get("", response_model=List[LiveEventSchema])
def list_live_events():
    return LIVE_EVENTS_DATA

@router.get("/{slug}", response_model=LiveEventSchema)
def get_live_event(slug: str):
    for e in LIVE_EVENTS_DATA:
        if e["slug"] == slug:
            return e
    raise HTTPException(status_code=404, detail="Live Event not found")

@router.post("/{event_id}/register")
def register_live_event(event_id: int, payload: dict):
    return {"registration_id": 201, "message": "Sankalpa registration successful"}
