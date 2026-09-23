import { Offering, Workshop, ClassItem, Blog, FAQItem, GalleryItem, LiveEvent, Course } from "@/types";

export const FALLBACK_SETTINGS: Record<string, any> = {
  site_name: "Veda Brahma Shri Pradeep Nadig",
  hero_title: "G Pradeep Nadig",
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
  {
    id: 14,
    type: "Consultation",
    title: "Janma Kundali & Birth Chart Reading",
    slug: "janma-kundali-birth-chart-reading",
    who_benefits: "Anyone seeking clarity on life purpose, strengths, challenges, upcoming planetary cycles, and spiritual direction.",
    where_performed: "In-person at Shaankari Kendra Bengaluru or via online HD Zoom consultation.",
    when_performed: "Ideal during birthdays, new life milestones, or when experiencing challenging life phases.",
    who_should_attend: "Individual seeking chart analysis, parents, or family members.",
    vidhi_details: "Full natal chart casting, Graha Bala evaluation, Vimshottari Dasha assessment, Gochara (transits) analysis, and specific Vedic Parihara recommendations.",
    short_description: "Comprehensive Janma Kundali analysis examining Lagna, Navamsha (D9), planetary placements, and Dasha-Bhukti timelines.",
    full_description: "Detailed 1-on-1 horoscope and birth chart (Janma Kundali) reading by Veda Brahma Shri Pradeep Nadig. In-depth analysis of your ascendant (Lagna), planetary strengths, Raja Yogas, Doshas, and personalized Vedic remedies.",
    images: ["/images/services/janma-kundali-birth-chart-reading.jpg"],
    display_order: 14,
    status: "Published",
    seo_title: "Janma Kundali & Birth Chart Reading Bangalore | Pradeep Nadig",
    seo_description: "Book authentic Janma Kundali & birth chart reading with Veda Brahma Shri Pradeep Nadig. Accurate Vedic horoscope analysis, Dasha timeline, and remedies.",
    faq: [
      { question: "What birth details are needed for Janma Kundali analysis?", answer: "Exact Date of Birth, Time of Birth, and Place of Birth are required." },
      { question: "Is Janma Kundali reading available online for NRIs?", answer: "Yes, online consultations are conducted via HD Zoom with digital horoscopes shared on screen." },
      { question: "Are remedies suggested during the session?", answer: "Yes, practical Vedic remedies including specific Japa, Stotras, and charitable offerings are prescribed." }
    ]
  },
  {
    id: 15,
    type: "Consultation",
    title: "Career & Business Astrology Consultation",
    slug: "career-business-astrology",
    who_benefits: "Working professionals, entrepreneurs, startup founders, business owners, and graduates navigating career choices.",
    where_performed: "In-person in Bengaluru or online via Zoom.",
    when_performed: "Before launching a business, signing contracts, changing jobs, investing capital, or resolving workplace hurdles.",
    who_should_attend: "Business owners, founders, professionals, and students.",
    vidhi_details: "10th & 11th Bhava analysis, Dashamsha (D10) chart verification, planetary strength of Sun, Saturn, and Mercury, business Muhurtha selection, and Vastu/Parihara guidance.",
    short_description: "Strategic astrological guidance for career milestones, promotions, job transitions, business ventures, and financial investments.",
    full_description: "Expert Vedic career and business horoscope reading by Veda Brahma Shri Pradeep Nadig. Analysis of the 10th house (Karma Bhava), Dashamsha (D10) chart, favorable investment periods, partnership compatibility, and financial growth remedies.",
    images: ["/images/services/career-business-astrology.jpg"],
    display_order: 15,
    status: "Published",
    seo_title: "Career & Business Astrology Consultation Bangalore | Pradeep Nadig",
    seo_description: "Unlock career success and business growth with Vedic Astrology. Consult Shri Pradeep Nadig for job change, startup timing, and financial remedies.",
    faq: [
      { question: "Can astrology help decide between job and business?", answer: "Yes, analyzing the 6th vs 7th & 10th houses indicates whether employment or independent business yields greater prosperity." },
      { question: "Can you evaluate business partnership compatibility?", answer: "Yes, comparing horoscopes of business partners reveals mutual trust, financial synergy, and long-term viability." }
    ]
  },
  {
    id: 16,
    type: "Consultation",
    title: "Marriage Matching & Kundali Milan",
    slug: "marriage-matching-kundali-milan",
    who_benefits: "Prospective brides, grooms, and parents planning matrimony.",
    where_performed: "In-person at Bengaluru office or via online Zoom call.",
    when_performed: "Prior to fixing engagement dates or finalizing marriage alliances.",
    who_should_attend: "Parents, prospective bride and groom.",
    vidhi_details: "36 Guna Ashta Koota Milan, Navamsha (D9) comparative chart analysis, Kuja/Manglik Dosha evaluation, Dasha Sandhi verification, and vivaha remedies.",
    short_description: "Comprehensive Ashta Koota matching, Manglik (Kuja) Dosha analysis, and relationship compatibility evaluation for brides and grooms.",
    full_description: "Authentic Vedic Kundali Milan and marriage compatibility consultation by Veda Brahma Shri Pradeep Nadig. Goes beyond simple point counting (Ashta Koota) to deeply evaluate emotional harmony, longevity (Ayushya), progeny (Santana), financial stability, and Kuja Dosha neutralization.",
    images: ["/images/services/marriage-matching-kundali-milan.jpg"],
    display_order: 16,
    status: "Published",
    seo_title: "Marriage Matching & Kundali Milan Bangalore | Pradeep Nadig",
    seo_description: "Comprehensive Vedic horoscope matching for marriage. Ashta Koota, Manglik Dosha, and emotional compatibility consultation with Shri Pradeep Nadig.",
    faq: [
      { question: "Is 18+ score enough for marriage matching?", answer: "No, a high score alone is insufficient. Planetary placements, mental wavelength (Maithri), longevity, and D9 chart harmony must also be thoroughly checked." },
      { question: "What if one chart has Manglik (Kuja) Dosha?", answer: "Vedic astrology provides specific cancellations and remedies for Kuja Dosha depending on planetary placements." }
    ]
  },
  {
    id: 17,
    type: "Consultation",
    title: "Gemstone & Rudraksha Recommendation",
    slug: "gemstone-rudraksha-recommendation",
    who_benefits: "Individuals seeking physical vitality, mental focus, financial upliftment, and planetary shielding.",
    where_performed: "In-person in Bengaluru or online via Zoom.",
    when_performed: "During major planetary transitions, Dasha changes, or to amplify auspicious chart placements.",
    who_should_attend: "Anyone interested in genuine, energised gemstones and Rudraksha.",
    vidhi_details: "Horoscope planetary analysis, identification of Anukul and Pratikul Grahas, precise carat/ratti calculation, finger & metal selection, and Vedic Pranapratishtha ritual guidelines.",
    short_description: "Scientific Vedic recommendation of natural certified gemstones and sacred Rudraksha beads aligned with your birth chart.",
    full_description: "Personalized gemstone (Ratna) and Rudraksha consultation by Veda Brahma Shri Pradeep Nadig. Accurate identification of Yogakaraka and benefic planets to empower, suitable metals, wearing days, consecration (Prana Pratishtha) vidhi, and cautions against wearing harmful stones.",
    images: ["/images/services/gemstone-rudraksha-recommendation.jpg"],
    display_order: 17,
    status: "Published",
    seo_title: "Gemstone & Rudraksha Consultation Bangalore | Pradeep Nadig",
    seo_description: "Discover your ideal Vedic gemstone and sacred Rudraksha. Accurate astrological recommendation and consecration guidance by Shri Pradeep Nadig.",
    faq: [
      { question: "How do you determine which gemstone suits me?", answer: "Only gemstones representing functional benefic planets (Yogakarakas) are recommended to avoid amplifying negative energies." },
      { question: "Do gemstones require energisation before wearing?", answer: "Yes, Prana Pratishtha with Vedic Beeja Mantras is essential for a gemstone or Rudraksha to yield divine benefits." }
    ]
  },
  {
    id: 18,
    type: "Consultation",
    title: "Prashna Marga (Horary Astrology) Consultation",
    slug: "prashna-marga-horary-astrology",
    who_benefits: "Anyone with an urgent specific question or people who do not have accurate birth time details.",
    where_performed: "In-person in Bengaluru, via phone, or online Zoom call.",
    when_performed: "When facing immediate dilemma, lost property, legal decision, or critical crossroads.",
    who_should_attend: "Anyone seeking clear, prompt astrological answers.",
    vidhi_details: "Aroodha Lagna determination, Tamboola (betel leaf) Nimitta evaluation, planetary alignments at the query moment, and direct diagnostic outcome.",
    short_description: "Instant accurate answers to urgent, specific life questions based on the exact moment the query is asked.",
    full_description: "Ancient Prashna Shastra consultation with Veda Brahma Shri Pradeep Nadig. When birth time is unknown, disputed, or when facing immediate dilemmas regarding lost items, legal disputes, medical diagnoses, or travels, Prashna Marga reveals divine guidance.",
    images: ["/images/services/prashna-marga-horary-astrology.jpg"],
    display_order: 18,
    status: "Published",
    seo_title: "Prashna Marga Horary Astrology Bangalore | Pradeep Nadig",
    seo_description: "Accurate answers to urgent questions without birth details. Experience profound Prashna Marga horary astrology with Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "Can I consult if I don't know my birth date or time?", answer: "Yes! Prashna Marga is specifically designed to answer pressing questions based on the exact cosmic time you ask." },
      { question: "What kind of questions can Prashna Marga answer?", answer: "Questions regarding job offers, property purchase, missing items, health recovery, legal cases, and marriage proposals." }
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
  },
  {
    id: 21,
    type: "Service",
    title: "Vastu Balancing for Homes & Spaces",
    slug: "vastu-balancing-homes-spaces",
    who_benefits: "Harmonizes five natural elements (Pancha Bhootas), rectifies structural energy imbalances, and neutralizes negative spatial vibrations without demolition.",
    where_performed: "Conducted at residences, apartments, commercial offices, retail outlets, and plots across Bengaluru.",
    when_performed: "Before moving into a home, after renovations, or when experiencing stagnant energy, health concerns, or financial blockages.",
    who_should_attend: "Homeowners, commercial space managers, business founders, and family members.",
    vidhi_details: "Detailed 16-zone compass diagnostic, Pancha Bhoota alignment, crystal & copper pyramid energy grid placement, Vastu Purusha Shanthi, and Kalasa Samprokshana.",
    short_description: "Harmonize spatial energy, balance five elements, and remove negative architectural doshas for homes and offices.",
    full_description: "Vastu Balancing is a non-demolition energy correction service for residential and commercial properties. By aligning the 16 Vastu zones and balancing the five elements (Earth, Water, Fire, Air, Space), positive energy flow is restored, fostering health, prosperity, and harmony.",
    images: ["/images/services/vastu-balancing.jpg"],
    display_order: 21,
    status: "Published",
    seo_title: "Vastu Balancing for Homes & Spaces | Shri Pradeep Nadig",
    seo_description: "Non-demolition Vastu balancing, 16-zone directional alignment, and Pancha Bhoota energy harmonization by Shri Pradeep Nadig.",
    faq: [
      { question: "Can Vastu Balancing be done without structural demolition?", answer: "Yes, by utilizing non-demolition remedies including copper pyramid grids, elemental color corrections, crystal placements, and Vastu Purusha Shanthi, negative energy is effectively neutralized." },
      { question: "Is Vastu Balancing suitable for modern apartments?", answer: "Absolutely. Modern apartments benefit immensely from directional balancing and room-wise energy harmonization." }
    ]
  }
];

