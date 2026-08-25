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
  // --- HOMAS & SACRED FIRE RITUALS (Services) ---
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
    seo_title: "Mahaganapathi Homa in Bangalore | Pradeep Nadig",
    seo_description: "Perform Mahaganapathi Homa for obstacle removal, housewarming, and business growth with authentic Vedic rituals by Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "What materials and samagri are required for Mahaganapathi Homa?", answer: "Veda Brahma Shri Pradeep Nadig provides all sacred items including dried coconut (Kopa), pure desi cow ghee, sugarcane, modaka, 108 herbs (Ashta Dravya), and samithu wood. Clients only need to arrange fresh flowers, fruits, and panchamrutha items." },
      { question: "Can Mahaganapathi Homa be performed at home or office in Bengaluru?", answer: "Yes, Mahaganapathi Homa is performed at private residences, newly built apartments, commercial offices, or venue mandaps across Bengaluru." },
      { question: "When is the best time and tithi to perform Mahaganapathi Homa?", answer: "Auspicious times include Sankashti Chaturthi, Vinayaka Chaturthi, early morning hours during Griha Pravesha, or prior to starting a business or academic milestone." },
      { question: "What are the benefits of offering 108 Modaka and Atharvashirsha Ahuti?", answer: "Offering 108 Modakas with Atharvashirsha Trishati mantra oblations removes chronic life obstacles, clears mental confusion, and attracts financial stability." },
      { question: "How long does the entire Mahaganapathi Homa take?", answer: "The complete Vedic ritual including Avahana, Sankalpa, 108 Ahutis, Poornahuti, and Aarti takes approximately 2 to 2.5 hours." }
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
    seo_title: "Navagraha Homa Rituals in Bangalore | Pradeep Nadig",
    seo_description: "Harmonize planetary influences, mitigate Rahu-Ketu and Sade Sati doshas with authentic Navagraha Homa conducted by Shri Pradeep Nadig.",
    faq: [
      { question: "Why perform Navagraha Homa during Rahu-Ketu or Sade Sati transits?", answer: "Navagraha Homa pacifies malefic planetary transits (such as Saturn Sade Sati, Rahu-Ketu Mahadasha, or Manglik afflictions) and strengthens beneficiary planetary powers in your natal chart." },
      { question: "Which specific wood samithu and grains (Navadhanya) are used?", answer: "Nine distinct Veda samithus are used (Arka for Sun, Palasa for Moon, Khadira for Mars, Apamarga for Mercury, Pippala for Jupiter, Audumbara for Venus, Shami for Saturn, Durva for Rahu, Kusha for Ketu) along with nine sacred grains." },
      { question: "Is birth chart (Janma Kundali) analysis done before Navagraha Homa?", answer: "Yes, Shri Pradeep Nadig analyzes your horoscope Dasha-Bhukti beforehand to customize specific planetary sankalpa mantras for your ruling stars." },
      { question: "How long does Navagraha Homa take?", answer: "The complete ritual including 9 square mandala puja, planetary ahutis, and poornahuti takes 2.5 to 3.5 hours." }
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
    seo_title: "Maha Mrityunjaya Homa for Health & Protection | Pradeep Nadig",
    seo_description: "Seek Shiva's protection, longevity, and physical recovery through authentic Maha Mrityunjaya Homa by Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "What is the spiritual significance of Maha Mrityunjaya Homa?", answer: "Dedicated to Lord Shiva as Tryambaka, Maha Mrityunjaya Homa invokes divine protection against untimely hazards, chronic ailments, and bestows vitality and mental courage." },
      { question: "Is Mrityunjaya Homa recommended for 60th & 70th milestone birthdays?", answer: "Yes, performing Mrityunjaya Homa during milestone birthdays (60th Ugraratha Shanthi, 70th, 80th) grants longevity, bodily vigor, and spiritual peace." },
      { question: "Can online remote Sankalpa be taken for an ailing family member?", answer: "Yes, a remote Sankalpa with the patient's name and birth star (Nakshatra) is chanted during the homa, and consecrated Raksha thread & Vibhuthi are sent to them." },
      { question: "What sacred oblations are offered in Mrityunjaya Homa?", answer: "108 or 1008 recitations of Maha Mrityunjaya Mantra with oblations of Durva grass, pure cow milk, sesame seeds, ghee, and sacred Kalasabhishekam." }
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
    seo_title: "Ayushya Homa for Birthday & Longevity | Pradeep Nadig",
    seo_description: "Invoke Ayur Devatas for child health, immunity, and long life with authentic Ayushya Homa rituals in Bengaluru.",
    faq: [
      { question: "When should Ayushya Homa be performed?", answer: "It is traditionally performed on a child's first birthday, annual birthdays, or when seeking health recovery for elders." },
      { question: "What is Charu Ahuti in Ayushya Homa?", answer: "Charu is sacred boiled sweet rice offered into the homa fire while chanting Ayur Sukta mantras to bestow longevity and physical immunity." }
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
    seo_title: "Durga Homa for Protection & Success | Pradeep Nadig",
    seo_description: "Invoke Goddess Durga's divine protection, courage, and triumph over obstacles with Durga Homa by Shri Pradeep Nadig.",
    faq: [
      { question: "When is Durga Homa recommended?", answer: "During Navaratri, Rahu Kala, Tuesdays, or when seeking protection against envy and life obstacles." },
      { question: "How long does Durga Homa take?", answer: "Approximately 2.5 to 3 hours." }
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
    seo_title: "Maha Chandi Homa & Durga Saptashati | Pradeep Nadig",
    seo_description: "Experience the supreme power of Chandi Homa for victory over severe challenges, conducted by Shri Pradeep Nadig.",
    faq: [
      { question: "What is Durga Saptashati Parayana during Chandi Homa?", answer: "All 700 mantras of Devi Mahatmyam across 13 chapters are recited with specific offerings into the sacred fire." },
      { question: "How long does Maha Chandika Homa take?", answer: "Full Chandi Homa takes approximately 4 to 5 hours with Suvasini & Dampati Pooja." }
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
    seo_title: "Vastu Homa & Griha Pravesha Pooja | Pradeep Nadig",
    seo_description: "Purify your new house, neutralize structural Vastu doshas, and invite positive energy with Vastu Homa by Shri Pradeep Nadig.",
    faq: [
      { question: "Why is Vastu Homa mandatory before Griha Pravesha (housewarming)?", answer: "Vastu Homa purifies the land and building of construction-related energy imbalances, honors Vastu Purusha, and establishes harmony before residents move in." },
      { question: "Can Vastu Homa fix structural Vastu defects without demolition?", answer: "Yes, by conducting Digpalaka Bali, Vastu Purusha Sthapana, and room-by-room Kalasa Prokshana, negative vibrations caused by structural defects are spiritually neutralized." },
      { question: "Can Vastu Homa be conducted for commercial offices?", answer: "Yes, commercial Vastu Homa improves business prosperity, cash flow, and peaceful employee relations." }
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
    seo_title: "Aghorastra Homa for Spiritual Shielding | Pradeep Nadig",
    seo_description: "Invoke Shiva's Aghorastra aspect for ultimate spiritual shielding, removing negative energies and drishti dosha.",
    faq: [
      { question: "Who should perform Aghorastra Homa?", answer: "Recommended for those seeking powerful spiritual protection and relief from persistent negative influences." },
      { question: "How long does Aghorastra Homa take?", answer: "Approximately 3 to 4 hours." }
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
    seo_title: "Naga Shanthi & Sarpa Dosha Parihara | Pradeep Nadig",
    seo_description: "Mitigate Sarpa Dosha, overcome delays in marriage or progeny with authentic Naga Shanthi Pooja by Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "How does Naga Shanthi relieve Sarpa Dosha and Kuja afflictions?", answer: "Naga Shanthi pacifies ancestral snake doshas, Rahu-Ketu karmic blockages, marriage delays, and health issues through authentic Sarpa Sukta recitations." },
      { question: "What is the best tithi to perform Naga Shanthi?", answer: "Panchami tithis (especially Nagapanchami), Shravana month, or specific nakshatra days advised after chart reading." }
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
    seo_title: "Subrahmanya Homa for Courage & Career | Pradeep Nadig",
    seo_description: "Invoke Lord Subrahmanya's blessings for victory in competitive exams, Kuja dosha parihara, and courage.",
    faq: [
      { question: "Who should perform Subrahmanya Homa?", answer: "Recommended for students, career professionals, and individuals seeking Kuja/Mars dosha parihara." },
      { question: "How long does Subrahmanya Homa take?", answer: "Around 2.5 to 3 hours." }
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
    seo_title: "Lakshmi Narayana Hrudaya Homa | Pradeep Nadig",
    seo_description: "Attract prosperity, wealth, and family harmony with Lakshmi Narayana Hrudaya Homa conducted by Shri Pradeep Nadig.",
    faq: [
      { question: "When is Lakshmi Narayana Hrudaya Homa recommended?", answer: "Ideal for business owners, families, before new ventures, or anyone seeking prosperity and harmony." },
      { question: "How long does it take?", answer: "Typically 3 to 4 hours." }
    ]
  },

  // --- ASTROLOGY & CONSULTATIONS ---
  {
    id: 12,
    type: "Consultation",
    title: "Vedic Astrology Consultation",
    slug: "vedic-astrology-consultation",
    who_benefits: "Provides deep insights into career, health, relationships, financial growth, and personalized astrological remedies (Parihara).",
    where_performed: "In-person at Shaankari Kendra Bengaluru or online via HD Zoom video call.",
    when_performed: "Prior to major life decisions, career changes, marriage planning, or when facing persistent uncertainties.",
    who_should_attend: "Individuals, couples, parents, business owners, and spiritual seekers.",
    vidhi_details: "Analysis of Janma Kundali (Lagna, Rasi, Navamsha D9), Dasha-Bhukti timeline calculation, planetary transits (Gochara), Gemstone recommendation, and specific Veda Parihara solutions.",
    short_description: "Comprehensive birth chart analysis, career predictions, relationship compatibility, and remedial solutions.",
    full_description: "Personalized Vedic Astrology consultation with Veda Brahma Shri Pradeep Nadig covering birth chart analysis, Dasha predictions, career guidance, health analysis, and practical remedies.",
    images: ["/images/services/vedic-astrology-consultation.jpg"],
    display_order: 12,
    status: "Published",
    seo_title: "Best Vedic Astrologer in Bangalore | Pradeep Nadig Consultation",
    seo_description: "Book authentic Vedic astrology consultation with Shri Pradeep Nadig. In-person & online video birth chart reading, career, marriage, and Dasha predictions.",
    faq: [
      { question: "What details are required for an accurate birth chart reading?", answer: "You need to provide your Date of Birth, exact Time of Birth, and City/Place of Birth." },
      { question: "How does online video consultation work for overseas/outstation clients?", answer: "Online consultations take place over HD Zoom video call. Shri Pradeep prepares your digital horoscope in advance and guides you through remedies interactively." },
      { question: "What if my exact birth time is unknown?", answer: "Prashna Marga (Horary Astrology) or Birth Time Rectification (BTR) based on past key life events is used to analyze your situation accurately." },
      { question: "Are remedial solutions (Parihara) included in the session?", answer: "Yes, practical remedies including specific mantra chanting, gemstone/rudraksha recommendations, and targeted poojas are provided." }
    ]
  },

  // --- SACRED POOJAS & HOLY PARAYANAS (Poojas) ---
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
    seo_description: "Perform authentic Sri Satyanarayana Vratha with Veda Brahma Shri Pradeep Nadig for family harmony, housewarming, and prosperity.",
    faq: [
      { question: "When is the ideal time to perform Satyanarayana Pooja?", answer: "Full Moon (Purnima) days, Ekadashi, housewarmings, or wedding anniversaries." },
      { question: "How long does Satyanarayana Pooja take?", answer: "Approximately 2 to 2.5 hours including 5 Katha chapters and Aarti." }
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
    seo_description: "Seek Shiva's divine grace, good health, and inner peace through traditional Sri Rudrabhishekam Pooja.",
    faq: [
      { question: "What materials are used for Ekadasa Dravya Abhisheka?", answer: "Pure cow milk, curd, honey, ghee, sugar, tender coconut water, sugarcane juice, sandalwood paste, and sacred Bilva leaves." },
      { question: "How long does Rudrabhishekam Pooja take?", answer: "About 2 to 3 hours." }
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
    seo_description: "Invoke Goddess Lakshmi for financial growth, wealth abundance, and family prosperity.",
    faq: [
      { question: "Who should perform Kanakadhara Pooja?", answer: "Recommended for business owners, families, and anyone seeking financial stability and freedom from debt." }
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
      { question: "What are the spiritual benefits?", answer: "Promotes inner strength, removes fear, and grants success in challenging endeavors." }
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
      { question: "How long does Sudarshana Pooja take?", answer: "Approximately 2 to 2.5 hours." }
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
    images: ["/images/services/durga-homa.jpg"],
    display_order: 20,
    status: "Published",
    seo_title: "Durga Saptashati Parayana | Shri Pradeep Nadig",
    seo_description: "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
    faq: [
      { question: "How long does Durga Saptashati Parayana take?", answer: "Around 3 to 4 hours." }
    ]
  }
];

export const FALLBACK_LIVE_EVENTS = [
  {
    id: 1,
    title: "Surya Grahan (Solar Eclipse) Shanti Pooja 2026",
    slug: "solar-eclipse-shanti-pooja",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-09-12",
    event_time: "08:30 AM - 12:30 PM IST",
    pandits_count: 5,
    price: 1500,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "Special Vedic Shanti Pooja conducted during Surya Grahan to neutralize negative planetary rays and grahan doshas.",
    full_description: "Surya Grahan (Solar Eclipse) is a powerful celestial event. Participating in live remote Sankalpa and Surya Shanti Homa during the eclipse period mitigates Rahu-Ketu afflictions, protects health, and enhances mental clarity.",
    venue_address: "Shaankari Vedic Kendra, Vaderahalli, Bengaluru & Live Stream",
    cover_image: "/images/live-events/solar-eclipse-shanti-pooja.jpg",
    images: ["/images/live-events/solar-eclipse-shanti-pooja.jpg"],
    agenda: [
      { time: "08:30 AM", title: "Grahan Purva Sankalpa & Avahana", description: "Remote Sankalpa with names and Gothras of registered participants." },
      { time: "09:30 AM", title: "Surya Sukta & Navagraha Japa", description: "1008 recitations of Aditya Hrudayam and Surya Beeja Mantra." },
      { time: "11:00 AM", title: "Surya Shanti Homa & Poornahuti", description: "Sacred fire oblations during eclipse peak followed by Samprokshana." }
    ],
    faq: [
      { question: "Why perform Shanti Pooja during Solar Eclipse (Surya Grahan)?", answer: "Eclipse hours generate intense electromagnetic and subtle karmic shifts. Performing Shanti Homa during grahan kala neutralizes planetary afflictions for affected birth stars (Nakshatras)." },
      { question: "How does remote Sankalpa work for live events?", answer: "Your Name, Gothra, and Nakshatra are solemnly uttered by Shri Pradeep Nadig during ritual initiation, and live streaming link is provided." },
      { question: "Will sacred Prasadam be dispatched after the event?", answer: "Yes, consecrated Vibhuthi, Kumkum, and energised Surya Raksha coin are mailed to your registered address." }
    ]
  },
  {
    id: 2,
    title: "Mahashivaratri Grand Night 2026",
    slug: "mahashivaratri-grand-night-2026",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-02-15",
    event_time: "06:00 PM - 06:00 AM IST",
    pandits_count: 11,
    price: 2100,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "All-night 4 Prahara Maha Rudrabhishekam, Chandi Parayana, and Shivagni Homa on sacred Mahashivaratri night.",
    full_description: "Join Veda Brahma Shri Pradeep Nadig and a team of 11 Vedic scholars for an auspicious 12-hour continuous spiritual vigil on Mahashivaratri, featuring 4 Prahara Rudrabhishekam, Bilvarchana, and Shivagni Homa.",
    venue_address: "Shaankari Sacred Mandap, Bengaluru & HD YouTube Live Stream",
    cover_image: "/images/live-events/mahashivaratri-grand-night-2026.jpg",
    images: ["/images/live-events/mahashivaratri-grand-night-2026.jpg"],
    agenda: [
      { time: "06:00 PM", title: "First Prahara Abhishekam (Milk & Water)", description: "Rigveda Rudra Chanting & Milk Abhishekam." },
      { time: "09:00 PM", title: "Second Prahara Abhishekam (Curd & Honey)", description: "Yajurveda Namaka-Chamaka Parayana." },
      { time: "12:00 AM", title: "Third Prahara Abhishekam (Ghee & Sugar)", description: "Midnight Lingodbhava Maha Rudrabhishekam." },
      { time: "03:00 AM", title: "Fourth Prahara Shivagni Homa & Poornahuti", description: "Sacred fire oblations and Bhasma Alankara." }
    ],
    faq: [
      { question: "What are the 4 Prahara timings on Mahashivaratri?", answer: "The 4 Prahara rituals run continuously from 6:00 PM evening to 6:00 AM dawn, covering milk, curd, ghee, and honey abhishekams." },
      { question: "Can international devotees participate via live stream?", answer: "Yes, the full 12-hour vigil is live streamed in HD, allowing global devotees to take remote Sankalpa." }
    ]
  },
  {
    id: 3,
    title: "Navratri Chandi Homa Live 2026",
    slug: "navratri-chandi-homa-live",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-10-18",
    event_time: "07:00 AM - 01:00 PM IST",
    pandits_count: 9,
    price: 2500,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "Grand 9-Priest Durga Saptashati Chandi Homa live streamed during sacred Sharad Navratri Mahashtami.",
    full_description: "Join Veda Brahma Shri Pradeep Nadig for the grand Sharad Navratri Chandi Homa. Includes 700 Durga Saptashati Ahutis, Suvasini Pooja, Kanya Pooja, and Mahapoornahuti.",
    venue_address: "Shaankari Mandap Bengaluru & YouTube Live",
    cover_image: "/images/live-events/navratri-chandi-homa-live.jpg",
    images: ["/images/live-events/navratri-chandi-homa-live.jpg"],
    agenda: [
      { time: "07:00 AM", title: "Navadurga Avahana & Sankalpa", description: "Initiation & Devotee Sankalpa." },
      { time: "08:30 AM", title: "Durga Saptashati 13 Adhyaya Homa", description: "700 Sacred Chandi Mantras Ahuti." },
      { time: "12:00 PM", title: "Suvasini & Kanya Pooja", description: "Honoring 9 sacred maidens & Suvasinis." },
      { time: "12:45 PM", title: "Mahapoornahuti & Blessing", description: "Silk Saree oblations and Aarti." }
    ],
    faq: [
      { question: "What are the benefits of Sharad Navratri Chandi Homa?", answer: "Invokes Goddess Durga's supreme grace for obstacle removal, health, and family prosperity." }
    ]
  },
  {
    id: 4,
    title: "Monthly Pradosham Rudrabhishekam",
    slug: "monthly-pradosham-rudrabhishekam",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-09-24",
    event_time: "04:30 PM - 07:30 PM IST",
    pandits_count: 5,
    price: 750,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "Sacred evening Pradosham Kala Rudrabhishekam & Bilvarchana dedicated to Lord Shiva.",
    full_description: "Participate in monthly Pradosha Kala Rudrabhishekam. Worship during sunset Pradosham time absolves past karma and bestows mental peace.",
    venue_address: "Shaankari Temple Sanctum & Live Stream",
    cover_image: "/images/live-events/monthly-pradosham-rudrabhishekam.jpg",
    images: ["/images/live-events/monthly-pradosham-rudrabhishekam.jpg"],
    agenda: [
      { time: "04:30 PM", title: "Pradosha Sankalpa & Avahana", description: "Initiation & Devotee Namakarana." },
      { time: "05:15 PM", title: "Panchamrutha Abhishekam & Rudram", description: "Sri Rudra Prashna recitation." },
      { time: "07:00 PM", title: "108 Bilvarchana & Deeparadhana", description: "Shiva Stotra & Aarti." }
    ],
    faq: [
      { question: "What is Pradosham Kala?", answer: "The 1.5-hour period before sunset on Trayodashi tithi, considered most potent for Lord Shiva's worship." }
    ]
  }
];

export const FALLBACK_WORKSHOPS: Workshop[] = [
  {
    id: 1,
    title: "Vedic Chanting & Sukta Recitation Workshop",
    slug: "vedic-chanting-sukta-recitation-workshop",
    mode: "Hybrid",
    start_date: "2026-09-20",
    end_date: "2026-09-22",
    timings: "07:00 AM - 09:00 AM IST",
    location: "Online Zoom & Shaankari Kendra, Bengaluru",
    price: 3500,
    seats_limit: 30,
    status: "Published",
    seo_title: "Vedic Chanting Workshop | Pradeep Nadig",
    seo_description: "Master authentic Sanskrit Swara chanting, Purusha Sukta, Sri Sukta, and Durga Sukta in 3-day intensive workshop.",
    description: "Learn authentic Vedic Swara pronunciation (Udatta, Anudatta, Svarita) and master core Suktas under the direct tutelage of Veda Brahma Shri Pradeep Nadig.",
    short_description: "3-day intensive workshop on authentic Vedic Swara pronunciation and Sukta chanting.",
    images: ["/images/courses/sacred-vedic-chanting-mastery.jpg"],
    cover_image: "/images/courses/sacred-vedic-chanting-mastery.jpg",
    faq: [
      { question: "Are prior Sanskrit skills required?", answer: "No, the workshop teaches basic phonetics, mouth positions, and accent marks step by step." },
      { question: "Will practice audio recordings be provided?", answer: "Yes, all participants receive downloadable high-definition audio tracks and Sanskrit text PDFs." }
    ]
  }
];

export const FALLBACK_COURSES: ClassItem[] = [
  {
    id: 1,
    title: "Sacred Vedic Chanting Mastery",
    slug: "sacred-vedic-chanting-mastery",
    category: "Vedic Chanting",
    level: "All Levels",
    duration: "3 Months (24 Sessions)",
    schedule: "Every Saturday & Sunday 07:00 AM - 08:30 AM IST",
    mode: "Online Live & Recorded",
    status: "Published",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    price: 4500,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Comprehensive 3-month course mastering Purusha Sukta, Sri Sukta, Durga Sukta, Mantrapushpam, and Rudram.",
    full_description: "Immerse yourself in sacred Veda chanting. Master authentic Swara accents, mouth positioning (Sanskrit Varna Chintane), and chant timeless Vedic Suktas with confidence and accuracy.",
    cover_image: "/images/courses/sacred-vedic-chanting-mastery.jpg",
    images: ["/images/courses/sacred-vedic-chanting-mastery.jpg"],
    seo_title: "Sacred Vedic Chanting Course Online | Pradeep Nadig",
    seo_description: "Learn authentic Vedic Suktas, Rudram, and Sanskrit Swara chanting in a 3-month structured online course by Shri Pradeep Nadig.",
    syllabus_modules: [
      { title: "Module 1: Sanskrit Varna Chintane & Swara Rules", duration: "2 Weeks", topics: ["Udatta, Anudatta, Svarita accents", "Mouth positions (Sthanas)", "Chanting breath control"] },
      { title: "Module 2: Mahaganapathi Atharvashirsha & Purusha Sukta", duration: "4 Weeks", topics: ["Line by line chanting", "Word breakdown", "Spiritual meaning"] },
      { title: "Module 3: Sri Sukta & Durga Sukta Mastery", duration: "4 Weeks", topics: ["Sri Sukta 15 Mantras", "Durga Sukta Swara practice", "Samhita patha"] },
      { title: "Module 4: Sri Rudram Namaka-Chamaka Basics", duration: "2 Weeks", topics: ["Namaka 1st Anuvaka", "Chamaka basics", "Phala Shruti"] }
    ],
    faq: [
      { question: "What is covered in the 3-month course?", answer: "Course covers Purusha Sukta, Sri Sukta, Durga Sukta, Medha Sukta, Mantrapushpam, and Namaka-Chamaka basics." },
      { question: "What if I miss a live class session?", answer: "HD video and audio recordings of every session are uploaded to the student portal within 2 hours." }
    ]
  },
  {
    id: 2,
    title: "Vedic Astrology Foundation Course",
    slug: "vedic-astrology-foundation",
    category: "Astrology",
    level: "Beginner to Intermediate",
    duration: "4 Months (32 Sessions)",
    schedule: "Every Sunday 05:00 PM - 07:00 PM IST",
    mode: "Online Live",
    status: "Published",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    price: 6000,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Learn the fundamentals of Parashari Vedic Astrology, 12 Rasis, 27 Nakshatras, 9 Planets, and Kundali reading.",
    full_description: "Master the art of reading horoscopes. Learn house significations (Bhavas), planetary aspects (Drishti), Dasha analysis (Vimshottari), and practical astrological remedies.",
    cover_image: "/images/courses/vedic-astrology-foundation.jpg",
    images: ["/images/courses/vedic-astrology-foundation.jpg"],
    seo_title: "Vedic Astrology Foundation Course | Pradeep Nadig",
    seo_description: "Learn Parashari Vedic Astrology, Nakshatra analysis, and birth chart reading in 4-month online live course.",
    syllabus_modules: [
      { title: "Module 1: Astronomy of Astrology & 12 Rasis", duration: "3 Weeks", topics: ["Zodiac division", "Rasi Lords & elements", "Lagna determination"] },
      { title: "Module 2: 27 Nakshatras & 9 Planets (Grahas)", duration: "4 Weeks", topics: ["Nakshatra Padas", "Planetary exaltation & debilitation", "Planetary Yogas"] },
      { title: "Module 3: 12 Houses (Bhavas) & Kundali Analysis", duration: "5 Weeks", topics: ["Kendra & Trikona houses", "Bhava Karakatvas", "Combustion & Retrograde"] },
      { title: "Module 4: Vimshottari Dasha & Practical Kundali Decoding", duration: "4 Weeks", topics: ["Dasha-Bhukti calculation", "Transits (Gochara)", "Remedial recommendations"] }
    ],
    faq: [
      { question: "Will practical horoscope reading examples be practiced?", answer: "Yes, students practice analyzing live sample birth charts every week to gain real-world confidence." },
      { question: "Will a completion certificate be awarded?", answer: "Yes, a certificate of completion from Shaankari Vedic Academy is awarded upon passing the final practical assignment." }
    ]
  },
  {
    id: 3,
    title: "Prashna Marga Horary Astrology Course",
    slug: "prashna-marga-horary-astrology",
    category: "Astrology",
    level: "Intermediate to Advanced",
    duration: "2 Months (16 Sessions)",
    schedule: "Every Saturday 04:00 PM - 06:00 PM IST",
    mode: "Online Live",
    status: "Published",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    price: 5000,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Master the ancient technique of Prashna Marga to give accurate predictions when birth time is unknown or for urgent life questions.",
    full_description: "Prashna Marga is an extraordinary branch of Jyotisha. Learn how to cast Prashna Kundali, analyze Ashtamangala Prashna, and provide immediate precise answers for lost items, career choices, and health matters.",
    cover_image: "/images/courses/prashna-marga-horary-astrology.jpg",
    images: ["/images/courses/prashna-marga-horary-astrology.jpg"],
    seo_title: "Prashna Marga Horary Astrology Course | Pradeep Nadig",
    seo_description: "Master Prashna Marga Horary Astrology to answer immediate questions and analyze charts without birth time.",
    syllabus_modules: [
      { title: "Module 1: Principles of Prashna & Time Selection", duration: "2 Weeks", topics: ["Arudha Lagna calculation", "Nimitta (Omens)", "Breath analysis (Swarodaya)"] },
      { title: "Module 2: Specific Prashnas (Career, Marriage, Health)", duration: "4 Weeks", topics: ["Karya Siddhi Yogas", "Disease diagnosis", "Marriage Prashna"] },
      { title: "Module 3: Ashtamangala Prashna & Parihara", duration: "2 Weeks", topics: ["Cowrie shell placement", "Deva Prashna", "Remedial solutions"] }
    ],
    faq: [
      { question: "Is basic knowledge of astrology required?", answer: "Yes, basic knowledge of 12 Rasis, 9 Planets, and 12 Houses is recommended before joining." }
    ]
  },
  {
    id: 4,
    title: "Vastu Shastra & Energy Healing Course",
    slug: "vastu-shastra-energy-healing",
    category: "Vastu & Energy",
    level: "All Levels",
    duration: "2 Months (16 Sessions)",
    schedule: "Every Saturday 10:00 AM - 12:00 PM IST",
    mode: "Online Live & Field Practice",
    status: "Published",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    price: 5500,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Learn traditional Vastu Shastra principles, 16 directions, 45 Vastu Purusha Devatas, and non-demolition energy remedies.",
    full_description: "Discover how spatial geometry and planetary energies impact health, finance, and peace. Learn floor plan analysis, directional balancing, and effective Vastu remedies.",
    cover_image: "/images/courses/vastu-shastra-energy-healing.jpg",
    images: ["/images/courses/vastu-shastra-energy-healing.jpg"],
    seo_title: "Vastu Shastra Course Online | Pradeep Nadig",
    seo_description: "Learn scientific Vastu Shastra, directional balancing, and non-demolition remedies with Shri Pradeep Nadig.",
    syllabus_modules: [
      { title: "Module 1: 16 Zones & 45 Vastu Devatas", duration: "3 Weeks", topics: ["Directional zones", "Elemental balancing (Five elements)", "Main door Vastu"] },
      { title: "Module 2: Residential & Commercial Layout Analysis", duration: "3 Weeks", topics: ["Kitchen, Master Bedroom, Puja Room placement", "Industrial Vastu", "Plot selection"] },
      { title: "Module 3: Non-demolition Vastu Remedies", duration: "2 Weeks", topics: ["Pyramid & Crystal placement", "Color balancing", "Vastu Purusha Puja"] }
    ],
    faq: [
      { question: "Can I apply Vastu principles to apartments?", answer: "Yes, the course covers modern apartment Vastu remedies specifically designed for built structures." }
    ]
  }
];

export const FALLBACK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "The Importance of Mahaganapathi Homa Before Major Beginnings",
    slug: "importance-of-mahaganapathi-homa",
    category: "Vedic Rituals",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-01-10",
    content: "Lord Ganesha is worshipped as Vighnaharta—the destroyer of obstacles. Performing Mahaganapathi Homa before embarking on new business ventures, moving into a new home, or celebrating a wedding ensures divine protection and clarity of purpose...",
    cover_image: "/images/services/ganapathi-homa.jpg",
    status: "Published",
    tags: ["GanapathiHoma", "VedicRituals", "GrihaPravesha", "PradeepNadig"],
    seo_title: "Why Perform Mahaganapathi Homa? | Pradeep Nadig",
    seo_description: "Discover the spiritual benefits, Atharvashirsha vidhi, and obstacle-removal powers of Mahaganapathi Homa."
  }
];

export const FALLBACK_FAQS: FAQItem[] = [
  {
    id: 1,
    category: "Pooja & Homa",
    question: "What is the procedure to book a Homa or Pooja with Shri Pradeep Nadig?",
    answer: "You can send an enquiry directly via our website by selecting the desired Homa or Pooja service. Our team will verify auspicious Tithis and Muhurthas based on your birth details and contact you within 24 hours to confirm date, venue, and samagri requirements."
  },
  {
    id: 2,
    category: "Pooja & Homa",
    question: "Are all ritual materials and Samagri provided by the Purohit?",
    answer: "Yes, Veda Brahma Shri Pradeep Nadig arranges all sacred Veda Samithu wood, pure desi cow ghee, dravya powders, dry coconut, modaka, and ritual samagri required for authentic Homas in Bengaluru. Clients only need to provide basic household items like fresh flowers and fruits."
  },
  {
    id: 3,
    category: "Pooja & Homa",
    question: "Can Homas be performed at our home or business premises in Bengaluru?",
    answer: "Yes, all Homas (including Ganapathi Homa, Navagraha Homa, Vastu Homa, Mrityunjaya Homa, and Durga Homa) can be conducted at your personal residence, newly constructed home, apartment, commercial office, or chosen venue in Bengaluru."
  },
  {
    id: 4,
    category: "Astrology & Consultations",
    question: "What birth details are required for a Vedic Astrology Consultation?",
    answer: "For an accurate horoscope (Janma Kundali) analysis, you need to provide your Date of Birth, exact Time of Birth, and Place of Birth. If exact birth time is unavailable, a Prashna Marga (Horary Astrology) consultation can be performed."
  },
  {
    id: 5,
    category: "Astrology & Consultations",
    question: "How are online video astrology consultations conducted for international clients?",
    answer: "Online consultations are conducted via HD Zoom or WhatsApp Video call. Shri Pradeep Nadig prepares your digital birth chart in advance, reviews Dasha-Bhukti transits, and guides you through remedies and practical solutions."
  },
  {
    id: 6,
    category: "Astrology & Consultations",
    question: "What is Prashna Marga Astrology and when is it recommended?",
    answer: "Prashna Marga is an ancient Vedic branch of horary astrology that analyzes the planetary position at the exact moment a question is posed. It is ideal for immediate clarity regarding lost items, health decisions, property purchases, career changes, or when birth time is unknown."
  },
  {
    id: 7,
    category: "Live Events & Sankalpa",
    question: "How does remote Sankalpa work for Live Events like Mahashivaratri or Eclipse Pooja?",
    answer: "When you register for a remote Sankalpa, your Name, Gothra, Nakshatra, and specific prayer intentions are solemnly uttered during the main ritual initiation by Shri Pradeep Nadig. The live stream link is emailed/whatsapped to you so you can participate from anywhere worldwide."
  },
  {
    id: 8,
    category: "Live Events & Sankalpa",
    question: "Will sacred Prasadam be dispatched after live events?",
    answer: "Yes, sacred Kumkuma, Vibhuthi, Raksha Sutra thread, and energised prasadam coins are packed hygienically and dispatched to your registered mailing address following major live events and Mahahomas."
  },
  {
    id: 9,
    category: "Classes & Workshops",
    question: "Are prerequisites required to join the Sacred Vedic Chanting Course?",
    answer: "No prior knowledge of Sanskrit is necessary. The foundation course starts from basic pronunciation rules (Sanskrit Varna Chintane), Swara accents (Udatta, Anudatta, Svarita), and step-by-step recitation of Suktas and Stotrams."
  },
  {
    id: 10,
    category: "Booking & Logistics",
    question: "What is the advance booking window recommended for Griha Pravesha Vastu Homa?",
    answer: "We recommend booking 2 to 4 weeks in advance, especially during major auspicious Muhurtha seasons (such as Vastu Puja days and Akshaya Tritiya), to ensure date availability and custom Muhurtha calculation."
  },
  {
    id: 11,
    category: "Local Purohit Services",
    question: "How do I find an authentic Kannada Purohit near me in Bengaluru?",
    answer: "Veda Brahma Shri Pradeep Nadig is a highly experienced Kannada Purohit and Vedic Scholar based in Asharaya Layout, Vaderahalli, Bengaluru (Pin: 560097). He conducts traditional Kannada Vadhyar rituals, Griha Pravesha, Ganapathi Homa, Vastu Homa, and Navagraha Homas across Bengaluru including Yelahanka, Vidyaranyapura, Hebbal, Sahakara Nagar, Malleswaram, and Jayanagar."
  },
  {
    id: 12,
    category: "Local Purohit Services",
    question: "Is a Vedic Pandit near me available for Griha Pravesha and Vastu Homa at home?",
    answer: "Yes! Shri Pradeep Nadig and his trained team of Vedic Pandits travel directly to your residence, newly built apartment, or office in Bengaluru for Griha Pravesha, Vastu Purusha Homa, and Navagraha Shanthi. All sacred Samagri and Veda Samithu are arranged by the Purohit."
  },
  {
    id: 13,
    category: "Local Purohit Services",
    question: "How can I locate Veda Brahma Shri Pradeep Nadig on Google Maps?",
    answer: "You can search for 'Pradeep Nadig Asharaya layout Vaderahalli' on Google Maps or open our official Google Maps location link: https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097. In-person consultations and prayer bookings are held at our center in Vaderahalli, North Bengaluru."
  },
  {
    id: 14,
    category: "Astrology & Consultations",
    question: "Can I book a Kannada Astrologer near me for in-person birth chart reading?",
    answer: "Yes, Shri Pradeep Nadig offers in-person Vedic astrology consultations at Shaankari Kendra in Bengaluru as well as online HD Zoom video calls for outstation and overseas clients. Birth chart (Janma Kundali) reading, Dasha predictions, and practical Parihara remedies are provided."
  },
  {
    id: 15,
    category: "Local Purohit Services",
    question: "Which areas in Bangalore are covered by Kannada Vadhyar Shri Pradeep Nadig for Pooja services?",
    answer: "Shri Pradeep Nadig provides authentic Purohit and Vadhyar services across all Bangalore localities including Vaderahalli, Yelahanka, Vidyaranyapura, Hebbal, Sahakara Nagar, Rajajinagar, Malleswaram, Indiranagar, Koramangala, Whitefield, HSR Layout, and Jayanagar."
  }
];

export const FALLBACK_GALLERY_ALBUMS: GalleryItem[] = [];
export const FALLBACK_CLASSES: ClassItem[] = FALLBACK_COURSES as any;
export const FALLBACK_GALLERY: GalleryItem[] = [];
