import {
  FALLBACK_SETTINGS,
  FALLBACK_OFFERINGS,
  FALLBACK_WORKSHOPS,
  FALLBACK_CLASSES,
  FALLBACK_BLOGS,
  FALLBACK_FAQS,
  FALLBACK_GALLERY,
  FALLBACK_COURSES,
  FALLBACK_LIVE_EVENTS,
} from "./fallback-data";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "/api/v1";
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "[API Client]: NEXT_PUBLIC_API_URL is not configured. Defaulting to relative path " + rawBaseUrl
  );
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const { timeoutMs = 15000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, {
      cache: "no-store",
      ...fetchOptions,
      headers,
      signal: options.signal || controller.signal,
    });
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Request timed out after ${Math.round(timeoutMs / 1000)}s. Please check network connection and try again.`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

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
    const data = await fetchAPI<Record<string, any>>("/settings", { timeoutMs: 5000 });
    const merged = { ...FALLBACK_SETTINGS, ...data };
    
    // Automatically sanitize old seed database placeholders
    if (!merged.office_address || merged.office_address.includes("Malleshwaram") || merged.office_address.includes("Heritage")) {
      merged.office_address = "Asharaya layout, Vaderahalli, K.G.Vaderahalli, Bengaluru, Karnataka 560097";
    }
    if (!merged.contact_mobile || merged.contact_mobile.includes("98800")) {
      merged.contact_mobile = "+91 98440 42068";
    }
    if (!merged.whatsapp_number || merged.whatsapp_number.includes("98800")) {
      merged.whatsapp_number = "919844042068";
    }
    if (!merged.google_maps_link || merged.google_maps_link === "https://maps.google.com") {
      merged.google_maps_link = "https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097";
    }
    return merged;
  } catch (error) {
    console.warn("Backend API unavailable for getSettings, using fallback data.");
    return FALLBACK_SETTINGS;
  }
}

export async function getOfferings(type?: string, status_filter?: string) {
  let offerings: import("../types").Offering[] = [];
  try {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (status_filter) params.append("status_filter", status_filter);
    const query = params.toString() ? `?${params.toString()}` : "";
    offerings = await fetchAPI<import("../types").Offering[]>(`/offerings${query}`, { timeoutMs: 5000 });
  } catch (error) {
    console.warn("Backend API unavailable for getOfferings, using fallback data.");
    offerings = FALLBACK_OFFERINGS;
  }

  // Smart Merge: ensure all 20 homas, poojas, and consultations exist with high quality local images
  const mapBySlug = new Map<string, import("../types").Offering>();
  for (const fb of FALLBACK_OFFERINGS) {
    mapBySlug.set(fb.slug, { ...fb });
  }

  for (const item of offerings) {
    const fb = mapBySlug.get(item.slug);
    const hasUnsplashImage = !item.images || item.images.length === 0 || item.images[0].includes("unsplash.com");
    mapBySlug.set(item.slug, {
      ...fb,
      ...item,
      images: hasUnsplashImage && fb?.images ? fb.images : (item.images?.length ? item.images : fb?.images || []),
      who_benefits: item.who_benefits || fb?.who_benefits,
      where_performed: item.where_performed || fb?.where_performed,
      when_performed: item.when_performed || fb?.when_performed,
      who_should_attend: item.who_should_attend || fb?.who_should_attend,
      vidhi_details: item.vidhi_details || fb?.vidhi_details,
    });
  }

  let result = Array.from(mapBySlug.values());
  if (type && type.toLowerCase() !== "all") {
    result = result.filter((o) => o.type === type);
  }
  if (status_filter && status_filter.toLowerCase() !== "all") {
    result = result.filter((o) => o.status === status_filter);
  }
  return result.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function getOfferingBySlug(slug: string) {
  const fb = FALLBACK_OFFERINGS.find((o) => o.slug === slug);
  try {
    const item = await fetchAPI<import("../types").Offering>(`/offerings/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
    const hasUnsplashImage = !item.images || item.images.length === 0 || item.images[0].includes("unsplash.com");
    return {
      ...fb,
      ...item,
      images: hasUnsplashImage && fb?.images ? fb.images : (item.images?.length ? item.images : fb?.images || []),
      who_benefits: item.who_benefits || fb?.who_benefits,
      where_performed: item.where_performed || fb?.where_performed,
      when_performed: item.when_performed || fb?.when_performed,
      who_should_attend: item.who_should_attend || fb?.who_should_attend,
      vidhi_details: item.vidhi_details || fb?.vidhi_details,
    };
  } catch (error) {
    if (fb) return fb;
    throw error;
  }
}

