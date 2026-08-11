import { Offering, Workshop, ClassItem, Blog, FAQItem, GalleryItem } from "@/types";

export const FALLBACK_SETTINGS: Record<string, any> = {
  site_name: "Veda Brahma Shri Pradeep Nadig",
  hero_title: "Veda Brahma Shri Pradeep Nadig",
  hero_subtitle: "Vedic Scholar, Astrologer & Spiritual Guide committed to authentic traditions and sacred wisdom.",
  contact_mobile: "+91 98440 42068",
  whatsapp_number: "919844042068",
  contact_email: "pradeep@vedabrahma.com",
  office_address: "Asharaya layout, Vaderahalli, K.G.Vaderahalli, Bengaluru, Karnataka 560097",
  google_maps_link: "https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097",
  social_links: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  privacy_policy: "Privacy Policy content for Veda Brahma Shri Pradeep Nadig.",
  terms_conditions: "Terms & Conditions content for Veda Brahma Shri Pradeep Nadig.",
  refund_policy: "Refund Policy content for Workshop registrations.",
  cancellation_policy: "Cancellation Policy content for Consultations & Workshops.",
  cookie_policy: "Cookie Policy content.",
};

export const FALLBACK_OFFERINGS: Offering[] = [
  {
    id: 1,
    type: "Service",
    title: "Mahaganapathi Homa",
    slug: "ganapathi-homa",
    who_benefits: "Removes all unseen obstacles, grants clarity of thought, bestows success in new ventures, and brings peace to homes and businesses.",
    where_performed: "Conducted at homes, newly constructed houses, business offices, or designated sacred halls in Bengaluru.",
    when_performed: "Ideal during housewarmings (Griha Pravesha), before launching a business, weddings, annual family prayers, or Sankashti Chaturthi.",
    who_should_attend: "Entire family, business partners, house-owners, newlyweds, and individuals starting new career or academic milestones.",
    vidhi_details: "Includes Mahaganapathi Avahana, Atharvashirsha Trishati Chanting, Modaka, Ashta Dravya, Sugandhi Dravya & Ghee 108 Ahuti offerings, Poornahuti, and Modaka Prasadam.",
    short_description: "A sacred ritual to invoke Lord Ganesha to remove obstacles and bring prosperity.",
    full_description: "Mahaganapathi Homa is performed at the beginning of any new venture, marriage, housewarming, or annually for peace and obstacle removal.",
    images: ["/images/services/ganapathi-homa.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Ganapathi Homa - Authentic Vedic Ritual",
    seo_description: "Perform Ganapathi Homa with Veda Brahma Shri Pradeep Nadig for removing obstacles and inviting prosperity.",
    faq: [
      { question: "How long does Ganapathi Homa take?", answer: "The homa typically takes 2 to 3 hours depending on specific sankalpa." },
      { question: "What items are required?", answer: "A detailed samagri list is shared upon confirmation." }
    ]
  },
  {
    id: 2,
    type: "Service",
    title: "Navagraha Homa",
    slug: "navagraha-homa",
    who_benefits: "Harmonizes planetary influences (Grahadosha), mitigates Rahu-Ketu/Sade Sati effects, improves health, career stability, and family peace.",
    where_performed: "Conducted at home, outdoor courtyards, or sacred mandaps in Bengaluru.",
    when_performed: "During unfavorable planetary Dashas/Bhuktis, transit changes, birthdays, or before major life decisions.",
    who_should_attend: "Individuals undergoing difficult astrological periods, family members, and those seeking overall planetary harmony.",
    vidhi_details: "Setup of 9 Square Navagraha Mandala, 9 Grain (Navadhanya) offerings, planetary specific Veda Samithu (Arka, Palasa, Khadira, Apamarga, etc.) Ahutis, Samidha Tarpanam, and Raksha Sutra Bandhana.",
    short_description: "Performed to seek the blessings of the nine planetary deities and reduce planetary doshas.",
    full_description: "Navagraha Homa is performed to seek the blessings of the nine planetary deities (Navagrahas), reduce the effects of adverse planetary positions, and bring harmony, prosperity, and overall well-being into life.",
    images: ["/images/services/navagraha-homa.jpg"],
    display_order: 2,
    status: "Published",
    seo_title: "Navagraha Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Harmonize planetary influences and reduce doshas with authentic Navagraha Homa.",
    faq: [
      { question: "How long does Navagraha Homa take?", answer: "Typically 2.5 to 3.5 hours." },
      { question: "When is it recommended?", answer: "Before important life events, during difficult planetary periods (Dasha/Bhukti), or for general prosperity." }
    ]
  },
  {
    id: 3,
    type: "Service",
    title: "Mrityunjaya Homa",
    slug: "mrityunjaya-homa",
    who_benefits: "Grants health restoration, longevity, protection against accidental hazards, mental peace, and relief from chronic illnesses.",
    where_performed: "Performed at residences, hospital prayer rooms (for recovery), or sacred temple sanctums.",
    when_performed: "Birthdays (especially 60th Ugraratha Shanthi, 70th, 80th), during severe illnesses, or prior to major medical procedures.",
    who_should_attend: "The person seeking health recovery/longevity, family members, children, and elders.",
    vidhi_details: "Maha Mrityunjaya Mantra 1008/108 Japa, Amrita Kalasa Sthapana, Durva grass, Milk, Ghee, and Sesame seeds 108 Ahuti, Mrityunjaya Kalasabhishekam, and Ayur Raksha Threading.",
    short_description: "Dedicated to Lord Shiva for protection from illness, accidents, and promoting longevity.",
    full_description: "Mrityunjaya Homa is dedicated to Lord Shiva and is performed for protection from illness, accidents, untimely dangers, and to promote long life, good health, and inner strength.",
    images: ["/images/services/mrityunjaya-homa.jpg"],
    display_order: 3,
    status: "Published",
    seo_title: "Mrityunjaya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Seek Shiva's divine protection, long life, and mental strength through Mrityunjaya Homa.",
    faq: [
      { question: "How long does the Homa take?", answer: "Approximately 2.5 to 3 hours." },
      { question: "Who should perform it?", answer: "Recommended for those facing health challenges, major life obstacles, or seeking divine protection." }
    ]
  },
  {
    id: 4,
    type: "Service",
    title: "Ayushya Homa",
    slug: "ayushya-homa",
    who_benefits: "Invokes divine blessings of Markandeya & Ayur Devatas for long life, healthy development, immunity, and vitality.",
    where_performed: "Conducted at home, event halls, or family prayer spaces.",
    when_performed: "First birthday of a child (Ayushya Homa), annual birthdays, or recovery after illness.",
    who_should_attend: "Infants, birthday celebrated individuals, parents, grandparents, and well-wishers.",
    vidhi_details: "Ayur Devata Sthapana, Charu (sweet rice) Ahuti, Brahma-Vishnu-Shiva Ayur Sukta chanting, Ghee oblations, Kalasabhishekam for the child, and Prasadam.",
    short_description: "Performed to pray for a long, healthy, and prosperous life, especially on birthdays.",
    full_description: "Ayushya Homa is performed to pray for a long, healthy, and prosperous life. It is especially performed on birthdays, for young children, and during important life milestones.",
    images: ["/images/services/ayushya-homa.jpg"],
    display_order: 4,
    status: "Published",
    seo_title: "Ayushya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke blessings for health, vitality, and longevity with authentic Ayushya Homa.",
    faq: [
      { question: "When should Ayushya Homa be performed?", answer: "Commonly on birthdays, especially the first birthday and annual birthdays." },
      { question: "How long does it take?", answer: "Around 2 to 3 hours." }
    ]
  },
  {
    id: 5,
    type: "Service",
    title: "Durga Homa",
    slug: "durga-homa",
    who_benefits: "Invokes Goddess Durga's protection against negative energies, envy, fear, litigation troubles, and bestows supreme courage.",
    where_performed: "Home altars, office spaces, or open sacred courtyards.",
    when_performed: "During Navaratri, Rahu Kala, Tuesdays, Fridays, or when facing persistent external disturbances.",
    who_should_attend: "Family members, women seeking divine strength, and business leaders.",
    vidhi_details: "Navadurga Avahana, Sri Sukta & Durga Sukta recitation, Red Lotus & Kumkum oblations, Ghee & Payasam Homa, Poornahuti, and Kumkuma Prasadam.",
    short_description: "Invoke Goddess Durga for protection, courage, success, and removal of negative energies.",
    full_description: "Durga Homa is performed to invoke the divine blessings of Goddess Durga for protection, courage, success, and the removal of negative energies and obstacles.",
    images: ["/images/services/durga-homa.jpg"],
    display_order: 5,
    status: "Published",
    seo_title: "Durga Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke Goddess Durga's blessings for protection, courage, and spiritual strength.",
    faq: [
      { question: "When is Durga Homa recommended?", answer: "During Navaratri, before major life events, or whenever spiritual protection is sought." },
      { question: "Duration?", answer: "Approximately 2.5 to 3 hours." }
    ]
  },
  {
    id: 6,
    type: "Service",
    title: "Chandika Homa",
    slug: "chandika-homa",
    who_benefits: "Powerful protection against severe black magic, chronic legal disputes, enemies, unseen negative forces, and deep karmic blockages.",
    where_performed: "Sacred homa mandaps, open temple grounds, or spacious home courtyards.",
    when_performed: "Chandi Navami, Navaratri, Amavasya, or when recommended after detailed horoscope examination.",
    who_should_attend: "The primary devotee (Sankalpa Karta), family members, and close relatives.",
    vidhi_details: "Detailed 700 Mantra Durga Saptashati Homa (Chandi Homa), 13 Chapter Ahutis, Dampati Pooja, Suvasini Pooja, Brahmachari Pooja, Kanya Pooja, and Mahapoornahuti with Silk Saree & Coconut.",
    short_description: "A powerful Vedic fire ritual dedicated to Goddess Chandika for victory over severe obstacles.",
    full_description: "Chandika Homa is a powerful Vedic fire ritual dedicated to Goddess Chandika for victory over difficulties, removal of powerful negative influences, and protection from unseen obstacles.",
    images: ["/images/services/chandika-homa.jpg"],
    display_order: 6,
    status: "Published",
    seo_title: "Chandika Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Powerful Chandika Homa for victory over hardships and severe obstacles.",
    faq: [
      { question: "Who should perform Chandika Homa?", answer: "Recommended for those facing persistent hardships, legal issues, or major life challenges." },
      { question: "Duration?", answer: "Usually 3 to 5 hours." }
    ]
  },
  {
    id: 7,
    type: "Service",
    title: "Vastu Homa",
    slug: "vastu-homa",
    who_benefits: "Purifies domestic & commercial property, neutralizes structural Vastu Doshas, attracts wealth, and creates peaceful living environments.",
    where_performed: "At the specific home, newly built apartment, plot, or commercial office.",
    when_performed: "Before Griha Pravesha (housewarming), after major structural renovations, or when experiencing unexplained disturbances in a house.",
    who_should_attend: "Property owners, family members, partners, and residents.",
    vidhi_details: "Vastu Purusha Mandala Sthapana, Digpalaka Bali, Navadhanya & Wooden Samidha offerings, Vastu Purusha Pooja, Kalasa Prokshana throughout all rooms, and Sthapati Nirmalya.",
    short_description: "Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy.",
    full_description: "Vastu Homa is performed to purify homes, offices, and commercial spaces, remove Vastu doshas, and invite peace, prosperity, and positive energy into the property.",
    images: ["/images/services/vastu-homa.jpg"],
    display_order: 7,
    status: "Published",
    seo_title: "Vastu Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Purify property and remove Vastu doshas with authentic Vastu Homa rituals.",
    faq: [
      { question: "When should Vastu Homa be performed?", answer: "Before entering a new home, after renovations, or when experiencing persistent disturbances." },
      { question: "Duration?", answer: "Typically 2.5 to 3.5 hours." }
    ]
  },
  {
    id: 8,
    type: "Service",
    title: "Aghorastra Homa",
    slug: "aghorastra-homa",
    who_benefits: "Sacred Shiva ritual for ultimate spiritual protection, destroying evil eye (Drishti), severe negativity, and spiritual blockages.",
    where_performed: "Conducted at home prayer spaces, sacred outdoor mandaps, or temple altars.",
    when_performed: "Mantra Siddhi Tithis, Pradosham, Masa Shivaratri, or when experiencing extreme negative disturbances.",
    who_should_attend: "Sankalpa Karta and family members seeking spiritual shielding.",
    vidhi_details: "Aghora Shiva Avahana, Aghorastra Mantra 1008 Japa & Homa, Mustard & Black Sesame oblations, Bhasma Prokshana, and Protective Shiva Raksha.",
    short_description: "A sacred Shiva ritual performed for powerful spiritual protection and removal of negativity.",
    full_description: "Aghorastra Homa is a sacred Shiva ritual performed for powerful spiritual protection, removal of severe negative energies, unseen obstacles, and to strengthen divine grace.",
    images: ["/images/services/aghorastra-homa.jpg"],
    display_order: 8,
    status: "Published",
    seo_title: "Aghorastra Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Sacred Shiva ritual for ultimate spiritual protection and energy purification.",
    faq: [
      { question: "Who should perform Aghorastra Homa?", answer: "Recommended for those seeking powerful spiritual protection and relief from persistent negativity." },
      { question: "Duration?", answer: "Approximately 3 to 4 hours." }
    ]
  },
  {
    id: 9,
    type: "Service",
    title: "Naga Shanthi",
    slug: "naga-shanthi",
    who_benefits: "Mitigates Sarpa Dosha, Naga Dosha, delays in marriage, fertility issues, skin ailments, and ancestral karmic obstacles.",
    where_performed: "Conducted at home, dedicated Naga Kshetra venues, or open mandaps.",
    when_performed: "Panchami Tithi (especially Nagapanchami), Shravana Month, or on dates advised by astrologer.",
    who_should_attend: "Couples seeking children, individuals facing marriage delays, and family heads.",
    vidhi_details: "Ashta Naga Mandalarchana, Milk & Sandalwood Abhisheka to Naga Prathima, Sarpa Sukta Japa, Sesame & Ghee Ahuti, Ksheerabhishekam, and Naga Prathima Daanam.",
    short_description: "Seek blessings of Naga Devatas, reduce Sarpa Dosha, and support family harmony.",
    full_description: "Naga Shanthi is performed to seek the blessings of the Naga Devatas, reduce Sarpa Dosha, and remove obstacles related to marriage, childbirth, family well-being, and ancestral karma.",
    images: ["/images/services/naga-shanthi.jpg"],
    display_order: 9,
    status: "Published",
    seo_title: "Naga Shanthi | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Perform Naga Shanthi to mitigate Sarpa Dosha and invite peace and fertility.",
    faq: [
      { question: "When is Naga Shanthi recommended?", answer: "When advised through horoscope analysis or for relief from Sarpa Dosha." },
      { question: "Duration?", answer: "Usually 2.5 to 3 hours." }
    ]
  },
  {
    id: 10,
    type: "Service",
    title: "Subrahmanya Homa",
    slug: "subrahmanya-homa",
    who_benefits: "Grants victory over obstacles, courage, success in competitive exams/career, relief from Kuja/Mars Dosha & Naga Dosha.",
    where_performed: "Conducted at home, private auditoriums, or temple halls.",
    when_performed: "Sashti Tithi (Skanda Sashti), Tuesdays, Kiruthigai, or before important competitive milestones.",
    who_should_attend: "Students, young professionals, siblings, and individuals with Kuja Dosha.",
    vidhi_details: "Lord Subrahmanya Avahana with Vel, Subrahmanya Trishati & Gayatri Chanting, Panchamrutha & Red Flower Ahuti, Vel Pooja, and Raksha Prasadam.",
    short_description: "Dedicated to Lord Subrahmanya for courage, wisdom, victory over obstacles, and relief from doshas.",
    full_description: "Subrahmanya Homa is dedicated to Lord Subrahmanya (Murugan/Kartikeya) for courage, wisdom, victory over obstacles, relief from Naga Dosha, and overall success in life.",
    images: ["/images/services/subrahmanya-homa.jpg"],
    display_order: 10,
    status: "Published",
    seo_title: "Subrahmanya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke Lord Subrahmanya's grace for courage, career growth, and victory.",
    faq: [
      { question: "Who should perform Subrahmanya Homa?", answer: "Recommended for students, professionals, families, and those seeking relief from Naga-related doshas." },
      { question: "Duration?", answer: "Around 2.5 to 3 hours." }
    ]
  },
  {
    id: 11,
    type: "Service",
    title: "Lakshmi Narayana Hrudaya Homa",
    slug: "lakshmi-narayana-hrudaya-homa",
    who_benefits: "Invokes combined divine grace of Lord Vishnu & Goddess Lakshmi for sustainable wealth, family affection, spiritual growth, and high prosperity.",
    where_performed: "Home living rooms, business offices, or event venues.",
    when_performed: "Fridays, Purnima, Diwali, Akshaya Tritiya, or annual family thanksgiving.",
    who_should_attend: "Husband & wife, family members, business partners, and employees.",
    vidhi_details: "Narayana Hrudaya & Lakshmi Hrudaya Stotram Samputita Homa, Lotus Flower & Ghee Ahuti, Ashta Lakshmi Archana, Ksheera Payasa Naivedya, and Poornahuti.",
    short_description: "Invoke combined blessings of Goddess Lakshmi and Lord Narayana for wealth, harmony, and abundance.",
    full_description: "Lakshmi Narayana Hrudaya Homa is performed to invoke the combined blessings of Goddess Lakshmi and Lord Narayana for wealth, prosperity, family harmony, spiritual growth, and overall abundance.",
    images: ["/images/services/lakshmi-narayana-hrudaya-homa.jpg"],
    display_order: 11,
    status: "Published",
    seo_title: "Lakshmi Narayana Hrudaya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Attract prosperity, wealth, and family harmony with Lakshmi Narayana Hrudaya Homa.",
    faq: [
      { question: "When is Lakshmi Narayana Hrudaya Homa recommended?", answer: "Ideal for business owners, families, before new ventures, or anyone seeking prosperity and harmony." },
      { question: "Duration?", answer: "Typically 3 to 4 hours." }
    ]
  },
  {
    id: 12,
    type: "Consultation",
    title: "Vedic Astrology Consultation",
    slug: "vedic-astrology-consultation",
    who_benefits: "Anyone seeking birth chart analysis, planetary dasha insights, career direction, marriage compatibility, and authentic Vedic remedies.",
    where_performed: "In-person consultation at Bengaluru office or virtual session over Google Meet / Phone Call.",
    when_performed: "Before major life decisions, weddings, business investments, or during periods of confusion.",
    who_should_attend: "The individual, parents (for child's chart), or couples (for marriage matching).",
    vidhi_details: "Prashna Kundali analysis, Janma Patrika Graha Sthiti examination, Dasha-Bhukti evaluation, and customized Stotra & Homa remedy recommendations.",
    short_description: "In-depth analysis of your birth chart, planetary positions, and life guidance.",
    full_description: "Comprehensive horoscope analysis covering career, health, relationships, and precise Vedic remedies by Veda Brahma Shri Pradeep Nadig.",
    images: ["/images/services/vedic-astrology-consultation.jpg"],
    display_order: 12,
    status: "Published",
    seo_title: "Vedic Astrology Consultation with Shri Pradeep Nadig",
    seo_description: "Get accurate birth chart analysis and personal guidance from renowned Vedic scholar Pradeep Nadig.",
    faq: [
      { question: "What details are required?", answer: "Date of birth, exact time of birth, and place of birth." }
    ]
  },
  {
    id: 13,
    type: "Pooja",
    title: "Sri Satyanarayana Vratha & Pooja",
    slug: "satyanarayana-pooja",
    who_benefits: "Brings peace, happiness, unity, and abundance to families, home-owners, newlyweds, and business owners.",
    where_performed: "Conducted at your home, apartment, commercial office space, or selected prayer mandap in Bengaluru.",
    when_performed: "Ideal on Purnima (Full Moon), Ekadashi, Sankranti, housewarmings (Griha Pravesha), weddings, or birthdays.",
    who_should_attend: "All family members, relatives, friends, and devotees are encouraged to attend and partake in Prasadam.",
    vidhi_details: "Includes Ganapathi Pooja, Navagraha Smarana, Kalasa Sthapana, Satyanarayana Ashtottara Shatanamavali, 5 Sacred Katha Adhyayas (Stories), Panchamrutha Abhishekam, Mahamangalarthi, and Distribution of Wheat Sheera Prasadam.",
    short_description: "A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires.",
    full_description: "Sri Satyanarayana Vratha & Pooja is traditionally performed on Purnima (Full Moon), Ekadashi, or during family milestones to seek Lord Vishnu's grace, invite peace, wealth, and spiritual well-being.",
    images: ["/images/services/satyanarayana-pooja.jpg"],
    display_order: 13,
    status: "Published",
    seo_title: "Sri Satyanarayana Vratha & Pooja | Shri Pradeep Nadig",
    seo_description: "Perform authentic Sri Satyanarayana Vratha with Veda Brahma Shri Pradeep Nadig for family harmony and prosperity.",
    faq: [
      { question: "When is the ideal time to perform Satyanarayana Pooja?", answer: "Full Moon (Purnima) days, Ekadashi, housewarmings, or anniversaries." },
      { question: "How long does the Pooja take?", answer: "Approximately 2 to 2.5 hours." }
    ]
  },
  {
    id: 14,
    type: "Pooja",
    title: "Sri Rudrabhishekam Pooja",
    slug: "rudrabhishekam-pooja",
    who_benefits: "Protects against chronic illness, negative energies, mental distress, financial blockages, and karmic impediments.",
    where_performed: "Can be performed at home, private prayer rooms, temple halls, or outdoors in quiet sanctums.",
    when_performed: "Mondays, Pradosham days, Masa Shivaratri, Shravana month, or during personal health recovery.",
    who_should_attend: "Individuals facing health issues, spiritual seekers, and entire families praying for health and peace.",
    vidhi_details: "Mahaganapathi Pooja, Sankalpa, Rudra Kalasa Sthapana, Ekadasa Dravya Abhisheka with continuous Sri Rudra Prashna chanting, Bilva Patra Archana, and Shanti Chanting.",
    short_description: "Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection.",
    full_description: "Sri Rudrabhishekam Pooja involves ritualistic sacred bathing (Abhisheka) to Lord Shiva with Panchamrutha accompanied by Sri Rudram and Chamakam chanting, bestowing health, longevity, and liberation from negative karma.",
    images: ["/images/services/rudrabhishekam-pooja.jpg"],
    display_order: 14,
    status: "Published",
    seo_title: "Sri Rudrabhishekam Pooja | Shri Pradeep Nadig",
    seo_description: "Seek Shiva's grace and inner peace through traditional Sri Rudrabhishekam Pooja.",
    faq: [
      { question: "What materials are used for Abhisheka?", answer: "Milk, curd, honey, ghee, sugar, tender coconut water, and sacred Bilva leaves." },
      { question: "Duration?", answer: "About 2 to 3 hours." }
    ]
  },
  {
    id: 15,
    type: "Pooja",
    title: "Mahalakshmi Kanakadhara Pooja",
    slug: "mahalakshmi-kanakadhara-pooja",
    who_benefits: "Business owners, entrepreneurs, working professionals, and families seeking financial growth and stability.",
    where_performed: "Performed at business offices, retail shops, factories, or home altars.",
    when_performed: "Fridays, Varalakshmi Vratha, Diwali Lakshmi Pooja day, or at the launch of new business ventures.",
    who_should_attend: "Business partners, shop owners, family elders, and household members.",
    vidhi_details: "Ashta Lakshmi Kalasa Sthapana, Lotus Flower Archana, Kanakadhara Stotram 108 recitations, Sri Sukta Homa/Pooja, Kumkuma Archana, and Naivedya offering.",
    short_description: "Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance.",
    full_description: "Mahalakshmi Kanakadhara Pooja is performed with Kanakadhara Stotram recitations to invoke Goddess Lakshmi's eternal blessings for financial stability, wealth abundance, and removal of debts.",
    images: ["/images/services/lakshmi-narayana-hrudaya-homa.jpg"],
    display_order: 15,
    status: "Published",
    seo_title: "Mahalakshmi Kanakadhara Pooja | Shri Pradeep Nadig",
    seo_description: "Invoke Goddess Lakshmi for financial growth and family prosperity.",
    faq: [
      { question: "Who should perform Kanakadhara Pooja?", answer: "Recommended for business owners, families, and anyone seeking financial stability." }
    ]
  },
  {
    id: 16,
    type: "Pooja",
    title: "Swayamvara Parvathi Pooja",
    slug: "swayamvara-parvathi-pooja",
    who_benefits: "Single individuals looking for marriage, parents seeking good matches for children, and married couples aiming for harmony.",
    where_performed: "Performed at home prayer altars or designated sacred venues.",
    when_performed: "Fridays, auspicious Tithis, or when advised by Vedic astrology consultation.",
    who_should_attend: "The bride/groom-to-be, parents, or spouse.",
    vidhi_details: "Gauri Pooja, Swayamvara Parvathi Mantra Japa (108/1008 times), Turmeric/Kumkum Archana, Lotus flower offerings, Mangalya Bhagya Sankalpa, and Prasadam distribution.",
    short_description: "Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony.",
    full_description: "Swayamvara Parvathi Pooja is a sacred ritual specifically recommended for overcoming obstacles in finding a suitable life partner, eliminating delays in marriage, and strengthening affection between couples.",
    images: ["/images/services/swayamvara-parvathi-pooja.jpg"],
    display_order: 16,
    status: "Published",
    seo_title: "Swayamvara Parvathi Pooja | Shri Pradeep Nadig",
    seo_description: "Perform Swayamvara Parvathi Pooja to remove marriage delays and foster marital peace.",
    faq: [
      { question: "Can this Pooja be performed on behalf of someone?", answer: "Yes, parents or close relatives can perform the Sankalpa in the person's name." }
    ]
  },
  {
    id: 17,
    type: "Pooja",
    title: "Sri Saraswati Vidya Pooja",
    slug: "saraswati-pooja",
    who_benefits: "School & college students, competitive exam aspirants, musicians, writers, and educators.",
    where_performed: "At home study rooms, educational institutions, or music/dance academies.",
    when_performed: "Vasant Panchami, Navaratri Saraswati Pooja day, Vidyarambha, or prior to major examination seasons.",
    who_should_attend: "Students, children, parents, and teachers.",
    vidhi_details: "Saraswati Avahana, Pustaka/Instrument Pooja, Medha Sukta Chanting, 108 Namavali Archana with white flowers, Aksharabhyasa ritual (if for young toddlers), and Vidya Naivedya.",
    short_description: "Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery.",
    full_description: "Sri Saraswati Vidya Pooja is performed for students, scholars, artists, and educators to enhance intellect, concentration, public speaking abilities, and success in studies and competitive examinations.",
    images: ["/images/services/saraswati-pooja.jpg"],
    display_order: 17,
    status: "Published",
    seo_title: "Sri Saraswati Vidya Pooja | Shri Pradeep Nadig",
    seo_description: "Seek Goddess Saraswati's divine blessings for wisdom, memory power, and academic success.",
    faq: [
      { question: "When is Saraswati Pooja recommended?", answer: "Before academic exams, initiation of learning (Vidyarambha), or on Vasant Panchami/Navaratri." }
    ]
  },
  {
    id: 18,
    type: "Pooja",
    title: "Sundarakanda Parayana & Pooja",
    slug: "sundarakanda-parayana-pooja",
    who_benefits: "Those facing daunting challenges, court cases, fear, depression, or seeking high mental confidence.",
    where_performed: "Home altars, community halls, or temple mandaps.",
    when_performed: "Tuesdays, Saturdays, Hanuman Jayanti, or during critical life junctures.",
    who_should_attend: "Family members, devotees of Lord Hanuman, and individuals seeking victory over adversity.",
    vidhi_details: "Hanuman Chalisa & Sundarakanda Sarga Chanting, Vadapav/Betel Leaf Mala Arpan, Sindoor Archana, Deeparadhana, and Sundarakanda Phala Shruti recitations.",
    short_description: "Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection.",
    full_description: "Sundarakanda Parayana & Pooja invokes Lord Hanuman and Sri Rama to grant immense courage, mental fortitude, resolution of complex problems, and protection from negative energies.",
    images: ["/images/services/sundarakanda-parayana-pooja.jpg"],
    display_order: 18,
    status: "Published",
    seo_title: "Sundarakanda Parayana & Pooja | Shri Pradeep Nadig",
    seo_description: "Experience the strength of Sundarakanda Parayana guided by Shri Pradeep Nadig.",
    faq: [
      { question: "What are the benefits?", answer: "Promotes inner strength, removes fear, and grants success in challenging endeavors." }
    ]
  },
  {
    id: 19,
    type: "Pooja",
    title: "Sri Sudarshana Pooja",
    slug: "sudarshana-pooja",
    who_benefits: "Individuals suffering from unexplained fear, evil eye, negative competition, or persistent illness.",
    where_performed: "At home, office premises, or temple sanctums.",
    when_performed: "Wednesdays, Saturdays, Ekadashi, or during planetary affliction periods.",
    who_should_attend: "Key family heads, business owners, and affected individuals.",
    vidhi_details: "Sudarshana Yantra Pooja, Sudarshana Ashtottara Archana, Chakra Abhishekam, Shatru Samhara Sankalpa, and Raksha Sutra Bandhana.",
    short_description: "Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences.",
    full_description: "Sri Sudarshana Pooja invokes Lord Sudarshana to eliminate negative vibrations, black eye (Drishti dosha), health ailments, and grant immediate divine protection.",
    images: ["/images/services/sudarshana-homa.jpg"],
    display_order: 19,
    status: "Published",
    seo_title: "Sri Sudarshana Pooja | Shri Pradeep Nadig",
    seo_description: "Divine protection and relief from negative influences through Sri Sudarshana Pooja.",
    faq: [
      { question: "Duration?", answer: "Approximately 2 to 2.5 hours." }
    ]
  },
  {
    id: 20,
    type: "Pooja",
    title: "Durga Saptashati Parayana & Pooja",
    slug: "durga-saptashati-pooja",
    who_benefits: "Devotees seeking supreme protection from Goddess Durga, overcoming deep life struggles, and family peace.",
    where_performed: "Homes, prayer mandaps, or temple halls.",
    when_performed: "Navaratri days, Tuesdays, Fridays, Ashtami, and Navami Tithis.",
    who_should_attend: "All family members and spiritual seekers.",
    vidhi_details: "Kavacha, Argala, Kilaka recitations, 13 Adhyaya Durga Saptashati Parayana, Chandi Navakshari Japa, Kumkumarchana, and Mahamangalarthi.",
    short_description: "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
    full_description: "Durga Saptashati Parayana & Pooja is an auspicious ritual worshipping the Divine Mother in her various manifestations, bringing destruction of negativity, supreme peace, and material and spiritual well-being.",
    images: ["/images/services/chandika-homa.jpg"],
    display_order: 20,
    status: "Published",
    seo_title: "Durga Saptashati Parayana & Pooja | Shri Pradeep Nadig",
    seo_description: "Sacred Durga Saptashati Parayana for divine grace, victory, and protection.",
    faq: [
      { question: "Duration?", answer: "Usually 3 to 4 hours." }
    ]
  }
];

export const FALLBACK_WORKSHOPS: Workshop[] = [
  {
    id: 1,
    title: "Vedic Chant Mastery Workshop",
    slug: "vedic-chant-mastery-august-2026",
    cover_image: "/images/services/sundarakanda-parayana-pooja.jpg",
    description: "Learn accurate phonetics, intonation (Swaras), and profound meanings of classical Vedic Suktas under authentic guidance.",
    start_date: "2026-08-15",
    end_date: "2026-08-17",
    venue: "Veda Cultural Center, Bengaluru",
    address: "12th Main, Malleshwaram, Bengaluru 560003",
    google_maps_link: "https://maps.google.com",
    duration: "3 Days (15 Hours)",
    price: 2500,
    capacity: 30,
    status: "Published",
    registration_deadline: "2026-08-14",
    featured: true,
    seo_title: "Vedic Chant Mastery Workshop - August 2026",
    seo_description: "Join Shri Pradeep Nadig for an intensive 3-day Vedic chant mastery workshop in Bengaluru.",
    batches: [
      {
        id: 1,
        workshop_id: 1,
        batch_name: "Morning Batch (7:00 AM - 10:00 AM)",
        start_time: "07:00 AM",
        end_time: "10:00 AM",
        capacity: 15,
        remaining_seats: 15,
        status: "Active",
      },
      {
        id: 2,
        workshop_id: 1,
        batch_name: "Evening Batch (5:00 PM - 8:00 PM)",
        start_time: "05:00 PM",
        end_time: "08:00 PM",
        capacity: 15,
        remaining_seats: 15,
        status: "Active",
      },
    ],
  },
  {
    id: 2,
    title: "Guided Meditation & Prana Intensive",
    slug: "meditation",
    cover_image: "/images/services/rudrabhishekam-pooja.jpg",
    description: "Experience deep meditation, Pranayama practices, and spiritual alignment for mental clarity and inner peace.",
    start_date: "2026-09-01",
    end_date: "2026-09-03",
    venue: "Veda Heritage Hall, Bengaluru",
    address: "Malleshwaram, Bengaluru 560003",
    google_maps_link: "https://maps.google.com",
    duration: "3 Days",
    price: 1800,
    capacity: 25,
    status: "Published",
    registration_deadline: "2026-08-30",
    featured: false,
    seo_title: "Guided Meditation Workshop | Shri Pradeep Nadig",
    seo_description: "Immerse in Pranayama and Vedic meditation practices guided by Shri Pradeep Nadig.",
    batches: [
      {
        id: 3,
        workshop_id: 2,
        batch_name: "Weekend Special (6:00 AM - 8:30 AM)",
        start_time: "06:00 AM",
        end_time: "08:30 AM",
        capacity: 25,
        remaining_seats: 20,
        status: "Active",
      },
    ],
  },
];

export const FALLBACK_CLASSES: ClassItem[] = [
  {
    id: 1,
    name: "Daily Sandhyavandana & Mantras",
    description: "Structured learning of Sandhyavandana procedures, Nitya Karma, and foundational Suktas.",
    duration: "3 Months",
    suitable_for: "Beginners & Enthusiasts",
    mode: "Hybrid",
    status: "Active",
  },
  {
    id: 2,
    name: "Advanced Rudram & Chamakam Chanting",
    description: "Deep dive into Sri Rudram and Chamakam with strict adherence to Vedic Swaras.",
    duration: "6 Months",
    suitable_for: "Intermediate Chanters",
    mode: "Offline",
    status: "Active",
  },
];

export const FALLBACK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Understanding the Significance of Sandhyavandana",
    slug: "significance-of-sandhyavandana",
    cover_image: "/images/services/satyanarayana-pooja.jpg",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-07-20",
    category: "Vedic Traditions",
    tags: ["Sandhyavandana", "Daily Rituals", "Veda"],
    content: "Sandhyavandana is one of the most sacred daily practices prescribed in Vedic tradition. It is performed thrice a day during twilight hours to align oneself with cosmic energy, cultivate spiritual discipline, and purify body and mind.",
    seo_title: "Significance of Sandhyavandana by Shri Pradeep Nadig",
    seo_description: "Discover why Sandhyavandana is essential for spiritual discipline and mental peace.",
  },
];

