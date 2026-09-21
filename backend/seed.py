import asyncio
from app.db.session import get_db, Base
from app.models.models import (
    Offering, Workshop, WorkshopBatch, ClassItem,
    Blog, GalleryAlbum, GalleryItem, MediaItem, FAQItem, Setting, Review
)
from sqlalchemy.future import select

async def seed_database():
    print("Seeding database via get_db()...")
    async for db in get_db():
        # 1. Seed Settings
        existing_settings = await db.execute(select(Setting))
        if not existing_settings.scalars().all():
            print("Seeding initial settings...")
            settings_data = [
                Setting(key="site_name", value="Veda Brahma Shri Pradeep Nadig"),
                Setting(key="hero_title", value="G Pradeep Nadig"),
                Setting(key="hero_subtitle", value="Vedic Scholar, Astrologer & Spiritual Guide"),
                Setting(key="contact_mobile", value="+91 98440 42068"),
                Setting(key="whatsapp_number", value="919844042068"),
                Setting(key="contact_email", value="pradeep@vedabrahma.com"),
                Setting(key="office_address", value="Asharaya layout, Vaderahalli, K.G.Vaderahalli, Bengaluru, Karnataka 560097"),
                Setting(key="google_maps_link", value="https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097"),
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
        existing_slugs = set((await db.execute(select(Offering.slug))).scalars().all())
        print("Ensuring all offerings exist in DB...")
        offerings = [
                Offering(
                    type="Service",
                    title="Mahaganapathi Homa",
                    slug="ganapathi-homa",
                    who_benefits="Removes all unseen obstacles, grants clarity of thought, bestows success in new ventures, and brings peace to homes and businesses.",
                    where_performed="Conducted at homes, newly constructed houses, business offices, or designated sacred halls in Bengaluru.",
                    when_performed="Ideal during housewarmings (Griha Pravesha), before launching a business, weddings, annual family prayers, or Sankashti Chaturthi.",
                    who_should_attend="Entire family, business partners, house-owners, newlyweds, and individuals starting new career or academic milestones.",
                    vidhi_details="Includes Mahaganapathi Avahana, Atharvashirsha Trishati Chanting, Modaka, Ashta Dravya, Sugandhi Dravya & Ghee 108 Ahuti offerings, Poornahuti, and Modaka Prasadam.",
                    short_description="A sacred ritual to invoke Lord Ganesha to remove obstacles and bring prosperity.",
                    full_description="Mahaganapathi Homa is performed at the beginning of any new venture, marriage, housewarming, or annually for peace and obstacle removal.",
                    images=["/images/services/ganapathi-homa.jpg"],
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
                    type="Service",
                    title="Navagraha Homa",
                    slug="navagraha-homa",
                    who_benefits="Harmonizes planetary influences (Grahadosha), mitigates Rahu-Ketu/Sade Sati effects, improves health, career stability, and family peace.",
                    where_performed="Conducted at home, outdoor courtyards, or sacred mandaps in Bengaluru.",
                    when_performed="During unfavorable planetary Dashas/Bhuktis, transit changes, birthdays, or before major life decisions.",
                    who_should_attend="Individuals undergoing difficult astrological periods, family members, and those seeking overall planetary harmony.",
                    vidhi_details="Setup of 9 Square Navagraha Mandala, 9 Grain (Navadhanya) offerings, planetary specific Veda Samithu (Arka, Palasa, Khadira, Apamarga, etc.) Ahutis, Samidha Tarpanam, and Raksha Sutra Bandhana.",
                    short_description="Performed to seek the blessings of the nine planetary deities and reduce planetary doshas.",
                    full_description="Navagraha Homa is performed to seek the blessings of the nine planetary deities (Navagrahas), reduce the effects of adverse planetary positions, and bring harmony, prosperity, and overall well-being into life.",
                    images=["/images/services/navagraha-homa.jpg"],
                    display_order=2,
                    status="Published",
                    seo_title="Navagraha Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Harmonize planetary influences and reduce doshas with authentic Navagraha Homa.",
                    faq=[
                        {"question": "How long does Navagraha Homa take?", "answer": "Typically 2.5 to 3.5 hours."},
                        {"question": "When is it recommended?", "answer": "Before important life events, during difficult planetary periods (Dasha/Bhukti), or for general prosperity."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Mrityunjaya Homa",
                    slug="mrityunjaya-homa",
                    who_benefits="Grants health restoration, longevity, protection against accidental hazards, mental peace, and relief from chronic illnesses.",
                    where_performed="Performed at residences, hospital prayer rooms (for recovery), or sacred temple sanctums.",
                    when_performed="Birthdays (especially 60th Ugraratha Shanthi, 70th, 80th), during severe illnesses, or prior to major medical procedures.",
                    who_should_attend="The person seeking health recovery/longevity, family members, children, and elders.",
                    vidhi_details="Maha Mrityunjaya Mantra 1008/108 Japa, Amrita Kalasa Sthapana, Durva grass, Milk, Ghee, and Sesame seeds 108 Ahuti, Mrityunjaya Kalasabhishekam, and Ayur Raksha Threading.",
                    short_description="Dedicated to Lord Shiva for protection from illness, accidents, and promoting longevity.",
                    full_description="Mrityunjaya Homa is dedicated to Lord Shiva and is performed for protection from illness, accidents, untimely dangers, and to promote long life, good health, and inner strength.",
                    images=["/images/services/mrityunjaya-homa.jpg"],
                    display_order=3,
                    status="Published",
                    seo_title="Mrityunjaya Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Seek Shiva's divine protection, long life, and mental strength through Mrityunjaya Homa.",
                    faq=[
                        {"question": "How long does the Homa take?", "answer": "Approximately 2.5 to 3 hours."},
                        {"question": "Who should perform it?", "answer": "Recommended for those facing health challenges, major life obstacles, or seeking divine protection."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Ayushya Homa",
                    slug="ayushya-homa",
                    who_benefits="Invokes divine blessings of Markandeya & Ayur Devatas for long life, healthy development, immunity, and vitality.",
                    where_performed="Conducted at home, event halls, or family prayer spaces.",
                    when_performed="First birthday of a child (Ayushya Homa), annual birthdays, or recovery after illness.",
                    who_should_attend="Infants, birthday celebrated individuals, parents, grandparents, and well-wishers.",
                    vidhi_details="Ayur Devata Sthapana, Charu (sweet rice) Ahuti, Brahma-Vishnu-Shiva Ayur Sukta chanting, Ghee oblations, Kalasabhishekam for the child, and Prasadam.",
                    short_description="Performed to pray for a long, healthy, and prosperous life, especially on birthdays.",
                    full_description="Ayushya Homa is performed to pray for a long, healthy, and prosperous life. It is especially performed on birthdays, for young children, and during important life milestones.",
                    images=["/images/services/ayushya-homa.jpg"],
                    display_order=4,
                    status="Published",
                    seo_title="Ayushya Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Invoke blessings for health, vitality, and longevity with authentic Ayushya Homa.",
                    faq=[
                        {"question": "When should Ayushya Homa be performed?", "answer": "Commonly on birthdays, especially the first birthday and annual birthdays."},
                        {"question": "How long does it take?", "answer": "Around 2 to 3 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Durga Homa",
                    slug="durga-homa",
                    who_benefits="Invokes Goddess Durga's protection against negative energies, envy, fear, litigation troubles, and bestows supreme courage.",
                    where_performed="Home altars, office spaces, or open sacred courtyards.",
                    when_performed="During Navaratri, Rahu Kala, Tuesdays, Fridays, or when facing persistent external disturbances.",
                    who_should_attend="Family members, women seeking divine strength, and business leaders.",
                    vidhi_details="Navadurga Avahana, Sri Sukta & Durga Sukta recitation, Red Lotus & Kumkum oblations, Ghee & Payasam Homa, Poornahuti, and Kumkuma Prasadam.",
                    short_description="Invoke Goddess Durga for protection, courage, success, and removal of negative energies.",
                    full_description="Durga Homa is performed to invoke the divine blessings of Goddess Durga for protection, courage, success, and the removal of negative energies and obstacles.",
                    images=["/images/services/durga-homa.jpg"],
                    display_order=5,
                    status="Published",
                    seo_title="Durga Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Invoke Goddess Durga's blessings for protection, courage, and spiritual strength.",
                    faq=[
                        {"question": "When is Durga Homa recommended?", "answer": "During Navaratri, before major life events, or whenever spiritual protection is sought."},
                        {"question": "Duration?", "answer": "Approximately 2.5 to 3 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Chandika Homa",
                    slug="chandika-homa",
                    who_benefits="Powerful protection against severe black magic, chronic legal disputes, enemies, unseen negative forces, and deep karmic blockages.",
                    where_performed="Sacred homa mandaps, open temple grounds, or spacious home courtyards.",
                    when_performed="Chandi Navami, Navaratri, Amavasya, or when recommended after detailed horoscope examination.",
                    who_should_attend="The primary devotee (Sankalpa Karta), family members, and close relatives.",
                    vidhi_details="Detailed 700 Mantra Durga Saptashati Homa (Chandi Homa), 13 Chapter Ahutis, Dampati Pooja, Suvasini Pooja, Brahmachari Pooja, Kanya Pooja, and Mahapoornahuti with Silk Saree & Coconut.",
                    short_description="A powerful Vedic fire ritual dedicated to Goddess Chandika for victory over severe obstacles.",
                    full_description="Chandika Homa is a powerful Vedic fire ritual dedicated to Goddess Chandika for victory over difficulties, removal of powerful negative influences, and protection from unseen obstacles.",
                    images=["/images/services/chandika-homa.jpg"],
                    display_order=6,
                    status="Published",
                    seo_title="Chandika Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Powerful Chandika Homa for victory over hardships and severe obstacles.",
                    faq=[
                        {"question": "Who should perform Chandika Homa?", "answer": "Recommended for those facing persistent hardships, legal issues, or major life challenges."},
                        {"question": "Duration?", "answer": "Usually 3 to 5 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Vastu Homa",
                    slug="vastu-homa",
                    who_benefits="Purifies domestic & commercial property, neutralizes structural Vastu Doshas, attracts wealth, and creates peaceful living environments.",
                    where_performed="At the specific home, newly built apartment, plot, or commercial office.",
                    when_performed="Before Griha Pravesha (housewarming), after major structural renovations, or when experiencing unexplained disturbances in a house.",
                    who_should_attend="Property owners, family members, partners, and residents.",
                    vidhi_details="Vastu Purusha Mandala Sthapana, Digpalaka Bali, Navadhanya & Wooden Samidha offerings, Vastu Purusha Pooja, Kalasa Prokshana throughout all rooms, and Sthapati Nirmalya.",
                    short_description="Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy.",
                    full_description="Vastu Homa is performed to purify homes, offices, and commercial spaces, remove Vastu doshas, and invite peace, prosperity, and positive energy into the property.",
                    images=["/images/services/vastu-homa.jpg"],
                    display_order=7,
                    status="Published",
                    seo_title="Vastu Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Purify property and remove Vastu doshas with authentic Vastu Homa rituals.",
                    faq=[
                        {"question": "When should Vastu Homa be performed?", "answer": "Before entering a new home, after renovations, or when experiencing persistent disturbances."},
                        {"question": "Duration?", "answer": "Typically 2.5 to 3.5 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Aghorastra Homa",
                    slug="aghorastra-homa",
                    who_benefits="Sacred Shiva ritual for ultimate spiritual protection, destroying evil eye (Drishti), severe negativity, and spiritual blockages.",
                    where_performed="Conducted at home prayer spaces, sacred outdoor mandaps, or temple altars.",
                    when_performed="Mantra Siddhi Tithis, Pradosham, Masa Shivaratri, or when experiencing extreme negative disturbances.",
                    who_should_attend="Sankalpa Karta and family members seeking spiritual shielding.",
                    vidhi_details="Aghora Shiva Avahana, Aghorastra Mantra 1008 Japa & Homa, Mustard & Black Sesame oblations, Bhasma Prokshana, and Protective Shiva Raksha.",
                    short_description="A sacred Shiva ritual performed for powerful spiritual protection and removal of negativity.",
                    full_description="Aghorastra Homa is a sacred Shiva ritual performed for powerful spiritual protection, removal of severe negative energies, unseen obstacles, and to strengthen divine grace.",
                    images=["/images/services/aghorastra-homa.jpg"],
                    display_order=8,
                    status="Published",
                    seo_title="Aghorastra Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Sacred Shiva ritual for ultimate spiritual protection and energy purification.",
                    faq=[
                        {"question": "Who should perform Aghorastra Homa?", "answer": "Recommended for those seeking powerful spiritual protection and relief from persistent negativity."},
                        {"question": "Duration?", "answer": "Approximately 3 to 4 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Naga Shanthi",
                    slug="naga-shanthi",
                    who_benefits="Mitigates Sarpa Dosha, Naga Dosha, delays in marriage, fertility issues, skin ailments, and ancestral karmic obstacles.",
                    where_performed="Conducted at home, dedicated Naga Kshetra venues, or open mandaps.",
                    when_performed="Panchami Tithi (especially Nagapanchami), Shravana Month, or on dates advised by astrologer.",
                    who_should_attend="Couples seeking children, individuals facing marriage delays, and family heads.",
                    vidhi_details="Ashta Naga Mandalarchana, Milk & Sandalwood Abhisheka to Naga Prathima, Sarpa Sukta Japa, Sesame & Ghee Ahuti, Ksheerabhishekam, and Naga Prathima Daanam.",
                    short_description="Seek blessings of Naga Devatas, reduce Sarpa Dosha, and support family harmony.",
                    full_description="Naga Shanthi is performed to seek the blessings of the Naga Devatas, reduce Sarpa Dosha, and remove obstacles related to marriage, childbirth, family well-being, and ancestral karma.",
                    images=["/images/services/naga-shanthi.jpg"],
                    display_order=9,
                    status="Published",
                    seo_title="Naga Shanthi | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Perform Naga Shanthi to mitigate Sarpa Dosha and invite peace and fertility.",
                    faq=[
                        {"question": "When is Naga Shanthi recommended?", "answer": "When advised through horoscope analysis or for relief from Sarpa Dosha."},
                        {"question": "Duration?", "answer": "Usually 2.5 to 3 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Subrahmanya Homa",
                    slug="subrahmanya-homa",
                    who_benefits="Grants victory over obstacles, courage, success in competitive exams/career, relief from Kuja/Mars Dosha & Naga Dosha.",
                    where_performed="Conducted at home, private auditoriums, or temple halls.",
                    when_performed="Sashti Tithi (Skanda Sashti), Tuesdays, Kiruthigai, or before important competitive milestones.",
                    who_should_attend="Students, young professionals, siblings, and individuals with Kuja Dosha.",
                    vidhi_details="Lord Subrahmanya Avahana with Vel, Subrahmanya Trishati & Gayatri Chanting, Panchamrutha & Red Flower Ahuti, Vel Pooja, and Raksha Prasadam.",
                    short_description="Dedicated to Lord Subrahmanya for courage, wisdom, victory over obstacles, and relief from doshas.",
                    full_description="Subrahmanya Homa is dedicated to Lord Subrahmanya (Murugan/Kartikeya) for courage, wisdom, victory over obstacles, relief from Naga Dosha, and overall success in life.",
                    images=["/images/services/subrahmanya-homa.jpg"],
                    display_order=10,
                    status="Published",
                    seo_title="Subrahmanya Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Invoke Lord Subrahmanya's grace for courage, career growth, and victory.",
                    faq=[
                        {"question": "Who should perform Subrahmanya Homa?", "answer": "Recommended for students, professionals, families, and those seeking relief from Naga-related doshas."},
                        {"question": "Duration?", "answer": "Around 2.5 to 3 hours."}
                    ]
                ),
                Offering(
                    type="Service",
                    title="Lakshmi Narayana Hrudaya Homa",
                    slug="lakshmi-narayana-hrudaya-homa",
                    who_benefits="Invokes combined divine grace of Lord Vishnu & Goddess Lakshmi for sustainable wealth, family affection, spiritual growth, and high prosperity.",
                    where_performed="Home living rooms, business offices, or event venues.",
                    when_performed="Fridays, Purnima, Diwali, Akshaya Tritiya, or annual family thanksgiving.",
                    who_should_attend="Husband & wife, family members, business partners, and employees.",
                    vidhi_details="Narayana Hrudaya & Lakshmi Hrudaya Stotram Samputita Homa, Lotus Flower & Ghee Ahuti, Ashta Lakshmi Archana, Ksheera Payasa Naivedya, and Poornahuti.",
                    short_description="Invoke combined blessings of Goddess Lakshmi and Lord Narayana for wealth, harmony, and abundance.",
                    full_description="Lakshmi Narayana Hrudaya Homa is performed to invoke the combined blessings of Goddess Lakshmi and Lord Narayana for wealth, prosperity, family harmony, spiritual growth, and overall abundance.",
                    images=["/images/services/lakshmi-narayana-hrudaya-homa.jpg"],
                    display_order=11,
                    status="Published",
                    seo_title="Lakshmi Narayana Hrudaya Homa | Veda Brahma Shri Pradeep Nadig",
                    seo_description="Attract prosperity, wealth, and family harmony with Lakshmi Narayana Hrudaya Homa.",
                    faq=[
                        {"question": "When is Lakshmi Narayana Hrudaya Homa recommended?", "answer": "Ideal for business owners, families, before new ventures, or anyone seeking prosperity and harmony."},
                        {"question": "Duration?", "answer": "Typically 3 to 4 hours."}
                    ]
                ),
                Offering(
                    type="Consultation",
                    title="Vedic Astrology Consultation",
                    slug="vedic-astrology-consultation",
                    who_benefits="Anyone seeking birth chart analysis, planetary dasha insights, career direction, marriage compatibility, and authentic Vedic remedies.",
                    where_performed="In-person consultation at Bengaluru office or virtual session over Google Meet / Phone Call.",
                    when_performed="Before major life decisions, weddings, business investments, or during periods of confusion.",
                    who_should_attend="The individual, parents (for child's chart), or couples (for marriage matching).",
                    vidhi_details="Prashna Kundali analysis, Janma Patrika Graha Sthiti examination, Dasha-Bhukti evaluation, and customized Stotra & Homa remedy recommendations.",
                    short_description="In-depth analysis of your birth chart, planetary positions, and life guidance.",
                    full_description="Comprehensive horoscope analysis covering career, health, relationships, and precise Vedic remedies.",
                    images=["/images/services/vedic-astrology-consultation.jpg"],
                    display_order=12,
                    status="Published",
                    seo_title="Vedic Astrology Consultation with Shri Pradeep Nadig",
                    seo_description="Get accurate birth chart analysis and personal guidance from renowned Vedic scholar Pradeep Nadig.",
                    faq=[
                        {"question": "What details are required?", "answer": "Date of birth, exact time of birth, and place of birth."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Sri Satyanarayana Vratha & Pooja",
                    slug="satyanarayana-pooja",
                    who_benefits="Brings peace, happiness, unity, and abundance to families, home-owners, newlyweds, and business owners.",
                    where_performed="Conducted at your home, apartment, commercial office space, or selected prayer mandap in Bengaluru.",
                    when_performed="Ideal on Purnima (Full Moon), Ekadashi, Sankranti, housewarmings (Griha Pravesha), weddings, or birthdays.",
                    who_should_attend="All family members, relatives, friends, and devotees are encouraged to attend and partake in Prasadam.",
                    vidhi_details="Includes Ganapathi Pooja, Navagraha Smarana, Kalasa Sthapana, Satyanarayana Ashtottara Shatanamavali, 5 Sacred Katha Adhyayas (Stories), Panchamrutha Abhishekam, Mahamangalarthi, and Distribution of Wheat Sheera Prasadam.",
                    short_description="A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires.",
                    full_description="Sri Satyanarayana Vratha & Pooja is traditionally performed on Purnima (Full Moon), Ekadashi, or during family milestones to seek Lord Vishnu's grace, invite peace, wealth, and spiritual well-being.",
                    images=["/images/services/satyanarayana-pooja.jpg"],
                    display_order=13,
                    status="Published",
                    seo_title="Sri Satyanarayana Vratha & Pooja | Shri Pradeep Nadig",
                    seo_description="Perform authentic Sri Satyanarayana Vratha with Veda Brahma Shri Pradeep Nadig for family harmony and prosperity.",
                    faq=[
                        {"question": "When is the ideal time to perform Satyanarayana Pooja?", "answer": "Full Moon (Purnima) days, Ekadashi, housewarmings, or anniversaries."},
                        {"question": "How long does the Pooja take?", "answer": "Approximately 2 to 2.5 hours."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Sri Rudrabhishekam Pooja",
                    slug="rudrabhishekam-pooja",
                    who_benefits="Protects against chronic illness, negative energies, mental distress, financial blockages, and karmic impediments.",
                    where_performed="Can be performed at home, private prayer rooms, temple halls, or outdoors in quiet sanctums.",
                    when_performed="Mondays, Pradosham days, Masa Shivaratri, Shravana month, or during personal health recovery.",
                    who_should_attend="Individuals facing health issues, spiritual seekers, and entire families praying for health and peace.",
                    vidhi_details="Mahaganapathi Pooja, Sankalpa, Rudra Kalasa Sthapana, Ekadasa Dravya Abhisheka with continuous Sri Rudra Prashna chanting, Bilva Patra Archana, and Shanti Chanting.",
                    short_description="Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection.",
                    full_description="Sri Rudrabhishekam Pooja involves ritualistic sacred bathing (Abhisheka) to Lord Shiva with Panchamrutha accompanied by Sri Rudram and Chamakam chanting, bestowing health, longevity, and liberation from negative karma.",
                    images=["/images/services/rudrabhishekam-pooja.jpg"],
                    display_order=14,
                    status="Published",
                    seo_title="Sri Rudrabhishekam Pooja | Shri Pradeep Nadig",
                    seo_description="Seek Shiva's grace and inner peace through traditional Sri Rudrabhishekam Pooja.",
                    faq=[
                        {"question": "What materials are used for Abhisheka?", "answer": "Milk, curd, honey, ghee, sugar, tender coconut water, and sacred Bilva leaves."},
                        {"question": "Duration?", "answer": "About 2 to 3 hours."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Mahalakshmi Kanakadhara Pooja",
                    slug="mahalakshmi-kanakadhara-pooja",
                    who_benefits="Business owners, entrepreneurs, working professionals, and families seeking financial growth and stability.",
                    where_performed="Performed at business offices, retail shops, factories, or home altars.",
                    when_performed="Fridays, Varalakshmi Vratha, Diwali Lakshmi Pooja day, or at the launch of new business ventures.",
                    who_should_attend="Business partners, shop owners, family elders, and household members.",
                    vidhi_details="Ashta Lakshmi Kalasa Sthapana, Lotus Flower Archana, Kanakadhara Stotram 108 recitations, Sri Sukta Homa/Pooja, Kumkuma Archana, and Naivedya offering.",
                    short_description="Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance.",
                    full_description="Mahalakshmi Kanakadhara Pooja is performed with Kanakadhara Stotram recitations to invoke Goddess Lakshmi's eternal blessings for financial stability, wealth abundance, and removal of debts.",
                    images=["/images/services/lakshmi-narayana-hrudaya-homa.jpg"],
                    display_order=15,
                    status="Published",
                    seo_title="Mahalakshmi Kanakadhara Pooja | Shri Pradeep Nadig",
                    seo_description="Invoke Goddess Lakshmi for financial growth and family prosperity.",
                    faq=[
                        {"question": "Who should perform Kanakadhara Pooja?", "answer": "Recommended for business owners, families, and anyone seeking financial stability."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Swayamvara Parvathi Pooja",
                    slug="swayamvara-parvathi-pooja",
                    who_benefits="Single individuals looking for marriage, parents seeking good matches for children, and married couples aiming for harmony.",
                    where_performed="Performed at home prayer altars or designated sacred venues.",
                    when_performed="Fridays, auspicious Tithis, or when advised by Vedic astrology consultation.",
                    who_should_attend="The bride/groom-to-be, parents, or spouse.",
                    vidhi_details="Gauri Pooja, Swayamvara Parvathi Mantra Japa (108/1008 times), Turmeric/Kumkum Archana, Lotus flower offerings, Mangalya Bhagya Sankalpa, and Prasadam distribution.",
                    short_description="Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony.",
                    full_description="Swayamvara Parvathi Pooja is a sacred ritual specifically recommended for overcoming obstacles in finding a suitable life partner, eliminating delays in marriage, and strengthening affection between couples.",
                    images=["/images/services/swayamvara-parvathi-pooja.jpg"],
                    display_order=16,
                    status="Published",
                    seo_title="Swayamvara Parvathi Pooja | Shri Pradeep Nadig",
                    seo_description="Perform Swayamvara Parvathi Pooja to remove marriage delays and foster marital peace.",
                    faq=[
                        {"question": "Can this Pooja be performed on behalf of someone?", "answer": "Yes, parents or close relatives can perform the Sankalpa in the person's name."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Sri Saraswati Vidya Pooja",
                    slug="saraswati-pooja",
                    who_benefits="School & college students, competitive exam aspirants, musicians, writers, and educators.",
                    where_performed="At home study rooms, educational institutions, or music/dance academies.",
                    when_performed="Vasant Panchami, Navaratri Saraswati Pooja day, Vidyarambha, or prior to major examination seasons.",
                    who_should_attend="Students, children, parents, and teachers.",
                    vidhi_details="Saraswati Avahana, Pustaka/Instrument Pooja, Medha Sukta Chanting, 108 Namavali Archana with white flowers, Aksharabhyasa ritual (if for young toddlers), and Vidya Naivedya.",
                    short_description="Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery.",
                    full_description="Sri Saraswati Vidya Pooja is performed for students, scholars, artists, and educators to enhance intellect, concentration, public speaking abilities, and success in studies and competitive examinations.",
                    images=["/images/services/saraswati-pooja.jpg"],
                    display_order=17,
                    status="Published",
                    seo_title="Sri Saraswati Vidya Pooja | Shri Pradeep Nadig",
                    seo_description="Seek Goddess Saraswati's divine blessings for wisdom, memory power, and academic success.",
                    faq=[
                        {"question": "When is Saraswati Pooja recommended?", "answer": "Before academic exams, initiation of learning (Vidyarambha), or on Vasant Panchami/Navaratri."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Sundarakanda Parayana & Pooja",
                    slug="sundarakanda-parayana-pooja",
                    who_benefits="Those facing daunting challenges, court cases, fear, depression, or seeking high mental confidence.",
                    where_performed="Home altars, community halls, or temple mandaps.",
                    when_performed="Tuesdays, Saturdays, Hanuman Jayanti, or during critical life junctures.",
                    who_should_attend="Family members, devotees of Lord Hanuman, and individuals seeking victory over adversity.",
                    vidhi_details="Hanuman Chalisa & Sundarakanda Sarga Chanting, Vadapav/Betel Leaf Mala Arpan, Sindoor Archana, Deeparadhana, and Sundarakanda Phala Shruti recitations.",
                    short_description="Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection.",
                    full_description="Sundarakanda Parayana & Pooja invokes Lord Hanuman and Sri Rama to grant immense courage, mental fortitude, resolution of complex problems, and protection from negative energies.",
                    images=["/images/services/sundarakanda-parayana-pooja.jpg"],
                    display_order=18,
                    status="Published",
                    seo_title="Sundarakanda Parayana & Pooja | Shri Pradeep Nadig",
                    seo_description="Experience the strength of Sundarakanda Parayana guided by Shri Pradeep Nadig.",
                    faq=[
                        {"question": "What are the benefits?", "answer": "Promotes inner strength, removes fear, and grants success in challenging endeavors."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Sri Sudarshana Pooja",
                    slug="sudarshana-pooja",
                    who_benefits="Individuals suffering from unexplained fear, evil eye, negative competition, or persistent illness.",
                    where_performed="At home, office premises, or temple sanctums.",
                    when_performed="Wednesdays, Saturdays, Ekadashi, or during planetary affliction periods.",
                    who_should_attend="Key family heads, business owners, and affected individuals.",
                    vidhi_details="Sudarshana Yantra Pooja, Sudarshana Ashtottara Archana, Chakra Abhishekam, Shatru Samhara Sankalpa, and Raksha Sutra Bandhana.",
                    short_description="Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences.",
                    full_description="Sri Sudarshana Pooja invokes Lord Sudarshana to eliminate negative vibrations, black eye (Drishti dosha), health ailments, and grant immediate divine protection.",
                    images=["/images/services/sudarshana-homa.jpg"],
                    display_order=19,
                    status="Published",
                    seo_title="Sri Sudarshana Pooja | Shri Pradeep Nadig",
                    seo_description="Divine protection and relief from negative influences through Sri Sudarshana Pooja.",
                    faq=[
                        {"question": "Duration?", "answer": "Approximately 2 to 2.5 hours."}
                    ]
                ),
                Offering(
                    type="Pooja",
                    title="Durga Saptashati Parayana & Pooja",
                    slug="durga-saptashati-pooja",
                    who_benefits="Devotees seeking supreme protection from Goddess Durga, overcoming deep life struggles, and family peace.",
                    where_performed="Homes, prayer mandaps, or temple halls.",
                    when_performed="Navaratri days, Tuesdays, Fridays, Ashtami, and Navami Tithis.",
                    who_should_attend="All family members and spiritual seekers.",
                    vidhi_details="Kavacha, Argala, Kilaka recitations, 13 Adhyaya Durga Saptashati Parayana, Chandi Navakshari Japa, Kumkumarchana, and Mahamangalarthi.",
                    short_description="Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
                    full_description="Durga Saptashati Parayana & Pooja is an auspicious ritual worshipping the Divine Mother in her various manifestations, bringing destruction of negativity, supreme peace, and material and spiritual well-being.",
                    images=["/images/services/chandika-homa.jpg"],
                    display_order=20,
                    status="Published",
                    seo_title="Durga Saptashati Parayana & Pooja | Shri Pradeep Nadig",
                    seo_description="Sacred Durga Saptashati Parayana for divine grace, victory, and protection.",
                    faq=[
                    ]
                )
            ]
        to_add = [o for o in offerings if o.slug not in existing_slugs]
        if to_add:
            print(f"Adding {len(to_add)} missing offerings...")
            db.add_all(to_add)

        # 3. Seed Workshops
        existing_workshops = await db.execute(select(Workshop))
        if not existing_workshops.scalars().all():
            print("Seeding initial workshops...")
            workshop1 = Workshop(
                title="Vedic Chant Mastery Workshop",
                slug="vedic-chant-mastery-august-2026",
                cover_image="/images/services/sundarakanda-parayana-pooja.jpg",
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
            blogs = [
                Blog(
                    title="What is Vastu Homa? The Ultimate Guide to Purifying Your Home and Removing Spatial Doshas",
                    slug="what-is-vastu-homa-home-purification-guide",
                    category="Vastu & Housewarming",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-01-05",
                    cover_image="/images/blogs/vastu-homa-vedic-fire-ritual.jpg",
                    tags=["VastuHoma", "GrihaPravesha", "VastuShastra", "HomePurification"],
                    content="Vastu Homa is an ancient Vedic fire ritual dedicated to Vastu Purusha—the divine cosmic spirit presiding over architecture. It purifies domestic dwellings, balances Pancha Bhootas, and neutralizes structural Vastu doshas.",
                    seo_title="What is Vastu Homa? Home Purification & Vastu Dosha Remedies | Pradeep Nadig",
                    seo_description="Discover what Vastu Homa is, why it is performed before Griha Pravesha, non-demolition energy balancing, and Pancha Bhootas harmonization."
                ),
                Blog(
                    title="Understanding Mahaganapathi Homa: Procedures, Sacred Ahuti, and Obstacle Removal Benefits",
                    slug="understanding-mahaganapathi-homa-procedure-benefits",
                    category="Vedic Rituals",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-01-10",
                    cover_image="/images/services/ganapathi-homa.jpg",
                    tags=["GanapathiHoma", "VedicRituals", "ObstacleRemoval"],
                    content="Lord Ganesha is worshipped as Vighnaharta—the destroyer of obstacles. Performing Mahaganapathi Homa before embarking on new business ventures, Griha Pravesha, or weddings ensures divine clarity and success.",
                    seo_title="Mahaganapathi Homa Procedure & Benefits | Shri Pradeep Nadig",
                    seo_description="Learn how Mahaganapathi Homa removes life obstacles, grants business prosperity, and bestows peace."
                ),
                Blog(
                    title="Navagraha Homa Explained: How to Pacify Adverse Planetary Transits, Sade Sati & Rahu-Ketu Doshas",
                    slug="navagraha-homa-planetary-remedies-guide",
                    category="Astrology & Remedies",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-01-15",
                    cover_image="/images/blogs/vedic-astrology-horoscope-reading.jpg",
                    tags=["NavagrahaHoma", "SadeSati", "RahuKetuDosha"],
                    content="Navagraha Homa is performed to seek the blessings of the nine planetary deities, reduce adverse planetary transit effects (Sade Sati, Rahu Dasha), and bring stability into career and health.",
                    seo_title="Navagraha Homa Explained: Sade Sati & Planetary Remedies | Pradeep Nadig",
                    seo_description="Discover how Navagraha Homa harmonizes nine planetary deities, mitigates Sade Sati, and restores stability."
                ),
                Blog(
                    title="Maha Mrityunjaya & Ayushya Homa: Sacred Vedic Fire Rituals for Health Restoration, Longevity & Protection",
                    slug="maha-mrityunjaya-ayushya-homa-health-longevity",
                    category="Health & Protection",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-01-20",
                    cover_image="/images/services/mrityunjaya-homa.jpg",
                    tags=["MrityunjayaHoma", "AyushyaHoma", "ShivaMantra"],
                    content="Maha Mrityunjaya Homa invokes Lord Shiva for recovery from severe illness, protection against accidents, and bodily longevity, while Ayushya Homa is performed on birthdays for immunity and vitality.",
                    seo_title="Maha Mrityunjaya & Ayushya Homa for Health | Pradeep Nadig",
                    seo_description="Discover how Maha Mrityunjaya Homa and Ayushya Homa invoke Shiva for health recovery and long life."
                ),
                Blog(
                    title="The Supreme Power of Maha Chandi Homa: Durga Saptashati Vidhi for Victory Over Severe Life Hardships",
                    slug="supreme-power-of-chandi-homa-durga-saptashati",
                    category="Divine Protection",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-01-25",
                    cover_image="/images/services/chandika-homa.jpg",
                    tags=["ChandiHoma", "DurgaSaptashati", "DeviMahatmyam"],
                    content="Maha Chandi Homa features 700 mantras of Durga Saptashati recited with sacred fire oblations, Suvasini pooja, and Kanya pooja for victory over chronic hardships and legal obstacles.",
                    seo_title="Maha Chandi Homa & Durga Saptashati | Shri Pradeep Nadig",
                    seo_description="Experience the supreme power of Maha Chandi Homa with 700 Durga Saptashati mantras and Suvasini pooja."
                ),
                Blog(
                    title="How Vedic Astrology & Prashna Marga Can Guide Your Career, Marriage, and Important Life Decisions",
                    slug="vedic-astrology-prashna-marga-guidance-guide",
                    category="Astrology & Guidance",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-02-01",
                    cover_image="/images/blogs/vedic-astrology-horoscope-reading.jpg",
                    tags=["VedicAstrology", "PrashnaMarga", "BirthChart"],
                    content="Personalized birth chart reading (Janma Kundali) and Prashna Marga horary astrology offer deep insights into Dasha timelines, marriage timing, career yogas, and Parihara solutions.",
                    seo_title="Vedic Astrology & Prashna Marga Consultation | Pradeep Nadig",
                    seo_description="Book authentic birth chart reading and Prashna Marga consultation with Shri Pradeep Nadig."
                ),
                Blog(
                    title="Sri Satyanarayana Vratha & Pooja: Ritual Steps, Auspicious Dates, and Blessings for Family Prosperity",
                    slug="satyanarayana-pooja-procedure-family-blessings",
                    category="Family & Traditions",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-02-05",
                    cover_image="/images/services/satyanarayana-pooja.jpg",
                    tags=["SatyanarayanaPooja", "FamilyBlessings", "PurnimaVratha"],
                    content="Sri Satyanarayana Vratha & Pooja is performed on Purnima or family milestones to invite peace, unity, wealth, and Lord Vishnu's grace through 5 sacred Katha narrations.",
                    seo_title="Sri Satyanarayana Vratha & Pooja Guide | Shri Pradeep Nadig",
                    seo_description="Learn the ritual steps, Purnima dates, 5 Katha stories, and family blessings of Sri Satyanarayana Vratha."
                ),
                Blog(
                    title="Sri Rudrabhishekam: The Sacred Bathing of Shiva Linga and the Healing Power of Sri Rudram Prashna",
                    slug="sri-rudrabhishekam-pooja-shiva-mantra-healing",
                    category="Sacred Poojas",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-02-10",
                    cover_image="/images/services/rudrabhishekam-pooja.jpg",
                    tags=["Rudrabhishekam", "ShivaPooja", "SriRudram"],
                    content="Sri Rudrabhishekam involves ritualistic bathing (Abhisheka) of Shiva Linga with 11 holy liquids (Ekadasa Dravya) accompanied by continuous Sri Rudram Prashna recitations.",
                    seo_title="Sri Rudrabhishekam Pooja & Sri Rudram Chanting | Pradeep Nadig",
                    seo_description="Discover the deep healing powers of Sri Rudrabhishekam Pooja and Sri Rudram Namaka-Chamaka chanting."
                ),
                Blog(
                    title="Understanding Sarpa Dosha and Naga Shanthi: Vedic Remedies for Delay in Marriage & Family Peace",
                    slug="sarpa-dosha-naga-shanthi-pooja-remedies",
                    category="Dosha Parihara",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-02-15",
                    cover_image="/images/services/naga-shanthi.jpg",
                    tags=["NagaShanthi", "SarpaDosha", "MarriageDelay"],
                    content="Naga Shanthi and Subrahmanya Homa pacify ancestral Sarpa Dosha, Rahu-Ketu karmic blockages, marriage delays, and fertility hurdles through Sarpa Sukta recitations.",
                    seo_title="Naga Shanthi & Sarpa Dosha Parihara Remedies | Pradeep Nadig",
                    seo_description="Learn how Naga Shanthi mitigates Sarpa Dosha, resolves marriage delays, and grants family peace."
                ),
                Blog(
                    title="Attracting Abundance: The Spiritual Science of Lakshmi Narayana Hrudaya Homa & Kanakadhara Stotram",
                    slug="attracting-abundance-lakshmi-narayana-kanakadhara",
                    category="Wealth & Prosperity",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-02-20",
                    cover_image="/images/services/lakshmi-narayana-hrudaya-homa.jpg",
                    tags=["LakshmiNarayanaHoma", "KanakadharaPooja", "WealthProsperity"],
                    content="Lakshmi Narayana Hrudaya Homa and Kanakadhara Stotram Pooja invoke Goddess Lakshmi and Lord Vishnu for ethical wealth growth, business prosperity, and freedom from debts.",
                    seo_title="Lakshmi Narayana Hrudaya & Kanakadhara Pooja | Pradeep Nadig",
                    seo_description="Attract wealth, business growth, and family abundance through Lakshmi Narayana Hrudaya Homa."
                ),
                Blog(
                    title="Divine Blessings for Marriage & Education: Swayamvara Parvathi Pooja and Saraswati Vidya Rituals",
                    slug="swayamvara-parvathi-saraswati-pooja-marriage-education",
                    category="Family & Knowledge",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-02-25",
                    cover_image="/images/services/swayamvara-parvathi-pooja.jpg",
                    tags=["SwayamvaraParvathi", "SaraswatiPooja", "StudentExcellence"],
                    content="Swayamvara Parvathi Pooja removes marriage delays while Sri Saraswati Vidya Pooja enhances student memory, retentive focus, and exam success through Medha Sukta recitations.",
                    seo_title="Swayamvara Parvathi & Saraswati Vidya Pooja | Pradeep Nadig",
                    seo_description="Discover Swayamvara Parvathi Pooja for marriage and Saraswati Vidya Pooja for student memory and exam success."
                ),
                Blog(
                    title="Overcoming Adversity: Sundarakanda Parayana & Sri Sudarshana Pooja for Courage and Protection",
                    slug="sundarakanda-parayana-sudarshana-pooja-protection",
                    category="Protection & Valor",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-03-01",
                    cover_image="/images/services/sundarakanda-parayana-pooja.jpg",
                    tags=["SundarakandaParayana", "SudarshanaPooja", "CourageProtection"],
                    content="Sundarakanda Parayana invokes Lord Hanuman for courage and crisis resolution, while Sri Sudarshana Pooja cuts through negative vibrations and black eye (Drishti dosha).",
                    seo_title="Sundarakanda Parayana & Sudarshana Pooja | Pradeep Nadig",
                    seo_description="Experience the courage of Sundarakanda Parayana and protection of Sri Sudarshana Pooja with Shri Pradeep Nadig."
                ),
                Blog(
                    title="The Sacred Art of Vedic Chanting: How Correct Swara Pronunciation Activates Subtle Energy Channels",
                    slug="sacred-art-of-vedic-chanting-swara-mastery",
                    category="Classes & Workshops",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-03-05",
                    cover_image="/images/courses/sacred-vedic-chanting-mastery.jpg",
                    tags=["VedicChanting", "SwaraMastery", "PurushaSukta"],
                    content="Learn authentic Sanskrit Swara accents (Udatta, Anudatta, Svarita) and master Purusha Sukta, Sri Sukta, and Durga Sukta chanting under Shri Pradeep Nadig.",
                    seo_title="Sacred Vedic Chanting & Swara Mastery | Pradeep Nadig",
                    seo_description="Learn authentic Sanskrit Swara pronunciation and master Sukta chanting under Shri Pradeep Nadig."
                ),
                Blog(
                    title="Holistic Energy Healing: Exploring 7 Chakras, Aura Cleansing, Reiki Channeling, and Hypnotherapy",
                    slug="holistic-energy-healing-chakras-aura-reiki-hypnotherapy",
                    category="Holistic Healing",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-03-10",
                    cover_image="/images/courses/chakra-aura-healing-workshop.jpg",
                    tags=["ChakraHealing", "AuraCleansing", "ReikiMastery", "Hypnotherapy"],
                    content="Master 7 chakras energy balancing, pendulum radiesthesia testing, aura cleansing, Reiki attunements, and clinical hypnotherapy & spirit release protocols.",
                    seo_title="Chakra, Aura, Reiki & Hypnotherapy Masterclass | Pradeep Nadig",
                    seo_description="Master 7 chakras energy balancing, aura cleansing, pendulum dowsing, and spirit release therapy."
                ),
                Blog(
                    title="Sacred Floor Geometry: The Ancient Tradition, Symmetry, and Spiritual Benefits of Rangoli Art",
                    slug="sacred-floor-geometry-rangoli-art-tradition",
                    category="Arts & Heritage",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-03-15",
                    cover_image="/images/courses/rangoli-art-workshop.jpg",
                    tags=["RangoliArt", "FloorGeometry", "SacredMandala"],
                    content="Discover traditional dot grids, vibrant powder blending, mandala symmetry, and spiritual symbolism of Rangoli art to invite Goddess Lakshmi into your home.",
                    seo_title="Rangoli Art & Sacred Floor Geometry Workshop | Pradeep Nadig",
                    seo_description="Discover spiritual symbolism, dot grids, and sacred floor geometry of Rangoli art in intensive workshop."
                ),
                Blog(
                    title="Vedic Rituals During Celestial Events: Solar Eclipse Shanti Pooja and Mahashivaratri Vigil Explained",
                    slug="vedic-rituals-celestial-events-surya-grahan-mahashivaratri",
                    category="Live Events & Rituals",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-03-20",
                    cover_image="/images/live-events/solar-eclipse-shanti-pooja.jpg",
                    tags=["SolarEclipsePooja", "Mahashivaratri", "CelestialEvents"],
                    content="Celestial alignments during Solar Eclipse and Mahashivaratri magnify mantra potency 1000-fold. Learn how remote Sankalpa allows global devotees to participate live.",
                    seo_title="Surya Grahan & Mahashivaratri Live Rituals | Pradeep Nadig",
                    seo_description="Learn why celestial events like Surya Grahan and Mahashivaratri possess high spiritual potency and how remote Sankalpa works."
                ),
                Blog(
                    title="Bringing Sacred Art to Life: Interactive Live Thread Art Events for Birthdays & Weddings",
                    slug="interactive-live-thread-art-events-celebrations",
                    category="Events & Celebrations",
                    author="Veda Brahma Shri Pradeep Nadig",
                    publish_date="2026-03-25",
                    cover_image="/images/live-events/thread-art-live.jpg",
                    tags=["ThreadArt", "LiveEvent", "WeddingCelebrations"],
                    content="Interactive live string art experience where guests weave colored threads across a wooden canvas to craft a collaborative portrait gift for weddings and milestone birthdays.",
                    seo_title="Interactive Live Thread Art Events | Pradeep Nadig",
                    seo_description="Discover live interactive string art events for weddings, birthdays, and celebrations across Bengaluru."
                )
            ]
            db.add_all(blogs)

        # 6. Seed Gallery Items
        existing_gallery = await db.execute(select(GalleryItem))
        if not existing_gallery.scalars().all():
            print("Seeding initial gallery items...")
            gallery_items = [
                GalleryItem(title="Mahaganapathi Homa Fire Ritual", description="Invocation of Lord Ganesha for obstacle removal.", media_url="/images/services/ganapathi-homa.jpg", media_type="Image", category="Rituals", display_order=1),
                GalleryItem(title="Ayushya Homa Birthday Blessings", description="Sacred fire ritual for health & longevity.", media_url="/images/services/ayushya-homa.jpg", media_type="Image", category="Rituals", display_order=2),
                GalleryItem(title="Maha Mrityunjaya Homa", description="Protection and health restoration ritual.", media_url="/images/services/mrityunjaya-homa.jpg", media_type="Image", category="Rituals", display_order=3),
                GalleryItem(title="Navagraha Homa Planetary Mandala", description="Harmonizing nine planetary influences.", media_url="/images/services/navagraha-homa.jpg", media_type="Image", category="Rituals", display_order=4),
                GalleryItem(title="Sri Sudarshana Homa", description="Divine protection against negative energies.", media_url="/images/services/sudarshana-homa.jpg", media_type="Image", category="Rituals", display_order=5),
                GalleryItem(title="Chandika Homa Sacred Yajna", description="Powerful ritual for victory over severe hardships.", media_url="/images/services/chandika-homa.jpg", media_type="Image", category="Rituals", display_order=6),
                GalleryItem(title="Durga Homa Protection", description="Invoking Goddess Durga for spiritual strength.", media_url="/images/services/durga-homa.jpg", media_type="Image", category="Rituals", display_order=7),
                GalleryItem(title="Aghorastra Homa", description="Shiva energy purification ritual.", media_url="/images/services/aghorastra-homa.jpg", media_type="Image", category="Rituals", display_order=8),
                GalleryItem(title="Subrahmanya Homa", description="Valor and Naga Dosha mitigation ritual.", media_url="/images/services/subrahmanya-homa.jpg", media_type="Image", category="Rituals", display_order=9),
                GalleryItem(title="Lakshmi Narayana Hrudaya Homa", description="Invoking prosperity and family abundance.", media_url="/images/services/lakshmi-narayana-hrudaya-homa.jpg", media_type="Image", category="Rituals", display_order=10),
                GalleryItem(title="Naga Shanthi Pooja", description="Serene Sarpa Dosha mitigation and blessings.", media_url="/images/services/naga-shanthi.jpg", media_type="Image", category="Rituals", display_order=11),
                GalleryItem(title="Vastu Homa Property Purification", description="Cleansing homes and commercial spaces of Vastu doshas.", media_url="/images/services/vastu-homa.jpg", media_type="Image", category="Rituals", display_order=12),
                GalleryItem(title="Sri Satyanarayana Vratha & Pooja", description="Sacred Vishnu worship for family peace.", media_url="/images/services/satyanarayana-pooja.jpg", media_type="Image", category="Poojas", display_order=13),
                GalleryItem(title="Sri Rudrabhishekam Pooja", description="Shiva Linga Panchamrutha bathing ritual.", media_url="/images/services/rudrabhishekam-pooja.jpg", media_type="Image", category="Poojas", display_order=14),
                GalleryItem(title="Sri Saraswati Vidya Pooja", description="Wisdom and educational excellence blessing.", media_url="/images/services/saraswati-pooja.jpg", media_type="Image", category="Poojas", display_order=15),
                GalleryItem(title="Swayamvara Parvathi Pooja", description="Marital harmony and wedding obstacles resolution.", media_url="/images/services/swayamvara-parvathi-pooja.jpg", media_type="Image", category="Poojas", display_order=16),
                GalleryItem(title="Sundarakanda Parayana & Chant Mastery", description="Vedic chant learning and Hanuman strength invocation.", media_url="/images/services/sundarakanda-parayana-pooja.jpg", media_type="Image", category="Workshops", display_order=17),
                GalleryItem(title="Vedic Astrology Consultation", description="Personal birth chart and horoscope analysis session.", media_url="/images/services/vedic-astrology-consultation.jpg", media_type="Image", category="Consultations", display_order=18),
            ]
            db.add_all(gallery_items)

        # 7. Seed FAQ
        existing_faq = await db.execute(select(FAQItem))
        if not existing_faq.scalars().all():
            print("Seeding initial FAQ...")
            faqs = [
                FAQItem(
                    question="What is the procedure to book a Homa or Pooja with Shri Pradeep Nadig?",
                    answer="You can send an enquiry directly via our website by selecting the desired Homa or Pooja service. Our team will verify auspicious Tithis and Muhurthas based on your birth details and contact you within 24 hours to confirm date, venue, and samagri requirements.",
                    category="Pooja & Homa",
                    display_order=1
                ),
                FAQItem(
                    question="Are all ritual materials and Samagri provided by the Purohit?",
                    answer="Yes, Veda Brahma Shri Pradeep Nadig arranges all sacred Veda Samithu wood, pure desi cow ghee, dravya powders, dry coconut, modaka, and ritual samagri required for authentic Homas in Bengaluru. Clients only need to provide basic household items like fresh flowers and fruits.",
                    category="Pooja & Homa",
                    display_order=2
                ),
                FAQItem(
                    question="Can Homas be performed at our home or business premises in Bengaluru?",
                    answer="Yes, all Homas (including Ganapathi Homa, Navagraha Homa, Vastu Homa, Mrityunjaya Homa, and Durga Homa) can be conducted at your personal residence, newly constructed home, apartment, commercial office, or chosen venue in Bengaluru.",
                    category="Pooja & Homa",
                    display_order=3
                ),
                FAQItem(
                    question="What birth details are required for a Vedic Astrology Consultation?",
                    answer="For an accurate horoscope (Janma Kundali) analysis, you need to provide your Date of Birth, exact Time of Birth, and Place of Birth. If exact birth time is unavailable, a Prashna Marga (Horary Astrology) consultation can be performed.",
                    category="Astrology & Consultations",
                    display_order=4
                ),
                FAQItem(
                    question="How are online video astrology consultations conducted for international clients?",
                    answer="Online consultations are conducted via HD Zoom or WhatsApp Video call. Shri Pradeep Nadig prepares your digital birth chart in advance, reviews Dasha-Bhukti transits, and guides you through remedies and practical solutions.",
                    category="Astrology & Consultations",
                    display_order=5
                ),
                FAQItem(
                    question="How does remote Sankalpa work for Live Events like Mahashivaratri or Eclipse Pooja?",
                    answer="When you register for a remote Sankalpa, your Name, Gothra, Nakshatra, and specific prayer intentions are solemnly uttered during the main ritual initiation by Shri Pradeep Nadig. The live stream link is emailed/whatsapped to you so you can participate from anywhere worldwide.",
                    category="Live Events & Sankalpa",
                    display_order=6
                ),
                FAQItem(
                    question="Are prerequisites required to join the Sacred Vedic Chanting Course?",
                    answer="No prior knowledge of Sanskrit is necessary. The foundation course starts from basic pronunciation rules (Sanskrit Varna Chintane), Swara accents (Udatta, Anudatta, Svarita), and step-by-step recitation of Suktas and Stotrams.",
                    category="Classes & Workshops",
                    display_order=7
                ),
                FAQItem(
                    question="How do I find an authentic Kannada Purohit near me in Bengaluru?",
                    answer="Veda Brahma Shri Pradeep Nadig is a highly experienced Kannada Purohit and Vedic Scholar based in Asharaya Layout, Vaderahalli, Bengaluru (Pin: 560097). He conducts traditional Kannada Vadhyar rituals, Griha Pravesha, Ganapathi Homa, Vastu Homa, and Navagraha Homas across Bengaluru including Yelahanka, Vidyaranyapura, Hebbal, Sahakara Nagar, Malleswaram, and Jayanagar.",
                    category="Local Purohit Services",
                    display_order=8
                ),
                FAQItem(
                    question="Is a Vedic Pandit near me available for Griha Pravesha and Vastu Homa at home?",
                    answer="Yes! Shri Pradeep Nadig and his trained team of Vedic Pandits travel directly to your residence, newly built apartment, or office in Bengaluru for Griha Pravesha, Vastu Purusha Homa, and Navagraha Shanthi. All sacred Samagri and Veda Samithu are arranged by the Purohit.",
                    category="Local Purohit Services",
                    display_order=9
                ),
                FAQItem(
                    question="How can I locate Veda Brahma Shri Pradeep Nadig on Google Maps?",
                    answer="You can search for 'Pradeep Nadig Asharaya layout Vaderahalli' on Google Maps or open our official Google Maps location link: https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097. In-person consultations and prayer bookings are held at our center in Vaderahalli, North Bengaluru.",
                    category="Local Purohit Services",
                    display_order=10
                ),
                FAQItem(
                    question="Can I book a Kannada Astrologer near me for in-person birth chart reading?",
                    answer="Yes, Shri Pradeep Nadig offers in-person Vedic astrology consultations at Shaankari Kendra in Bengaluru as well as online HD Zoom video calls for outstation and overseas clients. Birth chart (Janma Kundali) reading, Dasha predictions, and practical Parihara remedies are provided.",
                    category="Astrology & Consultations",
                    display_order=11
                )
            ]
            db.add_all(faqs)

        # 10. Seed Initial Client Reviews
        existing_reviews = await db.execute(select(Review))
        if not existing_reviews.scalars().all():
            print("Seeding initial approved client reviews...")
            reviews_data = [
                Review(
                    name="Ramesh Kumar & Family",
                    email="ramesh.k@gmail.com",
                    city="Malleswaram, Bengaluru",
                    rating=5,
                    service_type="Griha Pravesha Pooja",
                    comment="Shri Pradeep Nadig conducted our housewarming Griha Pravesha with immaculate devotion, pristine Swara chanting, and complete explanations of each Vastu & Homa step. Our entire family felt immense divine vibrations and spiritual tranquility.",
                    status="Approved",
                    display_order=1
                ),
                Review(
                    name="Smt. Sunitha & Master Arvind",
                    email="sunitha.yelahanka@yahoo.com",
                    city="Yelahanka, Bengaluru",
                    rating=5,
                    service_type="Sacred Vedic Chanting Mastery Course",
                    comment="Learning Purusha Sukta and Sri Sukta under Guruji Pradeep Nadig has been a life-transforming experience. His patience with Swara intonation and audio feedback is unparalleled.",
                    status="Approved",
                    display_order=2
                ),
                Review(
                    name="Dr. Venkatesh Rao",
                    email="dr.venkatesh.rao@outlook.com",
                    city="Vidyaranyapura, Bengaluru",
                    rating=5,
                    service_type="Prashna Marga Horary Astrology",
                    comment="Shri Pradeep's Prashna chart analysis was astonishingly accurate regarding our career transition. His Parihara remedies were simple, practical, and highly effective without unnecessary commercial gimmicks.",
                    status="Approved",
                    display_order=3
                ),
                Review(
                    name="Anantharaman & Family",
                    email="ananth.indiranagar@gmail.com",
                    city="Indiranagar, Bengaluru",
                    rating=5,
                    service_type="Ganapathi Homa",
                    comment="We performed Mahaganapathi Homa and Navagraha Shanthi at our home before starting our new business venture. Guruji's punctuality, authentic samagri setup, and divine mantras brought absolute peace.",
                    status="Approved",
                    display_order=4
                ),
                Review(
                    name="Vidya Sagar M",
                    email="vidyasagar.bgr@gmail.com",
                    city="Sahakara Nagar, Bengaluru",
                    rating=5,
                    service_type="Vastu Shastra Energy Healing & Consultation",
                    comment="Practical Vastu guidance without demolition or structural hassle. Highly recommend Shri Pradeep Nadig for anyone seeking genuine Vedic guidance and home energy balance in Bangalore.",
                    status="Approved",
                    display_order=5
                )
            ]
            db.add_all(reviews_data)

        await db.commit()
        print("Database seeded successfully!")
        break

if __name__ == "__main__":
    asyncio.run(seed_database())
