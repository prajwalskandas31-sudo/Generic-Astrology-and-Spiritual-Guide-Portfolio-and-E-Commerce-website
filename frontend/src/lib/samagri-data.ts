export interface SamagriItem {
  id: string;
  nameEn: string;
  nameKn: string;
  quantity: string;
  category: "host" | "purohit"; // host: Host/Family keeps ready, purohit: Guruji brings
  note?: string;
}

export interface RitualSamagri {
  serviceSlug: string;
  serviceTitle: string;
  kannadaTitle: string;
  intro: string;
  kannadaIntro: string;
  items: SamagriItem[];
}

export const RITUAL_SAMAGRI_DATABASE: Record<string, RitualSamagri> = {
  "ganapathi-homa": {
    serviceSlug: "ganapathi-homa",
    serviceTitle: "Mahaganapathi Homa",
    kannadaTitle: "ಮಹಾಗಣಪತಿ ಹೋಮ ಪೂಜಾ ಸಾಮಗ್ರಿ ಪಟ್ಟಿ",
    intro: "Complete checklist of sacred ingredients, woods, and household items required for conducting authentic Mahaganapathi Homa.",
    kannadaIntro: "ಮಹಾಗಣಪತಿ ಹೋಮಕ್ಕೆ ಬೇಕಾಗುವ ಪೂರ್ಣ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು ಹಾಗೂ ಯಜಮಾನರು ಮನೆಯಲ್ಲಿ ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳಬೇಕಾದ ವಸ್ತುಗಳ ವಿವರ.",
    items: [
      // Guruji brings
      { id: "gh_1", nameEn: "Dry Coconut Halves (Kopa)", nameKn: "ಒಣಕೊಬ್ಬರಿ ಬಟ್ಟಲು", quantity: "20 to 25 nos", category: "purohit", note: "Sacred fire offering" },
      { id: "gh_2", nameEn: "Pure Desi Cow Ghee", nameKn: "ಶುದ್ಧ ಹಸುವಿನ ತುಪ್ಪ", quantity: "1.5 kg", category: "purohit", note: "For 108 Ahutis" },
      { id: "gh_3", nameEn: "Ashta Dravya (8 Sacred Herbs)", nameKn: "ಅಷ್ಟದ್ರವ್ಯ ಚೂರ್ಣ", quantity: "1 packet", category: "purohit", note: "Ganesha's favorite herbal blend" },
      { id: "gh_4", nameEn: "Sacred Veda Samithu Wood", nameKn: "ಸಮಿತ್ತು ಕಟ್ಟಿಗೆ", quantity: "2 bundles", category: "purohit", note: "Arka, Palasa, Audumbara" },
      { id: "gh_5", nameEn: "Havan Kunda (Brass/Copper)", nameKn: "ಹವನ ಕುಂಡ", quantity: "1 unit", category: "purohit", note: "Smoke-efficient vessel" },
      { id: "gh_6", nameEn: "Dharbhe Grass & Pavitra", nameKn: "ದರ್ಭೆ ಮತ್ತು ಪವಿತ್ರ", quantity: "1 bundle", category: "purohit" },
      { id: "gh_7", nameEn: "Navadhanya (9 Sacred Grains)", nameKn: "ನವಧಾನ್ಯ", quantity: "1 set", category: "purohit" },
      { id: "gh_8", nameEn: "Rangoli powder (White & Colors)", nameKn: "ರಂಗೋಲಿ ಪುಡಿ", quantity: "1 set", category: "purohit", note: "Mandala drawing" },
      // Host keeps ready
      { id: "gh_9", nameEn: "Fresh Garike Grass (Durva)", nameKn: "ತಾಜಾ ಗರಿಕೆ ಹುಲ್ಲು", quantity: "3 to 5 bunches", category: "host", note: "Must be freshly plucked & clean" },
      { id: "gh_10", nameEn: "Fresh Modakas or Ladoos", nameKn: "ಮೋದಕ ಅಥವಾ ಲಡ್ಡು", quantity: "21 or 108 nos", category: "host", note: "For Mahanaivedya & Ahuti" },
      { id: "gh_11", nameEn: "Fresh Coconuts with fiber", nameKn: "ಹಸಿ ತೆಂಗಿನಕಾಯಿ", quantity: "5 nos", category: "host" },
      { id: "gh_12", nameEn: "Betel Leaves (Vilayadele)", nameKn: "ವೀಳ್ಯದೆಲೆ", quantity: "30 to 40 leaves", category: "host" },
      { id: "gh_13", nameEn: "Betel Nuts (Adike)", nameKn: "ಅಡಿಕೆ", quantity: "100 grams", category: "host" },
      { id: "gh_14", nameEn: "Fresh Flowers (Loose & Garlands)", nameKn: "ಬಿಡಿ ಹೂವು ಮತ್ತು ಹಾರಗಳು", quantity: "1/2 kg loose + 2 small garlands", category: "host" },
      { id: "gh_15", nameEn: "Assorted 5 types of Fruits", nameKn: "ಪಂಚ ಫಲಗಳು (ಬಾಳೆಹಣ್ಣು, ಸೇಬು, ದಾಳಿಂಬೆ, ಇತ್ಯಾದಿ)", quantity: "1 set", category: "host" },
      { id: "gh_16", nameEn: "Turmeric & Kumkum", nameKn: "ಅರಿಶಿನ ಮತ್ತು ಕುಂಕುಮ", quantity: "50 grams each", category: "host" },
      { id: "gh_17", nameEn: "Raw Rice (Akshatha preparation)", nameKn: "ಅಕ್ಕಿ", quantity: "1 kg", category: "host" },
      { id: "gh_18", nameEn: "Panchamrutha (Milk, Curd, Honey, Sugar, Ghee)", nameKn: "ಪಂಚಾಮೃತ (ಹಾಲು, ಮೊಸರು, ಜೇನುತುಪ್ಪ, ಸಕ್ಕರೆ, ತುಪ್ಪ)", quantity: "1 small bowl each", category: "host" },
      { id: "gh_19", nameEn: "Brass Deepas (Oil Lamps) & Oil/Wicks", nameKn: "ದೀಪಗಳು, ಎಣ್ಣೆ ಮತ್ತು ಬತ್ತಿ", quantity: "2 lamps", category: "host" },
      { id: "gh_20", nameEn: "Clean Trays & Plates (Brass/Steel)", nameKn: "ತಾಮ್ರ/ಹಿತ್ತಾಳೆ ತಟ್ಟೆಗಳು", quantity: "4 to 5 plates", category: "host" },
    ],
  },
  "vastu-homa": {
    serviceSlug: "vastu-homa",
    serviceTitle: "Griha Pravesha & Vastu Homa",
    kannadaTitle: "ಗೃಹಪ್ರವೇಶ ಮತ್ತು ವಾಸ್ತು ಹೋಮ ಸಾಮಗ್ರಿ ಪಟ್ಟಿ",
    intro: "Comprehensive checklist for housewarmings, apartment consecration, and Vastu Purusha Shanthi rituals.",
    kannadaIntro: "ಹೊಸ ಮನೆ ಪ್ರವೇಶ, ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ಪೂಜೆ ಮತ್ತು ವಾಸ್ತು ಶಾಂತಿಗೆ ಬೇಕಾಗುವ ಪ್ರಮುಖ ಸಾಮಗ್ರಿಗಳ ಪಟ್ಟಿ.",
    items: [
      // Guruji brings
      { id: "vh_1", nameEn: "Vastu Purusha Pratima / Yantra", nameKn: "ವಾಸ್ತು ಪುರುಷ ಮೂರ್ತಿ / ಯಂತ್ರ", quantity: "1 set", category: "purohit" },
      { id: "vh_2", nameEn: "Copper Kalashas (Big & Small)", nameKn: "ತಾಮ್ರದ ಕಲಶ ಪಾತ್ರೆಗಳು", quantity: "3 nos", category: "purohit" },
      { id: "vh_3", nameEn: "Vastu Wood Samithu (Ficus, Audumbara)", nameKn: "ವಾಸ್ತು ಸಮಿತ್ತು ಕಟ್ಟಿಗೆ", quantity: "3 bundles", category: "purohit" },
      { id: "vh_4", nameEn: "Pure Desi Cow Ghee", nameKn: "ಹಸುವಿನ ಶುದ್ಧ ತುಪ್ಪ", quantity: "2 kg", category: "purohit" },
      { id: "vh_5", nameEn: "Navadhanya Sets", nameKn: "ನವಧಾನ್ಯ (೯ ಧಾನ್ಯಗಳು)", quantity: "2 complete sets", category: "purohit" },
      { id: "vh_6", nameEn: "Navaratna / Panchaloha Coins", nameKn: "ನವರತ್ನ / ಪಂಚಲೋಹ ನಾಣ್ಯಗಳು", quantity: "1 set", category: "purohit", note: "For threshold consecration" },
      { id: "vh_7", nameEn: "Sacred Raksha Thread", nameKn: "ರಕ್ಷಾ ಸೂತ್ರ", quantity: "1 roll", category: "purohit" },
      // Host keeps ready
      { id: "vh_8", nameEn: "Fresh Milk for Boiling (Haalu Ubbisuvudu)", nameKn: "ಹಾಲು ಉಕ್ಕಿಸಲು ತಾಜಾ ಹಸುವಿನ ಹಾಲು", quantity: "1 to 2 liters", category: "host", note: "New unboiled milk & new vessel" },
      { id: "vh_9", nameEn: "New Milk Boiling Vessel & Spoon", nameKn: "ಹೊಸ ಹಾಲಿನ ಪಾತ್ರೆ ಮತ್ತು ಸೌಟು", quantity: "1 vessel", category: "host" },
      { id: "vh_10", nameEn: "Mango Leaves (Torana)", nameKn: "ಮಾವಿನ ಎಲೆಗಳು (ತೋರಣಕ್ಕೆ)", quantity: "5 bunches", category: "host", note: "Main door decoration" },
      { id: "vh_11", nameEn: "Fresh Coconuts", nameKn: "ತೆಂಗಿನಕಾಯಿ", quantity: "7 nos", category: "host" },
      { id: "vh_12", nameEn: "Banana Stems for Entrance (Baale Kandu)", nameKn: "ಬಾಳೆ ದಿಂಡು (ದ್ವಾರಕ್ಕೆ)", quantity: "1 pair", category: "host", note: "Optional for apartments" },
      { id: "vh_13", nameEn: "Sweet Pongal / Payasa for Naivedya", nameKn: "ಸಿಹಿ ಪೊಂಗಲ್ / ಪಾಯಸ ನೈವೇದ್ಯ", quantity: "1 bowl", category: "host" },
      { id: "vh_14", nameEn: "Loose Flowers & Door Garlands", nameKn: "ಬಿಡಿ ಹೂವು ಮತ್ತು ಬಾಗಿಲಿನ ಹಾರಗಳು", quantity: "1 kg loose + 2 large garlands", category: "host" },
      { id: "vh_15", nameEn: "Ash Gourd (Boodu Kumbalakayi) for Drishti", nameKn: "ಬೂದು ಕುಂಬಳಕಾಯಿ (ದೃಷ್ಟಿಗೆ)", quantity: "1 no", category: "host", note: "To break at main entrance" },
      { id: "vh_16", nameEn: "Lemons (Nimbehannu)", nameKn: "ಲಿಂಬೆಹಣ್ಣು", quantity: "9 nos", category: "host" },
      { id: "vh_17", nameEn: "Betel Leaves & Nuts", nameKn: "ವೀಳ್ಯದೆಲೆ ಮತ್ತು ಅಡಿಕೆ", quantity: "50 leaves + 150g nuts", category: "host" },
      { id: "vh_18", nameEn: "New Mat/Chatai or Woolen Rugs for Sitting", nameKn: "ಕೂರುವ ಚಾಪೆ / ಜಮಖಾನ", quantity: "2 to 3 units", category: "host" },
    ],
  },
  "mrityunjaya-homa": {
    serviceSlug: "mrityunjaya-homa",
    serviceTitle: "Maha Mrityunjaya Homa",
    kannadaTitle: "ಮಹಾ ಮೃತ್ಯುಂಜಯ ಹೋಮ ಸಾಮಗ್ರಿ ಪಟ್ಟಿ",
    intro: "Checklist for Lord Shiva's supreme health, longevity, and life-protection fire ritual.",
    kannadaIntro: "ಆರೋಗ್ಯ ರಕ್ಷಣೆ ಮತ್ತು ಆಯಸ್ಸು ವೃದ್ಧಿಗಾಗಿ ಮಾಡುವ ಮಹಾ ಮೃತ್ಯುಂಜಯ ಹೋಮಕ್ಕೆ ಬೇಕಾದ ಸಾಮಗ್ರಿಗಳು.",
    items: [
      { id: "mh_1", nameEn: "Amrita Valli (Giloy Stems)", nameKn: "ಅಮೃತ ಬಳ್ಳಿ ಕಡ್ಡಿಗಳು", quantity: "108 pieces", category: "purohit", note: "Special Shiva medicinal offering" },
      { id: "mh_2", nameEn: "Black Sesame Seeds (Kari Ellu)", nameKn: "ಕಪ್ಪು ಎಳ್ಳು", quantity: "250 grams", category: "purohit" },
      { id: "mh_3", nameEn: "Pure Desi Cow Ghee", nameKn: "ಹಸುವಿನ ತುಪ್ಪ", quantity: "1.5 kg", category: "purohit" },
      { id: "mh_4", nameEn: "Durva & Bilva Leaves", nameKn: "ಬಿಲ್ವಪತ್ರೆ ಮತ್ತು ಗರಿಕೆ", quantity: "1 basket", category: "host", note: "Sacred to Lord Shiva" },
      { id: "mh_5", nameEn: "Fresh Milk for Ahuti", nameKn: "ಹಸಿ ಹಾಲು", quantity: "500 ml", category: "host" },
      { id: "mh_6", nameEn: "Honey (Jenu Thuppa)", nameKn: "ಜೇನುತುಪ್ಪ", quantity: "200 grams", category: "host" },
      { id: "mh_7", nameEn: "Dry Coconuts", nameKn: "ಒಣಕೊಬ್ಬರಿ", quantity: "15 nos", category: "purohit" },
      { id: "mh_8", nameEn: "Flowers (White preferred for Shiva)", nameKn: "ಬಿಳಿ ಹೂವುಗಳು", quantity: "500 grams", category: "host" },
    ],
  },
  "satyanarayana-pooja": {
    serviceSlug: "satyanarayana-pooja",
    serviceTitle: "Sri Satyanarayana Swamy Pooja",
    kannadaTitle: "ಶ್ರೀ ಸತ್ಯನಾರಾಯಣ ಸ್ವಾಮಿ ಪೂಜಾ ಸಾಮಗ್ರಿ ಪಟ್ಟಿ",
    intro: "Checklist for conducting the auspicious family Vratha of Lord Satyanarayana.",
    kannadaIntro: "ಶ್ರೀ ಸತ್ಯನಾರಾಯಣ ವ್ರತ ಕಥೆ ಮತ್ತು ಪೂಜೆಗೆ ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳಬೇಕಾದ ಸಾಮಗ್ರಿಗಳು.",
    items: [
      { id: "sp_1", nameEn: "Sapada Prasadam ingredients (Rava, Sugar, Ghee, Banana)", nameKn: "ಸಪಾದ ಭಕ್ಷ್ಯ ಸಾಮಗ್ರಿ (ರವೆ, ಸಕ್ಕರೆ, ತುಪ್ಪ, ಬಾಳೆಹಣ್ಣು)", quantity: "1.25 measures each", category: "host", note: "The sacred 1.25 portion Mahaprasada" },
      { id: "sp_2", nameEn: "Fresh Tulasi Leaves (Dalams)", nameKn: "ತುಳಸಿ ದಳಗಳು", quantity: "3 bunches", category: "host", note: "Essential for Vishnu pooja" },
      { id: "sp_3", nameEn: "Satyanarayana Photo or Silver Idol", nameKn: "ಶ್ರೀ ಸತ್ಯನಾರಾಯಣ ಸ್ವಾಮಿ ಫೋಟೋ / ಮೂರ್ತಿ", quantity: "1 unit", category: "host" },
      { id: "sp_4", nameEn: "Banana Stems for Mandap Pillar", nameKn: "ಬಾಳೆ ಕಂದು (ಮಂಟಪಕ್ಕೆ)", quantity: "4 pieces", category: "host" },
      { id: "sp_5", nameEn: "Red Cloth (Vastra for Mandap)", nameKn: "ಕೆಂಪು ವಸ್ತ್ರ", quantity: "1 meter", category: "host" },
      { id: "sp_6", nameEn: "Panchamrutha Bowl", nameKn: "ಪಂಚಾಮೃತ", quantity: "1 bowl", category: "host" },
      { id: "sp_7", nameEn: "Coconuts, Betel leaves, Fruits", nameKn: "ತೆಂಗಿನಕಾಯಿ, ವೀಳ್ಯದೆಲೆ, ಹಣ್ಣುಗಳು", quantity: "5 coconuts + 30 leaves", category: "host" },
      { id: "sp_8", nameEn: "Pooja Vidhi & Katha Book", nameKn: "ವ್ರತ ಕಥಾ ಪುಸ್ತಕ", quantity: "1 set", category: "purohit", note: "Guruji recites all 5 Adhyayas" },
    ],
  },
  "navagraha-homa": {
    serviceSlug: "navagraha-homa",
    serviceTitle: "Navagraha Shanthi Homa",
    kannadaTitle: "ನವಗ್ರಹ ಶಾಂತಿ ಹೋಮ ಸಾಮಗ್ರಿ ಪಟ್ಟಿ",
    intro: "Specific planetary grains, sacred woods, and vastras for harmonizing the 9 planetary energies.",
    kannadaIntro: "೯ ಗ್ರಹಗಳ ಶಾಂತಿಗಾಗಿ ಬೇಕಾಗುವ ನವಧಾನ್ಯಗಳು, ನವ ಸಮಿತ್ತುಗಳು ಮತ್ತು ನವ ವಸ್ತ್ರಗಳ ಪಟ್ಟಿ.",
    items: [
      { id: "nh_1", nameEn: "9 Sacred Veda Samithus (Arka, Palasa, Khadira, etc.)", nameKn: "೯ ಗ್ರಹಗಳ ಪ್ರತ್ಯೇಕ ಸಮಿತ್ತುಗಳು", quantity: "9 bundles", category: "purohit", note: "One sacred wood per planet" },
      { id: "nh_2", nameEn: "9 Navadhanya Grains (Wheat, Rice, Toor, etc.)", nameKn: "ನವಧಾನ್ಯಗಳು", quantity: "2 complete sets", category: "purohit" },
      { id: "nh_3", nameEn: "9 Color Vastras for Planetary Mandala", nameKn: "ನವಗ್ರಹ ವಸ್ತ್ರಗಳು (೯ ಬಣ್ಣಗಳು)", quantity: "1 set", category: "purohit" },
      { id: "nh_4", nameEn: "Pure Desi Cow Ghee", nameKn: "ಹಸುವಿನ ತುಪ್ಪ", quantity: "1.5 kg", category: "purohit" },
      { id: "nh_5", nameEn: "Black Sesame for Saturn (Shani)", nameKn: "ಕಪ್ಪು ಎಳ್ಳು", quantity: "100 grams", category: "purohit" },
      { id: "nh_6", nameEn: "Coconuts & Betel leaves", nameKn: "ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ವೀಳ್ಯದೆಲೆ", quantity: "5 coconuts + 30 leaves", category: "host" },
      { id: "nh_7", nameEn: "Assorted Flowers & Fruits", nameKn: "ಹೂವುಗಳು ಮತ್ತು ಹಣ್ಣುಗಳು", quantity: "1 kg flowers + 5 fruits", category: "host" },
    ],
  },
};

