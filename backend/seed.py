import asyncio
from app.db.session import engine, Base, AsyncSessionLocal
from app.models.models import (
    Offering, Workshop, WorkshopBatch, ClassItem,
    Blog, GalleryAlbum, GalleryItem, MediaItem, FAQItem, Setting
)
from sqlalchemy.future import select

async def seed_database():
    print("Creating all tables in database...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as db:
        # 1. Seed Settings
        existing_settings = await db.execute(select(Setting))
        if not existing_settings.scalars().all():
            print("Seeding initial settings...")
            settings_data = [
                Setting(key="site_name", value="Veda Brahma Shri Pradeep Nadig"),
                Setting(key="hero_title", value="Veda Brahma Shri Pradeep Nadig"),
                Setting(key="hero_subtitle", value="Vedic Scholar, Astrologer & Spiritual Guide"),
                Setting(key="contact_mobile", value="+91 98800 12345"),
                Setting(key="whatsapp_number", value="919880012345"),
                Setting(key="contact_email", value="pradeep@vedabrahma.com"),
                Setting(key="office_address", value="No. 42, Veda Heritage Lane, Malleshwaram, Bengaluru, Karnataka 560003"),
                Setting(key="google_maps_link", value="https://maps.google.com"),
                Setting(key="social_links", value={
                    "facebook": "https://facebook.com",
                    "instagram": "https://instagram.com",
                    "youtube": "https://youtube.com"
                }),
                Setting(key="privacy_policy", value="Privacy Policy content for Veda Brahma Shri Pradeep Nadig."),
                Setting(key="terms_conditions", value="Terms & Conditions content for Veda Brahma Shri Pradeep Nadig."),
                Setting(key="refund_policy", value="Refund Policy content for Workshop registrations."),
                Setting(key="cancellation_policy", value="Cancellation Policy content for Consultations & Workshops."),
                Setting(key="cookie_policy", value="Cookie Policy content.")
            ]
            db.add_all(settings_data)

        # 2. Seed Offerings
        existing_offerings = await db.execute(select(Offering))
        if not existing_offerings.scalars().all():
            print("Seeding initial offerings...")
            offerings = [
                Offering(
                    type="Service",
                    title="Ganapathi Homa",
                    slug="ganapathi-homa",
                    short_description="A sacred ritual to invoke Lord Ganesha to remove obstacles and bring prosperity.",
                    full_description="Ganapathi Homa is performed at the beginning of any new venture, marriage, housewarming, or annually for peace and obstacle removal.",
                    images=["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"],
                    display_order=1,
                    status="Published",
                    seo_title="Ganapathi Homa - Authentic Vedic Ritual",
                    seo_description="Perform Ganapathi Homa with Veda Brahma Shri Pradeep Nadig for removing obstacles and inviting prosperity.",
                    faq=[
                        {"question": "How long does Ganapathi Homa take?", "answer": "The homa typically takes 2 to 3 hours depending on specific sankalpa."},
                        {"question": "What items are required?", "answer": "A detailed samagri list is shared upon confirmation."}
                    ]
                ),
                Offering(
                    type="Consultation",
                    title="Vedic Astrology Consultation",
                    slug="vedic-astrology-consultation",
                    short_description="In-depth analysis of your birth chart, planetary positions, and life guidance.",
                    full_description="Comprehensive horoscope analysis covering career, health, relationships, and precise Vedic remedies.",
                    images=["https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800"],
                    display_order=2,
                    status="Published",
                    seo_title="Vedic Astrology Consultation with Shri Pradeep Nadig",
                    seo_description="Get accurate birth chart analysis and personal guidance from renowned Vedic scholar Pradeep Nadig.",
                    faq=[
                        {"question": "What details are required?", "answer": "Date of birth, exact time of birth, and place of birth."}
                    ]
                )
            ]
            db.add_all(offerings)

        # 3. Seed Workshops
        existing_workshops = await db.execute(select(Workshop))
        if not existing_workshops.scalars().all():
            print("Seeding initial workshops...")
            workshop1 = Workshop(
                title="Vedic Chant Mastery Workshop",
                slug="vedic-chant-mastery-august-2026",
                cover_image="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800",
                description="Learn accurate phonetics, intonation (Swaras), and profound meanings of classical Vedic Suktas.",
                start_date="2026-08-15",
                end_date="2026-08-17",
                venue="Veda Cultural Center, Bengaluru",
                address="12th Main, Malleshwaram, Bengaluru 560003",
                google_maps_link="https://maps.google.com",
                duration="3 Days (15 Hours)",
                price=2500.0,
                capacity=30,
                registration_deadline="2026-08-12",
                status="Published",
                featured=True,
                seo_title="Vedic Chant Mastery Workshop - August 2026",
                seo_description="Join Shri Pradeep Nadig for an intensive 3-day Vedic chant mastery workshop in Bengaluru."
            )
            db.add(workshop1)
            await db.flush()

            batch1 = WorkshopBatch(
                workshop_id=workshop1.id,
                batch_name="Morning Batch (7:00 AM - 10:00 AM)",
                start_time="07:00 AM",
                end_time="10:00 AM",
                capacity=15,
                remaining_seats=15,
                status="Active"
            )
            batch2 = WorkshopBatch(
                workshop_id=workshop1.id,
                batch_name="Evening Batch (5:00 PM - 8:00 PM)",
                start_time="05:00 PM",
                end_time="08:00 PM",
                capacity=15,
                remaining_seats=15,
                status="Active"
            )
            db.add_all([batch1, batch2])

        # 4. Seed Classes
        existing_classes = await db.execute(select(ClassItem))
        if not existing_classes.scalars().all():
            print("Seeding initial classes...")
            classes = [
                ClassItem(
                    name="Daily Sandhyavandana & Mantras",
                    description="Structured learning of Sandhyavandana procedures, Nitya Karma, and foundational Suktas.",
                    duration="3 Months",
                    suitable_for="Beginners & Enthusiasts",
                    mode="Hybrid",
                    status="Active"
                ),
                ClassItem(
                    name="Advanced Rudram & Chamakam Chanting",
                    description="Deep dive into Sri Rudram and Chamakam with strict adherence to Vedic Swaras.",
                    duration="6 Months",
                    suitable_for="Intermediate Chanters",
                    mode="Offline",
                    status="Active"
                )
            ]
            db.add_all(classes)

        # 5. Seed Blogs
        existing_blogs = await db.execute(select(Blog))
        if not existing_blogs.scalars().all():
            print("Seeding initial blogs...")
            blog1 = Blog(
                title="Understanding the Significance of Sandhyavandana",
                slug="significance-of-sandhyavandana",
                cover_image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
                author="Veda Brahma Shri Pradeep Nadig",
                publish_date="2026-07-20",
                category="Vedic Traditions",
                tags=["Sandhyavandana", "Daily Rituals", "Veda"],
                content="Sandhyavandana is one of the most sacred daily practices prescribed in Vedic tradition...",
                seo_title="Significance of Sandhyavandana by Shri Pradeep Nadig",
                seo_description="Discover why Sandhyavandana is essential for spiritual discipline and mental peace."
            )
            db.add(blog1)

        # 6. Seed FAQ
        existing_faq = await db.execute(select(FAQItem))
        if not existing_faq.scalars().all():
            print("Seeding initial FAQ...")
            faqs = [
                FAQItem(
                    question="How can I book a service or home ritual?",
                    answer="You can request a service directly through the website or contact us via WhatsApp.",
                    category="Services",
                    display_order=1
                ),
                FAQItem(
                    question="Are online consultation sessions available?",
                    answer="Yes, consultations can be conducted virtually over Google Meet or phone call.",
                    category="Consultations",
                    display_order=2
                )
            ]
            db.add_all(faqs)

        await db.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())
