# Master Admin Training Guide & System Operations Manual
## Veda Brahma Shri Pradeep Nadig Platform & Content Management System

Welcome to the **Master Administrator Training Guide** for the Veda Brahma Shri Pradeep Nadig web platform. This document serves as the comprehensive operational manual and source text for AI video narration generation in NotebookLM.

---

## 1. System Architecture & Authentication Model

### Access URLs
- **Admin Login Portal**: `http://localhost:3000/admin/login` (Local Dev) / `https://pradeepnadig.in/admin/login` (Production)
- **Admin Dashboard**: `http://localhost:3000/admin`

### Authentication & Roles
- **Development/Sandbox Mode**: Standard admin credentials (`admin@pradeepnadig.com` / `admin123`) with mock bearer tokens (`mock-admin-token`).
- **Production Mode**: Managed via **Supabase Auth**. Authenticated users are verified against the Supabase JWT secret and database role permissions.

---

## 2. Platform Core Functional Modules

The platform is structured into 14 distinct administrator modules, accessible via the persistent dark amber sidebar:

1. **Admin Dashboard (`/admin`)**: Real-time operational metrics across Services, Consultations, Workshops, Classes, Courses, and Live Events. Features Quick Action shortcuts and lists of recent enquiries and registrations.
2. **Offerings (`/admin/offerings`)**: Full lifecycle management for Ritual Services (Homas, Pujas, Sevas) and Vedic Astrology Consultations. Includes status toggling (`Published`, `Draft`, `Archived`), custom slugs, image selection, and full rich-text descriptions.
3. **Workshops & Batches (`/admin/workshops`)**: Physical and online workshop management. Features multi-batch timing configuration, venue address management, pricing (₹), and payment gateway triggers.
4. **Classes (`/admin/classes`)**: Chanting courses and ritual learning tracks (e.g. Advanced Rudram, Daily Sandhyavandana). Supports Online, Offline, and Hybrid learning modes.
5. **Courses (`/admin/courses`)**: Comprehensive long-form structured courses (e.g., Jyotish Praveena, Vastu Shastra). Features 1-click WhatsApp Broadcast capabilities to active students.
6. **Live Events (`/admin/live-events`)**: Special event streaming and Online Sankalpa registration (e.g., Mahashivaratri Grand Night, Sharada Navratri Chandi Homa).
7. **Blog Articles (`/admin/blogs`)**: Publishing suite for spiritual guides, Vedic wisdom articles, and news releases under author attribution.
8. **Photo & Video Gallery (`/admin/gallery`)**: High-resolution image and video album curation grouped by category (Rituals, Events, Poojas).
9. **Centralized Media Library (`/admin/media`)**: Single repository for asset storage. Once an image is uploaded or registered, administrators can re-use it across Offerings, Workshops, Blogs, and Gallery items via a 1-click Media Picker.
10. **FAQ Management (`/admin/faq`)**: Q&A knowledgebase editor categorized by service types.
11. **Enquiries & Registrations (`/admin/enquiries`)**: Central hub for incoming visitor ritual requests, astrology consultation bookings, and paid workshop registrations.
12. **Client Reviews (`/admin/reviews`)**: Moderation queue for client testimonials with status toggling (`Pending`, `Approved`, `Rejected`).
13. **Accepted Schedule (`/admin/accepted`)**: Calendar view of confirmed consultations, scheduled homas, and active workshops.
14. **Settings (`/admin/settings`)**: Master site configuration including Hero & Branding titles, Contact details, WhatsApp API credentials, Razorpay Keys, UPI QR setup, and Legal Policy text (Privacy, Terms, Refund).

---

## 3. Key Operational Workflows & Rules

### A. Automatic Workshop Seat Decrementing Rule
- When a visitor completes a workshop registration and payment via Razorpay:
  1. The system verifies payment success.
  2. A registration record is saved.
  3. **Remaining seat capacity for that specific batch automatically decrements by 1.**
  4. When seat count reaches `0`, the frontend automatically locks registration and displays **"Batch Full"**.

### B. WhatsApp Cloud API Keyword Automation
Administrators receive real-time WhatsApp notifications for new visitor enquiries. Replying directly via WhatsApp using keyword triggers performs automated backend actions:

| WhatsApp Keyword | Action Executed by System |
| :--- | :--- |
| **`Confirm`** | Updates status to `Confirmed`, generates Google Calendar event, dispatches calendar invite & WhatsApp confirmation to visitor. |
| **`Reject`** | Updates status to `Rejected`, sends polite unavailability message via WhatsApp to visitor. |
| **`Contact`** | Updates status to `Contacted`, sends note to visitor that Shri Pradeep Nadig will reach out shortly. |

---

## 4. Operational Best Practices & Safety Rules

1. **Re-use Media Assets**: Always upload logos, banners, and ritual pictures to the **Media Library** first before assigning them to offerings or workshops.
2. **Never Edit Production DB Directly**: Perform all content updates through the Admin CMS interface.
3. **Verify Payment Credentials**: Ensure Razorpay Key ID and Secret are set to Live keys only in production `.env`.
