export interface LocalityInfo {
  slug: string;
  name: string;
  subRegion: string;
  headline: string;
  kannadaHeadline: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  description: string;
  kannadaSummary: string;
  keyNeighborhoods: string[];
  travelInfo: string;
  recommendedHomas: {
    title: string;
    slug: string;
    reason: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  postalCodes: string[];
  geo: {
    lat: number;
    lng: number;
  };
}

export const BANGALORE_LOCATIONS: LocalityInfo[] = [
  {
    slug: "yelahanka",
    name: "Yelahanka",
    subRegion: "North Bengaluru",
    headline: "Kannada Purohit & Vedic Astrologer in Yelahanka, Bangalore",
    kannadaHeadline: "ಯಲಹಂಕದಲ್ಲಿ ಅಧಿಕೃತ ಕನ್ನಡ ಪುರೋಹಿತರು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಸೇವೆಗಳು",
    metaTitle: "Kannada Purohit in Yelahanka Bangalore | Griha Pravesha & Homas | Pradeep Nadig",
    metaDescription: "Book authentic Kannada Purohit & Vedic Pandit in Yelahanka Bangalore for Griha Pravesha, Ganapathi Homa, Vastu Shanthi, and Astrology Consultations with Shri Pradeep Nadig.",
    heroImage: "/images/services/ganapathi-homa.jpg",
    description: "Located within immediate proximity to our Shaankari Vedic Kendra in Vaderahalli, Veda Brahma Shri Pradeep Nadig provides authentic Vedic ritual services and astrology consultations across all sectors of Yelahanka. Whether you are moving into a newly constructed villa in Yelahanka New Town or an apartment along Kogilu and Jakkur road, we perform traditional rituals tailored to your home layout.",
    kannadaSummary: "ಯಲಹಂಕ, ಕೊಗಿಲು, ಜಕ್ಕೂರಿನ ಮನೆ ಮತ್ತು ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಳಲ್ಲಿ ಶಾಸ್ತ್ರೋಕ್ತ ಗೃಹಪ್ರವೇಶ, ಗಣಪತಿ ಹೋಮ, ವಾಸ್ತು ಶಾಂತಿ ಹಾಗೂ ಜಾತಕ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಶ್ರೀ ಪ್ರದೀಪ್ ನಾಡಿಗ್ ಅವರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    keyNeighborhoods: [
      "Yelahanka New Town",
      "Yelahanka Old Town",
      "Kogilu & Kogilu Cross",
      "Jakkur & Jakkur Plantation",
      "Allalasandra",
      "Attur Layout",
      "Vaderahalli & K.G. Vaderahalli",
      "Judicial Layout",
      "Ananthapura",
    ],
    travelInfo: "Immediate local availability. Our center is located in Vaderahalli (Yelahanka border), ensuring zero delay in reaching your venue for early-morning Brahma Muhurtha rituals.",
    recommendedHomas: [
      {
        title: "Griha Pravesha & Vastu Homa",
        slug: "vastu-homa",
        reason: "Essential for new villas, high-rise apartments, and independent duplexes in Yelahanka's fast-growing residential communities."
      },
      {
        title: "Mahaganapathi Homa",
        slug: "ganapathi-homa",
        reason: "Invoking obstacle removal before inaugurating new businesses, offices, or moving into a new residence."
      },
      {
        title: "Navagraha Homa",
        slug: "navagraha-homa",
        reason: "Mitigating malefic planetary transits, Sade Sati, and Rahu-Ketu doshas according to Janma Kundali."
      },
      {
        title: "Vedic Astrology Consultation",
        slug: "vedic-astrology-consultation",
        reason: "In-person birth chart analysis, horoscope matching for marriage, and career guidance."
      }
    ],
    faqs: [
      {
        question: "Can homas be performed inside gated community apartments in Yelahanka without triggering smoke alarms?",
        answer: "Yes, Veda Brahma Shri Pradeep Nadig utilizes specially curated smoke-efficient dry samithu wood, pure desi cow ghee, and brass havan kundas with measured oblations, making it safe and compliant for modern high-rise apartments and balconies."
      },
      {
        question: "Does Shri Pradeep arrange all pooja samagri for events in Yelahanka?",
        answer: "Yes, we arrange all sacred items including dried coconut (Kopa), pure desi cow ghee, 108 herbs (Ashta Dravya), Veda samithu, and Navadhanya. Families only need to prepare fresh flowers, fruits, and milk."
      },
      {
        question: "How early should we book for a Griha Pravesha in Yelahanka during auspicious Muhurthas?",
        answer: "Due to heavy demand during auspicious seasonal dates (e.g. Vaisakha, Sravana, and Kartika months), it is recommended to book 2 to 4 weeks in advance to confirm your preferred early-morning Muhurtha timing."
      }
    ],
    postalCodes: ["560064", "560065", "560097"],
    geo: { lat: 13.1007, lng: 77.5963 }
  },
  {
    slug: "vidyaranyapura",
    name: "Vidyaranyapura",
    subRegion: "North Bengaluru",
    headline: "Authentic Kannada Purohit & Vadhyar in Vidyaranyapura, Bangalore",
    kannadaHeadline: "ವಿದ್ಯಾರಣ್ಯಪುರದಲ್ಲಿ ಅಧಿಕೃತ ಕನ್ನಡ ಪುರೋಹಿತರು ಮತ್ತು ವಾಧ್ಯಾರ್ ಸೇವೆಗಳು",
    metaTitle: "Kannada Purohit in Vidyaranyapura Bangalore | Pooja & Homa Priest | Pradeep Nadig",
    metaDescription: "Experienced Kannada Purohit and Vedic Pandit in Vidyaranyapura Bangalore for Griha Pravesha, Ganapathi Homa, Satyanarayana Pooja, and Astrology. Call Shri Pradeep Nadig.",
    heroImage: "/images/services/vastu-homa.jpg",
    description: "Vidyaranyapura is one of Bangalore's most established cultural residential hubs. Serving families across BEL Layout, HMT, AMS Layout, and Thindlu, Veda Brahma Shri Pradeep Nadig conducts authentic Smartheeyam and Vedic rituals strictly adhering to traditional Shastric procedures.",
    kannadaSummary: "ಬಿಇಎಲ್ ಲೇಔಟ್, ಎಚ್‌ಎಂಟಿ ಮತ್ತು ತಿಂದ್ಲು ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ಪೂಜೆಗಳು, ಹವನಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಮಾರ್ಗದರ್ಶನ.",
    keyNeighborhoods: [
      "Vidyaranyapura Main",
      "BEL Layout (Blocks 1-6)",
      "HMT Layout",
      "Thindlu & Thindlu Circle",
      "AMS Layout",
      "Doddabommasandra",
      "Chamundeshwari Layout",
      "Nanjappa Layout"
    ],
    travelInfo: "Within 10-15 minutes driving distance from our Vaderahalli center.",
    recommendedHomas: [
      {
        title: "Satyanarayana Swamy Pooja",
        slug: "satyanarayana-pooja",
        reason: "Highly popular family prayer for peace, gratitude, and housewarming celebrations in Vidyaranyapura."
      },
      {
        title: "Maha Mrityunjaya Homa",
        slug: "mrityunjaya-homa",
        reason: "Conducted for health recovery, longevity, and protection of elderly family members."
      },
      {
        title: "Vastu Homa & Balancing",
        slug: "vastu-homa",
        reason: "Correcting architectural energy imbalances and direction doshas in renovated homes."
      }
    ],
    faqs: [
      {
        question: "Can purohit services be booked for morning Satyanarayana pooja in Vidyaranyapura?",
        answer: "Yes, Shri Pradeep Nadig regularly performs full Satyanarayana Vratha Katha, Panchamrutha Abhisheka, and Mahamangalarathi across Vidyaranyapura."
      },
      {
        question: "Are rituals conducted in traditional Kannada Vedic Paddhati?",
        answer: "Yes, all rituals follow authentic Krishna Yajurveda traditions with complete explanations in Kannada so the entire family understands the spiritual meaning of each mantra."
      }
    ],
    postalCodes: ["560097"],
    geo: { lat: 13.0784, lng: 77.5583 }
  },
  {
    slug: "hebbal",
    name: "Hebbal & Sahakara Nagar",
    subRegion: "North Bengaluru Junction",
    headline: "Vedic Purohit & Astrologer in Hebbal & Sahakara Nagar, Bangalore",
    kannadaHeadline: "ಹೆಬ್ಬಾಳ ಮತ್ತು ಸಹಕಾರ ನಗರದಲ್ಲಿ ವೈದಿಕ ಪುರೋಹಿತರು ಹಾಗೂ ಜ್ಯೋತಿಷಿಗಳು",
    metaTitle: "Kannada Purohit in Hebbal & Sahakara Nagar | Vedic Rituals | Pradeep Nadig",
    metaDescription: "Book Kannada Purohit & Vedic Pandit near Hebbal, Sahakara Nagar, RT Nagar & Manyata Tech Park for Griha Pravesha, Homas & Kundali Matching with Shri Pradeep Nadig.",
    heroImage: "/images/services/mrityunjaya-homa.jpg",
    description: "Serving the bustling communities of Hebbal, Sahakara Nagar, Kempapura, and around Manyata Tech Park. Shri Pradeep Nadig brings decades of Vedic scholarship to corporate executives, tech professionals, and traditional families requiring top-tier ritual execution.",
    kannadaSummary: "ಹೆಬ್ಬಾಳ, ಸಹಕಾರ ನಗರ, ಆರ್‌ಟಿ ನಗರ ಮತ್ತು ಮಾನ್ಯತಾ ಟೆಕ್ ಪಾರ್ಕ್ ಪರಿಸರದಲ್ಲಿ ಗೃಹಪ್ರವೇಶ ಮತ್ತು ವಾಸ್ತು ಪೂಜೆಗಳು.",
    keyNeighborhoods: [
      "Hebbal & Hebbal Kempapura",
      "Sahakara Nagar (Blocks A-G)",
      "Canara Bank Layout",
      "Chinnappa Layout",
      "RT Nagar & Dinnur",
      "Manyata Tech Park corridor",
      "Nagawara & Coffee Board Layout"
    ],
    travelInfo: "Easily reachable within 15-20 minutes via Bellary Road / International Airport Road.",
    recommendedHomas: [
      {
        title: "Griha Pravesha & Ganapathi Homa",
        slug: "ganapathi-homa",
        reason: "The ideal pair of rituals for newly handed-over luxury apartments and gated villas around Hebbal lake."
      },
      {
        title: "Navagraha Shanthi Homa",
        slug: "navagraha-homa",
        reason: "Pacifying malefic transits and promoting career advancement for corporate professionals."
      },
      {
        title: "Janma Kundali Reading",
        slug: "janma-kundali-birth-chart-reading",
        reason: "Comprehensive astrological consultation for marriage compatibility, career growth, and investments."
      }
    ],
    faqs: [
      {
        question: "Do you perform rituals for offices and IT company inaugurations in Manyata Tech Park?",
        answer: "Yes, we perform Ganapathi Homa, Navagraha Pooja, and Lakshmi Kubera Homa for software companies, corporate offices, and startup workstations."
      }
    ],
    postalCodes: ["560024", "560092"],
    geo: { lat: 13.0358, lng: 77.5970 }
  },
  {
    slug: "whitefield",
    name: "Whitefield & IT Corridor",
    subRegion: "East Bengaluru",
    headline: "Kannada Purohit for Griha Pravesha in Whitefield, Bangalore",
    kannadaHeadline: "ವೈಟ್‌ಫೀಲ್ಡ್‌ನಲ್ಲಿ ಗೃಹಪ್ರವೇಶ ಮತ್ತು ಹೋಮಗಳಿಗೆ ಕನ್ನಡ ಪುರೋಹಿತರು",
    metaTitle: "Kannada Purohit in Whitefield Bangalore | Griha Pravesha & Poojas | Pradeep Nadig",
    metaDescription: "Looking for an authentic Kannada Purohit in Whitefield Bangalore? Shri Pradeep Nadig performs Griha Pravesha, Ganapathi Homa, and Vastu Pooja in gated societies.",
    heroImage: "/images/services/vastu-balancing.jpg",
    description: "Whitefield is Bangalore's premier IT center, with thousands of families moving into gated communities, prestige high-rises, and villas. Veda Brahma Shri Pradeep Nadig is frequently invited by Whitefield families to perform traditional Griha Pravesha, Ganapathi Homa, and Vastu Shanthi ceremonies.",
    kannadaSummary: "ವೈಟ್‌ಫೀಲ್ಡ್, ಕಾಡುಗೋಡಿ, ವರ್ತೂರು ಮತ್ತು ಐಟಿಪಿಎಲ್ ಸಮೀಪದ ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಳಲ್ಲಿ ಶುಭ ಗೃಹಪ್ರವೇಶ ಮತ್ತು ಶಾಸ್ತ್ರೋಕ್ತ ಹೋಮಗಳು.",
    keyNeighborhoods: [
      "Whitefield Main & ITPL",
      "Kadugodi & Hope Farm",
      "Varthur & Gunjur",
      "Kundalahalli & AECS Layout",
      "Brookefield & Hoodi",
      "Marathahalli-Whitefield Road",
      "Channasandra"
    ],
    travelInfo: "Prior booking requested. Full ritual samagri kits are brought directly by Guruji's team to your venue.",
    recommendedHomas: [
      {
        title: "Griha Pravesha & Vastu Homa",
        slug: "vastu-homa",
        reason: "The #1 requested ritual for tech professionals and families moving into new apartments in Whitefield."
      },
      {
        title: "Lakshmi Narayana Hrudaya Homa",
        slug: "lakshmi-narayana-hrudaya-homa",
        reason: "Invoking wealth, career stability, and family harmony in new households."
      },
      {
        title: "Satyanarayana Pooja",
        slug: "satyanarayana-pooja",
        reason: "Traditional family prayer ideal for weekends and housewarming anniversaries."
      }
    ],
    faqs: [
      {
        question: "Can Guruji travel to Whitefield for early morning 5:00 AM Muhurtha?",
        answer: "Yes, for auspicious Brahma Muhurtha timings, Shri Pradeep Nadig schedules arrival in advance to ensure the Sankalpa begins exactly at the prescribed Shubh Muhurtha."
      },
      {
        question: "Is Cow Pooja (Go Pooja) possible for apartment Griha Pravesha in Whitefield?",
        answer: "Yes, we coordinate Go Puja either with a holy cow and calf arranged at the apartment entrance or symbolically using sacred Vedic Kamadhenu Pratima vidhi if society bylaws restrict animals."
      }
    ],
    postalCodes: ["560066", "560067"],
    geo: { lat: 12.9698, lng: 77.7500 }
  },
  {
    slug: "malleswaram",
    name: "Malleswaram & Rajajinagar",
    subRegion: "West Bengaluru",
    headline: "Authentic Kannada Vadhyar & Purohit in Malleswaram & Rajajinagar",
    kannadaHeadline: "ಮಲ್ಲೇಶ್ವರಂ ಮತ್ತು ರಾಜಾಜಿನಗರದಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ಕನ್ನಡ ವಾಧ್ಯಾರ್",
    metaTitle: "Kannada Purohit & Vadhyar in Malleswaram & Rajajinagar | Pradeep Nadig",
    metaDescription: "Experienced Kannada Purohit & Vadhyar in Malleswaram and Rajajinagar for authentic Vedic rituals, Samskaras, Homas, and Prashna Astrology with Shri Pradeep Nadig.",
    heroImage: "/images/services/satyanarayana-pooja.jpg",
    description: "Malleswaram and Rajajinagar are the cultural and spiritual bedrock of Bengaluru. Families in this heritage zone demand strict Vedic correctness, impeccable mantra uccharana, and deep Shastric knowledge. Veda Brahma Shri Pradeep Nadig upholds the highest standards of Krishna Yajurvedic tradition for Samskaras, Homas, and Prashna Jyotishya.",
    kannadaSummary: "ಮಲ್ಲೇಶ್ವರಂ, ರಾಜಾಜಿನಗರ ಹಾಗೂ ಸದಾಶಿವನಗರದ ಸಂಪ್ರದಾಯಸ್ಥ ಕುಟುಂಬಗಳಿಗೆ ಶುದ್ಧ ಮಂತ್ರೋಚ್ಚಾರಣೆಯೊಂದಿಗೆ ವೈದಿಕ ಪೂಜಾ ಕೈಂಕರ್ಯಗಳು.",
    keyNeighborhoods: [
      "Malleswaram (Crosses 1-18 & Margosa/Sampige Road)",
      "Rajajinagar (Blocks 1-6)",
      "Sadashivanagar & Dollars Colony",
      "Basaveshwaranagar",
      "Mahalakshmi Layout",
      "West of Chord Road",
      "Subramanyanagar"
    ],
    travelInfo: "Direct connectivity via Outer Ring Road and Tumkur Road, reaching within 25 minutes.",
    recommendedHomas: [
      {
        title: "Aghorastra & Durga Homa",
        slug: "aghorastra-homa",
        reason: "Powerful protection rituals against negative energies and evil eye (Drishti dosha)."
      },
      {
        title: "Rudrabhishekam Pooja",
        slug: "rudrabhishekam-pooja",
        reason: "Sacred 11-dravya abhisheka for Lord Shiva accompanied by Sri Rudram chanting."
      },
      {
        title: "Prashna Marga Horary Astrology",
        slug: "vedic-astrology-consultation",
        reason: "Instant horary chart analysis for immediate questions on health, property, and court matters."
      }
    ],
    faqs: [
      {
        question: "Are rituals performed following traditional Smartha / Madhwa Brahmin conventions?",
        answer: "Yes, rituals are customized precisely according to your family Gotra, Sutra, and ancestral tradition with authentic Vedic chanting."
      }
    ],
    postalCodes: ["560003", "560010"],
    geo: { lat: 13.0031, lng: 77.5643 }
  },
  {
    slug: "jayanagar",
    name: "Jayanagar & JP Nagar",
    subRegion: "South Bengaluru",
    headline: "Kannada Purohit & Astrologer in Jayanagar & JP Nagar, South Bangalore",
    kannadaHeadline: "ಜಯನಗರ ಮತ್ತು ಜೆಪಿ ನಗರದಲ್ಲಿ ಕನ್ನಡ ಪುರೋಹಿತರು ಹಾಗೂ ಜ್ಯೋತಿಷ್ಯ ಸಲಹೆ",
    metaTitle: "Kannada Purohit in Jayanagar & JP Nagar Bangalore | Pradeep Nadig",
    metaDescription: "Book senior Kannada Purohit in Jayanagar, JP Nagar, Banashankari & Basavanagudi for Griha Pravesha, Homas, and Vedic Horary Astrology with Shri Pradeep Nadig.",
    heroImage: "/images/services/navagraha-homa.jpg",
    description: "South Bangalore is celebrated for its devotion to classical arts, traditional festivities, and spiritual depth. From Jayanagar 4th Block to JP Nagar, Banashankari, and Basavanagudi, Veda Brahma Shri Pradeep Nadig is trusted by families across generations for sacred rites and insightful astrological guidance.",
    kannadaSummary: "ಜಯನಗರ, ಜೆಪಿ ನಗರ, ಬನಶಂಕರಿ ಮತ್ತು ಬಸವನಗುಡಿಯಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ವೈದಿಕ ಹೋಮಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಸೇವೆಗಳು.",
    keyNeighborhoods: [
      "Jayanagar (Blocks 1-9)",
      "JP Nagar (Phases 1-8)",
      "Banashankari (Stages 1-3)",
      "Basavanagudi & Gandhi Bazaar",
      "BTM Layout",
      "Padmanabhanagar",
      "Kumaraswamy Layout"
    ],
    travelInfo: "Scheduled visits across South Bengaluru with full samagri arrangements.",
    recommendedHomas: [
      {
        title: "Naga Shanthi & Sarpa Dosha Pooja",
        slug: "naga-shanthi",
        reason: "Specialized ritual for marital harmony, progeny blessings, and mitigating Rahu dosha."
      },
      {
        title: "Ayushya Homa",
        slug: "ayushya-homa",
        reason: "Conducted for first birthdays (Shashtipoorthi, Bheemaratha Shanthi) and elderly longevity."
      },
      {
        title: "Janma Kundali Reading",
        slug: "janma-kundali-birth-chart-reading",
        reason: "Deep analysis of career Dasha, Sade Sati mitigation, and gemstone recommendations."
      }
    ],
    faqs: [
      {
        question: "Can milestone birthdays (Shashtipoorthi - 60th birthday, 80th birthday) rituals be conducted?",
        answer: "Yes, Veda Brahma Shri Pradeep Nadig specializes in conducting Shashtipoorthi, Bheemaratha Shanthi (70th), and Sahasra Chandra Darshana (80th) Shanthi rituals."
      }
    ],
    postalCodes: ["560011", "560078"],
    geo: { lat: 12.9308, lng: 77.5838 }
  }
];

export function getLocalityBySlug(slug: string): LocalityInfo | undefined {
  return BANGALORE_LOCATIONS.find((loc) => loc.slug === slug);
}
