/**
 * SEO & Schema.org JSON-LD Helper Utilities
 */

export interface FAQItemSchema {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Builds standard FAQPage JSON-LD schema for Google Rich Results.
 */
export function buildFAQSchema(faqs: FAQItemSchema[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Builds Event JSON-LD schema for Live Events and Workshops.
 */
export function buildEventSchema(event: {
  title: string;
  short_description?: string;
  full_description?: string;
  event_date?: string;
  event_time?: string;
  venue_address?: string;
  venue_type?: string;
  price?: number;
  slug: string;
  images?: string[];
}) {
  const url = `https://pradeepnadig.in/live-events/${event.slug}`;
  const description = event.full_description || event.short_description || event.title;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: description,
    startDate: event.event_date ? `${event.event_date}T09:00:00+05:30` : undefined,
    endDate: event.event_date ? `${event.event_date}T13:00:00+05:30` : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.venue_type === "Online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.venue_type === "Hybrid"
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location:
      event.venue_type === "Online"
        ? {
            "@type": "VirtualLocation",
            url: url,
          }
        : {
            "@type": "Place",
            name: "Shaankari Vedic Kendra / Designated Venue",
            address: {
              "@type": "PostalAddress",
              streetAddress: event.venue_address || "Asharaya layout, Vaderahalli",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              postalCode: "560097",
              addressCountry: "IN",
            },
          },
    image: event.images && event.images.length > 0 ? event.images[0] : "https://pradeepnadig.in/pradeep-nadig.jpg",
    organizer: {
      "@type": "Person",
      name: "Veda Brahma Shri Pradeep Nadig",
      url: "https://pradeepnadig.in",
    },
    offers: {
      "@type": "Offer",
      price: event.price || "0",
      priceCurrency: "INR",
      url: url,
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
    performer: {
      "@type": "Person",
      name: "Veda Brahma Shri Pradeep Nadig",
    },
  };
}

/**
 * Builds Service JSON-LD schema for Pooja, Homa, and Consultation offerings.
 */
export function buildServiceSchema(service: {
  title: string;
  short_description?: string;
  full_description?: string;
  slug: string;
  type?: string;
}) {
  const isConsultation = service.type === "Consultation" || service.slug.includes("astrology") || service.slug.includes("consultation");
  const baseUrl = isConsultation ? "https://pradeepnadig.in/consultations" : "https://pradeepnadig.in/services";
  const url = `${baseUrl}/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.type || "Vedic Ritual & Spiritual Service",
    description: service.full_description || service.short_description || service.title,
    url: url,
    provider: {
      "@type": "Person",
      name: "Veda Brahma Shri Pradeep Nadig",
      jobTitle: "Vedic Scholar & Spiritual Guide",
      url: "https://pradeepnadig.in",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Bengaluru, Karnataka, India",
      },
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Country",
        name: "Worldwide (Online Consultation)",
      },
    ],
  };
}

/**
 * Builds Course JSON-LD schema for Vedic Chanting & Astrology Classes.
 */
export function buildCourseSchema(course: {
  title: string;
  description?: string;
  slug: string;
  duration?: string;
}) {
  const url = `https://pradeepnadig.in/courses/${course.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description || course.title,
    provider: {
      "@type": "Person",
      name: "Veda Brahma Shri Pradeep Nadig",
      url: "https://pradeepnadig.in",
    },
    url: url,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online & Classroom",
      instructor: {
        "@type": "Person",
        name: "Veda Brahma Shri Pradeep Nadig",
      },
    },
  };
}

/**
 * Builds BreadcrumbList JSON-LD schema for SERP breadcrumbs.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

/**
 * Builds LocalBusiness & ProfessionalService JSON-LD schema for Google Maps Pack ranking.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Veda Brahma Shri Pradeep Nadig - Vedic Purohit & Astrologer",
    alternateName: "Shaankari Creations - Pradeep Nadig",
    image: "https://pradeepnadig.in/pradeep-nadig.jpg",
    logo: "https://pradeepnadig.in/shaankari-logo.png",
    url: "https://pradeepnadig.in",
    telephone: "+919844042068",
    priceRange: "₹₹",
    hasMap: "https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Asharaya layout, Vaderahalli, K.G.Vaderahalli",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560097",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0903,
      longitude: 77.5458,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "21:00",
      },
    ],
    areaServed: [
      "Bengaluru",
      "Vaderahalli",
      "Yelahanka",
      "Vidyaranyapura",
      "Hebbal",
      "Sahakara Nagar",
      "Jayanagar",
      "Malleswaram",
      "Karnataka",
      "India",
    ],
    knowsAbout: [
      "Kannada Purohit",
      "Vedic Pandit",
      "Kannada Vadhyar",
      "Vastu Homa",
      "Griha Pravesha Pooja",
      "Ganapathi Homa",
      "Navagraha Homa",
      "Maha Mrityunjaya Homa",
      "Vedic Astrology Consultation",
    ],
    sameAs: [
      "https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097",
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com",
    ],
  };
}
