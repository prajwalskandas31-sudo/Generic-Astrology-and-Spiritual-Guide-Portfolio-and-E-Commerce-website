export interface Offering {
  id: number;
  type: "Service" | "Consultation" | "Pooja";
  title: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  images: string[];
  display_order: number;
  status: string;
  seo_title?: string;
  seo_description?: string;
  who_benefits?: string;
  where_performed?: string;
  when_performed?: string;
  who_should_attend?: string;
  vidhi_details?: string;
  faq?: { question: string; answer: string }[];
  created_at?: string;
  updated_at?: string;
}

export interface WorkshopBatch {
  id: number;
  workshop_id: number;
  batch_name: string;
  start_time: string;
  end_time: string;
  capacity: number;
  remaining_seats: number;
  status: string;
}

export interface Workshop {
  id: number;
  title: string;
  slug: string;
  cover_image?: string;
  description?: string;
  short_description?: string;
  start_date: string;
  end_date: string;
  timings?: string;
  venue?: string;
  address?: string;
  location?: string;
  mode?: "Online" | "Offline" | "Hybrid" | string;
  google_maps_link?: string;
  duration?: string;
  price: number;
  has_payment?: boolean;
  payment_mode?: "RAZORPAY" | "CUSTOM_LINK" | "FREE";
  custom_payment_link?: string;
  capacity?: number;
  seats_limit?: number;
  status: string;
  registration_deadline?: string;
  featured?: boolean;
  seo_title?: string;
  seo_description?: string;
  images?: string[];
  faq?: { question: string; answer: string }[];
  batches?: WorkshopBatch[];
  created_at?: string;
  updated_at?: string;
}

export interface CourseModule {
  title: string;
  duration?: string;
  topics: string[];
}

export interface ClassItem {
  id: number;
  name?: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  full_description?: string;
  duration?: string;
  suitable_for?: string;
  category?: string;
  mode: "Online" | "Offline" | "Hybrid" | "Online Live" | string;
  price?: number;
  has_payment?: boolean;
  payment_mode?: "RAZORPAY" | "CUSTOM_LINK" | "FREE";
  custom_payment_link?: string | null;
  status: string;
  instructor?: string;
  level?: string;
  cover_image?: string;
  images?: string[];
  schedule?: string;
  syllabus_modules?: CourseModule[];
  seo_title?: string;
  seo_description?: string;
  faq?: { question: string; answer: string }[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  cover_image?: string;
  author: string;
  publish_date: string;
  category?: string;
  tags?: string[];
  content: string;
  seo_title?: string;
  seo_description?: string;
  status?: string;
}

export interface GalleryAlbum {
  id: number;
  name: string;
  cover_image?: string;
  items_count?: number;
}

export interface GalleryItem {
  id: number;
  album_id?: number;
  title?: string;
  description?: string;
  media_url: string;
  media_type: "Image" | "Video";
  category?: string;
  display_order: number;
}

export interface MediaItem {
  id: number;
  filename: string;
  file_url: string;
  file_type: string;
  alt_text?: string;
  created_at?: string;
}

export interface FAQItem {
  id?: number;
  question: string;
  answer: string;
  category?: string;
  display_order?: number;
}

export interface Enquiry {
  id: number;
  request_id?: string;
  enquiry_type: "Service" | "Consultation" | "Class" | "Pooja" | "Class Enquiry";
  name: string;
  mobile: string;
  email: string;
  city?: string;
  category: string;
  preferred_date?: string;
  preferred_time?: string;
  birth_date?: string;
  birth_time?: string;
  birth_place?: string;
  additional_notes?: string;
  status: "New" | "Contacted" | "Confirmed" | "Completed" | "Rejected";
  created_at?: string;
}

export interface WorkshopRegistration {
  id: number;
  request_id?: string;
  workshop_id: number;
  batch_id?: number;
  name: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  amount: number;
  payment_status: "Pending" | "Paid" | "Failed";
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  additional_notes?: string;
  created_at?: string;
}

export interface Customer {
  id: number;
  customer_id?: string;
  name: string;
  phone: string;
  email?: string;
  preferred_language?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MessageLog {
  id: number;
  message_id?: string;
  request_id?: number;
  customer_id: number;
  direction: "INBOUND" | "OUTBOUND";
  channel: "WHATSAPP" | "ADMIN" | "EMAIL";
  message_type: string;
  message_content: string;
  action_id?: string;
  timestamp: string;
}

export interface RequestThread {
  id: number;
  request_id: string;
  customer_id: number;
  request_type: string;
  offering_id?: number;
  workshop_id?: number;
  batch_id?: number;
  service_name?: string;
  workshop_name?: string;
  preferred_date?: string;
  preferred_time?: string;
  selected_date?: string;
  selected_time?: string;
  language?: string;
  notes?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  amount: number;
  payment_status: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  status: "NEW" | "PENDING" | "CONFIRMED" | "RESCHEDULE_REQUESTED" | "CANCELLED" | "REJECTED" | "COMPLETED" | "ARCHIVED";
  created_at: string;
  updated_at: string;
  completed_at?: string;
  customer?: Customer;
  message_logs?: MessageLog[];
}

export interface DashboardStats {
  recent_enquiries: Enquiry[];
  upcoming_workshops: Workshop[];
  recent_registrations: WorkshopRegistration[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  instructor?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels" | string;
  mode?: "Online Live" | "Hybrid" | "Recorded" | "Online" | string;
  price?: number;
  has_payment?: boolean;
  payment_mode?: "RAZORPAY" | "CUSTOM_LINK" | "FREE";
  custom_payment_link?: string | null;
  cover_image?: string;
  images?: string[];
  prerequisites?: string;
  schedule?: string;
  status?: "Active" | "Upcoming" | "Completed" | string;
  featured?: boolean;
  syllabus_modules?: CourseModule[];
  faq?: { question: string; answer: string }[];
  created_at?: string;
}

export interface CourseRegistration {
  id: number;
  course_id: number;
  name: string;
  mobile: string;
  email: string;
  preferred_batch?: string;
  additional_notes?: string;
  payment_status: "Pending" | "Paid";
  created_at?: string;
}

export interface LiveEventAgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface LiveEvent {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  event_date: string;
  event_time: string;
  venue_type: "Online Stream" | "In-Person & Live Stream" | "Temple Ground" | "Hybrid" | string;
  venue_address?: string;
  stream_url?: string;
  price: number;
  has_payment?: boolean;
  payment_mode?: "RAZORPAY" | "CUSTOM_LINK" | "FREE";
  custom_payment_link?: string | null;
  cover_image?: string;
  images?: string[];
  featured?: boolean;
  status: "Upcoming" | "Live Now" | "Ended" | string;
  agenda: LiveEventAgendaItem[];
  pandits_count?: number;
  faq?: { question: string; answer: string }[];
  created_at?: string;
}

export interface LiveEventRegistration {
  id: number;
  event_id: number;
  name: string;
  mobile: string;
  email: string;
  gothra?: string;
  nakshatra?: string;
  rashi?: string;
  sankalpa_wish?: string;
  pass_type: "Virtual Pass" | "VIP Sankalpa Pass" | "In-Person Pass";
  payment_status: "Pending" | "Paid";
  created_at?: string;
}
