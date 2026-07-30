const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
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
  return fetchAPI<Record<string, any>>("/settings");
}

export async function getOfferings(type?: string) {
  const query = type ? `?type=${encodeURIComponent(type)}` : "";
  return fetchAPI<import("../types").Offering[]>(`/offerings${query}`);
}

export async function getOfferingBySlug(slug: string) {
  return fetchAPI<import("../types").Offering>(`/offerings/${encodeURIComponent(slug)}`);
}

export async function getWorkshops(status_filter?: string) {
  const query = status_filter ? `?status_filter=${encodeURIComponent(status_filter)}` : "";
  return fetchAPI<import("../types").Workshop[]>(`/workshops${query}`);
}

export async function getWorkshopBySlug(slug: string) {
  return fetchAPI<import("../types").Workshop>(`/workshops/${encodeURIComponent(slug)}`);
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
  return fetchAPI<import("../types").ClassItem[]>("/classes");
}

export async function getBlogs(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchAPI<import("../types").Blog[]>(`/blogs${query}`);
}

export async function getBlogBySlug(slug: string) {
  return fetchAPI<import("../types").Blog>(`/blogs/${encodeURIComponent(slug)}`);
}

export async function getGallery() {
  return fetchAPI<import("../types").GalleryItem[]>("/gallery");
}

export async function getFAQ(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchAPI<import("../types").FAQItem[]>(`/faq${query}`);
}

export async function getMediaLibrary() {
  return fetchAPI<import("../types").MediaItem[]>("/media");
}