export const FALLBACK_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How can I book a service or home ritual?",
    answer: "You can request a service directly through the website or contact us via WhatsApp.",
    category: "Services",
    display_order: 1,
  },
  {
    id: 2,
    question: "Are online consultation sessions available?",
    answer: "Yes, consultations can be conducted virtually over Google Meet or phone call.",
    category: "Consultations",
    display_order: 2,
  },
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "Mahaganapathi Homa Fire Ritual",
    description: "Invocation of Lord Ganesha for obstacle removal and prosperous beginnings.",
    media_url: "/images/services/ganapathi-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 1,
  },
  {
    id: 2,
    title: "Ayushya Homa Birthday Blessings",
    description: "Sacred fire ritual for health, longevity, and vitality.",
    media_url: "/images/services/ayushya-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 2,
  },
  {
    id: 3,
    title: "Maha Mrityunjaya Homa",
    description: "Protection and health restoration ritual dedicated to Lord Shiva.",
    media_url: "/images/services/mrityunjaya-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 3,
  },
  {
    id: 4,
    title: "Navagraha Homa Planetary Mandala",
    description: "Harmonizing nine planetary influences for peace and prosperity.",
    media_url: "/images/services/navagraha-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 4,
  },
  {
    id: 5,
    title: "Sri Sudarshana Homa",
    description: "Divine protection against negative energies and evil eye.",
    media_url: "/images/services/sudarshana-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 5,
  },
  {
    id: 6,
    title: "Chandika Homa Sacred Yajna",
    description: "Powerful Vedic ritual for victory over severe hardships.",
    media_url: "/images/services/chandika-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 6,
  },
  {
    id: 7,
    title: "Durga Homa Protection",
    description: "Invoking Goddess Durga for courage and spiritual strength.",
    media_url: "/images/services/durga-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 7,
  },
  {
    id: 8,
    title: "Aghorastra Homa",
    description: "Shiva energy purification ritual.",
    media_url: "/images/services/aghorastra-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 8,
  },
  {
    id: 9,
    title: "Subrahmanya Homa",
    description: "Valor and Naga Dosha mitigation ritual.",
    media_url: "/images/services/subrahmanya-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 9,
  },
  {
    id: 10,
    title: "Lakshmi Narayana Hrudaya Homa",
    description: "Invoking prosperity and family abundance.",
    media_url: "/images/services/lakshmi-narayana-hrudaya-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 10,
  },
  {
    id: 11,
    title: "Naga Shanthi Pooja",
    description: "Serene Sarpa Dosha mitigation and blessings.",
    media_url: "/images/services/naga-shanthi.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 11,
  },
  {
    id: 12,
    title: "Vastu Homa Property Purification",
    description: "Cleansing homes and commercial spaces of Vastu doshas.",
    media_url: "/images/services/vastu-homa.jpg",
    media_type: "Image",
    category: "Rituals",
    display_order: 12,
  },
  {
    id: 13,
    title: "Sri Satyanarayana Vratha & Pooja",
    description: "Sacred Vishnu worship for family peace and noble desires.",
    media_url: "/images/services/satyanarayana-pooja.jpg",
    media_type: "Image",
    category: "Poojas",
    display_order: 13,
  },
  {
    id: 14,
    title: "Sri Rudrabhishekam Pooja",
    description: "Shiva Linga Panchamrutha bathing ritual.",
    media_url: "/images/services/rudrabhishekam-pooja.jpg",
    media_type: "Image",
    category: "Poojas",
    display_order: 14,
  },
  {
    id: 15,
    title: "Sri Saraswati Vidya Pooja",
    description: "Wisdom and educational excellence blessing.",
    media_url: "/images/services/saraswati-pooja.jpg",
    media_type: "Image",
    category: "Poojas",
    display_order: 15,
  },
  {
    id: 16,
    title: "Swayamvara Parvathi Pooja",
    description: "Marital harmony and wedding obstacles resolution.",
    media_url: "/images/services/swayamvara-parvathi-pooja.jpg",
    media_type: "Image",
    category: "Poojas",
    display_order: 16,
  },
  {
    id: 17,
    title: "Sundarakanda Parayana & Chant Mastery",
    description: "Vedic chant learning and Hanuman strength invocation.",
    media_url: "/images/services/sundarakanda-parayana-pooja.jpg",
    media_type: "Image",
    category: "Workshops",
    display_order: 17,
  },
  {
    id: 18,
    title: "Vedic Astrology Consultation",
    description: "Personal birth chart and horoscope analysis session.",
    media_url: "/images/services/vedic-astrology-consultation.jpg",
    media_type: "Image",
    category: "Consultations",
    display_order: 18,
  },
];

