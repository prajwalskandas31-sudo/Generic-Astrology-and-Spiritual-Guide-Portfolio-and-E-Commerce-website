import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

class Offering(Base):
    __tablename__ = "offerings"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), nullable=False, index=True)  # Service | Consultation
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    short_description = Column(Text, nullable=True)
    full_description = Column(Text, nullable=True)
    images = Column(JSON, default=list)  # List of image URLs from Media Library
    display_order = Column(Integer, default=0)
    status = Column(String(50), default="Published")  # Draft | Published | Archived
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(Text, nullable=True)
    faq = Column(JSON, default=list)  # List of {question, answer}
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class Workshop(Base):
    __tablename__ = "workshops"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    cover_image = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    start_date = Column(String(100), nullable=True)
    end_date = Column(String(100), nullable=True)
    venue = Column(String(255), nullable=True)
    address = Column(Text, nullable=True)
    google_maps_link = Column(String(500), nullable=True)
    duration = Column(String(100), nullable=True)
    price = Column(Float, default=0.0)
    capacity = Column(Integer, default=30)
    registration_deadline = Column(String(100), nullable=True)
    status = Column(String(50), default="Published")  # Draft | Published | Completed | Archived
    featured = Column(Boolean, default=False)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    batches = relationship("WorkshopBatch", back_populates="workshop", cascade="all, delete-orphan")
    registrations = relationship("WorkshopRegistration", back_populates="workshop")


class WorkshopBatch(Base):
    __tablename__ = "workshop_batches"

    id = Column(Integer, primary_key=True, index=True)
    workshop_id = Column(Integer, ForeignKey("workshops.id", ondelete="CASCADE"), nullable=False)
    batch_name = Column(String(255), nullable=False)
    start_time = Column(String(100), nullable=True)
    end_time = Column(String(100), nullable=True)
    capacity = Column(Integer, default=30)
    remaining_seats = Column(Integer, default=30)
    status = Column(String(50), default="Active")  # Active | Full | Closed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    workshop = relationship("Workshop", back_populates="batches")
    registrations = relationship("WorkshopRegistration", back_populates="batch")


class ClassItem(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(String(100), nullable=True)
    suitable_for = Column(String(255), nullable=True)
    mode = Column(String(50), default="Hybrid")  # Online | Offline | Hybrid
    status = Column(String(50), default="Active")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    cover_image = Column(String(500), nullable=True)
    author = Column(String(255), default="Veda Brahma Shri Pradeep Nadig")
    publish_date = Column(String(100), nullable=True)
    category = Column(String(100), nullable=True)
    tags = Column(JSON, default=list)
    content = Column(Text, nullable=False)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class GalleryAlbum(Base):
    __tablename__ = "gallery_albums"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    items = relationship("GalleryItem", back_populates="album")


class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, index=True)
    album_id = Column(Integer, ForeignKey("gallery_albums.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    media_url = Column(String(500), nullable=False)
    media_type = Column(String(50), default="Image")  # Image | Video
    category = Column(String(100), nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    album = relationship("GalleryAlbum", back_populates="items")


class MediaItem(Base):
    __tablename__ = "media_library"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False)
    file_type = Column(String(100), nullable=True)
    file_size = Column(Integer, default=0)
    alt_text = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class FAQItem(Base):
    __tablename__ = "faq"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    enquiry_type = Column(String(50), nullable=False)  # Service | Consultation | Class Enquiry
    name = Column(String(255), nullable=False)
    mobile = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    category = Column(String(255), nullable=True)
    additional_notes = Column(Text, nullable=True)
    status = Column(String(50), default="New")  # New | Contacted | Confirmed | Completed | Rejected
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class WorkshopRegistration(Base):
    __tablename__ = "workshop_registrations"

    id = Column(Integer, primary_key=True, index=True)
    workshop_id = Column(Integer, ForeignKey("workshops.id", ondelete="CASCADE"), nullable=False)
    batch_id = Column(Integer, ForeignKey("workshop_batches.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    mobile = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    address = Column(Text, nullable=False)  # Mandatory
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    pin_code = Column(String(20), nullable=False)
    payment_status = Column(String(50), default="Pending")  # Pending | Paid | Failed
    amount = Column(Float, nullable=False)
    razorpay_order_id = Column(String(255), nullable=True)
    razorpay_payment_id = Column(String(255), nullable=True)
    razorpay_signature = Column(String(500), nullable=True)
    additional_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    workshop = relationship("Workshop", back_populates="registrations")
    batch = relationship("WorkshopBatch", back_populates="registrations")


class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