export const FALLBACK_LIVE_EVENTS: LiveEvent[] = [
  {
    id: 1,
    title: "Surya Grahan (Solar Eclipse) Shanti Pooja 2026",
    slug: "solar-eclipse-shanti-pooja",
    category: "Live Stream",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-09-12",
    event_time: "08:30 AM - 12:30 PM IST",
    pandits_count: 5,
    price: 1500,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "Special Vedic Shanti Pooja conducted during Surya Grahan to neutralize negative planetary rays and grahan doshas.",
    full_description: "Surya Grahan (Solar Eclipse) is a critical cosmic event where solar energy is temporarily obscured by Rahu/Ketu alignment. According to the Rigveda and Jyotisha Shastras, performing sacred Shanti Pooja, Surya Sukta Japa, and Homa during Grahan Kala mitigates Rahu-Ketu afflictions, shields physical and mental vitality, neutralizes Janma Rashi/Nakshatra doshas, and bestows profound spiritual luminescence. Veda Brahma Shri Pradeep Nadig and a panel of 5 Ghanapathi scholars perform continuous Veda mantra chanting and fire oblations during the exact eclipse window.",
    vidhi_details: "1. Grahan Purva Sankalpa: Chanting of Devotee Names, Gothras, and Birth Stars (Janma Nakshatras).\n2. Kalasa Sthapana & Navagraha Avahana: Invoking Lord Surya, Chhaya Devi, Rahu, Ketu, and Digpalakas into sanctified copper Kalashas.\n3. Aditya Hrudayam & Surya Sukta Japa: 1008 recitations of Surya Beeja Mantras.\n4. Grahan Kala Agnikarya: Offering Arka Samidhah, Red Lotus flowers, Wheat grains, and pure Ghee into the sacred Homa Kunda.\n5. Poornahuti & Samprokshana: Concluding oblation at eclipse release (Moksha Kala) followed by distribution of energised Raksha Prasadam.",
    who_benefits: "Individuals whose birth star (Janma Nakshatra) or moon sign (Rashi) is directly afflicted by the solar eclipse, as well as anyone suffering from Rahu-Ketu Dasha, eye ailments, lack of confidence, or career blockages.",
    who_should_attend: "Devotees from around the globe can join the HD Live Stream and submit remote Sankalpa for family health, prosperity, and planetary protection.",
    when_performed: "Conducted precisely during the Surya Grahan (Solar Eclipse) Sparsha, Madhya, and Moksha Kala (peak eclipse hours).",
    where_performed: "Shaankari Sacred Mandap, Bengaluru with HD 4K YouTube Live Stream for international devotees.",
    samagri_highlights: [
      "Pure Cow Ghee (10kg)",
      "Arka Veda Samidhah (Solar Sacred Wood)",
      "Red Lotus Flowers & Wheat Grains",
      "Sanctified Copper Kalasha & Raksha Thread",
      "Energised Surya Yantra Coin for home mandir"
    ],
    venue_address: "Shaankari Vedic Kendra, Vaderahalli, Bengaluru & HD Live Stream",
    cover_image: "/images/live-events/solar-eclipse-shanti-pooja.jpg",
    images: ["/images/live-events/solar-eclipse-shanti-pooja.jpg"],
    agenda: [
      { time: "08:30 AM", title: "Grahan Purva Sankalpa & Avahana", description: "Remote Sankalpa reciting names, Gothras, and Nakshatras of registered devotees." },
      { time: "09:30 AM", title: "Surya Sukta & Navagraha Japa", description: "Continuous 1008 recitations of Aditya Hrudayam, Navagraha Stotram, and Arka Gayatri." },
      { time: "11:00 AM", title: "Surya Shanti Homa & Grahan Peak Oblations", description: "Fire oblations during eclipse peak using pure Ghee, Red Lotus, and Arka Samidhah." },
      { time: "12:15 PM", title: "Poornahuti & Moksha Kala Prokshana", description: "Mahapoornahuti at eclipse release followed by sanctified water sprinkling and Aarti." }
    ],
    faq: [
      { question: "Why perform Shanti Pooja during Solar Eclipse (Surya Grahan)?", answer: "Eclipse hours generate intense electromagnetic and subtle karmic shifts. Performing Shanti Homa during grahan kala neutralizes planetary afflictions for affected birth stars (Nakshatras), protecting physical immunity and vital life force (Prana)." },
      { question: "How does remote Sankalpa work for live events?", answer: "Your Full Name, Gothra, and Birth Nakshatra are solemnly uttered by Shri Pradeep Nadig during ritual initiation (Sankalpa). You receive an exclusive private live stream link to view the entire live broadcast." },
      { question: "Will sacred Prasadam be dispatched after the event?", answer: "Yes, consecrated Vibhuthi, Kumkum, and an energised Surya Raksha Coin are safely mailed via express courier to your registered home address." },
      { question: "Can pregnant women or families register remote Sankalpa?", answer: "Absolutely. Remote Sankalpa is especially beneficial for pregnant mothers and elders to seek divine protection during eclipse hours without leaving their home safety." },
      { question: "What materials do I need to keep ready at home while watching the live stream?", answer: "You only need to sit quietly in a clean space, light a simple ghee lamp (Diya) at home during the stream, and chant along with Shri Pradeep Nadig." }
    ]
  },
  {
    id: 2,
    title: "Mahashivaratri Grand Night 2026",
    slug: "mahashivaratri-grand-night-2026",
    category: "Live Stream",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-02-15",
    event_time: "06:00 PM - 06:00 AM IST",
    pandits_count: 11,
    price: 2100,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "All-night 4 Prahara Maha Rudrabhishekam, Chandi Parayana, and Shivagni Homa on sacred Mahashivaratri night.",
    full_description: "Mahashivaratri is the supreme night of Lord Shiva, where planetary alignments naturally assist in spiritual awakening, destruction of negative karma, and divine grace. Join Veda Brahma Shri Pradeep Nadig and a panel of 11 Vedic Ghanapathis for an unbroken 12-hour continuous vigil across all 4 Praharas. The ceremony includes continuous Ekadasa Dravya Abhishekam, Sri Rudram Chamakam recitation, Bilvarchana, midnight Lingodbhava Pooja, and dawn Shivagni Homa.",
    vidhi_details: "1. First Prahara (6:00 PM - 9:00 PM): Ganapathi Pooja, Maha Sankalpa, Ksheera (Pure Milk) & Jalabhishekam with Rigveda Samhita chanting.\n2. Second Prahara (9:00 PM - 12:00 AM): Dadhi (Curd) & Honey Abhishekam, Yajurveda Sri Rudra Prashna Parayana with Bilva Patra Archana.\n3. Third Prahara (12:00 AM - 3:00 AM): Lingodbhava Midnight Abhishekam with pure Ghee, Sugarcane juice, Sandalwood paste, & Panchamrutam.\n4. Fourth Prahara (3:00 AM - 6:00 AM): Shivagni Homa with 1008 Rudra Ahutis, Bhasma Alankara, Mahapoornahuti, and Mahamangalarthi.",
    who_benefits: "All devotees seeking liberation from karmic debts, spiritual elevation, relief from chronic health issues, peace in family life, and divine grace of Lord Shiva.",
    who_should_attend: "Devotees, families, and spiritual seekers worldwide participating via HD Live Stream or in-person at the sacred mandap in Bengaluru.",
    when_performed: "Conducted on the night of Krishna Paksha Chaturdashi in the month of Magha/Phalguna (Mahashivaratri).",
    where_performed: "Shaankari Sacred Mandap, Bengaluru with HD 4K YouTube Live Stream broadcast.",
    samagri_highlights: [
      "108 Liters Pure Cow Milk, Curd, Ghee & Honey",
      "10000 Fresh Sacred Bilva Leaves (Bilva Patra)",
      "Pure Kashmiri Saffron & Sandalwood Abhisheka Paste",
      "Vedic Samidhah Wood & Gugglu Incense",
      "Consecrated Sacred Bhasma & Rudraksha Prasadam"
    ],
    venue_address: "Shaankari Sacred Mandap, Bengaluru & HD YouTube Live Stream",
    cover_image: "/images/live-events/mahashivaratri-grand-night-2026.jpg",
    images: ["/images/live-events/mahashivaratri-grand-night-2026.jpg"],
    agenda: [
      { time: "06:00 PM", title: "First Prahara Abhishekam (Milk & Holy Water)", description: "Rigveda Rudra Chanting, Mahasankalpa, and sacred Milk Abhishekam." },
      { time: "09:00 PM", title: "Second Prahara Abhishekam (Curd & Honey)", description: "Yajurveda Namaka-Chamaka Parayana and 1000 Bilvarchana." },
      { time: "12:00 AM", title: "Third Prahara Lingodbhava Abhishekam (Ghee & Saffron)", description: "Midnight Lingodbhava Maha Rudrabhishekam with Panchamrutham." },
      { time: "03:00 AM", title: "Fourth Prahara Shivagni Homa & Poornahuti", description: "Sacred fire oblations, Bhasma Alankara, Mahapoornahuti, and morning Prasadam." }
    ],
    faq: [
      { question: "What are the 4 Prahara timings on Mahashivaratri?", answer: "The 4 Prahara rituals run continuously from 6:00 PM evening to 6:00 AM dawn, covering distinct abhishekams (Milk, Curd, Ghee, Honey) and scriptural chantings every 3 hours." },
      { question: "Can international devotees participate via live stream?", answer: "Yes, the full 12-hour vigil is live streamed in 4K HD, allowing global devotees to take remote Sankalpa and experience the sacred vibration in real-time." },
      { question: "What is Lingodbhava Kala?", answer: "Lingodbhava Kala occurs precisely at midnight (12:00 AM), representing the moment Lord Shiva manifested as the infinite column of cosmic light (Jyotirlinga)." },
      { question: "How do I fast or observe the night vigil at home?", answer: "Devotees can fast on fruits/milk or water during the day, remain awake during the live stream, and break their fast after the 4th Prahara Poornahuti at dawn." },
      { question: "What Prasadam will be delivered to registered attendees?", answer: "Registered participants receive sanctified Bhasma (Vibhuthi), Rudraksha bead energised during 4 Prahara Rudram, and Panchamruta Prasadam." }
    ]
  },
  {
    id: 3,
    title: "Navratri Chandi Homa Live 2026",
    slug: "navratri-chandi-homa-live",
    category: "Live Stream",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-10-18",
    event_time: "07:00 AM - 01:00 PM IST",
    pandits_count: 9,
    price: 2500,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "Grand 9-Priest Durga Saptashati Chandi Homa live streamed during sacred Sharad Navratri Mahashtami.",
    full_description: "Maha Chandi Homa is the ultimate ritual dedicated to Goddess Durga (Chandi Devi) as described in the Devi Mahatmyam (700 Mantras across 13 chapters). Performed during Sharad Navratri Mahashtami by 9 Ghanapathi priests led by Shri Pradeep Nadig, this grand Homa eradicates severe black energy, planetary obstacles, legal disputes, fear, and bestows unmatched spiritual strength, victory, and prosperity.",
    vidhi_details: "1. Mahaganapathi Pooja & Navadurga Avahana: Invoking 9 forms of Goddess Durga into sacred Kalashas.\n2. Chandi Navakshari Japa & Kavacha-Argala-Kilaka Recitation: Purificatory prologue recitations.\n3. Durga Saptashati 13 Adhyaya Homa: 700 sacred mantras offered into the Yajna Kunda with Payasam, Ghee, Kumkum, and Dry Fruits.\n4. Kanya Pooja & Dampati Pooja: Worship of 9 young girls (Kumaris) and Suvasinis representing the Divine Mother.\n5. Mahapoornahuti: Offering of sacred Silk Saree, Coconuts, Herbs, and Spices into the fire followed by Kumkuma Archana.",
    who_benefits: "Anyone experiencing persistent life obstacles, negative planetary Dashas (Rahu/Ketu/Shani), business losses, health troubles, or seeking divine victory.",
    who_should_attend: "Devotees and families seeking the divine protective shield of Goddess Durga during sacred Sharad Navratri.",
    when_performed: "Conducted on sacred Durgashtami / Mahashtami morning during Sharad Navratri.",
    where_performed: "Shaankari Sacred Mandap, Bengaluru with global HD YouTube Live Stream.",
    samagri_highlights: [
      "Pure Silk Saree for Mahapoornahuti",
      "Payasam & Dry Fruit Ahuti Materials",
      "700 Fresh Lotus & Red Hibiscus Flowers",
      "Sanctified Kumkum Prasadam from Chandi Yajna",
      "Energised Durga Yantra for home protection"
    ],
    venue_address: "Shaankari Mandap Bengaluru & YouTube Live",
    cover_image: "/images/live-events/navratri-chandi-homa-live.jpg",
    images: ["/images/live-events/navratri-chandi-homa-live.jpg"],
    agenda: [
      { time: "07:00 AM", title: "Navadurga Avahana & Mahasankalpa", description: "Initiation & recitation of registered devotee names and Gothras." },
      { time: "08:30 AM", title: "Durga Saptashati 13 Adhyaya Homa", description: "700 Sacred Chandi Mantras Ahuti with pure Ghee, Payasam, and sacred Samidhah." },
      { time: "12:00 PM", title: "Suvasini & Kanya Pooja", description: "Honoring 9 sacred maidens & Suvasinis representing Navadurga." },
      { time: "12:45 PM", title: "Mahapoornahuti & Blessing", description: "Silk Saree oblations, Poornahuti, Mahamangalarthi, and Prasadam distribution." }
    ],
    faq: [
      { question: "What are the benefits of Sharad Navratri Chandi Homa?", answer: "Invokes Goddess Durga's supreme grace for immediate obstacle removal, protection from envy/enemies, family prosperity, and physical vitality." },
      { question: "How many priests participate in this live Chandi Homa?", answer: "A team of 9 highly learned Ghanapathi Vedic scholars led by Veda Brahma Shri Pradeep Nadig conduct the entire 6-hour ritual." },
      { question: "Can I submit my family details for remote Sankalpa?", answer: "Yes, during registration you provide your family member names, Gothra, and Nakshatras which are solemnly offered during Mahasankalpa." },
      { question: "What items are offered during Poornahuti?", answer: "Pure Silk Saree, Coconuts, Sacred Herbs, Spices, Camphor, and Ghee are offered into the Yajnashala fire." },
      { question: "When will the energised Prasadam arrive?", answer: "Prasadam containing Chandi Kumkum, sacred Homa Bhasma, and Durga Raksha Yantra is dispatched within 3 business days following the event." }
    ]
  },
  {
    id: 4,
    title: "Monthly Pradosham Rudrabhishekam",
    slug: "monthly-pradosham-rudrabhishekam",
    category: "Live Stream",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-09-24",
    event_time: "04:30 PM - 07:30 PM IST",
    pandits_count: 5,
    price: 750,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "Sacred evening Pradosham Kala Rudrabhishekam & Bilvarchana dedicated to Lord Shiva.",
    full_description: "Pradosham occurs twice a month during the 1.5-hour period before sunset on Trayodashi tithi. Scripturally, this is the exact window when Lord Shiva performs the cosmic Anandatandava dance on Nandi Deva's horns. Participating in monthly Pradosha Rudrabhishekam and Sri Rudram chanting absolves karmic afflictions, removes grief, and bestows peace of mind.",
    vidhi_details: "1. Pradosha Purva Sankalpa & Nandi Archana.\n2. Ekadasa Dravya Abhisheka (Milk, Curd, Tender Coconut water, Honey, Ghee, Fruit juices, Bhasma, Sandalwood water).\n3. Continuous Yajurveda Namaka & Chamaka Parayana.\n4. 108 Sacred Bilva Leaf Archana & Trishati Stotram.\n5. Maha Mangalarthi with 16 Upachara Deeparadhana.",
    who_benefits: "Anyone seeking mental tranquility, relief from emotional stress, removal of ancestors' karmic debts, and Lord Shiva's blessings.",
    who_should_attend: "Devotees joining via HD Live Stream or in-person at the temple sanctum.",
    when_performed: "Conducted during sunset hours (4:30 PM - 7:30 PM) on Trayodashi Tithi every lunar month.",
    where_performed: "Shaankari Temple Sanctum & YouTube Live Stream.",
    samagri_highlights: [
      "11 Liters Fresh Cow Milk & Tender Coconuts",
      "1008 Fresh Bilva Leaves",
      "Pure Gandham & Bhasma",
      "Vedic Prasad Boxes for registered devotees"
    ],
    venue_address: "Shaankari Temple Sanctum & Live Stream",
    cover_image: "/images/live-events/monthly-pradosham-rudrabhishekam.jpg",
    images: ["/images/live-events/monthly-pradosham-rudrabhishekam.jpg"],
    agenda: [
      { time: "04:30 PM", title: "Pradosha Sankalpa & Avahana", description: "Initiation & Devotee Namakarana." },
      { time: "05:15 PM", title: "Panchamrutha Abhishekam & Rudram", description: "Sri Rudra Prashna recitation." },
      { time: "07:00 PM", title: "108 Bilvarchana & Deeparadhana", description: "Shiva Stotra & Aarti." }
    ],
    faq: [
      { question: "What is Pradosham Kala?", answer: "The 1.5-hour period before sunset on Trayodashi tithi, considered most potent for Lord Shiva's worship." },
      { question: "How often is Pradosham observed?", answer: "Pradosham occurs twice every month (Shukla Paksha Trayodashi & Krishna Paksha Trayodashi)." },
      { question: "What are the benefits of Bilvarchana on Pradosham?", answer: "Offering Bilva leaves during Pradosha Kala destroys sins committed over three lifetimes (Trijanma Paapa Samhara)." }
    ]
  },
  {
    id: 5,
    title: "Interactive Live Thread Art Event",
    slug: "thread-art-live-event",
    category: "Live Stream",
    status: "Upcoming",
    venue_type: "Hybrid",
    event_date: "2026-10-05",
    event_time: "10:00 AM - 05:00 PM IST",
    pandits_count: 3,
    price: 2500,
    has_payment: true,
    stream_url: "https://youtube.com/live/placeholder",
    short_description: "An interactive live string art experience for birthdays, marriages, and celebrations where guests move threads across pegs guided by expert instructors to create custom portrait art.",
    full_description: "Thread Art is an extraordinary interactive live event designed for birthdays, weddings, anniversaries, and grand celebrations. Under the guidance of an expert instructor, guests themselves weave vibrant threads across precision-placed pins on a wooden canvas, collectively crafting a stunning custom string-art portrait of the birthday child, wedding couple, or honored host.",
    vidhi_details: "1. Precision Pin Matrix Preparation on custom birch wood base.\n2. Guest Orientation & Thread Weaving Sequence Guidance.\n3. Collaborative Multilayer Thread Overlay & Portrait Contouring.\n4. Final Varnish & Custom Framing Presentation.",
    who_benefits: "Event hosts, wedding couples, birthday hosts, and corporate celebrations seeking an engaging live collaborative artwork experience.",
    who_should_attend: "Event guests, family members, and attendees.",
    when_performed: "Conducted live during wedding receptions, milestone birthdays, or cultural galas.",
    where_performed: "Client event venue across Bengaluru or live interactive broadcast studio.",
    samagri_highlights: [
      "Custom Birchwood Base Board with 500+ Precision Pins",
      "High-Tenacity Silk & Metallic Thread Spools",
      "Laser-Guided Path Indicators",
      "Protective Acrylic Frame"
    ],
    venue_address: "Shaankari Sacred Event Mandap & On-Location Event Venues, Bengaluru",
    cover_image: "/images/live-events/thread-art-live.jpg",
    images: ["/images/live-events/thread-art-live.jpg"],
    agenda: [
      { time: "10:00 AM", title: "Canvas & Pin Matrix Preparation", description: "Setting up the custom wooden base with precision pin matrix." },
      { time: "11:00 AM", title: "Guided Guest Thread Weaving", description: "Instructor guides guests step-by-step to weave colored threads across designated pin paths." },
      { time: "04:00 PM", title: "Final Detailing & Portrait Unveiling", description: "Master artisan completes final contouring and presents the collective masterpiece." }
    ],
    faq: [
      { question: "Can Thread Art live events be conducted at private birthday or marriage venues?", answer: "Yes, our guided instructor and setup team travel to your event venue across Bengaluru to facilitate the interactive thread art experience for your guests." },
      { question: "Who creates the portrait during the live event?", answer: "Your guests participate actively by moving the threads along guided paths, creating a memorable collaborative gift for the hosts." }
    ]
  },
  {
    id: 101,
    title: "Marriage / Maduve (Vedic Vivaha Ceremony)",
    slug: "marriage-maduve",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Auspicious Muhoortha",
    pandits_count: 5,
    price: 0,
    has_payment: false,
    short_description: "Complete authentic Vedic Vivaha event management including Purohit panel, Mandap Mandala setup, Kanyadaana & Saptapadi rites.",
    full_description: "Comprehensive Vedic Marriage (Vivaha Samskara) event management conducted by Veda Brahma Shri Pradeep Nadig and a panel of senior Ghanapathi scholars. Marriage is the sacred union of two souls across seven lives in Hindu Dharma. We manage end-to-end ritual execution according to your family's exact Veda Shakha (Ashvalayana, Apastamba, Bodhayana, or Rigveda), including Varakatana, Nandi Pooja, Kanyadaana, Mangalya Dharana, Saptapadi, Laja Homa, and Arundhati Darshana. Our service includes custom Yajnashala construction, pure puja samagri, mandap mandala design, and complete ceremonial orchestration.",
    vidhi_details: "1. Nandi Pooja & Devata Avahana: Invoking ancestors and Kula Devatas for obstacles-free marriage.\n2. Vara Pooja & Kashiyatra: Ceremonial welcome of the bridegroom and ritual Kashiyatra.\n3. Kanyadaana & Varamala: Parents solemnize the handovers of the bride with sacred Veda Sukta recitations.\n4. Mangalya Dharana: Tying of sacred Mangalsutra at the precise auspicious Muhoortha with 3 knots.\n5. Saptapadi & Agni Pradaksina: Taking 7 sacred steps together around Agni Deva invoking 7 fundamental life vows.\n6. Laja Homa & Arundhati Darshana: Parched rice oblations in Yajna Kunda and viewing the sacred Arundhati-Vasistha star pair.",
    who_benefits: "The bride, bridegroom, and both families receive divine harmony, lifelong matrimonial bliss, progeny, and prosperity.",
    who_should_attend: "Bride, Groom, Parents, Close Relatives, and honored wedding guests.",
    when_performed: "Conducted during auspicious Shubha Muhoortha calculated accurately based on Bride and Groom's Janma Nakshatra.",
    where_performed: "Kalyana Mantapa, Convention Hall, Resort, or Traditional Marriage Venue across Bengaluru, Karnataka, and Pan-India.",
    samagri_highlights: [
      "Complete Pure Cow Ghee & Sacred Samidhah Wood",
      "Traditional Yajnashala & Mandala Setup Materials",
      "Sanctified Turmeric, Kumkum, & Akshata",
      "Sacred Threads, Mangalya Accessories, & Garland Materials",
      "Purohit Panel (5 to 11 Ghanapathis)"
    ],
    venue_address: "Client Venue / Kalyana Mantapa across Bengaluru & Pan-India",
    cover_image: "/images/services/marriage-maduve.jpg",
    images: ["/images/services/marriage-maduve.jpg"],
    agenda: [
      { time: "Phase 1: Pre-Wed", title: "Nandi Pooja, Vara Pooja & Kashiyatra", description: "Inaugural ancestral seeking, groom reception, and traditional Kashiyatra rites." },
      { time: "Phase 2: Muhoortha", title: "Kanyadaana & Mangalya Dharana", description: "Sacred handover of bride and tying of Mangalsutra at exact Muhoortha." },
      { time: "Phase 3: Post-Wed", title: "Saptapadi, Laja Homa & Arundhati Darshana", description: "Seven sacred steps around Agni deva, puffed rice oblations, and star viewing." },
      { time: "Phase 4: Griha Pravesha", title: "Vadhusankrama & Blessing Ceremony", description: "Welcoming bride to new home with Lakshmi Pooja and elder blessings." }
    ],
    faq: [
      { question: "What is included in the Marriage / Maduve Event Management package?", answer: "We provide complete Purohit panel, Puja samagri arrangement, Yajnashala setup, Veda chanting as per your family Shakha, and full ritual guidance from Nandi Pooja to Saptapadi." },
      { question: "Can the rituals be customized based on our family tradition (Sutra/Community)?", answer: "Yes, Shri Pradeep Nadig specializes in Rigveda (Ashvalayana), Krishna Yajurveda (Apastamba/Bodhayana), and Sukla Yajurveda traditions across Kannada, Smartha, Madhva, and South Indian customs." },
      { question: "How many Pandits will be present for the marriage ceremony?", answer: "We assign a chief Ghanapathi Pandit along with 4 to 10 supporting priests depending on the scale and complexity of the wedding rituals." },
      { question: "Do you supply all required puja samagri and homa materials?", answer: "Yes, 100% of pure puja samagri (including pure cow ghee, samidhah, dry fruits, turmeric, kalashas, and mandala powders) are arranged by our team." },
      { question: "How early should we book event management for a wedding?", answer: "We recommend booking at least 3 to 6 weeks in advance to secure optimal Muhoortha lock-in and priest panel availability." },
      { question: "How do I request a quote or book an event management consultation?", answer: "Click the 'Enquire Event Booking' button on this page to submit your wedding dates and location. Shri Pradeep Nadig's team will contact you within 24 hours." }
    ]
  },
  {
    id: 102,
    title: "Threading Ceremony / Upanayana (Munjvi)",
    slug: "threading-ceremony-upanayana",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Morning Muhoortha",
    pandits_count: 3,
    price: 0,
    has_payment: false,
    short_description: "Sacred Thread initiation ceremony with Brahmopadesha, Gayatri Mantra initiation, & Complete Veda Vrata rituals.",
    full_description: "Upanayana (Munjvi) is the sacred second birth (Dvija) of a young boy into Vedic learning and spiritual discipline. Conducted by Veda Brahma Shri Pradeep Nadig and learned Ghanapathi scholars, this event management service covers the complete ritual flow: Nandi Pooja, Choodakarana (Tonsure), Yajnopavita Dharana (investiture of 3-strand sacred thread), Gayatri Mantropadesha under the sacred cloth (Brahmopadesha), Bhikshacharana, Agnikarya, and Medha Janana Homa.",
    vidhi_details: "1. Matru Bhojana & Choodakarana: Final mother-son feast followed by purificatory hair removal.\n2. Abhyangana Snana & Yajnopavita Dharana: Ceremonial bath and investiture of the holy Yajnopavita thread.\n3. Brahmopadesha: Father/Guru imparts the supreme Gayatri Mantra under a sanctified silk canopy.\n4. Bhikshacharana: The Vatu (young boy) collects first alms (Bhiksha) from Mother and ladies.\n5. Agnikarya & Samidadhana: Fire ritual teaching daily Sandhyavandanam and Agni worship.\n6. Medha Janana Homa: Homa invoking Saraswati Deva for supreme memory, intellect, and character.",
    who_benefits: "The young boy (Vatu) gains supreme intellect (Medha), concentration in education, spiritual protection, and entry into Vedic traditions.",
    who_should_attend: "Vatu, Father, Mother, Maternal Uncle (Mama), Family Elders, and Relatives.",
    when_performed: "Conducted in the 7th, 8th, 9th, or 11th year of the child at an auspicious morning Muhoortha.",
    where_performed: "Client Residence, Community Hall, Party Hall, or Kalyana Mantapa across Bengaluru & Pan-India.",
    samagri_highlights: [
      "Pure Cotton Yajnopavita (Sacred Threads)",
      "Mounji Grass Belt & Deerskin Piece",
      "Palasa (Flame of the Forest) Sacred Wooden Staff",
      "Complete Yajnashala & Agnikarya Samagri",
      "Vedic Pandit Panel (3 to 7 Priests)"
    ],
    venue_address: "Client Residence / Event Hall across Bengaluru & Pan-India",
    cover_image: "/images/services/upanayana-threading.jpg",
    images: ["/images/services/upanayana-threading.jpg"],
    agenda: [
      { time: "07:00 AM", title: "Nandi Pooja & Matru Bhojana", description: "Ancestral blessings and final maternal childhood meal." },
      { time: "08:30 AM", title: "Yajnopavita Dharana & Brahmopadesha", description: "Sacred thread investiture and Gayatri Mantra initiation under silk cloth." },
      { time: "11:00 AM", title: "Bhikshacharana & Agnikarya", description: "First alms collection from elders and sacred fire offering." },
      { time: "12:30 PM", title: "Medha Janana Homa & Blessings", description: "Homa for memory power and grand elder blessings." }
    ],
    faq: [
      { question: "Do you supply the required puja items and sacred thread for Upanayana?", answer: "Yes, we arrange authentic Yajnopavitha, deerskin/mounji belt, Palasa staff, samidhah wood, and 100% of ritual samagri." },
      { question: "Will the boy be taught how to perform Sandhyavandanam?", answer: "Yes, Shri Pradeep Nadig personally guides the boy through the step-by-step Sandhyavandanam procedure during the ceremony." },
      { question: "How many pandits are required for a traditional Upanayana?", answer: "Typically 3 to 5 senior Ghanapathi pandits conduct the ceremony seamlessly." },
      { question: "Can Upanayana be combined with Chowla (first haircut)?", answer: "Yes, if Chowla was not done earlier, it can be seamlessly integrated into the morning rituals before Brahmopadesha." },
      { question: "How do I book this Upanayana event management?", answer: "Click 'Enquire Event Booking' on this page, fill in your details, and our team will provide a tailored event proposal within 24 hours." }
    ]
  },
  {
    id: 103,
    title: "Garbha Sanskaar / Garbha Sanskaara",
    slug: "garbha-sanskaar",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Auspicious Tithi",
    pandits_count: 2,
    price: 0,
    has_payment: false,
    short_description: "Holistic Vedic prenatal guidance rituals, Garbha Raksha Sookta parayana, and positive fetal mental impression ceremony.",
    full_description: "Garbha Sanskaar is the ancient Vedic science of nurturing a child's mental, physical, and spiritual development right from the womb. According to Ayurveda and Veda Shastras, a unborn child absorbs vibrations, emotions, and thoughts from the 3rd month onward. Veda Brahma Shri Pradeep Nadig provides complete event management and guidance for Garbha Sanskaar, including Garbha Raksha Sukta chanting, Santana Gopala Homa, Vedic sound meditation, and positive mental impression ceremonies for expectant parents.",
    vidhi_details: "1. Sankalpa & Garbha Raksha Sookta Parayana: Chanting 108 protective Vedic mantras for maternal and fetal well-being.\n2. Santana Gopala Homa: Fire oblations offering Lotus seeds, Ghee, and Charu for intelligent, healthy offspring.\n3. Abhimantrita Ksheera & Jalabhisheka: Sanctifying drinking milk and water with protective mantras for daily consumption.\n4. Sound Therapy & Vedic Chanting Guidance: Teaching parents sacred daily stotrams and peaceful routines.",
    who_benefits: "The expectant mother and the unborn child receive physical immunity, intellectual sharpness, calm disposition, and divine protection.",
    who_should_attend: "Expectant Mother, Husband, and immediate family members.",
    when_performed: "Conducted during the 3rd, 5th, or 7th month of pregnancy at an auspicious morning time.",
    where_performed: "Client Residence across Bengaluru or Online Consultation & Remote Guidance.",
    samagri_highlights: [
      "Pure Cow Milk & Charu (Sweet Rice) Samagri",
      "Santana Gopala Yantra",
      "Sanctified Herbal Protective Thread (Raksha Sutra)",
      "Prasadam & Audio Guide for daily mantras"
    ],
    venue_address: "Client Residence / Virtual Guidance",
    cover_image: "/images/services/garbha-sanskaar.jpg",
    images: ["/images/services/garbha-sanskaar.jpg"],
    agenda: [
      { time: "Session 1", title: "Garbha Raksha Sookta Parayana", description: "Chanting of protective mantras for healthy pregnancy and peaceful mind." },
      { time: "Session 2", title: "Santana Gopala Homa", description: "Fire ritual invoking Lord Krishna's blessings for healthy & wise offspring." },
      { time: "Session 3", title: "Sanctified Mantras & Meditation", description: "Sound therapy and positive spiritual impressions for the mother and baby." }
    ],
    faq: [
      { question: "At what month of pregnancy should Garbha Sanskaar be conducted?", answer: "Garbha Sanskaar guidance begins from early pregnancy, with specific Homas conducted during the 3rd, 5th, or 7th months." },
      { question: "Is this safe for the expectant mother?", answer: "Yes, all rituals involve soothing Vedic chantings, mild incense, and peaceful home-based ceremonies designed for mother's total comfort." },
      { question: "Can Garbha Sanskaar be conducted remotely?", answer: "Yes, remote Sankalpa and online guided sessions can be conducted if traveling is restricted." }
    ]
  },
  {
    id: 104,
    title: "Naming Ceremony / Naamakarana",
    slug: "naming-ceremony-naamakarana",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Morning Hours",
    pandits_count: 2,
    price: 0,
    has_payment: false,
    short_description: "Authentic Vedic naming ritual for newborn infants, Janma Rashi calculation, and family benediction rites.",
    full_description: "Naamakarana Samskara is the sacred ritual of formally naming a newborn baby on the 11th, 12th, 16th, or 21st day after birth. The name assigned during Naamakarana forms the child's energetic identity across life. Shri Pradeep Nadig calculates the exact Janma Nakshatra Pada, recommends astrologically aligned name initials (Nama Akshara), and conducts complete end-to-end ritual management including Punyahavachana, Kula Devata Pooja, ear-whispering ceremony, cradle decoration, and elder blessings.",
    vidhi_details: "1. Punyahavachana & Shuddhi: Purification of the home environment with sanctified Kalasa water.\n2. Janma Kundali & Nama Akshara Determination: Astrological calculation of the child's birth star syllable.\n3. Ear-Whispering Vidhi: Father whispers the secret astrological name and public name 3 times into the baby's right ear.\n4. Honey & Ghee Rite (Licking of Medha): Touching pure honey and ghee to baby's tongue for eloquence and intellect.\n5. Cradle Blessing (Thottilu Pooja): Placing baby in decorated cradle accompanied by auspicious ladies' songs.",
    who_benefits: "The newborn baby receives lifelong protection, positive name vibrations, health, and auspicious energy.",
    who_should_attend: "Parents, Grandparents, Relatives, and Friends.",
    when_performed: "Conducted on the 11th, 12th, 16th, 21st, or 40th day after childbirth.",
    where_performed: "Client Residence, Party Hall, or Event Venue across Bengaluru.",
    samagri_highlights: [
      "Kalasa Sthapana & Pure Honey/Ghee setup",
      "Janma Nakshatra Chart Document",
      "Decorated Cradle Accessories & Flowers",
      "Purohit Panel (2 Priests)"
    ],
    venue_address: "Client Residence / Party Hall across Bengaluru",
    cover_image: "/images/services/naming-ceremony-naamakarana.jpg",
    images: ["/images/services/naming-ceremony-naamakarana.jpg"],
    agenda: [
      { time: "Part 1", title: "Punya Havachana & Kula Devata Pooja", description: "House purification and family deity invocation." },
      { time: "Part 2", title: "Namakarana Vidhi & Ear Whispering", description: "Whispering sacred name in baby's right ear and honey touching rite." },
      { time: "Part 3", title: "Thottilu Pooja & Cradle Blessings", description: "Placing baby in decorated cradle followed by elder blessings and feast." }
    ],
    faq: [
      { question: "Can astrologically suitable names be recommended during the ceremony?", answer: "Yes, Shri Pradeep Nadig analyzes the child's exact Janma Nakshatra and Pada to suggest auspicious starting syllables." },
      { question: "What materials do parents need to prepare?", answer: "We provide complete puja samagri; parents only need to keep clean clothes for baby and silver plate/honey if preferred." },
      { question: "Can Naamakarana be performed if the child is a few months old?", answer: "Yes, if missed in the first month, Naamakarana can be performed on any auspicious Tithi." }
    ]
  },
  {
    id: 105,
    title: "Baby Shower / Seemantha (Seemanthonnayanam)",
    slug: "baby-shower-seemantha",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Auspicious Muhoortha",
    pandits_count: 3,
    price: 0,
    has_payment: false,
    short_description: "Traditional Vedic Seemantha ritual for expectant mothers, Udaka Shanti, and auspicious family celebrations.",
    full_description: "Seemanthonnayanam (Seemantha) is the third pregnant Samskara conducted during the 5th, 7th, or 8th month of pregnancy. It is designed to keep the expectant mother joyous, calm, and spiritually protected. Our comprehensive event management includes Udaka Shanti parayana (recitation of 144 protective mantras into sanctified water), hair-parting ritual with sacred Porcupine quill/Rose twig (Seemantha Vidhi), Bangles distribution (Valaikappu), Vishnu Sahasranama chanting, and lavish feast coordination.",
    vidhi_details: "1. Udaka Shanti Mantras: Recitation of powerful protective Veda mantras over Kalasha water.\n2. Seemanthonnayanam Rite: Gentle parting of mother's hair by husband using sanctified porcupine quill/rose branch.\n3. Kalasabhishekam & Prokshana: Sprinkling sacred water over the mother for safe childbirth.\n4. Valaikappu & Glass Bangles Adornment: Adornment of colorful glass bangles by family Suvasinis.\n5. Elder Blessings & Naivedya: Offering special sweets and receiving blessings from elders.",
    who_benefits: "The expectant mother receives mental calmness, safe delivery blessings, and physical well-being for mother and baby.",
    who_should_attend: "Expectant Mother, Husband, Grandmothers, In-laws, Relatives, and Suvasinis.",
    when_performed: "Conducted during the 5th, 7th, or 8th month of pregnancy on an auspicious Muhoortha.",
    where_performed: "Client Residence, Party Hall, or Convention Center across Bengaluru.",
    samagri_highlights: [
      "Udaka Shanti Kalasa Setup",
      "Traditional Porcupine Quill & Rose Twig",
      "Glass Bangles & Kumkum Sets",
      "3 Senior Ghanapathi Priests"
    ],
    venue_address: "Client Residence / Convention Hall across Bengaluru",
    cover_image: "/images/services/baby-shower-seemantha.jpg",
    images: ["/images/services/baby-shower-seemantha.jpg"],
    agenda: [
      { time: "Morning", title: "Udaka Shanti & Kalasha Sthapana", description: "Sanctification of water and protective Vedic recitation by 3 priests." },
      { time: "Mid-Day", title: "Seemantha Vidhi & Valaikappu", description: "Parting of hair ritual, glass bangles adornment, and elder blessings." },
      { time: "Afternoon", title: "Grand Feast & Guest Departure", description: "Traditional South Indian feast and return gift distribution." }
    ],
    faq: [
      { question: "What is the significance of Udaka Shanti during Seemantha?", answer: "Udaka Shanti invokes powerful protective deities into sanctified water to bestow health, easy delivery, and long life to mother and child." },
      { question: "Do you supply bangles and puja materials?", answer: "Yes, we handle complete ritual materials, Kalashas, and optional bangle distribution management." }
    ]
  },
  {
    id: 106,
    title: "Gabhadaan / Gabhadaana Samskara",
    slug: "gabhadaan-gabhadaana",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Private Auspicious Time",
    pandits_count: 1,
    price: 0,
    has_payment: false,
    short_description: "First Samskara of Vedic tradition for spiritual, mental, and physical sanctification before conception.",
    full_description: "The foundational first Samskara in Hindu tradition performed for newly married couples desiring virtuous, healthy, and enlightened offspring. Conducted with absolute privacy, sanctity, and authentic Vedic mantras.",
    vidhi_details: "1. Prajapati Avahana & Homa: Fire oblations seeking blessings for noble lineage.\n2. Garbha Shuddhi Mantras: Purificatory recitations for physical and mental alignment.\n3. Private Blessing & Prasadam.",
    who_benefits: "Newly married couples seeking noble, intelligent, and virtuous progeny.",
    who_should_attend: "Husband and Wife (Strictly Private).",
    when_performed: "Conducted after marriage before planning conception at an auspicious Muhoortha.",
    where_performed: "Client Residence.",
    samagri_highlights: [
      "Pure Cow Ghee & Prajapati Samagri",
      "Prajapati Yantra & Sacred Threads"
    ],
    venue_address: "Client Residence",
    cover_image: "/images/services/gabhadaan-gabhadaana.jpg",
    images: ["/images/services/gabhadaan-gabhadaana.jpg"],
    agenda: [
      { time: "Evening", title: "Prajapati & Garbha Homa", description: "Sacred fire invocation seeking blessings for noble lineage." }
    ],
    faq: [
      { question: "Is Gabhadaan performed with complete privacy?", answer: "Yes, this sacred Samskara is conducted with extreme sanctity and confidentiality for the couple." }
    ]
  },
  {
    id: 107,
    title: "First Haircut Ceremony / Chowla (Choodakarana)",
    slug: "first-haircut-ceremony-chowla",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Morning Hours",
    pandits_count: 2,
    price: 0,
    has_payment: false,
    short_description: "First tonsure ceremony for child's longevity, health, and intellectual enhancement with Ayushya Homa.",
    full_description: "Choodakarana Samskara (Chowla) is the ceremonial first haircut performed in the 1st or 3rd year of the child. It symbolizes shedding past life karmic impressions and fostering health, brain development, and longevity. Includes Ayushya Homa, Navagraha Pooja, traditional tonsure ritual coordination, and sanctified bathing.",
    vidhi_details: "1. Ayushya Homa: Fire ritual invoking Markandeya, Chiranjivis, and Ayur Devatas for child's longevity.\n2. Chowla Vidhi: Sacred first hair removal with ritual mantras, curd/butter application, and barbers' blessing.\n3. Abhyangana Snana & New Clothes Presentation.",
    who_benefits: "The child receives longevity (Ayush), robust health, mental clarity, and protection from evil eye.",
    who_should_attend: "Child, Parents, Maternal Uncle, and Relatives.",
    when_performed: "Conducted at the end of the 1st year or during the 3rd year at an auspicious Muhoortha.",
    where_performed: "Client Residence, Temple, or Event Hall across Bengaluru.",
    samagri_highlights: [
      "Ayushya Homa Samagri",
      "Pure Butter/Curd for hair sanctification",
      "Purohit Panel (2 Priests)"
    ],
    venue_address: "Client Residence / Temple / Hall across Bengaluru",
    cover_image: "/images/services/chowla-haircut.jpg",
    images: ["/images/services/chowla-haircut.jpg"],
    agenda: [
      { time: "Part 1", title: "Ayushya Homa & Navagraha Pooja", description: "Fire ritual invoking longevity and robust health for the child." },
      { time: "Part 2", title: "Chowla Vidhi & Snana", description: "Sacred first hair removal with ritual mantras and curd/butter application." }
    ],
    faq: [
      { question: "When is Chowla / Choodakarana traditionally performed?", answer: "It is usually performed at the end of the 1st year or during the 3rd year at an auspicious Muhoortha." }
    ]
  },
  {
    id: 108,
    title: "House Warming Ceremony / Griha Pravesha",
    slug: "house-warming-griha-pravesha",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Brahma Muhoortha / Morning",
    pandits_count: 4,
    price: 0,
    has_payment: false,
    short_description: "Complete Griha Pravesha event management: Vastu Shanti, Navagraha Homa, Lakshmi Pooja, and milk boiling ritual.",
    full_description: "Comprehensive Griha Pravesha event management for new independent houses, villas, or apartments across Bengaluru and Pan-India. Moving into a new home requires pacifying Vastu Purusha, neutralizing directional doshas, and welcoming Goddess Lakshmi. Shri Pradeep Nadig provides end-to-end management including Dwara Pooja, Gau Pravesha (Cow & Calf entrance), Vastu Shanti Homa, Navagraha Homa, Ksheera Ubaluvudhu (milk boiling rite), and Ganapathi Homa.",
    vidhi_details: "1. Dwara Pooja & Gau Pravesha: Threshold sanctification and auspicious sacred cow entrance at dawn.\n2. Vastu Purusha Mandala Sthapana & Shanti Homa: 16-point Vastu grid worship and samidhah offerings.\n3. Ksheera Paaka (Milk Boiling): Ceremonial boiling of fresh milk until it overflows, signifying overflowing abundance.\n4. Navagraha & Ganapathi Homa: Removing all negative vibrations from the land and walls.\n5. Kalasa Samprokshana: Sprinkling holy water in all rooms and corners.",
    who_benefits: "The entire homeowner family enjoys happiness, financial abundance, protection from negative energies, and long life in the new home.",
    who_should_attend: "Homeowners, Family Members, Relatives, and Guests.",
    when_performed: "Conducted during Brahma Muhoortha or early morning based on homeowner's Janma Rashi.",
    where_performed: "New Residence / Apartment / Villa across Bengaluru & India.",
    samagri_highlights: [
      "Vastu Mandala Chart & Copper Pyramids",
      "Complete Homa Samagri & Samidhah",
      "Gau Pravesha (Cow & Calf arrangement)",
      "4 Senior Ghanapathi Priests"
    ],
    venue_address: "Client Residence across Bengaluru & Pan-India",
    cover_image: "/images/services/griha-pravesha.jpg",
    images: ["/images/services/griha-pravesha.jpg"],
    agenda: [
      { time: "Dawn (5:30 AM)", title: "Dwara Pooja & Gau Pravesha", description: "Threshold ritual and sacred cow entrance into the new house." },
      { time: "06:30 AM", title: "Ksheera Paaka (Milk Boiling)", description: "Ceremonial milk boiling in the new kitchen for abundance." },
      { time: "08:00 AM", title: "Vastu Shanti & Navagraha Homa", description: "Purifying directional energies and planetary offerings in Homa Kunda." },
      { time: "11:00 AM", title: "Kalasa Samprokshana & Satyanarayana Pooja", description: "Sprinkling sanctified water in all rooms followed by Mahamangalarthi." }
    ],
    faq: [
      { question: "Do you arrange for Cow & Calf (Gau Pravesha) for Griha Pravesha?", answer: "Yes, upon request we facilitate authentic sacred Gau Pravesha arrangement along with full Vastu Shanti setup." },
      { question: "What is included in the Griha Pravesha Event Management?", answer: "We provide complete Pandit panel, Puja samagri, Homa kunda setup, Vastu Mandala setup, and end-to-end ritual coordination." },
      { question: "Can Satyanarayana Pooja be performed on the same day?", answer: "Yes, Satyanarayana Pooja is typically conducted right after the Vastu Homa in the afternoon." }
    ]
  },
  {
    id: 109,
    title: "Shashti Poorthi (60th Birthday Renewal / Ugraratha Shanthi)",
    slug: "shashti-poorthi-60th-birthday",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Morning Muhoortha",
    pandits_count: 5,
    price: 0,
    has_payment: false,
    short_description: "Grand 60th birthday marital vow renewal & longevity ceremony with Ayushya Homa, 60 Kalasa Abhishekam, & Dampati Pooja.",
    full_description: "Shashti Poorthi (Ugraratha Shanthi) marks the completion of 60 years of life (completion of one full 60-year Jupiter-Saturn astrological cycle). It is a grand milestone where the couple re-enacts their marital vows (Maduve renewal) and receives 60 Kalashas Abhishekam. Shri Pradeep Nadig handles complete event management including Ayushya Homa, Mrityunjaya Homa, 60 Sacred Waters Kalasabhishekam, Dampati Pooja, and Mangalya Dharana.",
    vidhi_details: "1. 60 Kalasa Sthapana: Invoking 60 Samvatsara Devatas, Navagrahas, and Chiranjivis into 60 sanctified Kalashas.\n2. Maha Mrityunjaya & Ayushya Homa: Fire oblations for robust health and overcoming planetary afflictions.\n3. 60 Kalasa Abhishekam: Children and grandchildren pour sacred water over the celebrated couple.\n4. Re-Tying of Mangalsutra (Dampati Pooja): Husband re-ties Mangalsutra to wife with Veda chantings.\n5. Elder Blessings & Grand Feast.",
    who_benefits: "The celebrated couple gains renewed health, longevity, harmony, and blessings for children/grandchildren.",
    who_should_attend: "Celebrated Couple, Children, Grandchildren, Relatives, and Friends.",
    when_performed: "Conducted upon reaching the 60th birthday (completion of 60th year).",
    where_performed: "Convention Hall, Kalyana Mantapa, Temple, or Home across Bengaluru.",
    samagri_highlights: [
      "60 Copper Kalashas & Sanctified Water Setup",
      "Ayushya & Mrityunjaya Homa Materials",
      "New Garlands, Silk Clothes & Mangalya Thread",
      "5 Ghanapathi Priests"
    ],
    venue_address: "Client Venue / Kalyana Mantapa across Bengaluru",
    cover_image: "/images/services/shashti-poorthi.jpg",
    images: ["/images/services/shashti-poorthi.jpg"],
    agenda: [
      { time: "07:00 AM", title: "60 Kalasa Sthapana & Mrityunjaya Homa", description: "Invoking 60 year deities and longevity fire ritual." },
      { time: "09:30 AM", title: "60 Kalasabhishekam", description: "Ceremonial bathing of couple by children and grandchildren." },
      { time: "11:00 AM", title: "Dampati Pooja & Mangalya Dharana", description: "Re-tying of sacred thread and floral garland exchange." }
    ],
    faq: [
      { question: "What is the significance of Shashti Poorthi?", answer: "Marks the completion of 60 years of life and protects against Ugraratha planetary afflictions while renewing marriage vows." }
    ]
  },
  {
    id: 110,
    title: "Sathabhishekam (80th Birthday / Sahasra Chandra Darshana)",
    slug: "sathabhishekam-80th-birthday",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Morning Hours",
    pandits_count: 5,
    price: 0,
    has_payment: false,
    short_description: "Sacred 80th birthday celebration (seeing 1000 full moons) with Ayushya Homa, 1008 Kalasa Abhishekam, and Daanam.",
    full_description: "Sathabhishekam celebrates a person completing 80 years and 8 months of life, having witnessed 1000 full moons (Sahasra Chandra Darshana). It is considered one of the highest spiritual honors in a human life. Shri Pradeep Nadig conducts full ceremonial management including 1000 Moon blessings, Ayur Sukta Homa, Kanakabhishekam (showering with gold/flowers), and 10 Mahadaanas.",
    vidhi_details: "1. Sahasra Chandra Darshana Smarana & Kalasa Sthapana.\n2. Ayushya & Rudra Homa.\n3. Kanakabhishekam & Floral Abhishekam by 3 generations of family.\n4. Daanam (Gau, Bhumi, Tila, Gold, Clothes offerings).\n5. Grand family feast and seeking padanamaskaram.",
    who_benefits: "The octogenarian elder and 3 generations of descendants receive immense spiritual merits and long life.",
    who_should_attend: "Elders, Children, Grandchildren, Great-grandchildren, and Relatives.",
    when_performed: "Conducted upon completing 80 years and 8 lunar months.",
    where_performed: "Kalyana Mantapa, Convention Hall, or Residence across Bengaluru.",
    samagri_highlights: [
      "1008 Kalasa / Floral Abhisheka Setup",
      "Ayushya Homa & Daanam Materials",
      "5 Senior Ghanapathi Priests"
    ],
    venue_address: "Client Venue across Bengaluru & Pan-India",
    cover_image: "/images/services/sathabhishekam.jpg",
    images: ["/images/services/sathabhishekam.jpg"],
    agenda: [
      { time: "Morning", title: "Sahasra Chandra Puja & Ayur Homa", description: "Worshipping 1000 full moons and longevity fire ritual." },
      { time: "Mid-Day", title: "Kanakabhishekam & Elder Blessings", description: "Gold/flower shower by 3 generations and Daanam rites." }
    ],
    faq: [
      { question: "What is Sahasra Chandra Darshana?", answer: "It celebrates an elder having lived through 1000 full moon cycles (approx 80 years and 8 months)." }
    ]
  },
  {
    id: 111,
    title: "Aksharabhyasa / Vidyarambham Ceremony",
    slug: "aksharabhyasa-vidyarambham",
    category: "Event Management",
    status: "Upcoming",
    venue_type: "In-Person",
    event_date: "On Request",
    event_time: "Morning Hours",
    pandits_count: 2,
    price: 0,
    has_payment: false,
    short_description: "Sacred initiation into learning, writing, and education for toddlers with Saraswati Pooja and rice writing.",
    full_description: "Aksharabhyasa (Vidyarambham) is the sacred initiation into formal education and writing for young toddlers (usually around age 3 to 5). Conducted by Shri Pradeep Nadig, the ritual involves Saraswati Pooja, Hayagriva Pooja, Medha Sukta parayana, and guiding the child's finger to write 'Om Namah Shivaya' or 'Hari Sri Ganapataye Namah' in raw rice and sand.",
    vidhi_details: "1. Saraswati & Hayagriva Avahana: Invoking Goddess of Knowledge into sacred books & slate.\n2. Medha Sukta Parayana: Chanting for supreme memory and intellect.\n3. Akshara Lekhana: Father/Guru holds child's right index finger to trace sacred mantras in raw rice.\n4. Tongue Writing: Tracing 'Om' on child's tongue with a gold ring dipped in honey.",
    who_benefits: "The child receives sharp intellect, speech clarity, love for education, and academic success.",
    who_should_attend: "Child, Parents, Grandparents, and Teachers.",
    when_performed: "Conducted on Vijayadasami, Vasant Panchami, or auspicious morning Tithis.",
    where_performed: "Client Residence, Temple, or School Venue across Bengaluru.",
    samagri_highlights: [
      "Saraswati Yantra & Puja Slate",
      "Raw Rice & Pure Honey with Gold Ring",
      "Purohit Panel (2 Priests)"
    ],
    venue_address: "Client Residence / Temple across Bengaluru",
    cover_image: "/images/services/aksharabhyasa.jpg",
    images: ["/images/services/aksharabhyasa.jpg"],
    agenda: [
      { time: "Morning", title: "Saraswati Pooja & Akshara Lekhana", description: "Pooja to Goddess of learning and writing first sacred letters in raw rice." }
    ],
    faq: [
      { question: "At what age should Aksharabhyasa be performed?", answer: "It is traditionally performed between 3 to 5 years of age before the child begins formal school." }
    ]
  }
];