export function getSamagriForService(slug: string): RitualSamagri | null {
  if (RITUAL_SAMAGRI_DATABASE[slug]) {
    return RITUAL_SAMAGRI_DATABASE[slug];
  }

  // Fallback for general rituals if not explicitly listed
  return {
    serviceSlug: slug,
    serviceTitle: "Vedic Pooja & Ritual",
    kannadaTitle: "ವೈದಿಕ ಪೂಜಾ ಸಾಮಗ್ರಿ ಪಟ್ಟಿ",
    intro: "Standard sacred items and household preparations required for this traditional Vedic ceremony.",
    kannadaIntro: "ಈ ವೈದಿಕ ಪೂಜೆಗೆ ಅಗತ್ಯವಿರುವ ಸಾಂಪ್ರದಾಯಿಕ ಸಾಮಗ್ರಿಗಳು ಹಾಗೂ ಸಿದ್ಧತೆಗಳು.",
    items: [
      { id: "gen_1", nameEn: "Fresh Coconuts (Thenginakayi)", nameKn: "ಹಸಿ ತೆಂಗಿನಕಾಯಿ", quantity: "5 nos", category: "host" },
      { id: "gen_2", nameEn: "Betel Leaves & Betel Nuts", nameKn: "ವೀಳ್ಯದೆಲೆ ಮತ್ತು ಅಡಿಕೆ", quantity: "30 leaves + 100g nuts", category: "host" },
      { id: "gen_3", nameEn: "Loose Flowers & Garlands", nameKn: "ಬಿಡಿ ಹೂವು ಮತ್ತು ಹಾರಗಳು", quantity: "500 grams", category: "host" },
      { id: "gen_4", nameEn: "Turmeric & Kumkum", nameKn: "ಅರಿಶಿನ ಮತ್ತು ಕುಂಕುಮ", quantity: "50 grams each", category: "host" },
      { id: "gen_5", nameEn: "5 Varieties of Seasonal Fruits", nameKn: "ಪಂಚ ಫಲಗಳು", quantity: "1 set", category: "host" },
      { id: "gen_6", nameEn: "Panchamrutha (Milk, Curd, Honey, Sugar, Ghee)", nameKn: "ಪಂಚಾಮೃತ", quantity: "1 bowl", category: "host" },
      { id: "gen_7", nameEn: "Sacred Veda Samithu & Havan Wood", nameKn: "ಸಮಿತ್ತು ಕಟ್ಟಿಗೆ", quantity: "Arranged by Guruji", category: "purohit" },
      { id: "gen_8", nameEn: "Pure Desi Cow Ghee for Ahuti", nameKn: "ಶುದ್ಧ ಹಸುವಿನ ತುಪ್ಪ", quantity: "Arranged by Guruji", category: "purohit" },
      { id: "gen_9", nameEn: "Navadhanya & Sacred Raksha", nameKn: "ನವಧಾನ್ಯ ಮತ್ತು ರಕ್ಷಾಸೂತ್ರ", quantity: "Arranged by Guruji", category: "purohit" },
    ],
  };
}