export const FALLBACK_COURSES: import("../types").Course[] = [
  {
    id: 1,
    title: "Jyotish Praveena - Foundation in Vedic Astrology",
    slug: "vedic-astrology-foundation",
    short_description: "A comprehensive 12-week course mastering Janma Kundali analysis, Bhavas, Rasis, Grahas, Dasha systems, and Gochara transit interpretations.",
    full_description: "Immerse yourself in authentic Vedic Astrology under the personal guidance of Veda Brahma Shri Pradeep Nadig. Designed for serious seekers, practitioners, and enthusiasts, this foundational program walks you through classical Brihat Parasara Hora Sastra principles, planetary strengths (Shadbala), house lords (Bhava Pathi), planetary aspects (Drishti), Vimshottari Dasha calculations, and practical birth chart readings.",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    duration: "12 Weeks (36 Live Hours)",
    level: "Beginner",
    mode: "Online Live",
    price: 14999,
    cover_image: "/images/services/vedic-astrology-consultation.jpg",
    prerequisites: "Open to all enthusiasts; basic interest in Vedic tradition recommended.",
    schedule: "Every Saturday & Sunday, 7:00 AM - 8:30 AM IST",
    status: "Active",
    featured: true,
    syllabus_modules: [
      {
        title: "Module 1: Fundamentals of Parashari Astrology",
        duration: "Weeks 1-3",
        topics: [
          "Introduction to Jyotish Vedanga & Astronomical Foundations",
          "The 12 Rasis (Zodiac Signs), Elements, and Gunas",
          "The 9 Grahas (Planets): Karakatvas, Dignities & Combustion",
          "The 27 Nakshatras: Deities, Stars & Pada Divisions"
        ]
      },
      {
        title: "Module 2: Bhavas (Houses) & Chart Construction",
        duration: "Weeks 4-6",
        topics: [
          "Understanding the 12 Bhavas & Life Dimensions",
          "Kendra, Trikona, Dusthana, and Upachaya Houses",
          "Ascendant (Lagna) determination & House Lordships",
          "Planetary Drishti (Aspects) and Conjunction Effects"
        ]
      },
      {
        title: "Module 3: Vimshottari Dasha & Transit Predictive Rules",
        duration: "Weeks 7-9",
        topics: [
          "Vimshottari Dasha System & Antardasha calculation",
          "Gochara (Transits) of Jupiter, Saturn, Rahu & Ketu",
          "Combos for Career, Marriage, Education & Health",
          "Identifying Sade Sati & Remedial measures"
        ]
      },
      {
        title: "Module 4: Case Studies, Chart Decoding & Remedial Jyotish",
        duration: "Weeks 10-12",
        topics: [
          "Hands-on birth chart decoding of real case studies",
          "Authentic Mantra, Stotra, Homa & Gemstone remedies",
          "Ethics of an Astrologer & Consultation guidelines",
          "Final assessment and Certification distribution"
        ]
      }
    ],
    faq: [
      {
        question: "Will recordings be provided if I miss a live session?",
        answer: "Yes! High-definition video recordings and downloadable study materials are shared within 24 hours of each session."
      },
      {
        question: "Is there any exam or certificate issued?",
        answer: "Upon completing 80% attendance and submission of final chart decoding assignments, students receive the Jyotish Praveena Certificate signed by Shri Pradeep Nadig."
      }
    ]
  },
  {
    id: 2,
    title: "Sacred Vedic Chanting & Swara Shuddhi Mastery",
    slug: "sacred-vedic-chanting-mastery",
    short_description: "Master authentic Veda Mantras with precise Udaatta, Anudaatta, and Svarita accents alongside deep esoteric Sukta meanings.",
    full_description: "Vedic recitation requires exact phonetics (Shiksha Shastra) and intonation (Swara). Guided by Shri Pradeep Nadig, who has undergone traditional Veda Adhyayana, this course trains students in chanting sacred Suktas—including Purusha Suktam, Sri Suktam, Rudram, and Chamakam—ensuring pristine pronunciation, breath control, and spiritual resonance.",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    duration: "8 Weeks (24 Live Hours)",
    level: "All Levels",
    mode: "Online Live",
    price: 9999,
    cover_image: "/images/services/sundarakanda-parayana-pooja.jpg",
    prerequisites: "Basic familiarity with Sanskrit script or Devanagari transliteration.",
    schedule: "Every Tuesday & Thursday, 6:30 PM - 8:00 PM IST",
    status: "Active",
    featured: true,
    syllabus_modules: [
      {
        title: "Module 1: Shiksha & Swara Shuddhi Fundamentals",
        duration: "Weeks 1-2",
        topics: [
          "Vedic Phonetics (Sanskrit Varnamala & Articulation places)",
          "Mastering the 3 primary Swaras: Udaatta, Anudaatta, Svarita",
          "Pranayama & vocal technique for sustained Vedic recitation",
          "Ganapathi Atharvashirsha chant practice"
        ]
      },
      {
        title: "Module 2: Sri Suktam & Lakshmi Upasana",
        duration: "Weeks 3-4",
        topics: [
          "Line-by-line recitation of 15 Rigvedic Mantras of Sri Suktam",
          "Word-by-word meaning, Bija Aksharas, and Nyasa rituals",
          "Performing home Samidhadhana and Archana with Sri Suktam"
        ]
      },
      {
        title: "Module 3: Purusha Suktam & Cosmic Consciousness",
        duration: "Weeks 5-6",
        topics: [
          "Purusha Suktam 18 Riks with precise Swara notation",
          "Cosmological significance of Virat Purusha & Vedic Yajna",
          "Incorporating Purusha Suktam into daily Pooja routines"
        ]
      },
      {
        title: "Module 4: Sri Rudram Namakam Highlights & Integration",
        duration: "Weeks 7-8",
        topics: [
          "Introductory Namakam Anuvakas with Swara perfection",
          "Maha Mrityunjaya Mantra & Gayatri Mantra Japa Vidhi",
          "Final live recitation evaluation and continuous practice guide"
        ]
      }
    ],
    faq: [
      {
        question: "Can beginners without prior Sanskrit experience join?",
        answer: "Yes, transliterated scripts with detailed accent markers (Udaatta/Anudaatta symbols) are provided along with Devanagari texts."
      }
    ]
  },
  {
    id: 3,
    title: "Prashna Marga & Horary Astrology Secrets",
    slug: "prashna-marga-horary-astrology",
    short_description: "Learn instant horary astrological techniques to answer specific life questions, missing objects, marriage timing, and medical queries.",
    full_description: "Prashna Kundali (Horary Astrology) is the ancient art of erecting a celestial map for the exact moment a question is posed to an astrologer. Based on Kerala's classical text Prashna Marga, Shri Pradeep Nadig reveals time-tested omens (Nimitta), Arudha Lagna calculations, and sharp planetary combinations to deliver crystal-clear answers without needing a birth chart.",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    duration: "6 Weeks (18 Live Hours)",
    level: "Intermediate",
    mode: "Online Live",
    price: 11999,
    cover_image: "/images/services/vedic-astrology-consultation.jpg",
    prerequisites: "Understanding of basic Rasis, Bhavas, and Graha nature.",
    schedule: "Every Sunday, 10:00 AM - 1:00 PM IST",
    status: "Upcoming",
    featured: false,
    syllabus_modules: [
      {
        title: "Module 1: Principles of Prashna & Arudha Calculation",
        duration: "Weeks 1-2",
        topics: [
          "Significance of Prashna vs. Jataka (Horoscope)",
          "Calculating Arudha Lagna and Prashna Lagna",
          "Deciphering Nimitta (Omens), Breath (Svara), and Querent Behavior"
        ]
      },
      {
        title: "Module 2: Specific Life Queries & Combinations",
        duration: "Weeks 3-4",
        topics: [
          "Health & Medical Prashna: Identifying disease, longevity & recovery",
          "Relationship & Marriage Prashna: Matching intent & timing",
          "Career, Business & Lost/Stolen Item retrieval techniques"
        ]
      },
      {
        title: "Module 3: Advanced Kerala Prashna & Remedial Guidance",
        duration: "Weeks 5-6",
        topics: [
          "Deva Prashna & Ancestral Dosha identification",
          "Selecting precise Pariharas (Remedial Homas and Poojas)",
          "Live practical Prashna workshops with real-world questions"
        ]
      }
    ],
    faq: [
      {
        question: "Is this suitable if I already know birth chart reading?",
        answer: "Absolutely! Prashna is a powerful complement to natal chart analysis when birth times are unknown or exact timing of events is needed."
      }
    ]
  },
  {
    id: 4,
    title: "Vastu Shastra Principles & Energy Balancing",
    slug: "vastu-shastra-energy-healing",
    short_description: "Discover classical Vastu principles for home, office, and sacred spaces to enhance prosperity, health, and spiritual vibration.",
    full_description: "Vastu Shastra is the traditional Indian science of architecture and spatial harmony. In this practical course, Shri Pradeep Nadig breaks down Mayamatam and Manasara principles, Vastu Purusha Mandala energy grids, directional directions (Ashta Dikpalakas), room placements, and non-demolition remedies to harmonize structural energies.",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    duration: "4 Weeks (12 Live Hours)",
    level: "All Levels",
    mode: "Hybrid",
    price: 8499,
    cover_image: "/images/services/vastu-homa.jpg",
    prerequisites: "No prior experience required.",
    schedule: "Every Saturday, 2:00 PM - 5:00 PM IST",
    status: "Upcoming",
    featured: false,
    syllabus_modules: [
      {
        title: "Module 1: Vastu Purusha Mandala & Directional Energies",
        duration: "Weeks 1-2",
        topics: [
          "Pancha Mahabhutas (Five Elements) and Directional Alignment",
          "Vastu Purusha Mandala grid (81 Pada & 64 Pada layouts)",
          "Entrance positioning, Bramhasthan sanctity, and Main Gate rules"
        ]
      },
      {
        title: "Module 2: Residential & Commercial Vastu Planning",
        duration: "Weeks 3-4",
        topics: [
          "Ideal placements for Kitchen (Agneya), Master Bedroom (Nairrutya), Pooja Room (Eeshanya)",
          "Office desks, cash lockers, and factory machinery layouts",
          "Pyramid remedies, Yantra installations, and non-structural cures"
        ]
      }
    ],
    faq: [
      {
        question: "Can I bring my home layout blueprint for review?",
        answer: "Yes, week 4 includes a practical clinic where students can analyze personal floor plans under guidance."
      }
    ]
  }
];

