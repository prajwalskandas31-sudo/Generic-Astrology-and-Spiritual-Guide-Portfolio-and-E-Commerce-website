export interface Offering {
  id: number;
  type: "Service" | "Consultation";
  title: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  images: string[];
  display_order: number;
  status: string;
  seo_title?: string;
  seo_description?: string;
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
  start_date: string;
  end_date: string;
  venue?: string;
  address?: string;
  google_maps_link?: string;
  duration?: string;
  price: number;
  capacity: number;
  status: string;
  registration_deadline?: string;
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  batches: WorkshopBatch[];
  created_at?: string;
  updated_at?: string;
}

export interface ClassItem {
  id: number;
  name: string;
  description?: string;
  duration?: string;
  suitable_for?: string;
  mode: "Online" | "Offline" | "Hybrid";
  status: string;
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
  id: number;
  question: string;
  answer: string;
  category?: string;
  display_order: number;
}

export interface Enquiry {
  id: number;
  request_id?: string;
  enquiry_type: "Service" | "Consultation" | "Class";
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
