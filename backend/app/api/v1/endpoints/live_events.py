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
    category: Optional[str] = "Live Stream"  # Live Stream | Event Management
    venue_address: Optional[str] = None
    stream_url: Optional[str] = None
    price: float
    has_payment: bool = True
    payment_mode: str = "RAZORPAY"
    custom_payment_link: Optional[str] = None
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
        "category": "Live Stream",
        "short_description": "Join the sacred all-night live stream of 4 Prahara Maha Rudrabhishekam, Bilvarchana, and continuous Vedic chanting dedicated to Lord Shiva.",
        "full_description": "Mahashivaratri is the most auspicious night of spiritual awakening and divine grace. Shri Pradeep Nadig along with esteemed Vedic Ghanapathis will perform continuous 4 Prahara rituals from dusk till dawn.",
        "event_date": "2026-02-15",
        "event_time": "06:00 PM - 06:00 AM IST (All Night)",
        "venue_type": "In-Person & Live Stream",
        "venue_address": "Shaankari Creations Ashram, Asharaya layout, K.G.Vaderahalli, Bengaluru",
        "stream_url": "https://youtube.com/live/mahashivaratri-2026-pradeep-nadig",
        "price": 0,
        "has_payment": False,
        "payment_mode": "FREE",
        "custom_payment_link": None,
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
        "category": "Live Stream",
        "short_description": "Experience the monumental Maha Chandi Yajna and 700 Sloka Durga Saptashati Parayana performed live during Sharada Navratri.",
        "full_description": "Maha Chandi Homa is the ultimate Vedic yajna for overcoming obstacles and invoking Divine Mother Chandika's supreme blessings.",
        "event_date": "2026-10-18",
        "event_time": "07:30 AM - 01:30 PM IST",
        "venue_type": "In-Person & Live Stream",
        "venue_address": "Asharaya layout, K.G.Vaderahalli, Bengaluru",
        "stream_url": "https://youtube.com/live/chandi-homa-navratri-2026",
        "price": 1100,
        "has_payment": True,
        "payment_mode": "RAZORPAY",
        "custom_payment_link": None,
        "cover_image": "/images/live-events/navratri-chandi-homa-live.jpg",
        "featured": True,
        "status": "Upcoming",
        "pandits_count": 9,
        "agenda": [
            {"time": "07:30 AM - 08:30 AM", "title": "Maha Ganapathi Pooja & Navakshari Japa", "description": "Opening invocation and consecration."}
        ]
    },
    {
        "id": 101,
        "title": "Marriage / Maduve (Vedic Vivaha Ceremony)",
        "slug": "marriage-maduve",
        "category": "Event Management",
        "short_description": "Complete authentic Vedic Vivaha event management including Purohit panel, Mandap Mandala setup, Kanyadaana & Saptapadi rites.",
        "full_description": "Comprehensive Vedic Marriage event management. We handle end-to-end ritual execution, learned Ghanapathi priests, Yajnashala construction, and Vedic mantras as per your family tradition (Ashvalayana, Apastamba, or Bodhayana Sutra).",
        "event_date": "On Request",
        "event_time": "Custom Muhoortha",
        "venue_type": "Client Venue / Kalyana Mantapa",
        "venue_address": "Bengaluru & Across India",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/marriage-maduve.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 5,
        "agenda": [
            {"time": "Phase 1", "title": "Nandi Pooja & Varakatana", "description": "Inaugural ancestral seeking and groom reception."},
            {"time": "Phase 2", "title": "Kanyadaana & Mangalya Dharana", "description": "Sacred tying of Mangalsutra and Vedic blessing."},
            {"time": "Phase 3", "title": "Saptapadi & Laja Homa", "description": "Seven sacred steps around Agni deva and rice offerings."}
        ]
    },
    {
        "id": 102,
        "title": "Threading Ceremony / Upanayana (Munjvi)",
        "slug": "threading-ceremony-upanayana",
        "category": "Event Management",
        "short_description": "Sacred Thread initiation ceremony with Brahmopadesha, Gayatri Mantra initiation, & Complete Veda Vrata rituals.",
        "full_description": "End-to-end Upanayana ceremony management conducted by learned Vedic scholars. Includes Yajnashala arrangement, Agnikarya, Gayatri Mantropadesha, Bhikshacharana, and traditional blessing orchestration.",
        "event_date": "On Request",
        "event_time": "Morning Muhoortha",
        "venue_type": "Client Home / Hall",
        "venue_address": "Bengaluru & Pan-India",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/upanayana-threading.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 3,
        "agenda": [
            {"time": "Morning", "title": "Choodakarana & Yajnopavita Dharana", "description": "Purification, sacred thread investiture."},
            {"time": "Mid-Day", "title": "Brahmopadesha", "description": "Gayatri Mantra initiation by Father/Guru under sacred cloth."},
            {"time": "Afternoon", "title": "Bhikshacharana & Medha Janana", "description": "First alms collection and prayer for supreme intellect."}
        ]
    },
    {
        "id": 103,
        "title": "Garbha Sanskaar / Garbha Sanskaara",
        "slug": "garbha-sanskaar",
        "category": "Event Management",
        "short_description": "Holistic Vedic prenatal guidance rituals, Garbha Raksha Sookta parayana, and positive fetal mental impression ceremony.",
        "full_description": "Specialized Vedic spiritual guidance and rituals during pregnancy. Includes Garbha Raksha Stotra parayana, specialized homa for maternal & fetal health, dietary alignment, and Vedic sound meditation for the expectant mother.",
        "event_date": "On Request",
        "event_time": "Auspicious Tithi",
        "venue_type": "Client Home / Virtual",
        "venue_address": "Client Residence",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/garbha-sanskaar.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 2,
        "agenda": [
            {"time": "Session 1", "title": "Garbha Raksha Sookta Parayana", "description": "Chanting of protective mantras for healthy pregnancy."},
            {"time": "Session 2", "title": "Sanctified Mantras & Meditation", "description": "Sound therapy and positive spiritual impressions for the baby."}
        ]
    },
    {
        "id": 104,
        "title": "Naming Ceremony / Naamakarana",
        "slug": "naming-ceremony-naamakarana",
        "category": "Event Management",
        "short_description": "Authentic Vedic naming ritual for newborn infants, Janma Rashi calculation, and family benediction rites.",
        "full_description": "Sacred Namakarana ceremony performed on the 11th, 12th, or auspicious day after childbirth. Includes Janma Nakshatra analysis, sacred ear-whispering of the name, Puja of the 10 Dikpalakas, and cradle blessings.",
        "event_date": "On Request",
        "event_time": "Morning Hours",
        "venue_type": "Client Home / Party Hall",
        "venue_address": "Bengaluru & Outstation",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/naming-ceremony-naamakarana.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 2,
        "agenda": [
            {"time": "Part 1", "title": "Punya Havachana & Kula Devata Pooja", "description": "House purification and family deity invocation."},
            {"time": "Part 2", "title": "Namakarana Vidhi", "description": "Whispering sacred name in baby's right ear and honey touching rite."}
        ]
    },
    {
        "id": 105,
        "title": "Baby Shower / Seemantha (Seemanthonnayanam)",
        "slug": "baby-shower-seemantha",
        "category": "Event Management",
        "short_description": "Traditional Vedic Seemantha ritual for expectant mothers, Udaka Shanti, and auspicious family celebrations.",
        "full_description": "Auspicious 7th or 8th month pregnancy ceremony (Seemanthonnayanam). Includes Udaka Shanti mantras, Vishnu Sahasranama parayana, mother's adornment, ritual blessing by elders, and full event coordination.",
        "event_date": "On Request",
        "event_time": "Auspicious Muhoortha",
        "venue_type": "Client Home / Convention Hall",
        "venue_address": "Bengaluru & Nearby Cities",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/baby-shower-seemantha.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 3,
        "agenda": [
            {"time": "Morning", "title": "Udaka Shanti & Kalasha Sthapana", "description": "Sanctification of water and protective Vedic recitation."},
            {"time": "Mid-Day", "title": "Seemantha Vidhi & Elder Blessings", "description": "Parting of hair ritual with sanctified porcupine quill/rose, followed by feast."}
        ]
    },
    {
        "id": 106,
        "title": "Gabhadaan / Gabhadaana Samskara",
        "slug": "gabhadaan-gabhadaana",
        "category": "Event Management",
        "short_description": "First Samskara of Vedic tradition for spiritual, mental, and physical sanctification before conception.",
        "full_description": "The foundational first Samskara in Hindu tradition performed for newly married couples desiring virtuous, healthy, and enlightened offspring. Conducted with absolute privacy, sanctity, and authentic Vedic mantras.",
        "event_date": "On Request",
        "event_time": "Private Auspicious Time",
        "venue_type": "Client Residence",
        "venue_address": "Private Setup",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/gabhadaan-gabhadaana.jpg",
        "featured": False,
        "status": "Available",
        "pandits_count": 1,
        "agenda": [
            {"time": "Evening", "title": "Prajapati & Garbha Homa", "description": "Sacred fire invocation seeking blessings for noble lineage."}
        ]
    },
    {
        "id": 107,
        "title": "First Haircut Ceremony / Chowla (Choodakarana)",
        "slug": "first-haircut-ceremony-chowla",
        "category": "Event Management",
        "short_description": "First tonsure ceremony for child's longevity, health, and intellectual enhancement with Ayushya Homa.",
        "full_description": "Choodakarana Samskara conducted in the 1st or 3rd year of the child. Includes Ayushya Homa, Navagraha Pooja, traditional tonsure ritual coordination, and sanctified bathing.",
        "event_date": "On Request",
        "event_time": "Morning Hours",
        "venue_type": "Home / Temple / Event Hall",
        "venue_address": "Bengaluru & Outstation",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/chowla-haircut.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 2,
        "agenda": [
            {"time": "Part 1", "title": "Ayushya Homa", "description": "Fire ritual invoking longevity and robust health for the child."},
            {"time": "Part 2", "title": "Chowla Vidhi", "description": "Sacred first hair removal with ritual mantras and curd/butter application."}
        ]
    },
    {
        "id": 108,
        "title": "House Warming Ceremony / Griha Pravesha",
        "slug": "house-warming-griha-pravesha",
        "category": "Event Management",
        "short_description": "Complete Griha Pravesha event management: Vastu Shanti, Navagraha Homa, Lakshmi Pooja, and milk boiling ritual.",
        "full_description": "Comprehensive Griha Pravesha ceremony management for new homes or apartments. Includes Vastu Purusha Pooja, Ganapathi & Navagraha Homa, Threshold Entrance rites, Ksheera Ubaluvudhu (milk boiling rite), and complete event coordination.",
        "event_date": "On Request",
        "event_time": "Brahma Muhoortha / Early Morning",
        "venue_type": "New Home Residence",
        "venue_address": "Client Residence",
        "stream_url": None,
        "price": 0,
        "has_payment": False,
        "payment_mode": "CUSTOM_LINK",
        "custom_payment_link": None,
        "cover_image": "/images/services/griha-pravesha.jpg",
        "featured": True,
        "status": "Available",
        "pandits_count": 4,
        "agenda": [
            {"time": "Dawn", "title": "Dwara Pooja & Gau Pravesha", "description": "Threshold ritual and sacred cow entrance into the new house."},
            {"time": "Morning", "title": "Vastu Shanti & Navagraha Homa", "description": "Purifying directional energies and planetary offerings in Homa Kunda."},
            {"time": "Mid-Morning", "title": "Lakshmi Pooja & Ksheera Paaka", "description": "Prosperity invocation and ceremonial milk boiling."}
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

@router.post("", response_model=LiveEventSchema)
def create_live_event(payload: dict):
    new_id = max([e["id"] for e in LIVE_EVENTS_DATA], default=0) + 1
    payload["id"] = new_id
    LIVE_EVENTS_DATA.append(payload)
    return payload

@router.put("/{event_id}", response_model=LiveEventSchema)
def update_live_event(event_id: int, payload: dict):
    for idx, e in enumerate(LIVE_EVENTS_DATA):
        if e["id"] == event_id:
            payload["id"] = event_id
            LIVE_EVENTS_DATA[idx] = payload
            return payload
    payload["id"] = event_id
    LIVE_EVENTS_DATA.append(payload)
    return payload

@router.delete("/{event_id}")
def delete_live_event(event_id: int):
    global LIVE_EVENTS_DATA
    LIVE_EVENTS_DATA = [e for e in LIVE_EVENTS_DATA if e["id"] != event_id]
    return {"message": "Live Event deleted successfully"}

@router.post("/{event_id}/register")
def register_live_event(event_id: int, payload: dict):
    return {"registration_id": 201, "message": "Sankalpa registration successful"}