export const FALLBACK_WORKSHOPS: Workshop[] = [
  {
    id: 1,
    title: "Vedic Chanting & Suktas Recitation Workshop",
    slug: "vedic-chanting-suktas-recitation-workshop",
    mode: "Hybrid",
    start_date: "2026-09-20",
    end_date: "2026-09-22",
    timings: "07:00 AM - 09:00 AM IST",
    location: "Online Zoom & Shaankari Kendra, Bengaluru",
    price: 3500,
    seats_limit: 30,
    status: "Published",
    seo_title: "Vedic Chanting & Suktas Recitation Workshop | Pradeep Nadig",
    seo_description: "Master authentic Sanskrit Swara chanting, Purusha Sukta, Sri Sukta, and Durga Sukta in 3-day intensive workshop.",
    description: "Learn authentic Vedic Swara pronunciation (Udatta, Anudatta, Svarita) and master core Suktas under the direct tutelage of Veda Brahma Shri Pradeep Nadig.",
    short_description: "3-day intensive workshop on authentic Vedic Swara pronunciation and Sukta chanting.",
    images: ["/images/courses/sacred-vedic-chanting-mastery.jpg"],
    cover_image: "/images/courses/sacred-vedic-chanting-mastery.jpg",
    faq: [
      { question: "Are prior Sanskrit skills required?", answer: "No, the workshop teaches basic phonetics, mouth positions, and accent marks step by step." },
      { question: "Will practice audio recordings be provided?", answer: "Yes, all participants receive downloadable high-definition audio tracks and Sanskrit text PDFs." }
    ]
  },
  {
    id: 101,
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
  },
  {
    id: 2,
    title: "Rangoli Design & Sacred Floor Geometry Workshop",
    slug: "rangoli-art-design-workshop",
    mode: "Hybrid",
    start_date: "2026-10-02",
    end_date: "2026-10-04",
    timings: "10:00 AM - 01:00 PM IST",
    location: "Shaankari Art Center Bengaluru & Live Stream",
    price: 2200,
    seats_limit: 25,
    status: "Published",
    seo_title: "Rangoli Design & Sacred Floor Art Workshop | Pradeep Nadig",
    seo_description: "Master traditional dots grid, vibrant powders, mandala symmetry, and festival floor artwork in intensive 3-day workshop.",
    description: "Immerse yourself in traditional Rangoli art and floor geometry. Learn intricate dot grids, vibrant natural powder blending, mandala symmetry, and spiritual symbolism for auspicious occasions.",
    short_description: "3-day hands-on workshop mastering traditional Rangoli grids, color powder blending, and sacred festival floor art.",
    images: ["/images/courses/rangoli-art-workshop.jpg"],
    cover_image: "/images/courses/rangoli-art-workshop.jpg",
    faq: [
      { question: "Are Rangoli art materials provided?", answer: "Yes, complete Rangoli starter kits with eco-friendly powders, stencils, and dot templates are provided to all physical attendees." }
    ]
  },
  {
    id: 3,
    title: "Simple Meditation & Mindfulness Workshop",
    slug: "simple-meditation-mindfulness-workshop",
    mode: "Online Live",
    start_date: "2026-10-10",
    end_date: "2026-10-11",
    timings: "06:30 AM - 08:30 AM IST",
    location: "HD Zoom Video Live Stream",
    price: 1500,
    seats_limit: 50,
    status: "Published",
    seo_title: "Simple Meditation & Mindfulness Workshop | Pradeep Nadig",
    seo_description: "Learn gentle Pranayama, guided Dhyana, stress relief, and daily meditation routines for inner calm.",
    description: "Discover simple yet powerful meditation and Pranayama techniques designed for daily life. Clear mental clutter, relieve stress, build emotional resilience, and achieve deep tranquility.",
    short_description: "2-day experiential workshop on gentle breathwork, guided mindfulness, and daily meditation routines.",
    images: ["/images/courses/simple-meditation-classes.jpg"],
    cover_image: "/images/courses/simple-meditation-classes.jpg",
    faq: [
      { question: "Is this suitable for absolute beginners?", answer: "Yes, the meditation practices are designed specifically for beginners and busy individuals seeking mental peace." }
    ]
  },
  {
    id: 102,
    title: "Simple Meditation & Mindfulness Workshop",
    slug: "meditation",
    mode: "Online Live",
    start_date: "2026-10-10",
    end_date: "2026-10-11",
    timings: "06:30 AM - 08:30 AM IST",
    location: "HD Zoom Video Live Stream",
    price: 1500,
    seats_limit: 50,
    status: "Published",
    seo_title: "Simple Meditation & Mindfulness Workshop | Pradeep Nadig",
    seo_description: "Learn gentle Pranayama, guided Dhyana, stress relief, and daily meditation routines for inner calm.",
    description: "Discover simple yet powerful meditation and Pranayama techniques designed for daily life. Clear mental clutter, relieve stress, build emotional resilience, and achieve deep tranquility.",
    short_description: "2-day experiential workshop on gentle breathwork, guided mindfulness, and daily meditation routines.",
    images: ["/images/courses/simple-meditation-classes.jpg"],
    cover_image: "/images/courses/simple-meditation-classes.jpg",
    faq: [
      { question: "Is this suitable for absolute beginners?", answer: "Yes, the meditation practices are designed specifically for beginners and busy individuals seeking mental peace." }
    ]
  },
  {
    id: 4,
    title: "Chakra & Aura Healing Masterclass",
    slug: "chakra-aura-healing-workshop",
    mode: "Hybrid",
    start_date: "2026-10-16",
    end_date: "2026-10-18",
    timings: "02:00 PM - 05:00 PM IST",
    location: "Shaankari Healing Hall Bengaluru & HD Zoom",
    price: 4500,
    seats_limit: 20,
    status: "Published",
    seo_title: "Chakra & Aura Healing Workshop | Pradeep Nadig",
    seo_description: "Learn 7 chakras energy balancing, aura cleansing, subtle body rejuvenation, and self-healing techniques.",
    description: "Explore the subtle energy anatomy of the human body. Master 7 main chakras diagnostic assessment, aura sensing, cleansing, crystal alignment, and self-rejuvenation methods.",
    short_description: "3-day intensive workshop on 7 chakras balancing, aura cleansing, and subtle energy rejuvenation.",
    images: ["/images/courses/chakra-aura-healing-workshop.jpg"],
    cover_image: "/images/courses/chakra-aura-healing-workshop.jpg",
    faq: [
      { question: "Will I receive practical aura sensing training?", answer: "Yes, guided energy sensing exercises, chakra pendulum testing, and aura scanning methods are practiced interactively." }
    ]
  },
  {
    id: 5,
    title: "Hypnotherapy, Reiki & Spirit Release Master Workshop",
    slug: "hypnotherapy-reiki-spirit-release-workshop",
    mode: "Hybrid",
    start_date: "2026-10-24",
    end_date: "2026-10-26",
    timings: "09:30 AM - 04:30 PM IST",
    location: "Shaankari Holistic Center Bengaluru & Online",
    price: 6500,
    seats_limit: 15,
    status: "Published",
    seo_title: "Hypnotherapy, Reiki & Spirit Release Workshop | Pradeep Nadig",
    seo_description: "Master Reiki energy healing, Self-Hypnosis, Clinical Hypnotherapy, Advanced Hypnosis, and Spirit Release therapy.",
    description: "A comprehensive holistic healing retreat combining Reiki Energy Channeling, Self-Hypnosis techniques, Clinical & Advanced Hypnotherapy protocols, and compassionate Spirit Release therapy for deep karmic and emotional freedom.",
    short_description: "3-day deep transformation workshop combining Reiki energy healing, advanced hypnosis, self-hypnotism, and spirit release therapy.",
    images: ["/images/courses/hypnotherapy-reiki-spirit-release.jpg"],
    cover_image: "/images/courses/hypnotherapy-reiki-spirit-release.jpg",
    faq: [
      { question: "What modules are included in this master workshop?", answer: "Covers Reiki Level I & II attunements, Self-Hypnosis induction, Advanced Hypnotherapy protocols, and Spirit Release clearing." }
    ]
  },
  {
    id: 6,
    title: "Pendulum Dowsing & Energy Diagnostics Workshop",
    slug: "pendulum-dowsing-energy-diagnostics",
    mode: "Online Live",
    start_date: "2026-11-01",
    end_date: "2026-11-02",
    timings: "10:00 AM - 01:00 PM IST",
    location: "Online Zoom Workshop",
    price: 2800,
    seats_limit: 30,
    status: "Published",
    seo_title: "Pendulum Dowsing Workshop | Pradeep Nadig",
    seo_description: "Learn pendulum dowsing for chakra testing, home energy sensing, clearing negative vibrations, and decision clarity.",
    description: "Learn how to use crystal and brass pendulums for energy diagnostics, chakra testing, detecting environmental stress (geopathic stress), and gaining intuitive decision-making clarity.",
    short_description: "2-day practical workshop mastering pendulum dowsing, radiesthesia charts, and spatial energy sensing.",
    images: ["/images/courses/pendulum-dowsing-workshop.jpg"],
    cover_image: "/images/courses/pendulum-dowsing-workshop.jpg",
    faq: [
      { question: "Is a pendulum required to attend?", answer: "A natural crystal or metal pendulum is recommended. Detailed printable dowsing charts are provided in PDF format." }
    ]
  },
  {
    id: 7,
    title: "Vastu Energy Balancing & Space Cleansing Workshop",
    slug: "vastu-energy-balancing-workshop",
    mode: "Hybrid",
    start_date: "2026-11-07",
    end_date: "2026-11-08",
    timings: "10:00 AM - 04:00 PM IST",
    location: "Shaankari Vastu Hall Bengaluru & Zoom",
    price: 4200,
    seats_limit: 25,
    status: "Published",
    seo_title: "Vastu Energy Balancing Workshop | Pradeep Nadig",
    seo_description: "Master non-demolition Vastu remedies, 16 directional zones, floor plan balancing, and home space cleansing.",
    description: "Discover practical non-demolition Vastu balancing methods. Learn how to analyze floor plans, identify elemental blockages, apply crystal & copper pyramid remedies, and cleanse spatial energy.",
    short_description: "2-day intensive workshop on non-demolition Vastu remedies, 16 directional zones, and home energy cleansing.",
    images: ["/images/services/vastu-balancing.jpg"],
    cover_image: "/images/services/vastu-balancing.jpg",
    faq: [
      { question: "Will I learn how to evaluate my own home floor plan?", answer: "Yes! Attendees analyze their own residential floor plan under the instructor's direct guidance." }
    ]
  }
];