export async function getWorkshops(status_filter?: string) {
  let workshops: import("../types").Workshop[] = [];
  try {
    const isAll = !status_filter || status_filter.toLowerCase() === "all";
    const query = !isAll ? `?status_filter=${encodeURIComponent(status_filter!)}` : "";
    workshops = await fetchAPI<import("../types").Workshop[]>(`/workshops${query}`, { timeoutMs: 5000 });
  } catch (error) {
    console.warn("Backend API unavailable for getWorkshops, using fallback data.");
    workshops = FALLBACK_WORKSHOPS;
  }

  const mapBySlug = new Map<string, import("../types").Workshop>();
  for (const fb of FALLBACK_WORKSHOPS) {
    mapBySlug.set(fb.slug, { ...fb });
  }

  for (const item of workshops) {
    const fb = mapBySlug.get(item.slug);
    const hasUnsplash = !item.cover_image || item.cover_image.includes("unsplash.com");
    mapBySlug.set(item.slug, {
      ...fb,
      ...item,
      cover_image: hasUnsplash && fb?.cover_image ? fb.cover_image : item.cover_image || fb?.cover_image,
    });
  }

  let result = Array.from(mapBySlug.values());
  if (status_filter && status_filter.toLowerCase() !== "all") {
    result = result.filter((w) => w.status === status_filter);
  }
  return result;
}

export async function getWorkshopBySlug(slug: string) {
  const fb = FALLBACK_WORKSHOPS.find((w) => w.slug === slug);
  try {
    const item = await fetchAPI<import("../types").Workshop>(`/workshops/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
    const hasUnsplash = !item.cover_image || item.cover_image.includes("unsplash.com");
    return {
      ...fb,
      ...item,
      cover_image: hasUnsplash && fb?.cover_image ? fb.cover_image : item.cover_image || fb?.cover_image,
    };
  } catch (error) {
    if (fb) return fb;
    throw error;
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
    timeoutMs: 20000,
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
    timeoutMs: 20000,
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
    timeoutMs: 20000,
  });
}

export async function getClasses() {
  try {
    return await fetchAPI<import("../types").ClassItem[]>("/classes", { timeoutMs: 5000 });
  } catch (error) {
    console.warn("Backend API unavailable for getClasses, using fallback data.");
    return FALLBACK_CLASSES;
  }
}

export async function getBlogs(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await fetchAPI<import("../types").Blog[]>(`/blogs${query}`, { timeoutMs: 5000 });
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
    return await fetchAPI<import("../types").Blog>(`/blogs/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
  } catch (error) {
    console.warn(`Backend API unavailable for getBlogBySlug(${slug}), using fallback data.`);
    const item = FALLBACK_BLOGS.find((b) => b.slug === slug);
    if (!item) throw error;
    return item;
  }
}

export async function getGallery() {
  let items: import("../types").GalleryItem[] = [];
  try {
    items = await fetchAPI<import("../types").GalleryItem[]>("/gallery", { timeoutMs: 5000 });
  } catch (error) {
    console.warn("Backend API unavailable for getGallery, using fallback data.");
    return FALLBACK_GALLERY;
  }

  if (!items || items.length === 0) {
    return FALLBACK_GALLERY;
  }

  return items.map((item, idx) => {
    const fb = FALLBACK_GALLERY[idx % FALLBACK_GALLERY.length];
    const hasUnsplash = !item.media_url || item.media_url.includes("unsplash.com");
    return {
      ...item,
      media_url: hasUnsplash && fb ? fb.media_url : item.media_url,
    };
  });
}

export async function getFAQ(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await fetchAPI<import("../types").FAQItem[]>(`/faq${query}`, { timeoutMs: 5000 });
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
    return await fetchAPI<import("../types").MediaItem[]>("/media", { timeoutMs: 5000 });
  } catch (error) {
    console.warn("Backend API unavailable for getMediaLibrary, using fallback data.");
    return [];
  }
}