export const FALLBACK_LIVE_EVENTS: import("../types").LiveEvent[] = [
  {
    id: 1,
    title: "Mahashivaratri Grand Night 2026 - 4 Prahara Live Rituals",
    slug: "mahashivaratri-grand-night-2026",
    short_description: "Join the sacred all-night live stream of 4 Prahara Maha Rudrabhishekam, Bilvarchana, and continuous Vedic chanting dedicated to Lord Shiva.",
    full_description: "Mahashivaratri is the most auspicious night of spiritual awakening and divine grace. Shri Pradeep Nadig along with esteemed Vedic Ghanapathis will perform continuous 4 Prahara rituals from dusk till dawn. Devotees from around the world can join virtually or in-person, offer Sankalpa in their name, and experience intense divine vibration through live HD streaming.",
    event_date: "2026-02-15",
    event_time: "06:00 PM - 06:00 AM IST (All Night)",
    venue_type: "In-Person & Live Stream",
    venue_address: "Shaankari Creations Ashram, Asharaya layout, K.G.Vaderahalli, Bengaluru",
    stream_url: "https://youtube.com/live/mahashivaratri-2026-pradeep-nadig",
    price: 0,
    cover_image: "/images/services/rudrabhishekam-pooja.jpg",
    featured: true,
    status: "Upcoming",
    pandits_count: 11,
    agenda: [
      { time: "06:00 PM - 07:30 PM", title: "1st Prahara: Ksheerabhishekam & Ganapathi Pooja", description: "Invocational prayers, milk panchamrutha bathing, and Bilvapatra Archana." },
      { time: "09:30 PM - 11:00 PM", title: "2nd Prahara: Dahi & Madhu Abhishekam", description: "Curd and honey sacred bathing accompanied by Rigvedic Sukta chants." },
      { time: "01:00 AM - 02:30 AM", title: "3rd Prahara: Ghee & Sugarcane Juice Abhishekam", description: "Deep midnight meditation with continuous Namakam-Chamakam chanting." },
      { time: "04:00 AM - 05:30 AM", title: "4th Prahara: Bhasma & Sugandha Dravya Homa", description: "Holy ash ritual, Maha Poornahuthi, and early morning Prasada distribution." }
    ],
    faq: [
      { question: "How can I register my Sankalpa for the rituals?", answer: "Click 'Register Sankalpa' and enter your Name, Gothra, and Nakshatra. Shri Pradeep Nadig will chant your name during the live 4 Prahara Abhishekam." },
      { question: "Is the live stream free to watch?", answer: "Yes, HD virtual pass is 100% free for all global devotees. VIP Sankalpa passes are available for formal ritual inclusion." }
    ]
  },
  {
    id: 2,
    title: "Sharada Navratri Chandi Homa & Saptashati Live Stream",
    slug: "navratri-chandi-homa-live",
    short_description: "Experience the monumental Maha Chandi Yajna and 700 Sloka Durga Saptashati Parayana performed live during Sharada Navratri.",
    full_description: "Maha Chandi Homa is the ultimate Vedic yajna for overcoming obstacles, warding off negative energies, and invoking Divine Mother Chandika's supreme blessings. Streamed live in ultra-HD from Bengaluru, this grand event spans 700 verses of Durga Saptashati with traditional Ahuthis of sacred samagri, kumkum, and silk sarees.",
    event_date: "2026-10-18",
    event_time: "07:30 AM - 01:30 PM IST",
    venue_type: "In-Person & Live Stream",
    venue_address: "Asharaya layout, K.G.Vaderahalli, Bengaluru",
    stream_url: "https://youtube.com/live/chandi-homa-navratri-2026",
    price: 1100,
    cover_image: "/images/services/chandika-homa.jpg",
    featured: true,
    status: "Upcoming",
    pandits_count: 9,
    agenda: [
      { time: "07:30 AM - 08:30 AM", title: "Maha Ganapathi Pooja & Navakshari Japa", description: "Opening invocation and consecration of sacred Kalashas." },
      { time: "08:30 AM - 11:30 AM", title: "Durga Saptashati 13 Adhyayas Parayana", description: "Complete recitation of 700 verses with authentic Swara." },
      { time: "11:30 AM - 12:45 PM", title: "Maha Chandi Hathi & Dampati Pooja", description: "Offering 700 Ahuthis into the consecrated Agni Kunda." },
      { time: "12:45 PM - 01:30 PM", title: "Vasordhara & Maha Poornahuthi", description: "Final silk offering, Suvasini Pooja, and Mahamangalarathi." }
    ],
    faq: [
      { question: "Will Prasadam be sent to my address?", answer: "Yes! VIP Sankalpa registrants receive energized Raksha Thread, Kumkum, and Blessed Prasadam by speed post across India." }
    ]
  },
  {
    id: 3,
    title: "Surya Grahana Rahu-Ketu Shanti Special Live Pooja",
    slug: "solar-eclipse-shanti-pooja",
    short_description: "Special Eclipse Shanti and Navagraha Homa performed during the peak eclipse hours to neutralize planetary afflictions.",
    full_description: "During a Solar Eclipse (Surya Grahana), the potency of spiritual Japa and Havya offerings is multiplied manifold. Shri Pradeep Nadig leads this specialized eclipse mitigation ritual focusing on Rahu, Ketu, and Sun Nakshatra Shanti for those born under impacted signs.",
    event_date: "2026-08-02",
    event_time: "03:00 PM - 07:00 PM IST",
    venue_type: "Online Stream",
    venue_address: "Online Live Stream Exclusive",
    stream_url: "https://youtube.com/live/surya-grahana-shanti-2026",
    price: 750,
    cover_image: "/images/services/navagraha-homa.jpg",
    featured: false,
    status: "Upcoming",
    pandits_count: 5,
    agenda: [
      { time: "03:00 PM - 04:00 PM", title: "Grahana Kala Japa & Navagraha Tarpanam", description: "Silent meditation and mantra repetition during eclipse entry." },
      { time: "04:00 PM - 06:00 PM", title: "Rahu-Ketu & Arka Samidh Homa", description: "Targeted fire offerings to alleviate janma nakshatra dosha." },
      { time: "06:00 PM - 07:00 PM", title: "Grahana Moksha Snana & Mangalarathi", description: "Post-eclipse purification prayers and protective kavach distribution." }
    ],
    faq: [
      { question: "Who should register for this eclipse Shanti?", answer: "Individuals whose birth star (Janma Nakshatra) falls in the eclipse zodiac sign or those undergoing Rahu/Ketu Dasha." }
    ]
  },
  {
    id: 4,
    title: "Monthly Pradosham & Rudrabhishekam Live Sankalpa",
    slug: "monthly-pradosham-rudrabhishekam",
    short_description: "Participate in the bi-monthly Pradosha Kaala Shiva Abhishekam live stream for prosperity and liberation from karma.",
    full_description: "Pradosham occurring twice a month during Trayodashi Tithi is the most powerful time to seek Lord Shiva's mercy. Join Shri Pradeep Nadig live every Pradosham evening as 11 sacred dravyas are offered to the Lingam with Chamaka Prashna recitation.",
    event_date: "2026-08-25",
    event_time: "05:30 PM - 07:30 PM IST",
    venue_type: "In-Person & Live Stream",
    venue_address: "Shaankari Creations Temple Room, Bengaluru",
    stream_url: "https://youtube.com/live/pradosham-rudrabhishekam-live",
    price: 350,
    cover_image: "/images/services/rudrabhishekam-pooja.jpg",
    featured: false,
    status: "Upcoming",
    pandits_count: 3,
    agenda: [
      { time: "05:30 PM - 06:00 PM", title: "Nandi Abhishekam & Pradosha Mahatmyam", description: "Honoring Lord Nandi with holy water and sacred bilva leaves." },
      { time: "06:00 PM - 07:00 PM", title: "Ekadasa Dravya Rudrabhishekam", description: "Honey, Milk, Curd, Ghee, Tender Coconut & Panchamrutha bathing." },
      { time: "07:00 PM - 07:30 PM", title: "Deeparadhana & Prasada Vitharane", description: "108 Archana and camphor Aarti." }
    ],
    faq: [
      { question: "Can I subscribe to all monthly Pradoshams?", answer: "Yes, annual Sankalpa passes covering all 24 Pradoshams in a year are available upon request." }
    ]
  }
];

