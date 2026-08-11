from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any
import datetime

# --- Generic Response ---
class MessageResponse(BaseModel):
    message: str
    success: bool = True

# --- Offering Schemas ---
class OfferingBase(BaseModel):
    type: str  # Service | Consultation
    title: str
    slug: str
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    images: List[str] = []
    display_order: int = 0
    status: str = "Published"
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    who_benefits: Optional[str] = None
    where_performed: Optional[str] = None
    when_performed: Optional[str] = None
    who_should_attend: Optional[str] = None
    vidhi_details: Optional[str] = None
    faq: List[dict] = []

class OfferingCreate(OfferingBase):
    pass

class OfferingResponse(OfferingBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- Workshop Schemas ---
class WorkshopBatchBase(BaseModel):
    batch_name: str
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    capacity: int = 30
    remaining_seats: int = 30
    status: str = "Active"

class WorkshopBatchCreate(WorkshopBatchBase):
    pass

class WorkshopBatchResponse(WorkshopBatchBase):
    id: int
    workshop_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

class WorkshopBase(BaseModel):
    title: str
    slug: str
    cover_image: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    venue: Optional[str] = None
    address: Optional[str] = None
    google_maps_link: Optional[str] = None
    duration: Optional[str] = None
    price: float = 0.0
    has_payment: bool = True
    payment_mode: str = "RAZORPAY"
    custom_payment_link: Optional[str] = None
    capacity: int = 30
    registration_deadline: Optional[str] = None
    status: str = "Published"
    featured: bool = False
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class WorkshopCreate(WorkshopBase):
    batches: List[WorkshopBatchCreate] = []

class WorkshopResponse(WorkshopBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    batches: List[WorkshopBatchResponse] = []
    model_config = ConfigDict(from_attributes=True)

# --- Class Schemas ---
class ClassBase(BaseModel):
    name: str
    description: Optional[str] = None
    duration: Optional[str] = None
    suitable_for: Optional[str] = None
    mode: str = "Hybrid"
    status: str = "Active"

class ClassCreate(ClassBase):
    pass

class ClassResponse(ClassBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- Blog Schemas ---
class BlogBase(BaseModel):
    title: str
    slug: str
    cover_image: Optional[str] = None
    author: str = "Veda Brahma Shri Pradeep Nadig"
    publish_date: Optional[str] = None
    category: Optional[str] = None
    tags: List[str] = []
    content: str
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class BlogCreate(BlogBase):
    pass

class BlogResponse(BlogBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- Gallery Schemas ---
class GalleryItemBase(BaseModel):
    album_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    media_url: str
    media_type: str = "Image"
    category: Optional[str] = None
    display_order: int = 0

class GalleryItemCreate(GalleryItemBase):
    pass

class GalleryItemResponse(GalleryItemBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

class GalleryAlbumBase(BaseModel):
    title: str
    description: Optional[str] = None
    display_order: int = 0

class GalleryAlbumCreate(GalleryAlbumBase):
    pass

class GalleryAlbumResponse(GalleryAlbumBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    items: List[GalleryItemResponse] = []
    model_config = ConfigDict(from_attributes=True)

# --- Media Library Schemas ---
class MediaItemCreate(BaseModel):
    filename: str
    file_url: str
    file_type: Optional[str] = None
    file_size: int = 0
    alt_text: Optional[str] = None

class MediaItemResponse(MediaItemCreate):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- FAQ Schemas ---
class FAQBase(BaseModel):
    question: str
    answer: str
    category: Optional[str] = None
    display_order: int = 0

class FAQCreate(FAQBase):
    pass

class FAQResponse(FAQBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- Enquiry Schemas ---
class EnquiryCreate(BaseModel):
    enquiry_type: str  # Service | Consultation | Class Enquiry
    name: str
    mobile: str
    email: Optional[str] = None
    city: Optional[str] = None
    category: Optional[str] = None
    additional_notes: Optional[str] = None

class EnquiryResponse(EnquiryCreate):
    id: int
    request_id: Optional[str] = None
    status: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

class EnquiryUpdateStatus(BaseModel):
    status: str

# --- Registration & Payment Schemas ---
class WorkshopRegisterRequest(BaseModel):
    batch_id: Optional[int] = None
    name: str
    mobile: str
    email: Optional[str] = None
    address: str  # Mandatory
    city: str
    state: str
    pin_code: str
    additional_notes: Optional[str] = None

class WorkshopBroadcastRequest(BaseModel):
    recipient_phones: List[str]
    message_text: str
    image_url: Optional[str] = None

class WorkshopRegisterResponse(BaseModel):
    registration_id: int
    request_id: Optional[str] = None
    razorpay_order_id: str
    amount: float
    currency: str = "INR"
    key_id: Optional[str] = None
    is_real_order: bool = False
    has_payment: bool = True
    payment_mode: str = "RAZORPAY"
    custom_payment_link: Optional[str] = None

class PaymentVerifyRequest(BaseModel):
    registration_id: int
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class WorkshopRegistrationResponse(BaseModel):
    id: int
    workshop_id: int
    batch_id: Optional[int] = None
    name: str
    mobile: str
    email: Optional[str] = None
    address: str
    city: str
    state: str
    pin_code: str
    payment_status: str
    amount: float
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    additional_notes: Optional[str] = None
    created_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- Customer & Request Schemas ---
class CustomerResponse(BaseModel):
    id: int
    customer_id: Optional[str] = None
    name: str
    phone: str
    email: Optional[str] = None
    preferred_language: str = "English"
    created_at: datetime.datetime
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

class MessageLogResponse(BaseModel):
    id: int
    message_id: Optional[str] = None
    request_id: Optional[int] = None
    customer_id: int
    direction: str
    channel: str
    message_type: str
    message_content: str
    action_id: Optional[str] = None
    timestamp: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

class RequestCreate(BaseModel):
    request_type: str  # Service | Consultation | Workshop | Class Enquiry
    name: str
    phone: str
    email: Optional[str] = None
    offering_id: Optional[int] = None
    workshop_id: Optional[int] = None
    batch_id: Optional[int] = None
    service_name: Optional[str] = None
    workshop_name: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    language: Optional[str] = "English"
    notes: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pin_code: Optional[str] = None

class RequestResponse(BaseModel):
    id: int
    request_id: str
    customer_id: int
    request_type: str
    offering_id: Optional[int] = None
    workshop_id: Optional[int] = None
    batch_id: Optional[int] = None
    service_name: Optional[str] = None
    workshop_name: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    selected_date: Optional[str] = None
    selected_time: Optional[str] = None
    language: Optional[str] = None
    notes: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pin_code: Optional[str] = None
    amount: float = 0.0
    payment_status: str
    status: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    completed_at: Optional[datetime.datetime] = None
    customer: Optional[CustomerResponse] = None
    message_logs: List[MessageLogResponse] = []
    model_config = ConfigDict(from_attributes=True)

class RequestActionRequest(BaseModel):
    action: str  # ACCEPT | CHANGE_TIME | REJECT | MARK_COMPLETED | ARCHIVE | SELECT_TIME
    selected_date: Optional[str] = None
    selected_time: Optional[str] = None
    reason: Optional[str] = None

# --- Settings Schema ---
class SettingUpdate(BaseModel):
    value: Any

class SettingResponse(BaseModel):
    key: str
    value: Any
    updated_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# --- Dashboard Stats ---
class DashboardStats(BaseModel):
    recent_enquiries: List[EnquiryResponse]
    upcoming_workshops: List[WorkshopResponse]
    recent_registrations: List[WorkshopRegistrationResponse]

