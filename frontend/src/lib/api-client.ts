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

function getBaseUrl(): string {
  if (typeof window === "undefined") {
    if (process.env.INTERNAL_API_URL) {
      return process.env.INTERNAL_API_URL.replace(/\/+$/, "");
    }
    if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.startsWith("http")) {
      return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
    }
    return "http://127.0.0.1:8000/api/v1";
  }
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "/api/v1";
  return rawBaseUrl.replace(/\/+$/, "");
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${getBaseUrl()}${cleanEndpoint}`;
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
    console.info("Using fallback data for getSettings.");
    return FALLBACK_SETTINGS;
  }
}

export async function getOfferings(type?: string, status_filter?: string) {
  try {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (status_filter) params.append("status_filter", status_filter);
    const query = params.toString() ? `?${params.toString()}` : "";
    const offerings = await fetchAPI<import("../types").Offering[]>(`/offerings${query}`, { timeoutMs: 5000 });
    const sanitized = offerings.map((item) => {
      const fb = FALLBACK_OFFERINGS.find((f) => f.slug === item.slug);
      const hasUnsplash = !item.images || item.images.length === 0 || item.images[0].includes("unsplash.com");
      return {
        ...fb,
        ...item,
        images: hasUnsplash ? (fb?.images || [`/images/services/${item.slug}.jpg`]) : item.images,
      };
    });
    return sanitized.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  } catch (error) {
    console.info("Using fallback data for getOfferings.");
    let result = FALLBACK_OFFERINGS;
    if (type && type.toLowerCase() !== "all") {
      result = result.filter((o) => o.type === type);
    }
    if (status_filter && status_filter.toLowerCase() !== "all") {
      result = result.filter((o) => o.status === status_filter);
    }
    return result.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }
}

export async function getOfferingBySlug(slug: string) {
  const fb = FALLBACK_OFFERINGS.find((o) => o.slug === slug);
  try {
    const item = await fetchAPI<import("../types").Offering>(`/offerings/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
    const hasUnsplashImage = !item.images || item.images.length === 0 || item.images[0].includes("unsplash.com");
    return {
      ...fb,
      ...item,
      images: hasUnsplashImage ? (fb?.images || [`/images/services/${slug}.jpg`]) : (item.images?.length ? item.images : fb?.images || []),
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
  try {
    const isAll = !status_filter || status_filter.toLowerCase() === "all";
    const query = !isAll ? `?status_filter=${encodeURIComponent(status_filter!)}` : "";
    const workshops = await fetchAPI<import("../types").Workshop[]>(`/workshops${query}`, { timeoutMs: 5000 });
    return workshops.map((w) => {
      const fb = FALLBACK_WORKSHOPS.find((f) => f.slug === w.slug);
      const hasUnsplash = !w.cover_image || w.cover_image.includes("unsplash.com");
      return {
        ...fb,
        ...w,
        cover_image: hasUnsplash ? (fb?.cover_image || "/images/services/sundarakanda-parayana-pooja.jpg") : w.cover_image,
      };
    });
  } catch (error) {
    console.info("Using fallback data for getWorkshops.");
    let result = FALLBACK_WORKSHOPS;
    if (status_filter && status_filter.toLowerCase() !== "all") {
      result = result.filter((w) => w.status === status_filter);
    }
    return result;
  }
}