export const FALLBACK_COURSES: Course[] = [
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
  },
  {
    id: 5,
    title: "Rangoli Art & Sacred Floor Geometry",
    slug: "rangoli-art-sacred-geometry",
    category: "Sacred Arts",
    level: "All Levels",
    duration: "1 Month (8 Sessions)",
    schedule: "Every Saturday & Sunday 11:00 AM - 12:30 PM IST",
    mode: "Online Live & Hands-on Practice",
    status: "Published",
    instructor: "Shaankari Art Faculty & Guest Masters",
    price: 2500,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Learn traditional Indian Rangoli art, dot grids, vibrant powder work, and auspicious festival floor geometry.",
    full_description: "Master the ancient art of Rangoli. Learn traditional Pulli (dot) patterns, freehand floral designs, vibrant color shading, and sacred geometric mandalas for daily home altars and festivals.",
    cover_image: "/images/courses/rangoli-art-workshop.jpg",
    images: ["/images/courses/rangoli-art-workshop.jpg"],
    seo_title: "Rangoli Art & Sacred Floor Geometry Course | Pradeep Nadig",
    seo_description: "Structured course on traditional Rangoli patterns, dot grids, powder blending, and festival floor art.",
    syllabus_modules: [
      { title: "Module 1: Dot Grids & Foundational Strokes", duration: "1 Week", topics: ["Basic dot matrices", "Symmetrical line flow", "Powder grip technique"] },
      { title: "Module 2: Festival Mandalas & Color Blending", duration: "2 Weeks", topics: ["Deepavali & Navaratri Rangolis", "Natural dye powders", "Floral embellishments"] },
      { title: "Module 3: Advanced Sacred Geometry Floor Art", duration: "1 Week", topics: ["Ashta Padma & Yantra floor art", "Consecration of entryways"] }
    ],
    faq: [
      { question: "Will class assignments be reviewed?", answer: "Yes, students submit photos of weekly floor art assignments for personalized feedback." }
    ]
  },
  {
    id: 6,
    title: "Simple Meditation & Mindfulness Practice",
    slug: "simple-meditation-mindfulness-practice",
    category: "Meditation",
    level: "Beginner",
    duration: "1 Month (12 Sessions)",
    schedule: "Monday, Wednesday, Friday 06:30 AM - 07:15 AM IST",
    mode: "Online Live",
    status: "Published",
    instructor: "Shaankari Meditation Guide",
    price: 2000,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Daily guided meditation, Pranayama breath control, and stress release for mental clarity and peace.",
    full_description: "Develop a consistent daily meditation habit. Includes guided mindfulness, Nadi Shodhana breathwork, So-Ham mantra focus, and stress release techniques for a balanced mind.",
    cover_image: "/images/courses/simple-meditation-classes.jpg",
    images: ["/images/courses/simple-meditation-classes.jpg"],
    seo_title: "Simple Meditation & Mindfulness Practice | Pradeep Nadig",
    seo_description: "Guided daily meditation, Pranayama breathwork, and mental clarity classes.",
    syllabus_modules: [
      { title: "Module 1: Breath Awareness & Pranayama Basics", duration: "2 Weeks", topics: ["Diaphragmatic breathing", "Anulom-Vilom", "Calming the nervous system"] },
      { title: "Module 2: Guided Meditation & Mantric Focus", duration: "2 Weeks", topics: ["So-Ham Dhyana", "Inner silence (Antar Mouna)", "Daily morning routine integration"] }
    ],
    faq: [
      { question: "Is seating on the floor required?", answer: "No, you can meditate comfortably on a chair, cushion, or yoga mat." }
    ]
  },
  {
    id: 7,
    title: "Chakra Healing & Aura Balancing Certification",
    slug: "chakra-aura-healing-certification",
    category: "Energy Healing",
    level: "Intermediate",
    duration: "2 Months (16 Sessions)",
    schedule: "Every Sunday 10:00 AM - 12:00 PM IST",
    mode: "Online Live & Practical Workshops",
    status: "Published",
    instructor: "Veda Brahma Shri Pradeep Nadig",
    price: 5200,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "In-depth training on 7 chakras energy dynamics, aura scanning, crystal alignment, and energy body rejuvenation.",
    full_description: "Become a certified energy healing practitioner. Master 7 chakras diagnostic testing, aura cleansing, removal of subtle energy blockages, and balancing elemental energy centers.",
    cover_image: "/images/courses/chakra-aura-healing-workshop.jpg",
    images: ["/images/courses/chakra-aura-healing-workshop.jpg"],
    seo_title: "Chakra Healing & Aura Balancing Certification | Pradeep Nadig",
    seo_description: "Certification course on 7 chakras alignment, aura scanning, and subtle body energy healing.",
    syllabus_modules: [
      { title: "Module 1: Subtle Body Anatomy & 7 Chakras", duration: "3 Weeks", topics: ["Root to Crown Chakra significations", "Bija Mantras", "Energy blockages diagnosis"] },
      { title: "Module 2: Aura Scanning & Cleansing Techniques", duration: "3 Weeks", topics: ["Aura layers", "Pranic cleansing", "Salt & crystal purification"] },
      { title: "Module 3: Self-Healing & Client Session Protocols", duration: "2 Weeks", topics: ["Dowsing verification", "Shielding techniques", "Certification assessment"] }
    ],
    faq: [
      { question: "Is certification provided upon completion?", answer: "Yes, a practitioner certificate is awarded after fulfilling practical case study requirements." }
    ]
  },
  {
    id: 8,
    title: "Reiki, Self-Hypnosis & Spirit Release Training",
    slug: "reiki-hypnosis-spirit-release-training",
    category: "Energy Healing",
    level: "Intermediate to Advanced",
    duration: "2 Months (16 Sessions)",
    schedule: "Every Saturday 02:00 PM - 04:00 PM IST",
    mode: "Online Live & Practical Sessions",
    status: "Published",
    instructor: "Shaankari Holistic Healing Team",
    price: 6800,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Master Reiki energy healing, Self-Hypnosis, Clinical & Advanced Hypnotherapy, and Spirit Release therapy.",
    full_description: "An advanced transformational course integrating Reiki Energy Healing (Level 1 & 2 attunements), Self-Hypnotism induction, Clinical & Advanced Hypnotherapy protocols, and Spirit Release clearing techniques.",
    cover_image: "/images/courses/hypnotherapy-reiki-spirit-release.jpg",
    images: ["/images/courses/hypnotherapy-reiki-spirit-release.jpg"],
    seo_title: "Reiki, Self-Hypnosis & Spirit Release Training | Pradeep Nadig",
    seo_description: "Comprehensive training in Reiki, Self-Hypnosis, Advanced Hypnotherapy, and Spirit Release therapy.",
    syllabus_modules: [
      { title: "Module 1: Reiki Energy Channeling & Attunement", duration: "3 Weeks", topics: ["Reiki symbols", "Self-healing & distance healing", "Attunement ceremony"] },
      { title: "Module 2: Self-Hypnosis & Advanced Hypnotherapy", duration: "3 Weeks", topics: ["Subconscious re-patterning", "Regression techniques", "Anxiety & phobia release"] },
      { title: "Module 3: Spirit Release Therapy & Spiritual Protection", duration: "2 Weeks", topics: ["Attachment clearing", "Compassionate release", "Protection shields"] }
    ],
    faq: [
      { question: "Are Reiki attunements conducted live?", answer: "Yes, attunements are conducted during live interactive sessions by accredited Reiki masters." }
    ]
  },
  {
    id: 9,
    title: "Pendulum Dowsing & Radiesthesia Masterclass",
    slug: "pendulum-dowsing-radiesthesia-masterclass",
    category: "Energy Healing",
    level: "All Levels",
    duration: "1 Month (8 Sessions)",
    schedule: "Every Sunday 03:00 PM - 05:00 PM IST",
    mode: "Online Live",
    status: "Published",
    instructor: "Shaankari Radiesthesia Specialist",
    price: 3200,
    has_payment: true,
    payment_mode: "RAZORPAY",
    short_description: "Learn pendulum dowsing, chakra diagnostic testing, environmental energy sensing, and chart reading.",
    full_description: "Master radiesthesia and pendulum dowsing. Learn how to calibrate crystal & brass pendulums, test chakra energy flow, scan spatial vibrations, and utilize diagnostic dowsing charts.",
    cover_image: "/images/courses/pendulum-dowsing-workshop.jpg",
    images: ["/images/courses/pendulum-dowsing-workshop.jpg"],
    seo_title: "Pendulum Dowsing & Radiesthesia Masterclass | Pradeep Nadig",
    seo_description: "Masterclass on pendulum dowsing, chakra energy diagnostics, and spatial energy sensing.",
    syllabus_modules: [
      { title: "Module 1: Pendulum Calibration & Programming", duration: "2 Weeks", topics: ["Yes/No swing patterns", "Neutralizing personal bias", "Diagnostic charts"] },
      { title: "Module 2: Energy Diagnostics & Spatial Sensing", duration: "2 Weeks", topics: ["Chakra energy scoring", "Food & gemstone testing", "Space energy scanning"] }
    ],
    faq: [
      { question: "Will dowsing charts be provided?", answer: "Yes, high-resolution printable dowsing charts are provided for all participants." }
    ]
  }
];

