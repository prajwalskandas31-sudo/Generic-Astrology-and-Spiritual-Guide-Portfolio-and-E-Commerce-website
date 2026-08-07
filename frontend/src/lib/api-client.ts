import {
  FALLBACK_SETTINGS,
  FALLBACK_OFFERINGS,
  FALLBACK_WORKSHOPS,
  FALLBACK_CLASSES,
  FALLBACK_BLOGS,
  FALLBACK_FAQS,
  FALLBACK_GALLERY,
} from "./fallback-data";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://generic-astrology-and-spiritual-guide.onrender.com/api/v1";
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "[API Client Warning]: NEXT_PUBLIC_API_URL is not configured in Vercel environment variables. Defaulting to " + rawBaseUrl
  );
}

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    let errorMsg = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson.detail) {
        errorMsg = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
      }
    } catch (_) {}
    throw new Error(errorMsg);
  }

  return response.json();
}

// --- Public Endpoints ---
export async function getSettings() {
  try {
    return await fetchAPI<Record<string, any>>("/settings");
  } catch (error) {
    console.warn("Backend API unavailable for getSettings, using fallback data.");
    return FALLBACK_SETTINGS;
  }
}

export async function getOfferings(type?: string) {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : "";
    return await fetchAPI<import("../types").Offering[]>(`/offerings${query}`);
  } catch (error) {
    console.warn("Backend API unavailable for getOfferings, using fallback data.");
    if (type) {
      return FALLBACK_OFFERINGS.filter((o) => o.type === type);
    }
    return FALLBACK_OFFERINGS;
  }
}

export async function getOfferingBySlug(slug: string) {
  try {
    return await fetchAPI<import("../types").Offering>(`/offerings/${encodeURIComponent(slug)}`);
  } catch (error) {
    console.warn(`Backend API unavailable for getOfferingBySlug(${slug}), using fallback data.`);
    const item = FALLBACK_OFFERINGS.find((o) => o.slug === slug);
    if (!item) throw error;
    return item;
  }
}

export async function getWorkshops(status_filter?: string) {
  try {
    const query = status_filter ? `?status_filter=${encodeURIComponent(status_filter)}` : "";
    return await fetchAPI<import("../types").Workshop[]>(`/workshops${query}`);
  } catch (error) {
    console.warn("Backend API unavailable for getWorkshops, using fallback data.");
    if (status_filter) {
      return FALLBACK_WORKSHOPS.filter((w) => w.status === status_filter);
    }
    return FALLBACK_WORKSHOPS;
  }
}

export async function getWorkshopBySlug(slug: string) {
  try {
    return await fetchAPI<import("../types").Workshop>(`/workshops/${encodeURIComponent(slug)}`);
  } catch (error) {
    console.warn(`Backend API unavailable for getWorkshopBySlug(${slug}), using fallback data.`);
    const item = FALLBACK_WORKSHOPS.find((w) => w.slug === slug);
    if (!item) throw error;
    return item;
  }
}

export async function registerWorkshop(workshopId: number, data: any) {
  return fetchAPI<{
    registration_id: number;
    razorpay_order_id: string;
    amount: number;
    currency: string;
    key_id: string;
  }>(`/workshops/${workshopId}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyPayment(data: {
  registration_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  return fetchAPI<{ message: string; success: boolean }>("/payments/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitEnquiry(data: {
  enquiry_type: string;
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  category?: string;
  additional_notes?: string;
}) {
  return fetchAPI<import("../types").Enquiry>("/enquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getClasses() {
  try {
    return await fetchAPI<import("../types").ClassItem[]>("/classes");
  } catch (error) {
    console.warn("Backend API unavailable for getClasses, using fallback data.");
    return FALLBACK_CLASSES;
  }
}

export async function getBlogs(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await fetchAPI<import("../types").Blog[]>(`/blogs${query}`);
  } catch (error) {
    console.warn("Backend API unavailable for getBlogs, using fallback data.");
    if (category) {
      return FALLBACK_BLOGS.filter((b) => b.category === category);
    }
    return FALLBACK_BLOGS;
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    return await fetchAPI<import("../types").Blog>(`/blogs/${encodeURIComponent(slug)}`);
  } catch (error) {
    console.warn(`Backend API unavailable for getBlogBySlug(${slug}), using fallback data.`);
    const item = FALLBACK_BLOGS.find((b) => b.slug === slug);
    if (!item) throw error;
    return item;
  }
}

export async function getGallery() {
  try {
    return await fetchAPI<import("../types").GalleryItem[]>("/gallery");
  } catch (error) {
    console.warn("Backend API unavailable for getGallery, using fallback data.");
    return FALLBACK_GALLERY;
  }
}

export async function getFAQ(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await fetchAPI<import("../types").FAQItem[]>(`/faq${query}`);
  } catch (error) {
    console.warn("Backend API unavailable for getFAQ, using fallback data.");
    if (category) {
      return FALLBACK_FAQS.filter((f) => f.category === category);
    }
    return FALLBACK_FAQS;
  }
}

export async function getMediaLibrary() {
  try {
    return await fetchAPI<import("../types").MediaItem[]>("/media");
  } catch (error) {
    console.warn("Backend API unavailable for getMediaLibrary, using fallback data.");
    return [];
  }
}