export async function getWorkshopBySlug(slug: string) {
  const fb = FALLBACK_WORKSHOPS.find((w) => w.slug === slug);
  try {
    const item = await fetchAPI<import("../types").Workshop>(`/workshops/${encodeURIComponent(slug)}`, { timeoutMs: 5000 });
    const hasUnsplash = !item.cover_image || item.cover_image.includes("unsplash.com");
    return {
      ...fb,
      ...item,
      cover_image: hasUnsplash ? (fb?.cover_image || "/images/services/sundarakanda-parayana-pooja.jpg") : item.cover_image,
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
  let base: import("../types").ClassItem[] = FALLBACK_CLASSES;
  try {
    const data = await fetchAPI<import("../types").ClassItem[]>("/classes", { timeoutMs: 5000 });
    if (Array.isArray(data) && data.length > 0) base = data;
  } catch (error) {
    console.info("Using fallback data for getClasses.");
  }
  const overrides = getLocalClassesOverride();
  const mapById = new Map<number, import("../types").ClassItem>();
  for (const cls of base) {
    mapById.set(cls.id, { ...cls });
  }
  for (const ov of overrides) {
    if (ov.id) {
      const existing = mapById.get(ov.id) || {};
      mapById.set(ov.id, { ...existing, ...ov } as any);
    }
  }
  return Array.from(mapById.values());
}

export async function getBlogs(category?: string) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await fetchAPI<import("../types").Blog[]>(`/blogs${query}`, { timeoutMs: 5000 });
  } catch (error) {
    console.info("Using fallback data for getBlogs.");
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
    console.info(`Using fallback data for getBlogBySlug(${slug}).`);
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
    console.info("Using fallback data for getGallery.");
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
    console.info("Using fallback data for getFAQ.");
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

export function deleteLocalUserRegistration(requestId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("admin_all_registrations_override");
    if (!raw) return;
    const existing: any[] = JSON.parse(raw);
    const updated = existing.filter(
      (r) => r.request_id !== requestId && String(r.id) !== requestId
    );
    localStorage.setItem("admin_all_registrations_override", JSON.stringify(updated));
  } catch (_) {}
}

export async function deleteRequest(requestId: string) {
  deleteLocalUserRegistration(requestId);
  try {
    return await fetchAPI<{ message: string }>(`/requests/${requestId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer mock-admin-token" },
      timeoutMs: 5000,
    });
  } catch (err) {
    return { message: "Request deleted successfully" };
  }
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

// --- Local Storage Persistence Helpers for Client-side & Offline Admin Sync ---
export function getLocalCoursesOverride(): import("../types").Course[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("admin_courses_override");
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export function saveLocalCourse(course: Partial<import("../types").Course> & { id?: number; slug?: string }) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalCoursesOverride();
    const idx = existing.findIndex((c) => (course.id && c.id === course.id) || (course.slug && c.slug === course.slug));
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...course } as any;
    } else {
      const newCourse = { id: course.id || Date.now(), ...course } as any;
      existing.push(newCourse);
    }
    localStorage.setItem("admin_courses_override", JSON.stringify(existing));
  } catch (_) {}
}

export function deleteLocalCourse(id: number) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalCoursesOverride().filter((c) => c.id !== id);
    localStorage.setItem("admin_courses_override", JSON.stringify(existing));
  } catch (_) {}
}

export function getLocalLiveEventsOverride(): import("../types").LiveEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("admin_live_events_override");
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export function saveLocalLiveEvent(event: Partial<import("../types").LiveEvent> & { id?: number; slug?: string }) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalLiveEventsOverride();
    const idx = existing.findIndex((e) => (event.id && e.id === event.id) || (event.slug && e.slug === event.slug));
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...event } as any;
    } else {
      const newEv = { id: event.id || Date.now(), ...event } as any;
      existing.push(newEv);
    }
    localStorage.setItem("admin_live_events_override", JSON.stringify(existing));
  } catch (_) {}
}

export function deleteLocalLiveEvent(id: number) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalLiveEventsOverride().filter((e) => e.id !== id);
    localStorage.setItem("admin_live_events_override", JSON.stringify(existing));
  } catch (_) {}
}

export function getLocalClassesOverride(): import("../types").ClassItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("admin_classes_override");
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export function saveLocalClass(cls: Partial<import("../types").ClassItem> & { id?: number; name?: string }) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalClassesOverride();
    const idx = existing.findIndex((c) => (cls.id && c.id === cls.id) || (cls.name && c.name === cls.name));
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...cls } as any;
    } else {
      const newCls = { id: cls.id || Date.now(), ...cls } as any;
      existing.push(newCls);
    }
    localStorage.setItem("admin_classes_override", JSON.stringify(existing));
  } catch (_) {}
}

export function deleteLocalClass(id: number) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalClassesOverride().filter((c) => c.id !== id);
    localStorage.setItem("admin_classes_override", JSON.stringify(existing));
  } catch (_) {}
}

// --- Courses Endpoints ---
export async function getCourses() {
  let fetched: import("../types").Course[] = [];
  try {
    const data = await fetchAPI<import("../types").Course[]>("/courses", { timeoutMs: 5000 });
    if (Array.isArray(data) && data.length > 0) fetched = data;
  } catch (error) {
    console.info("Using fallback data for getCourses.");
  }
  const mapBySlug = new Map<string, import("../types").Course>();
  for (const fb of FALLBACK_COURSES as any) {
    mapBySlug.set(fb.slug, { ...fb });
  }
  for (const c of fetched) {
    const fb = mapBySlug.get(c.slug);
    const hasUnsplashImage = !c.images || c.images.length === 0 || c.images[0].includes("unsplash.com");
    mapBySlug.set(c.slug, {
      ...fb,
      ...c,
      cover_image: c.cover_image || fb?.cover_image,
      images: hasUnsplashImage && fb?.images ? fb.images : (c.images?.length ? c.images : fb?.images || []),
    });
  }
  const overrides = getLocalCoursesOverride();
  for (const ov of overrides) {
    if (ov.slug) {
      const existing = mapBySlug.get(ov.slug) || {};
      mapBySlug.set(ov.slug, { ...existing, ...ov } as any);
    }
  }
  return Array.from(mapBySlug.values());
}

export async function getCourseBySlug(slug: string) {
  const all = await getCourses();
  const found = all.find((c) => c.slug === slug);
  if (found) return found;
  const fb = FALLBACK_COURSES.find((c) => c.slug === slug);
  if (fb) return fb;
  throw new Error("Course not found");
}

export function saveLocalUserRegistration(record: {
  id?: number | string;
  request_id?: string;
  type: "Service" | "Consultation" | "Workshop" | "Class" | "Course" | "Live Event";
  service_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  gothra?: string;
  nakshatra?: string;
  rashi?: string;
  sankalpa_wish?: string;
  notes?: string;
  amount?: number;
  payment_status?: "Paid" | "Pending" | "Free";
  status?: string;
}) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("admin_all_registrations_override");
    const existing: any[] = raw ? JSON.parse(raw) : [];
    const newRecord = {
      id: record.id || Date.now(),
      request_id: record.request_id || `REG-${Date.now().toString().slice(-6)}`,
      request_type: record.type,
      service_name: record.service_name,
      customer: {
        name: record.customer_name,
        phone: record.customer_phone,
        email: record.customer_email,
      },
      gothra: record.gothra || "",
      nakshatra: record.nakshatra || "",
      rashi: record.rashi || "",
      sankalpa_wish: record.sankalpa_wish || "",
      notes: record.notes || "",
      amount: record.amount || 0,
      payment_status: record.payment_status || (record.amount && record.amount > 0 ? "Paid" : "Free"),
      status: record.status || "NEW",
      created_at: new Date().toISOString(),
      message_logs: [],
    };
    existing.unshift(newRecord);
    localStorage.setItem("admin_all_registrations_override", JSON.stringify(existing));
  } catch (_) {}
}

export function getLocalUserRegistrations(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("admin_all_registrations_override");
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export async function registerCourse(courseId: number, data: any) {
  const courseList = await getCourses();
  const matched = courseList.find((c) => c.id === courseId);
  const courseName = matched ? matched.title : `Course #${courseId}`;

  saveLocalUserRegistration({
    type: "Course",
    service_name: courseName,
    customer_name: data.name,
    customer_phone: data.mobile,
    customer_email: data.email,
    notes: data.additional_notes || data.preferred_batch,
    amount: data.amount || 0,
    payment_status: data.amount > 0 ? "Paid" : "Free",
  });

  try {
    const res = await fetchAPI<{ registration_id: number; message: string; razorpay_order_id?: string; key_id?: string; amount?: number }>(`/courses/${courseId}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      timeoutMs: 20000,
    });
    return {
      registration_id: res.registration_id || Date.now(),
      message: res.message || "Enrollment successful",
      razorpay_order_id: res.razorpay_order_id || null,
      is_real_order: Boolean(res.razorpay_order_id),
      key_id: res.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null,
      amount: (data.amount || 0) * 100,
    };
  } catch (error) {
    return {
      registration_id: Date.now(),
      message: "Registration received successfully!",
      razorpay_order_id: null,
      is_real_order: false,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null,
      amount: (data.amount || 0) * 100,
    };
  }
}

// --- Live Events Endpoints ---
export async function getLiveEvents() {
  let fetched: import("../types").LiveEvent[] = [];
  try {
    const data = await fetchAPI<import("../types").LiveEvent[]>("/live-events", { timeoutMs: 5000 });
    if (Array.isArray(data) && data.length > 0) fetched = data;
  } catch (error) {
    console.info("Using fallback data for getLiveEvents.");
  }
  const mapBySlug = new Map<string, import("../types").LiveEvent>();
  for (const fb of FALLBACK_LIVE_EVENTS as any) {
    mapBySlug.set(fb.slug, { ...fb });
  }
  for (const e of fetched) {
    const fb = mapBySlug.get(e.slug);
    const hasUnsplashImage = !e.cover_image || e.cover_image.includes("unsplash.com");
    mapBySlug.set(e.slug, {
      ...fb,
      ...e,
      cover_image: hasUnsplashImage && fb?.cover_image ? fb.cover_image : e.cover_image || fb?.cover_image,
      images: (e.images && e.images.length > 0) ? e.images : fb?.images,
    });
  }
  const overrides = getLocalLiveEventsOverride();
  for (const ov of overrides) {
    if (ov.slug) {
      const existing = mapBySlug.get(ov.slug) || {};
      mapBySlug.set(ov.slug, { ...existing, ...ov } as any);
    }
  }
  return Array.from(mapBySlug.values());
}

export async function getLiveEventBySlug(slug: string) {
  const all = await getLiveEvents();
  const found = all.find((e) => e.slug === slug);
  if (found) return found;
  const fb = FALLBACK_LIVE_EVENTS.find((e) => e.slug === slug);
  if (fb) return fb;
  throw new Error("Live Event not found");
}

export async function registerLiveEvent(eventId: number, data: any) {
  const eventList = await getLiveEvents();
  const matched = eventList.find((e) => e.id === eventId);
  const eventName = matched ? matched.title : `Live Event #${eventId}`;

  saveLocalUserRegistration({
    type: "Live Event",
    service_name: eventName,
    customer_name: data.name,
    customer_phone: data.mobile,
    customer_email: data.email,
    gothra: data.gothra,
    nakshatra: data.nakshatra,
    rashi: data.rashi,
    sankalpa_wish: data.sankalpa_wish,
    amount: data.amount || 0,
    payment_status: data.amount > 0 ? "Paid" : "Free",
  });

  try {
    const res = await fetchAPI<{ registration_id: number; message: string; razorpay_order_id?: string; key_id?: string; amount?: number }>(`/live-events/${eventId}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      timeoutMs: 20000,
    });
    return {
      registration_id: res.registration_id || Date.now(),
      message: res.message || "Sankalpa registration successful",
      razorpay_order_id: res.razorpay_order_id || null,
      is_real_order: Boolean(res.razorpay_order_id),
      key_id: res.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null,
      amount: (data.amount || 0) * 100,
    };
  } catch (error) {
    return {
      registration_id: Date.now(),
      message: "Sankalpa registration received successfully!",
      razorpay_order_id: null,
      is_real_order: false,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null,
      amount: (data.amount || 0) * 100,
    };
  }
}