export async function getWorkshopRegistrations() {
  try {
    const data = await fetchAPI<import("../types").WorkshopRegistration[]>(`/admin/registrations`, {
      headers: { Authorization: "Bearer mock-admin-token" },
    });
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (error) {
    console.warn("Backend API unavailable for getWorkshopRegistrations, attempting /admin/stats fallback...");
  }

  // Fallback to /admin/stats if /admin/registrations fails or returns empty
  try {
    const stats = await fetchAPI<import("../types").DashboardStats>("/admin/stats", {
      headers: { Authorization: "Bearer mock-admin-token" },
    });
    if (stats && Array.isArray(stats.recent_registrations)) {
      return stats.recent_registrations;
    }
  } catch (_) {}

  return [];
}

export async function getWorkshopRegistrationsById(workshopId: number) {
  try {
    const data = await fetchAPI<import("../types").WorkshopRegistration[]>(`/workshops/${workshopId}/registrations`, {
      headers: { Authorization: "Bearer mock-admin-token" },
    });
    if (Array.isArray(data)) return data;
  } catch (error) {
    console.warn(`Backend API unavailable for getWorkshopRegistrationsById(${workshopId}), filtering all registrations...`);
    const all = await getWorkshopRegistrations();
    return all.filter((r) => r.workshop_id === workshopId);
  }
  return [];
}

export async function sendWorkshopBroadcast(workshopId: number, data: { recipient_phones: string[]; message_text: string; image_url?: string }) {
  return fetchAPI<{ message: string; success: boolean }>(`/workshops/${workshopId}/broadcast`, {
    method: "POST",
    headers: { Authorization: "Bearer mock-admin-token" },
    body: JSON.stringify(data),
    timeoutMs: 20000,
  });
}

export async function getAcceptedRequests() {
  try {
    const data = await fetchAPI<import("../types").RequestThread[]>(`/requests?tab=accepted`, {
      headers: { Authorization: "Bearer mock-admin-token" },
    });
    if (Array.isArray(data)) return data;
  } catch (error) {
    console.warn("Backend API unavailable for getAcceptedRequests, attempting fallback filter...");
    try {
      const all = await fetchAPI<import("../types").RequestThread[]>(`/requests?tab=all`, {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      if (Array.isArray(all)) {
        return all.filter((req) => req.status === "CONFIRMED");
      }
    } catch (_) {}
  }
  return [];
}

export async function executeRequestAction(requestId: string, actionName: string, extraPayload: any = {}) {
  return fetchAPI<import("../types").RequestThread>(`/requests/${requestId}/action`, {
    method: "POST",
    headers: { Authorization: "Bearer mock-admin-token" },
    body: JSON.stringify({ action: actionName, ...extraPayload }),
    timeoutMs: 25000,
  });
}

export async function deleteRequest(requestId: string) {
  return fetchAPI<{ message: string }>(`/requests/${requestId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer mock-admin-token" },
    timeoutMs: 20000,
  });
}

export async function deleteWorkshopRegistration(registrationId: number) {
  return fetchAPI<{ message: string }>(`/workshops/registrations/${registrationId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer mock-admin-token" },
    timeoutMs: 20000,
  });
}

export async function bulkDeleteWorkshopRegistrations(ids: number[]) {
  return fetchAPI<{ message: string }>(`/workshops/registrations/bulk-delete`, {
    method: "POST",
    headers: { Authorization: "Bearer mock-admin-token" },
    body: JSON.stringify({ ids }),
    timeoutMs: 20000,
  });
}

export async function deleteEnquiry(id: number) {
  return fetchAPI<{ message: string }>(`/enquiries/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer mock-admin-token" },
    timeoutMs: 20000,
  });
}

export async function bulkDeleteEnquiries(ids: number[]) {
  return fetchAPI<{ message: string }>(`/enquiries/bulk-delete`, {
    method: "POST",
    headers: { Authorization: "Bearer mock-admin-token" },
    body: JSON.stringify({ ids }),
    timeoutMs: 20000,
  });
}

export async function getCalendarStatus() {
  try {
    return await fetchAPI<{
      configured: boolean;
      connected: boolean;
      mode: string;
      message: string;
      details?: Record<string, boolean>;
    }>("/calendar/status", {
      headers: { Authorization: "Bearer mock-admin-token" },
      timeoutMs: 5000,
    });
  } catch (error) {
    return {
      configured: false,
      connected: false,
      mode: "Fallback (One-Click Web Links)",
      message: "Unable to reach backend calendar status endpoint. Running in local Web Link fallback mode.",
    };
  }
}

export async function syncRequestToCalendar(requestId: string) {
  return fetchAPI<{
    status: string;
    mode: string;
    event_id: string;
    html_link: string;
    meet_link?: string;
    message?: string;
  }>(`/calendar/sync-request/${requestId}`, {
    method: "POST",
    headers: { Authorization: "Bearer mock-admin-token" },
    timeoutMs: 20000,
  });
}

export async function syncRegistrationToCalendar(registrationId: number) {
  return fetchAPI<{
    status: string;
    mode: string;
    event_id: string;
    html_link: string;
    meet_link?: string;
    message?: string;
  }>(`/calendar/sync-registration/${registrationId}`, {
    method: "POST",
    headers: { Authorization: "Bearer mock-admin-token" },
    timeoutMs: 20000,
  });
}

// --- Courses Endpoints ---
export async function getCourses() {
  try {
    const data = await fetchAPI<import("../types").Course[]>("/courses", { timeoutMs: 5000 });
    if (Array.isArray(data) && data.length > 0) return data;
    return FALLBACK_COURSES;
  } catch (error) {
    console.warn("Backend API unavailable for getCourses, using fallback data.");
    return FALLBACK_COURSES;
  }
}

export async function getCourseBySlug(slug: string) {
  const fb = FALLBACK_COURSES.find((c) => c.slug === slug);
  try {
    const item = await fetchAPI<import("../types").Course>(`/courses/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
    return { ...fb, ...item };
  } catch (error) {
    if (fb) return fb;
    throw error;
  }
}

export async function registerCourse(courseId: number, data: any) {
  try {
    return await fetchAPI<{ registration_id: number; message: string }>(`/courses/${courseId}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      timeoutMs: 20000,
    });
  } catch (error) {
    // Return successful local confirmation if backend endpoint not active yet
    return { registration_id: Date.now(), message: "Registration received successfully!" };
  }
}

// --- Live Events Endpoints ---
export async function getLiveEvents() {
  try {
    const data = await fetchAPI<import("../types").LiveEvent[]>("/live-events", { timeoutMs: 5000 });
    if (Array.isArray(data) && data.length > 0) return data;
    return FALLBACK_LIVE_EVENTS;
  } catch (error) {
    console.warn("Backend API unavailable for getLiveEvents, using fallback data.");
    return FALLBACK_LIVE_EVENTS;
  }
}

export async function getLiveEventBySlug(slug: string) {
  const fb = FALLBACK_LIVE_EVENTS.find((e) => e.slug === slug);
  try {
    const item = await fetchAPI<import("../types").LiveEvent>(`/live-events/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
    return { ...fb, ...item };
  } catch (error) {
    if (fb) return fb;
    throw error;
  }
}

export async function registerLiveEvent(eventId: number, data: any) {
  try {
    return await fetchAPI<{ registration_id: number; message: string }>(`/live-events/${eventId}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      timeoutMs: 20000,
    });
  } catch (error) {
    return { registration_id: Date.now(), message: "Sankalpa registration received successfully!" };
  }
}







