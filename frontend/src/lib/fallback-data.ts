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
    display_order: 5,
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
    id: 6,
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
    display_order: 6,
    status: "Published",
    seo_title: "Naga Shanthi & Sarpa Dosha Parihara | Pradeep Nadig",
    seo_description: "Mitigate Sarpa Dosha, overcome delays in marriage or progeny with authentic Naga Shanthi Pooja by Veda Brahma Shri Pradeep Nadig.",
    faq: [
      { question: "How does Naga Shanthi relieve Sarpa Dosha and Kuja afflictions?", answer: "Naga Shanthi pacifies ancestral snake doshas, Rahu-Ketu karmic blockages, marriage delays, and health issues through authentic Sarpa Sukta recitations." },
      { question: "What is the best tithi to perform Naga Shanthi?", answer: "Panchami tithis (especially Nagapanchami), Shravana month, or specific nakshatra days advised after chart reading." }
    ]
  },
  {
    id: 7,
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
    display_order: 7,
    status: "Published",
    seo_title: "Best Vedic Astrologer in Bangalore | Pradeep Nadig Consultation",
    seo_description: "Book authentic Vedic astrology consultation with Shri Pradeep Nadig. In-person & online video birth chart reading, career, marriage, and Dasha predictions.",
    faq: [
      { question: "What details are required for an accurate birth chart reading?", answer: "You need to provide your Date of Birth, exact Time of Birth, and City/Place of Birth." },
      { question: "How does online video consultation work for overseas/outstation clients?", answer: "Online consultations take place over HD Zoom video call. Shri Pradeep prepares your digital horoscope in advance and guides you through remedies interactively." },
      { question: "What if my exact birth time is unknown?", answer: "Prashna Marga (Horary Astrology) or Birth Time Rectification (BTR) based on past key life events is used to analyze your situation accurately." },
      { question: "Are remedial solutions (Parihara) included in the session?", answer: "Yes, practical remedies including specific mantra chanting, gemstone/rudraksha recommendations, and targeted poojas are provided." }
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
    images: ["/images/workshops/vedic-chanting.jpg"],
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
    short_description: "Comprehensive 3-month course mastering Purusha Sukta, Sri Sukta, Durga Sukta, Mantrapushpam, and Rudram.",
    full_description: "Immerse yourself in sacred Veda chanting. Master authentic Swara accents, mouth positioning (Sanskrit Varna Chintane), and chant timeless Vedic Suktas with confidence and accuracy.",
    images: ["/images/courses/chanting.jpg"],
    seo_title: "Sacred Vedic Chanting Course Online | Pradeep Nadig",
    seo_description: "Learn authentic Vedic Suktas, Rudram, and Sanskrit Swara chanting in a 3-month structured online course by Shri Pradeep Nadig.",
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
    short_description: "Learn the fundamentals of Parashari Vedic Astrology, 12 Rasis, 27 Nakshatras, 9 Planets, and Kundali reading.",
    full_description: "Master the art of reading horoscopes. Learn house significations (Bhavas), planetary aspects (Drishti), Dasha analysis (Vimshottari), and practical astrological remedies.",
    images: ["/images/courses/astrology.jpg"],
    seo_title: "Vedic Astrology Foundation Course | Pradeep Nadig",
    seo_description: "Learn Parashari Vedic Astrology, Nakshatra analysis, and birth chart reading in 4-month online live course.",
    faq: [
      { question: "Will practical horoscope reading examples be practiced?", answer: "Yes, students practice analyzing live sample birth charts every week to gain real-world confidence." },
      { question: "Will a completion certificate be awarded?", answer: "Yes, a certificate of completion from Shaankari Vedic Academy is awarded upon passing the final practical assignment." }
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
    cover_image: "/images/blogs/ganapathi-homa-blog.jpg",
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
  }
];

export const FALLBACK_GALLERY_ALBUMS: GalleryItem[] = [];
export const FALLBACK_CLASSES: ClassItem[] = FALLBACK_COURSES as any;
export const FALLBACK_GALLERY: GalleryItem[] = [];

