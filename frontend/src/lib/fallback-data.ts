import { Offering, Workshop, ClassItem, Blog, FAQItem, GalleryItem } from "@/types";

export const FALLBACK_SETTINGS: Record<string, any> = {
  site_name: "Veda Brahma Shri Pradeep Nadig",
  hero_title: "Veda Brahma Shri Pradeep Nadig",
  hero_subtitle: "Vedic Scholar, Astrologer & Spiritual Guide committed to authentic traditions and sacred wisdom.",
  contact_mobile: "+91 98800 12345",
  whatsapp_number: "919880012345",
  contact_email: "pradeep@vedabrahma.com",
  office_address: "No. 42, Veda Heritage Lane, Malleshwaram, Bengaluru, Karnataka 560003",
  google_maps_link: "https://maps.google.com",
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
    short_description: "A sacred ritual to invoke Lord Ganesha to remove obstacles and bring prosperity.",
    full_description: "Mahaganapathi Homa is performed at the beginning of any new venture, marriage, housewarming, or annually for peace and obstacle removal.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"],
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
    short_description: "Performed to seek the blessings of the nine planetary deities and reduce planetary doshas.",
    full_description: "Navagraha Homa is performed to seek the blessings of the nine planetary deities (Navagrahas), reduce the effects of adverse planetary positions, and bring harmony, prosperity, and overall well-being into life.",
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"],
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
    short_description: "Dedicated to Lord Shiva for protection from illness, accidents, and promoting longevity.",
    full_description: "Mrityunjaya Homa is dedicated to Lord Shiva and is performed for protection from illness, accidents, untimely dangers, and to promote long life, good health, and inner strength.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800"],
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
    short_description: "Performed to pray for a long, healthy, and prosperous life, especially on birthdays.",
    full_description: "Ayushya Homa is performed to pray for a long, healthy, and prosperous life. It is especially performed on birthdays, for young children, and during important life milestones.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?q=80&w=800"],
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
    short_description: "Invoke Goddess Durga for protection, courage, success, and removal of negative energies.",
    full_description: "Durga Homa is performed to invoke the divine blessings of Goddess Durga for protection, courage, success, and the removal of negative energies and obstacles.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"],
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
    short_description: "A powerful Vedic fire ritual dedicated to Goddess Chandika for victory over severe obstacles.",
    full_description: "Chandika Homa is a powerful Vedic fire ritual dedicated to Goddess Chandika for victory over difficulties, removal of powerful negative influences, and protection from unseen obstacles.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800"],
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
    short_description: "Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy.",
    full_description: "Vastu Homa is performed to purify homes, offices, and commercial spaces, remove Vastu doshas, and invite peace, prosperity, and positive energy into the property.",
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"],
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
    short_description: "A sacred Shiva ritual performed for powerful spiritual protection and removal of negativity.",
    full_description: "Aghorastra Homa is a sacred Shiva ritual performed for powerful spiritual protection, removal of severe negative energies, unseen obstacles, and to strengthen divine grace.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?q=80&w=800"],
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
    short_description: "Seek blessings of Naga Devatas, reduce Sarpa Dosha, and support family harmony.",
    full_description: "Naga Shanthi is performed to seek the blessings of the Naga Devatas, reduce Sarpa Dosha, and remove obstacles related to marriage, childbirth, family well-being, and ancestral karma.",
    images: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800"],
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
    short_description: "Dedicated to Lord Subrahmanya for courage, wisdom, victory over obstacles, and relief from doshas.",
    full_description: "Subrahmanya Homa is dedicated to Lord Subrahmanya (Murugan/Kartikeya) for courage, wisdom, victory over obstacles, relief from Naga Dosha, and overall success in life.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800"],
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
    short_description: "Invoke combined blessings of Goddess Lakshmi and Lord Narayana for wealth, harmony, and abundance.",
    full_description: "Lakshmi Narayana Hrudaya Homa is performed to invoke the combined blessings of Goddess Lakshmi and Lord Narayana for wealth, prosperity, family harmony, spiritual growth, and overall abundance.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"],
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
    short_description: "In-depth analysis of your birth chart, planetary positions, and life guidance.",
    full_description: "Comprehensive horoscope analysis covering career, health, relationships, and precise Vedic remedies by Veda Brahma Shri Pradeep Nadig.",
    images: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800"],
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
    short_description: "A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires.",
    full_description: "Sri Satyanarayana Vratha & Pooja is traditionally performed on Purnima (Full Moon), Ekadashi, or during family milestones to seek Lord Vishnu's grace, invite peace, wealth, and spiritual well-being.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"],
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
    short_description: "Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection.",
    full_description: "Sri Rudrabhishekam Pooja involves ritualistic sacred bathing (Abhisheka) to Lord Shiva with Panchamrutha accompanied by Sri Rudram and Chamakam chanting, bestowing health, longevity, and liberation from negative karma.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800"],
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
    short_description: "Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance.",
    full_description: "Mahalakshmi Kanakadhara Pooja is performed with Kanakadhara Stotram recitations to invoke Goddess Lakshmi's eternal blessings for financial stability, wealth abundance, and removal of debts.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?q=80&w=800"],
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
    short_description: "Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony.",
    full_description: "Swayamvara Parvathi Pooja is a sacred ritual specifically recommended for overcoming obstacles in finding a suitable life partner, eliminating delays in marriage, and strengthening affection between couples.",
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"],
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
    short_description: "Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery.",
    full_description: "Sri Saraswati Vidya Pooja is performed for students, scholars, artists, and educators to enhance intellect, concentration, public speaking abilities, and success in studies and competitive examinations.",
    images: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800"],
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
    short_description: "Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection.",
    full_description: "Sundarakanda Parayana & Pooja invokes Lord Hanuman and Sri Rama to grant immense courage, mental fortitude, resolution of complex problems, and protection from negative energies.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"],
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
    short_description: "Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences.",
    full_description: "Sri Sudarshana Pooja invokes Lord Sudarshana to eliminate negative vibrations, black eye (Drishti dosha), health ailments, and grant immediate divine protection.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800"],
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
    short_description: "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
    full_description: "Durga Saptashati Parayana & Pooja is an auspicious ritual worshipping the Divine Mother in her various manifestations, bringing destruction of negativity, supreme peace, and material and spiritual well-being.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?q=80&w=800"],
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
    cover_image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800",
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
    cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
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
    cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
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

export const FALLBACK_GALLERY: GalleryItem[] = [];