export const FALLBACK_BLOGS: Blog[] = [
  {
    id: 1,
    title: "What is Vastu Homa? The Ultimate Guide to Purifying Your Home and Removing Spatial Doshas",
    slug: "what-is-vastu-homa-home-purification-guide",
    category: "Vastu & Housewarming",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-01-05",
    cover_image: "/images/blogs/vastu-homa-vedic-fire-ritual.jpg",
    images: ["/images/blogs/vastu-homa-vedic-fire-ritual.jpg", "/images/services/vastu-homa.jpg", "/images/services/vastu-balancing.jpg"],
    related_offering_slug: "vastu-homa",
    related_offering_type: "Service",
    related_offering_title: "Vastu Homa & Griha Pravesha Rituals",
    status: "Published",
    tags: ["VastuHoma", "GrihaPravesha", "VastuShastra", "HomePurification", "PradeepNadig"],
    seo_title: "What is Vastu Homa? Home Purification & Vastu Dosha Remedies | Pradeep Nadig",
    seo_description: "Discover what Vastu Homa is, why it is performed before Griha Pravesha, non-demolition energy balancing, Digpalaka Bali, and Pancha Bhootas harmonization by Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "What is Vastu Homa and why is it performed?", answer: "Vastu Homa is an ancient Vedic fire ritual performed to purify a physical dwelling or commercial office space. It honors Vastu Purusha (the deity of architectural spaces), balances the five natural elements (Pancha Bhootas), and neutralizes negative energy caused by structural defects." },
      { question: "Why is Vastu Homa mandatory before Griha Pravesha (Housewarming)?", answer: "During construction, land disturbance and structural work create subtle energy imbalances. Vastu Homa purifies the property, invites divine protection, and ensures that the residents enjoy health, prosperity, and peace." },
      { question: "Can Vastu Homa fix structural Vastu defects without demolition?", answer: "Yes! Modern homes and apartments often cannot undergo physical demolition. By performing Digpalaka Bali, Vastu Purusha Sthapana, copper pyramid grid activation, and room-by-room Kalasa Samprokshana, adverse directional energy is spiritually neutralized." },
      { question: "What materials and samagri are used during Vastu Homa?", answer: "Veda Brahma Shri Pradeep Nadig uses sacred Veda samithu wood, pure desi cow ghee, Navadhanya (nine sacred grains), Vastu Purusha Yantra, and consecration herbs. All ritual samagri is arranged by the Purohit." }
    ],
    content: `## Introduction: What is Vastu Homa?

When building or moving into a new residence, apartment, or commercial office, one of the most critical questions homeowners ask is: **What is Vastu Homa, and why is it essential before living in a space?**

Vastu Homa is an ancient Vedic fire ritual dedicated to **Vastu Purusha**—the divine cosmic spirit who presides over architecture, geometry, and spatial directions. According to the *Vastu Shastra* scriptures, every plot of land and constructed building possesses a subtle energy field governed by the five fundamental elements (*Pancha Bhootas*): Earth (*Prithvi*), Water (*Jala*), Fire (*Agni*), Air (*Vayu*), and Space (*Akasha*).

When a house is built, excavation, masonry, and architectural variations alter this natural energetic equilibrium. Vastu Homa acts as a divine cleansing ritual that aligns the physical structure with universal magnetic forces, invoking peace, vitality, and abundance for everyone dwelling within.

## Why Perform Vastu Homa Before Griha Pravesha?

Performing Vastu Homa before **Griha Pravesha** (housewarming) or launching a commercial office serves three crucial spiritual purposes:

- **Cleansing Construction Impediments:** Neutralizes negative subtle vibrations accumulated during digging, construction labor, and raw material movement.
- **Invoking Digpalakas & Vastu Purusha:** Seeking permission and blessings from the ten directional guardians (*Digpalakas*) and Vastu Purusha to ensure longevity and safety.
- **Harmonizing 16 Directional Zones:** Aligning the North-East (*Ishaanya*) for spiritual clarity, South-East (*Agneya*) for financial liquidity, and South-West (*Nairrutya*) for domestic stability.

## Step-by-Step Viddhi & Procedure of Vastu Homa

Veda Brahma Shri Pradeep Nadig conducts Vastu Homa strictly according to authentic Vedic Agama Shastra:

### 1. Vastu Purusha Mandala Sthapana & Avahana
A sacred 81-square (*Eka-Sheeti*) or 64-square (*Chatush-Shashti*) Vastu Mandala is drawn using natural Rangoli powders. Lord Vastu Purusha along with 45 presiding deities (*Padavinyasa Devatas*) are reverently invoked into a copper Kalasa filled with sacred water, mango leaves, and coconut.

### 2. Digpalaka Bali & Rakshoghna Homa
Sacred oblations (*Bali*) are offered to the guardians of the eight cardinal directions (Indra, Agni, Yama, Nirrti, Varuna, Vayu, Kubera, and Ishana) to prevent external negative influences from entering the premises.

### 3. Vastu Samidha & Navadhanya Oblations
Special sacred woods—including Audumbara, Ficus, and Kusha grass—are offered into the holy fire along with pure desi cow ghee, honey, and nine sacred grains (*Navadhanya*) while reciting specific Vastu Sukta and Vedic mantras.

### 4. Room-by-Room Kalasa Samprokshana & Raksha Bandhana
After the Mahapoornahuti, consecrated holy water from the Vastu Kalasa is sprinkled across all rooms, entrances, and corners of the home. Consecrated Raksha thread and holy ash (*Vibhuthi*) are presented to the homeowners.

> "A home built according to Vastu alignment and sanctified through authentic Vastu Homa becomes a fortress of tranquility, health, and endless growth." — Veda Brahma Shri Pradeep Nadig`
  },
  {
    id: 2,
    title: "Understanding Mahaganapathi Homa: Procedures, Sacred Ahuti, and Obstacle Removal Benefits",
    slug: "understanding-mahaganapathi-homa-procedure-benefits",
    category: "Vedic Rituals",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-01-10",
    cover_image: "/images/services/ganapathi-homa.jpg",
    images: ["/images/services/ganapathi-homa.jpg", "/images/services/satyanarayana-pooja.jpg"],
    related_offering_slug: "ganapathi-homa",
    related_offering_type: "Service",
    related_offering_title: "Mahaganapathi Homa Fire Ritual",
    status: "Published",
    tags: ["GanapathiHoma", "VedicRituals", "ObstacleRemoval", "PradeepNadig"],
    seo_title: "Mahaganapathi Homa Procedure & Benefits | Shri Pradeep Nadig",
    seo_description: "Learn how Mahaganapathi Homa removes life obstacles, grants business prosperity, and bestows peace. Detailed Atharvashirsha vidhi guide by Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "When is the best time to perform Mahaganapathi Homa?", answer: "Ideal times include Sankashti Chaturthi, Vinayaka Chaturthi, early morning hours during Griha Pravesha, prior to launching a business, or before a wedding." },
      { question: "What is the significance of 108 Modaka & Ashta Dravya oblations?", answer: "Offering 108 Modakas and Ashta Dravya (eight sacred herbs & fruits) into the Havan fire with Atharvashirsha Trishati recitations clears mental fog, eliminates financial debt, and attracts prosperity." },
      { question: "How long does a complete Mahaganapathi Homa take?", answer: "The full ritual including Avahana, Sankalpa, 108 Ahutis, Poornahuti, and Aarti takes approximately 2 to 2.5 hours." }
    ],
    content: `## The Supreme Obstacle Remover: Lord Mahaganapathi

In Sanatana Dharma, no ritual, venture, or sacred endeavor begins without first invoking **Lord Ganesha**—the ultimate *Vighnaharta* (Destroyer of Obstacles) and *Siddhi Vinayaka* (Bestower of Divine Success). **Mahaganapathi Homa** is the quintessential Vedic fire ritual designed to eliminate physical, financial, mental, and karmic impediments before major life milestones.

Whether you are launching a new enterprise, purchasing a vehicle, celebrating a wedding, or seeking academic success for your children, Mahaganapathi Homa ensures that divine clarity and smooth execution accompany your efforts.

## Key Benefits of Performing Mahaganapathi Homa

- **Elimination of Unseen Obstacles:** Dissolves hidden friction, bureaucratic delays, and unexplained setbacks in personal and professional pursuits.
- **Mental Clarity & Intellect:** Enhances focus, decision-making wisdom, and memory power for students and entrepreneurs.
- **Peace & Financial Growth:** Invokes Goddess Lakshmi's presence alongside Lord Ganesha, bringing steady cash flow and domestic harmony.

## Ritual Vidhi & Sacred Ahuti Ingredients

Shri Pradeep Nadig performs Mahaganapathi Homa following rigorous scriptural protocol:

1. **Mahaganapathi Avahana:** Chanting Ganapati Atharvashirsha Upanishad to invoke Lord Ganesha into the holy Havan Kund.
2. **Ashta Dravya Offering:** Oblations of eight sacred ingredients—Sugarcane, Coconut, Modaka, Puffed Rice, Jaggery, Sesame, Honey, and Pure Desi Ghee.
3. **108 Modaka Homa:** Offering 108 freshly prepared sweet modakas while reciting Ganapathi Moola Mantra and Atharvashirsha Trishati.
4. **Mahapoornahuti & Prasadam:** Concluding fire offering with silk cloth, dry coconut, and distribution of sanctified Modaka Prasadam.`
  },
  {
    id: 3,
    title: "Navagraha Homa Explained: How to Pacify Adverse Planetary Transits, Sade Sati & Rahu-Ketu Doshas",
    slug: "navagraha-homa-planetary-remedies-guide",
    category: "Astrology & Remedies",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-01-15",
    cover_image: "/images/blogs/vedic-astrology-horoscope-reading.jpg",
    images: ["/images/blogs/vedic-astrology-horoscope-reading.jpg", "/images/services/navagraha-homa.jpg"],
    related_offering_slug: "navagraha-homa",
    related_offering_type: "Service",
    related_offering_title: "Navagraha Homa & Planetary Pacification",
    status: "Published",
    tags: ["NavagrahaHoma", "SadeSati", "RahuKetuDosha", "AstrologyRemedies", "PradeepNadig"],
    seo_title: "Navagraha Homa Explained: Sade Sati & Planetary Remedies | Pradeep Nadig",
    seo_description: "Discover how Navagraha Homa harmonizes the nine planetary deities, mitigates Sade Sati, Rahu-Ketu doshas, and restores career stability with Shri Pradeep Nadig.",
    faq: [
      { question: "Why perform Navagraha Homa during Rahu-Ketu or Sade Sati transits?", answer: "Navagraha Homa pacifies malefic planetary transits (such as Saturn Sade Sati, Rahu-Ketu Mahadasha, or Manglik afflictions) and strengthens beneficiary planetary powers in your natal birth chart." },
      { question: "Which specific wood samithu and grains (Navadhanya) are used?", answer: "Nine distinct Veda samithus are used (Arka for Sun, Palasa for Moon, Khadira for Mars, Apamarga for Mercury, Pippala for Jupiter, Audumbara for Venus, Shami for Saturn, Durva for Rahu, Kusha for Ketu) along with nine sacred grains." },
      { question: "Is birth chart (Janma Kundali) analysis done before Navagraha Homa?", answer: "Yes, Shri Pradeep Nadig analyzes your horoscope Dasha-Bhukti beforehand to customize specific planetary sankalpa mantras for your ruling stars." }
    ],
    content: `## The Cosmic Influence of the Nine Planetary Deities

In Vedic Astrology (*Jyotish Shastra*), our personal destiny, mental state, health, and professional milestones are deeply influenced by the nine cosmic grahas: **Surya (Sun), Chandra (Moon), Mangala (Mars), Budha (Mercury), Guru (Jupiter), Shukra (Venus), Shani (Saturn), Rahu, and Ketu**.

When any planet is detrimentally placed in your natal chart (*Janma Kundali*) or undergoing unfavorable transits (*Gochara*)—such as Saturn's **Sade Sati**, **Kanti Shani**, or **Rahu-Ketu Dasha**—life can feel like an uphill battle filled with sudden delays, relationship friction, and financial volatility.

**Navagraha Homa** is the ultimate Vedic remedy designed to balance these planetary energies and convert cosmic hostility into divine favor.

## Nine Sacred Samithu Woods and Grains

A hallmark of authentic Navagraha Homa conducted by Shri Pradeep Nadig is the meticulous use of nine specific sacred tree woods (*Samithus*) and grains (*Navadhanya*) corresponding to each planet:

- **Surya (Sun):** Arka wood & Wheat (*Godhuma*)
- **Chandra (Moon):** Palasa wood & Paddy (*Vrihi*)
- **Mangala (Mars):** Khadira wood & Red Gram (*Adhaka*)
- **Budha (Mercury):** Apamarga wood & Green Gram (*Mudga*)
- **Guru (Jupiter):** Pippala wood & Bengal Gram (*Chana*)
- **Shukra (Venus):** Audumbara wood & White Beans (*Rajamasha*)
- **Shani (Saturn):** Shami wood & Black Sesame (*Tila*)
- **Rahu:** Durva grass & Black Gram (*Masha*)
- **Ketu:** Kusha grass & Horse Gram (*Kulittha*)

> "When we honor the Navagrahas through sacred fire oblations, we align our individual micro-karma with the macro-cosmic rhythm of the universe." — Shri Pradeep Nadig`
  },
  {
    id: 4,
    title: "Maha Mrityunjaya & Ayushya Homa: Sacred Vedic Fire Rituals for Health Restoration, Longevity & Protection",
    slug: "maha-mrityunjaya-ayushya-homa-health-longevity",
    category: "Health & Protection",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-01-20",
    cover_image: "/images/services/mrityunjaya-homa.jpg",
    images: ["/images/services/mrityunjaya-homa.jpg", "/images/services/ayushya-homa.jpg"],
    related_offering_slug: "mrityunjaya-homa",
    related_offering_type: "Service",
    related_offering_title: "Maha Mrityunjaya Homa for Health & Longevity",
    status: "Published",
    tags: ["MrityunjayaHoma", "AyushyaHoma", "ShivaMantra", "HealthHealing", "PradeepNadig"],
    seo_title: "Maha Mrityunjaya & Ayushya Homa for Health | Pradeep Nadig",
    seo_description: "Discover how Maha Mrityunjaya Homa and Ayushya Homa invoke Lord Shiva and Ayur Devatas for recovery from chronic illness, protection, and long life.",
    faq: [
      { question: "What is the spiritual significance of Maha Mrityunjaya Homa?", answer: "Dedicated to Lord Shiva as Tryambaka (the Three-Eyed Lord), Maha Mrityunjaya Homa invokes divine protection against untimely hazards, chronic ailments, and bestows physical vitality." },
      { question: "Is Mrityunjaya Homa recommended for 60th & 70th milestone birthdays?", answer: "Yes! Performing Mrityunjaya Homa during milestone birthdays (60th Ugraratha Shanthi, 70th, 80th) grants longevity, bodily vigor, and peace." },
      { question: "What is the difference between Mrityunjaya Homa and Ayushya Homa?", answer: "Mrityunjaya Homa focuses on overcoming severe illnesses, physical hazards, and chronic ailments, whereas Ayushya Homa invokes Ayur Devatas on birthdays for growth, immunity, and long life." }
    ],
    content: `## Shielding Life Force: The Power of Maha Mrityunjaya Mantra

Among all Vedic mantras, the **Maha Mrityunjaya Mantra** (*"Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam..."*) from the Rigveda is revered as the ultimate life-restoring mantra. Dedicated to Lord Shiva, this sacred chant rejuvenates physical body cells, calms panicked nervous systems, and shields individuals against untimely illness and accidental dangers.

**Maha Mrityunjaya Homa** combines 108 or 1008 recitations of this potent mantra with sacred oblations of **Durva grass**, **pure cow milk**, **sesame seeds**, and **desi ghee** into the consecrated fire.

## When Should You Perform Mrityunjaya & Ayushya Homa?

- **During Severe Medical Recovery:** Performed for family members suffering from chronic health issues or before major surgical procedures.
- **Milestone Birthdays:** Mandatory ritual for 60th (*Ugraratha Shanthi*), 70th (*Saptati Poorthi*), and 80th (*Sahasra Chandra Darshana*) celebrations.
- **First Birthdays of Children:** Ayushya Homa is performed on a child's 1st birthday to bestow robust immunity, sharp intellect, and long life.

## Consecrated Ayur Kalasabhishekam & Ayur Raksha

Following the fire oblations, sacred water from the **Amrita Kalasa** is ritually poured (*Abhisheka*) over the devotee. Consecrated **Ayur Raksha threads** are bound around the wrist, infusing the body's energy aura with Shiva's protective vibration.`
  },
  {
    id: 5,
    title: "The Supreme Power of Maha Chandi Homa: Durga Saptashati Vidhi for Victory Over Severe Life Hardships",
    slug: "supreme-power-of-chandi-homa-durga-saptashati",
    category: "Divine Protection",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-01-25",
    cover_image: "/images/services/chandika-homa.jpg",
    images: ["/images/services/chandika-homa.jpg", "/images/services/durga-homa.jpg", "/images/live-events/navratri-chandi-homa-live.jpg"],
    related_offering_slug: "chandika-homa",
    related_offering_type: "Service",
    related_offering_title: "Maha Chandika Homa (Chandi Yajna)",
    status: "Published",
    tags: ["ChandiHoma", "DurgaSaptashati", "DeviMahatmyam", "ProtectionRitual", "PradeepNadig"],
    seo_title: "Maha Chandi Homa & Durga Saptashati | Shri Pradeep Nadig",
    seo_description: "Experience the supreme transformative power of Maha Chandi Homa. 700 Durga Saptashati mantras, Suvasini pooja, and victory over severe obstacles by Shri Pradeep Nadig.",
    faq: [
      { question: "What is Durga Saptashati Parayana during Chandi Homa?", answer: "All 700 mantras of Devi Mahatmyam across 13 chapters are chanted by learned Vedic Pandits, with each verse accompanied by sacred oblations into the Chandi Homa fire." },
      { question: "How long does a 5-Priest Maha Chandi Homa take?", answer: "A full Chandi Homa takes approximately 4 to 5 hours, including Durga Saptashati chanting, Suvasini Pooja, Dampati Pooja, Kanya Pooja, and Mahapoornahuti with silk saree and coconut." },
      { question: "Who should perform Chandi Homa?", answer: "Ideal for individuals or families facing chronic legal disputes, severe business blockages, black magic/drishti doshas, or persistent life hardship." }
    ],
    content: `## The Crown Jewel of Vedic Fire Rituals: Maha Chandi Homa

In the Tantric and Vedic traditions of Devi worship, **Maha Chandi Homa** (or *Chandika Yajna*) stands as the most powerful ritual for invoking the supreme primordial energy—**Goddess Chandika Parameshwari**. 

Described in the sacred *Markandeya Purana*, Goddess Chandi represents the unified fierce and compassionate force of Mahakali, Mahalakshmi, and Mahasaraswati. Performing Chandi Homa annihilates dark energies, dissolves deep karmic blockages, terminates prolonged court litigations, and bestows absolute fearlessness.

## The 700 Mantras of Durga Saptashati (Devi Mahatmyam)

The backbone of Chandi Homa is the recitation of **Durga Saptashati**—700 secret mantras structured across 13 chapters detailing the Divine Mother's triumphs over demon forces (Madhu-Kaitabha, Mahishasura, Chanda-Munda, and Shumbha-Nishumbha).

During the Homa:
- Each of the 700 verses is offered into the holy fire with lotus flowers, red kumkum, pure ghee, payasam, and rare dry fruits.
- **Navakshari Mantra** (*"Om Aing Hring Kleeng Chamundaye Vichhe"*) is recited 1008 times to establish spiritual insulation.

## Sacred Ancillary Poojas: Kanya, Suvasini & Dampati Worship

A true Chandi Homa is incomplete without honoring the living embodiments of the Goddess:
- **Kanya Pooja:** Honoring 9 young maidens representing the Navadurgas.
- **Suvasini Pooja:** Honoring married women with sarees, turmeric, kumkum, and traditional offerings.
- **Dampati Pooja:** Honoring elderly married couples for ancestral harmony.`
  },
  {
    id: 6,
    title: "How Vedic Astrology & Prashna Marga Can Guide Your Career, Marriage, and Important Life Decisions",
    slug: "vedic-astrology-prashna-marga-guidance-guide",
    category: "Astrology & Guidance",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-02-01",
    cover_image: "/images/blogs/vedic-astrology-horoscope-reading.jpg",
    images: ["/images/blogs/vedic-astrology-horoscope-reading.jpg", "/images/services/vedic-astrology-consultation.jpg"],
    related_offering_slug: "vedic-astrology-consultation",
    related_offering_type: "Consultation",
    related_offering_title: "Personalized Vedic Astrology Consultation",
    status: "Published",
    tags: ["VedicAstrology", "PrashnaMarga", "HoroscopeReading", "BirthChart", "PradeepNadig"],
    seo_title: "Vedic Astrology & Prashna Marga Consultation | Pradeep Nadig",
    seo_description: "Book an authentic birth chart reading and Prashna Marga consultation with Veda Brahma Shri Pradeep Nadig. Clear answers on career, marriage, health, and Dasha remedies.",
    faq: [
      { question: "What birth details are required for an accurate birth chart reading?", answer: "You need to provide your Date of Birth, exact Time of Birth, and Place of Birth." },
      { question: "What is Prashna Marga Astrology and when is it used?", answer: "Prashna Marga is an ancient Vedic horary astrology technique used when the exact birth time is unknown or when immediate, specific clarity is needed for urgent decisions." },
      { question: "Are remedial solutions (Parihara) included in the consultation session?", answer: "Yes! Practical remedies including specific mantra recitations, gemstone choices, rudraksha suggestions, and targeted pooja recommendations are provided." }
    ],
    content: `## Unlocking Cosmic Blueprints: Vedic Astrology (Jyotish)

Vedic Astrology—known as **Jyotish** ("The Light of Divine Knowledge")—is not merely about predicting future events; it is a sacred self-discovery tool that reveals your soul's karmic blueprint (*Janma Kundali*). 

By analyzing the planetary positions at the exact moment of your birth, a master astrologer like **Veda Brahma Shri Pradeep Nadig** can decode:
- **Dasha-Bhukti Timelines:** Understanding why certain years bring immense financial growth while others test your endurance.
- **Navamsha D9 Chart:** Deep insight into marital compatibility, soul purpose, and spiritual evolution.
- **Career & Wealth Yogas:** Identifying optimal business domains, job shifts, and financial investment periods.

## What is Prashna Marga (Horary Astrology)?

For individuals who do not know their exact birth time, or who need urgent clarity on pressing issues (such as medical decisions, missing items, land purchase, or court cases), **Prashna Marga** provides profound guidance. 

By calculating planetary positions at the precise instant a question is asked, Prashna Marga cuts through uncertainty and delivers crystal-clear answers.

## In-Person & Online Video Consultations

Shri Pradeep Nadig conducts both **in-person consultations at Shaankari Kendra Bengaluru** and **HD Zoom video consultations** for global clients, providing compassionate, actionable guidance rooted in ancient Veda Shastras.`
  },
  {
    id: 7,
    title: "Sri Satyanarayana Vratha & Pooja: Ritual Steps, Auspicious Dates, and Blessings for Family Prosperity",
    slug: "satyanarayana-pooja-procedure-family-blessings",
    category: "Family & Traditions",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-02-05",
    cover_image: "/images/services/satyanarayana-pooja.jpg",
    images: ["/images/services/satyanarayana-pooja.jpg"],
    related_offering_slug: "satyanarayana-pooja",
    related_offering_type: "Pooja",
    related_offering_title: "Sri Satyanarayana Vratha & Pooja",
    status: "Published",
    tags: ["SatyanarayanaPooja", "FamilyBlessings", "PurnimaVratha", "VishnuPooja", "PradeepNadig"],
    seo_title: "Sri Satyanarayana Vratha & Pooja Guide | Shri Pradeep Nadig",
    seo_description: "Learn the ritual steps, auspicious Purnima dates, 5 Katha stories meaning, and family prosperity blessings of Sri Satyanarayana Vratha by Shri Pradeep Nadig.",
    faq: [
      { question: "When is the ideal time to perform Satyanarayana Pooja?", answer: "Full Moon (Purnima) days, Ekadashi, housewarmings, wedding anniversaries, or after achieving major milestones." },
      { question: "How long does Satyanarayana Pooja take?", answer: "Approximately 2 to 2.5 hours including 5 Katha chapters and Aarti." },
      { question: "What is the special Prasadam offered in Satyanarayana Pooja?", answer: "Sapada Bhakshya (wheat rava sheera cooked with ghee, banana, sugar, and cardamom) is offered as divine Prasadam." }
    ],
    content: `## Invoking Lord Vishnu: Sri Satyanarayana Vratha

Among all domestic householder rituals in India, **Sri Satyanarayana Vratha & Pooja** holds a cherished place. Dedicated to Lord Satyanarayana—the embodiment of Supreme Truth (*Satya*) and cosmic preserver Lord Vishnu—this sacred pooja invites peace, family unity, and financial abundance into the home.

Whether performed on **Purnima (Full Moon)**, after purchasing a new house, on wedding anniversaries, or during family gatherings, Satyanarayana Pooja creates a joyful atmosphere filled with divine grace.

## The 5 Sacred Katha Adhyayas (Stories)

The core of Satyanarayana Pooja is the narration of five inspiring stories from the *Reva Khanda* of *Skanda Purana*:
1. **Chapter 1:** The origin of the Vratha and its revelation by Lord Vishnu to Maharishi Narada.
2. **Chapter 2:** The story of the poor Brahmin Sanatan and the woodcutter who gained wealth through truthfulness.
3. **Chapter 3 & 4:** The merchant Ulkamukha and Sadhutha, demonstrating the perils of breaking vows and the power of divine redemption.
4. **Chapter 5:** King Tungadhwaja learning humility and the importance of revering divine Prasadam.

## Ritual Highlights with Shri Pradeep Nadig

Shri Pradeep Nadig conducts Satyanarayana Pooja with full Vedic rituals:
- **Mandala & Kalasa Sthapana:** Setting up Navagraha and Ashtadikpalaka mandalas.
- **Panchamrutha Abhishekam:** Ritual bathing of Lord Satyanarayana idol with milk, curd, honey, ghee, and sugar.
- **Distribution of Sheera Prasadam:** Offering sacred *Sapada Bhakshya* prasadam to all family members.`
  },
  {
    id: 8,
    title: "Sri Rudrabhishekam: The Sacred Bathing of Shiva Linga and the Healing Power of Sri Rudram Prashna",
    slug: "sri-rudrabhishekam-pooja-shiva-mantra-healing",
    category: "Sacred Poojas",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-02-10",
    cover_image: "/images/services/rudrabhishekam-pooja.jpg",
    images: ["/images/services/rudrabhishekam-pooja.jpg", "/images/live-events/monthly-pradosham-rudrabhishekam.jpg"],
    related_offering_slug: "rudrabhishekam-pooja",
    related_offering_type: "Pooja",
    related_offering_title: "Sri Rudrabhishekam Pooja",
    status: "Published",
    tags: ["Rudrabhishekam", "ShivaPooja", "SriRudram", "Pradosham", "PradeepNadig"],
    seo_title: "Sri Rudrabhishekam Pooja & Sri Rudram Chanting | Pradeep Nadig",
    seo_description: "Discover the deep healing powers of Sri Rudrabhishekam Pooja. Ekadasa Dravya sacred bathings, Sri Rudram Namaka-Chamaka chanting, and Shiva blessings by Shri Pradeep Nadig.",
    faq: [
      { question: "What materials are used for Ekadasa Dravya Abhisheka?", answer: "Pure cow milk, curd, honey, ghee, sugar, tender coconut water, sugarcane juice, sandalwood paste, panchamrutha, fruit juices, and sacred Bilva leaves." },
      { question: "When is Rudrabhishekam Pooja most effective?", answer: "Mondays, Pradosham kala (1.5 hours before sunset), Masa Shivaratri, Shravana month, or during personal health recovery." }
    ],
    content: `## The Cosmic Vibration of Sri Rudram

In the Yajurveda, **Sri Rudram Prashna** (comprising *Namaka* and *Chamaka*) is hailed as one of the most powerful hymns ever revealed. It recognizes the Supreme Divine in every aspect of nature—in majestic mountains, rushing rivers, roaring thunder, gentle trees, and inside the heart of every living being.

**Sri Rudrabhishekam** is the sacred ritual of continuously bathing the Shiva Linga with eleven holy substances (*Ekadasa Dravya*) while learned Vedic scholars chant Sri Rudram in unison.

## The 11 Sacred Abhisheka Liquid Offerings

Each substance poured over the Shiva Linga channels specific spiritual and physical blessings:
1. **Milk:** Grants health and purity of mind.
2. **Curd:** Bestows family happiness and progeny.
3. **Honey:** Removes speech defects and brings sweetness in relationships.
4. **Ghee:** Grants liberation (*Moksha*) and bodily vigor.
5. **Sugarcane Juice:** Removes poverty and attracts sweet fortune.
6. **Tender Coconut Water:** Brings peace, cooling relief, and emotional stability.
7. **Sandalwood Paste:** Enhances focus, dignity, and spiritual aura.
8. **Bilva Patra Archana:** Offering sacred three-leaf Bilva leaves to wash away three births of negative karma.`
  },
  {
    id: 9,
    title: "Understanding Sarpa Dosha and Naga Shanthi: Vedic Remedies for Delay in Marriage & Family Peace",
    slug: "sarpa-dosha-naga-shanthi-pooja-remedies",
    category: "Dosha Parihara",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-02-15",
    cover_image: "/images/services/naga-shanthi.jpg",
    images: ["/images/services/naga-shanthi.jpg", "/images/services/subrahmanya-homa.jpg"],
    related_offering_slug: "naga-shanthi",
    related_offering_type: "Service",
    related_offering_title: "Naga Shanthi & Sarpa Dosha Parihara",
    status: "Published",
    tags: ["NagaShanthi", "SarpaDosha", "RahuKetuRemedies", "MarriageDelay", "PradeepNadig"],
    seo_title: "Naga Shanthi & Sarpa Dosha Parihara Remedies | Pradeep Nadig",
    seo_description: "Learn how Naga Shanthi and Subrahmanya Homa mitigate Sarpa Dosha, resolve marriage delays, fertility challenges, and ancestral karma with Shri Pradeep Nadig.",
    faq: [
      { question: "How does Naga Shanthi relieve Sarpa Dosha?", answer: "Naga Shanthi pacifies ancestral snake afflictions, Rahu-Ketu karmic blockages, marriage delays, and health issues through authentic Sarpa Sukta recitations and Ashta Naga Mandalarchana." },
      { question: "What is the best tithi to perform Naga Shanthi?", answer: "Panchami tithis (especially Nagapanchami), Shravana month, Kiruthigai, or specific nakshatra days advised after horoscope reading." }
    ],
    content: `## What is Sarpa Dosha in Vedic Astrology?

In Vedic astrology, **Sarpa Dosha** (or *Naga Dosha*) occurs when Rahu or Ketu afflict key houses in a person's birth chart (especially the 1st, 5th, 7th, or 8th house). Scripturally, it represents ancestral karmic obligations towards nature and divine serpent beings (*Naga Devatas*).

Common symptoms of Sarpa Dosha include:
- Unexplained delays and obstacles in finalizing marriage proposals.
- Conception hurdles and child health concerns.
- Recurring dreams of serpents or sudden skin ailments.

## The Ritual Vidhi of Naga Shanthi & Subrahmanya Homa

To pacify these karmic knots, **Veda Brahma Shri Pradeep Nadig** conducts authentic **Naga Shanthi Pooja**:
1. **Ashta Naga Mandalarchana:** Drawing the sacred eight serpent guardians (Ananta, Vasuki, Shesha, Padmanabha, Kambala, Shankhapala, Dhritarashtra, and Takshaka).
2. **Ksheerabhisheka & Sandalwood Pooja:** Ritual milk and chandan bathing of silver or stone Naga Prathima.
3. **Sarpa Sukta & Subrahmanya Mantra Japa:** Chanting Sarpa Sukta and Lord Subrahmanya (Kartikeya) mantras to invoke courage, health, and family prosperity.`
  },
  {
    id: 10,
    title: "Attracting Abundance: The Spiritual Science of Lakshmi Narayana Hrudaya Homa & Kanakadhara Stotram",
    slug: "attracting-abundance-lakshmi-narayana-kanakadhara",
    category: "Wealth & Prosperity",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-02-20",
    cover_image: "/images/services/lakshmi-narayana-hrudaya-homa.jpg",
    images: ["/images/services/lakshmi-narayana-hrudaya-homa.jpg"],
    related_offering_slug: "lakshmi-narayana-hrudaya-homa",
    related_offering_type: "Service",
    related_offering_title: "Lakshmi Narayana Hrudaya Homa",
    status: "Published",
    tags: ["LakshmiNarayanaHoma", "KanakadharaPooja", "WealthProsperity", "BusinessGrowth", "PradeepNadig"],
    seo_title: "Lakshmi Narayana Hrudaya & Kanakadhara Pooja | Pradeep Nadig",
    seo_description: "Attract sustainable wealth, business growth, and family abundance through Lakshmi Narayana Hrudaya Homa and Kanakadhara Stotram Pooja by Shri Pradeep Nadig.",
    faq: [
      { question: "When is Lakshmi Narayana Hrudaya Homa recommended?", answer: "Ideal for business owners, entrepreneurs, before launching new ventures, on Fridays, Purnima, or Varalakshmi Vratha." },
      { question: "What is the significance of Kanakadhara Stotram?", answer: "Composed by Adi Shankaracharya, Kanakadhara Stotram invokes Goddess Lakshmi to rain down golden abundance and dissolve financial distress." }
    ],
    content: `## The Union of Wealth and Preservation

In Sanatana Dharma, wealth (*Lakshmi*) without righteous preservation (*Narayana*) is short-lived. **Lakshmi Narayana Hrudaya Homa** is a rare and majestic Vedic ritual that combines the **Narayana Hrudaya Stotram** and **Lakshmi Hrudaya Stotram** in a interlocked (*Samputita*) fire offering.

This ritual ensures that financial abundance is accompanied by wisdom, ethical prosperity, and long-term security for family generations and commercial enterprises.

## Kanakadhara Stotram: Shankaracharya's Hymn of Golden Rain

When the great sage Adi Shankaracharya recited the **Kanakadhara Stotram** for a poor woman who offered him her last withered Amla fruit, Goddess Mahalakshmi rained down golden Amlas in reward for her pure devotion.

During **Mahalakshmi Kanakadhara Pooja**, 108 recitations of this hymn accompanied by pink lotus flower offerings and Kumkumarchana invoke divine financial breakthroughs for business owners and working professionals.`
  },
  {
    id: 11,
    title: "Divine Blessings for Marriage & Education: Swayamvara Parvathi Pooja and Saraswati Vidya Rituals",
    slug: "swayamvara-parvathi-saraswati-pooja-marriage-education",
    category: "Family & Knowledge",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-02-25",
    cover_image: "/images/services/swayamvara-parvathi-pooja.jpg",
    images: ["/images/services/swayamvara-parvathi-pooja.jpg", "/images/services/saraswati-pooja.jpg"],
    related_offering_slug: "swayamvara-parvathi-pooja",
    related_offering_type: "Pooja",
    related_offering_title: "Swayamvara Parvathi Pooja",
    status: "Published",
    tags: ["SwayamvaraParvathi", "SaraswatiPooja", "MarriageRemedies", "StudentExcellence", "PradeepNadig"],
    seo_title: "Swayamvara Parvathi & Saraswati Vidya Pooja | Pradeep Nadig",
    seo_description: "Discover how Swayamvara Parvathi Pooja resolves marriage delays and Saraswati Vidya Pooja enhances student memory and exam success with Shri Pradeep Nadig.",
    faq: [
      { question: "Can Swayamvara Parvathi Pooja be performed on behalf of someone?", answer: "Yes, parents or close relatives can perform the Sankalpa in the name of the bride/groom-to-be." },
      { question: "When is Saraswati Pooja recommended for students?", answer: "Before major competitive exams, initiation of learning (Vidyarambha), Vasant Panchami, or during Navaratri." }
    ],
    content: `## Removing Obstacles in Marriage: Swayamvara Parvathi Pooja

Goddess Parvathi performed intense penance (*Tapas*) to gain Lord Shiva as her divine consort. The **Swayamvara Parvathi Mantra** was revealed by Sage Durvasa to bestow ideal life partners, eliminate delay in marriage proposals, and harmonize relationship dynamics between couples.

Conducted with turmeric archana, lotus flowers, and Mangalya Sankalpa, this pooja purifies negative planetary afflictions (such as Kuja/Manglik dosha) affecting marriage prospects.

## Enhancing Memory & Focus: Sri Saraswati Vidya Pooja

For students, competitive exam aspirants, musicians, and artists, **Sri Saraswati Vidya Pooja** invokes the Goddess of Knowledge (*Vidya*) and Speech (*Vak*). 

Featuring **Medha Sukta recitations**, book/instrument blessings, and 108 white flower archana, this ritual clears mental distractions, enhances retentive memory, and bestows exam victory.`
  },
  {
    id: 12,
    title: "Overcoming Adversity: Sundarakanda Parayana & Sri Sudarshana Pooja for Courage and Protection",
    slug: "sundarakanda-parayana-sudarshana-pooja-protection",
    category: "Protection & Valor",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-03-01",
    cover_image: "/images/services/sundarakanda-parayana-pooja.jpg",
    images: ["/images/services/sundarakanda-parayana-pooja.jpg", "/images/services/sudarshana-homa.jpg", "/images/services/aghorastra-homa.jpg"],
    related_offering_slug: "sundarakanda-parayana-pooja",
    related_offering_type: "Pooja",
    related_offering_title: "Sundarakanda Parayana & Pooja",
    status: "Published",
    tags: ["SundarakandaParayana", "SudarshanaPooja", "AghorastraHoma", "CourageProtection", "PradeepNadig"],
    seo_title: "Sundarakanda Parayana & Sudarshana Pooja | Pradeep Nadig",
    seo_description: "Experience the strength of Sundarakanda Parayana and divine protection of Sri Sudarshana Pooja guided by Shri Pradeep Nadig.",
    faq: [
      { question: "Why is Sundarakanda chapter in Ramayana considered so powerful?", answer: "Sundarakanda depicts Lord Hanuman crossing the ocean, finding Mother Sita, and overcoming impossible odds through faith and valor. Chanting it removes fear, litigation worries, and despair." },
      { question: "How does Sri Sudarshana Pooja protect against evil eye (Drishti)?", answer: "Lord Sudarshana (Vishnu's cosmic Chakra) cuts through negative psychic energy, jealousy, competitor malice, and unexplained fear." }
    ],
    content: `## Lord Hanuman's Triumph: Sundarakanda Parayana

The *Sundarakanda* is the fifth book of the epic *Ramayana*, named 'Sundara' (Beautiful) because it celebrates the heroic acts, wisdom, and unyielding devotion of **Lord Hanuman**. 

Reading or listening to **Sundarakanda Parayana** conducted by Shri Pradeep Nadig instills immense inner courage, resolves seemingly impossible life crises, and grants victory over opponents and self-doubt.

## The Flaming Wheel of Vishnu: Sri Sudarshana Pooja

**Sri Sudarshana Pooja** invokes Lord Vishnu's divine Chakra—a weapon of infinite light that destroys evil, neutralizes black eye (*Drishti dosha*), and grants absolute protection. Combined with **Aghorastra Shiva Homa**, it creates a spiritual shield around your family and business.`
  },
  {
    id: 13,
    title: "The Sacred Art of Vedic Chanting: How Correct Swara Pronunciation Activates Subtle Energy Channels",
    slug: "sacred-art-of-vedic-chanting-swara-mastery",
    category: "Classes & Workshops",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-03-05",
    cover_image: "/images/courses/sacred-vedic-chanting-mastery.jpg",
    images: ["/images/courses/sacred-vedic-chanting-mastery.jpg"],
    related_offering_slug: "sacred-vedic-chanting-mastery",
    related_offering_type: "Course",
    related_offering_title: "Sacred Vedic Chanting Mastery Course",
    status: "Published",
    tags: ["VedicChanting", "SwaraMastery", "PurushaSukta", "SanskritPhonetics", "PradeepNadig"],
    seo_title: "Sacred Vedic Chanting & Swara Mastery | Pradeep Nadig",
    seo_description: "Learn authentic Sanskrit Swara pronunciation (Udatta, Anudatta, Svarita) and master Sukta chanting under Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "Are prerequisites required to join the Vedic Chanting Course?", answer: "No prior knowledge of Sanskrit is necessary. The foundation course starts from basic mouth positions, accent marks, and step-by-step recitation of Suktas." },
      { question: "What Suktas are taught in the course?", answer: "Covers Purusha Sukta, Sri Sukta, Durga Sukta, Mantra Pushpam, and Ganapati Atharvashirsha." }
    ],
    content: `## The Science of Sound (Shabda Brahma)

In the Vedic tradition, Sanskrit mantras are not simple linguistic phrases; they are precise sound frequencies capable of altering human physiology and environment. 

The effectiveness of any Vedic chant relies on **Swara Shuddhi**—the precise accentuation of three fundamental tones:
- **Udatta (High Pitch):** Upward energy flow activating upper nerve plexuses.
- **Anudatta (Low Pitch):** Grounding energy bringing emotional stability.
- **Svarita (Circumflex/Medium Pitch):** Harmonic balance connecting mind and body.

Under the personal guidance of **Veda Brahma Shri Pradeep Nadig**, students master **Purusha Sukta, Sri Sukta, and Durga Sukta** with pristine phonetics (*Varna Chintane*).`
  },
  {
    id: 14,
    title: "Holistic Energy Healing: Exploring 7 Chakras, Aura Cleansing, Reiki Channeling, and Hypnotherapy",
    slug: "holistic-energy-healing-chakras-aura-reiki-hypnotherapy",
    category: "Holistic Healing",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-03-10",
    cover_image: "/images/courses/chakra-aura-healing-workshop.jpg",
    images: ["/images/courses/chakra-aura-healing-workshop.jpg", "/images/courses/hypnotherapy-reiki-spirit-release.jpg", "/images/courses/pendulum-dowsing-workshop.jpg"],
    related_offering_slug: "chakra-aura-healing-workshop",
    related_offering_type: "Workshop",
    related_offering_title: "Chakra & Aura Healing Masterclass",
    status: "Published",
    tags: ["ChakraHealing", "AuraCleansing", "ReikiMastery", "Hypnotherapy", "SpiritRelease", "PradeepNadig"],
    seo_title: "Chakra, Aura, Reiki & Hypnotherapy Masterclass | Pradeep Nadig",
    seo_description: "Master 7 chakras energy balancing, aura cleansing, pendulum dowsing, Reiki attunements, and spirit release therapy with Shri Pradeep Nadig.",
    faq: [
      { question: "What will I learn in the Chakra & Aura Masterclass?", answer: "Learn 7 main chakras diagnostic scanning, pendulum testing, aura cleansing techniques, crystal alignment, and self-energy rejuvenation." },
      { question: "What is Spirit Release Therapy?", answer: "Spirit Release is a compassionate holistic protocol used in hypnosis to clear persistent uninvited subtle energies, emotional attachments, and ancestral blockages." }
    ],
    content: `## Navigating the Subtle Energy Anatomy

Beyond the physical body lies an intricate subtle network comprising **7 Main Chakras** (Energy Centers), thousands of *Nadis* (Energy Channels), and the **Aura** (Human Electromagnetic Field). 

When stress, suppressed trauma, or negative environmental influences cause blockages in these centers, physical fatigue and mental anxiety occur.

## Integrative Modalities Taught by Shri Pradeep Nadig

1. **Chakra Diagnostic & Pendulum Dowsing:** Using radiesthesia pendulums to measure chakra spin and identify specific emotional blockages.
2. **Reiki Energy Channeling:** Level I & II attunements to channel universal bio-field energy for self-healing and client rejuvenation.
3. **Clinical Hypnotherapy & Spirit Release:** Accessing the subconscious mind to release past-life trauma, phobias, and persistent subtle energy attachments.`
  },
  {
    id: 15,
    title: "Sacred Floor Geometry: The Ancient Tradition, Symmetry, and Spiritual Benefits of Rangoli Art",
    slug: "sacred-floor-geometry-rangoli-art-tradition",
    category: "Arts & Heritage",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-03-15",
    cover_image: "/images/courses/rangoli-art-workshop.jpg",
    images: ["/images/courses/rangoli-art-workshop.jpg"],
    related_offering_slug: "rangoli-art-design-workshop",
    related_offering_type: "Workshop",
    related_offering_title: "Rangoli Art & Sacred Floor Geometry Workshop",
    status: "Published",
    tags: ["RangoliArt", "FloorGeometry", "SacredMandala", "IndianTraditions", "PradeepNadig"],
    seo_title: "Rangoli Art & Sacred Floor Geometry Workshop | Pradeep Nadig",
    seo_description: "Discover the spiritual symbolism, dot grids, vibrant powder blending, and sacred geometry of Rangoli art in intensive 3-day workshop with Shri Pradeep Nadig.",
    faq: [
      { question: "Are Rangoli art materials provided during the workshop?", answer: "Yes, complete Rangoli starter kits with eco-friendly powders, stencils, and dot templates are provided to all physical attendees." }
    ],
    content: `## Inviting Goddess Lakshmi into the Household

In Indian culture, drawing **Rangoli** (or *Kolam*) at the entrance of a house every morning is far more than a decorative visual art. It is a sacred ritual of **sacred geometry** designed to harmonize spatial vibrations and welcome Goddess Mahalakshmi into the home.

The symmetrical dot grids (*Pulli*) and flowing curves absorb chaotic environmental noise, generating a peaceful, meditative atmosphere for anyone crossing the threshold. Learn intricate dot grids, natural powder blending, and mandala art in our intensive 3-day hands-on workshop!`
  },
  {
    id: 16,
    title: "Vedic Rituals During Celestial Events: Solar Eclipse Shanti Pooja and Mahashivaratri Vigil Explained",
    slug: "vedic-rituals-celestial-events-surya-grahan-mahashivaratri",
    category: "Live Events & Rituals",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-03-20",
    cover_image: "/images/live-events/solar-eclipse-shanti-pooja.jpg",
    images: ["/images/live-events/solar-eclipse-shanti-pooja.jpg", "/images/live-events/mahashivaratri-grand-night-2026.jpg"],
    related_offering_slug: "solar-eclipse-shanti-pooja",
    related_offering_type: "Live Event",
    related_offering_title: "Surya Grahan (Solar Eclipse) Shanti Pooja",
    status: "Published",
    tags: ["SolarEclipsePooja", "Mahashivaratri", "CelestialEvents", "RemoteSankalpa", "PradeepNadig"],
    seo_title: "Surya Grahan & Mahashivaratri Live Rituals | Pradeep Nadig",
    seo_description: "Learn why celestial events like Surya Grahan and Mahashivaratri possess high spiritual potency and how remote Sankalpa works with Shri Pradeep Nadig.",
    faq: [
      { question: "Why perform Shanti Pooja during Solar Eclipse (Surya Grahan)?", answer: "Eclipse hours generate intense subtle karmic shifts. Performing Shanti Homa during grahan kala neutralizes planetary afflictions for affected birth stars." },
      { question: "How does remote Sankalpa work for live events?", answer: "Your Name, Gothra, and Nakshatra are solemnly uttered during ritual initiation by Shri Pradeep Nadig, and HD live stream link is provided." }
    ],
    content: `## Amplified Spiritual Potency During Eclipse & Shivaratri

In the Vedic astronomical calendar, celestial events like **Surya Grahan (Solar Eclipse)** and **Mahashivaratri** represent periods where the veil between the physical world and subtle energy realms is thinnest.

Any mantra recited or homa performed during these celestial windows yields **1000-fold results** compared to ordinary days. Participate in live remote Sankalpa and experience transformative blessings from anywhere in the world!`
  },
  {
    id: 17,
    title: "Bringing Sacred Art to Life: Interactive Live Thread Art Events for Birthdays & Weddings",
    slug: "interactive-live-thread-art-events-celebrations",
    category: "Events & Celebrations",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-03-25",
    cover_image: "/images/live-events/thread-art-live.jpg",
    images: ["/images/live-events/thread-art-live.jpg"],
    related_offering_slug: "thread-art-live-event",
    related_offering_type: "Live Event",
    related_offering_title: "Interactive Live Thread Art Experience",
    status: "Published",
    tags: ["ThreadArt", "LiveEvent", "WeddingCelebrations", "BirthdayEvent", "PradeepNadig"],
    seo_title: "Interactive Live Thread Art Events | Pradeep Nadig",
    seo_description: "Discover live interactive string art events for weddings, birthdays, and celebrations guided by expert instructors across Bengaluru with Shri Pradeep Nadig.",
    faq: [
      { question: "Can Thread Art live events be conducted at private event venues?", answer: "Yes! Our guided instructor and setup team travel to your event venue across Bengaluru to facilitate the interactive thread art experience for your guests." }
    ],
    content: `## Collaborative Masterpieces Created by Your Guests

**Thread Art** is an extraordinary live event experience designed for weddings, milestone birthdays, and grand celebrations. 

Under the guidance of expert instructors, your guests themselves weave vibrant colored threads across a custom wooden pin matrix, collectively crafting a stunning string-art portrait of the birthday child, wedding couple, or host. Book this memorable interactive experience for your upcoming celebration!`
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
