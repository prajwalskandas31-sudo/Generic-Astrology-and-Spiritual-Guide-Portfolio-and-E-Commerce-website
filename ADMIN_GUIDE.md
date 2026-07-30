# Admin User Guide & Operations Manual
## Veda Brahma Shri Pradeep Nadig Platform & Content Management System

Welcome to the **Admin Management Guide** for the Veda Brahma Shri Pradeep Nadig web platform. This guide provides full operational instructions, login credentials, CMS workflows, WhatsApp keyword automation rules, and media library instructions for administrators.

---

## 🔐 1. Admin Login Credentials & Access

### Access URLs
- **Local Development**: `http://localhost:3000/admin/login`
- **Production URL**: `https://<your-domain.com>/admin/login`

### Credentials

#### Development / Sandbox Credentials (Default)
- **Admin Email**: `admin@pradeepnadig.com` (or `admin@example.com`)
- **Password**: `admin123` (or any non-empty password in dev mode)
- **Mock Security Token**: `mock-admin-token`

#### Production Credentials (Supabase Auth)
For production, user authentication uses **Supabase Auth**.
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Go to **Authentication -> Users**.
3. Click **Add User** -> **Create User**.
4. Enter Admin Email (e.g. `pradeep@vedabrahma.com`) and set a secure password.
5. Log in at `/admin/login` with your created email and password.

---

## 📊 2. Admin Dashboard Overview (`/admin`)

The Admin Dashboard provides a real-time operational overview without distracting metrics or unnecessary charts:

1. **Quick Actions Bar**: Fast 1-click shortcuts to add offerings, create workshops, publish blog posts, or open the Centralized Media Library.
2. **Recent Enquiries**: Lists incoming visitor requests for ritual services and consultations with instant status badges (`New`, `Contacted`, `Confirmed`, `Rejected`).
3. **Upcoming Workshops**: Displays active workshops, venue details, and available batch capacity.
4. **Recent Registrations**: Shows paid participant registrations with Razorpay payment statuses.

---

## 🖼️ 3. Centralized Media Library (`/admin/media`)

Instead of uploading images separately everywhere, the platform uses a **Centralized Media Library**.

### How to Use:
1. Navigate to **Media Library** (`/admin/media`).
2. Enter an Asset Title (e.g. `Ganapathi Homa Banner`) and paste the Image URL or upload an asset.
3. Click **Upload / Register Asset**.
4. Click **Copy URL** on any card to copy the asset URL to your clipboard.
5. **Re-use Everywhere**: When creating or editing an Offering, Workshop, Blog, or Gallery item, click the **"Media Library"** button in any form to pick and select any uploaded image with one click.

---

## 🕉️ 4. Services & Consultations Management (`/admin/offerings`)

Manage ritual services (Homa, Puja, Sevas) and Vedic Astrology consultations.

### Steps to Create / Edit an Offering:
1. Navigate to **Offerings** (`/admin/offerings`) and click **Add New Offering**.
2. Select **Type**:
   - **Service**: For Homas, Pujas, and Rituals.
   - **Consultation**: For Horoscopes, Astrology, and Naming Guidance.
3. Enter **Title** (e.g., `Ganapathi Homa`).
4. Enter **Slug** (SEO-friendly URL path, e.g., `ganapathi-homa`). Public page will be at `/services/ganapathi-homa`.
5. Select a **Cover Image** using the Media Library picker button.
6. Provide **Short Description** and **Full Description**.
7. Set **Status**: `Published` (visible to public), `Draft` (hidden), or `Archived`.
8. Click **Save Offering**.

---

## 📅 5. Workshops & Batch Capacity (`/admin/workshops`)

Manage physical or online workshops, batch timings, pricing, venue addresses, and seat availability.

### Creating a Workshop:
1. Navigate to **Workshops** (`/admin/workshops`) and click **Create New Workshop**.
2. Set **Title**, **Slug** (e.g., `vedic-chant-mastery-august-2026`), **Price (₹)**, and **Venue Address**.
3. Set **Start Date** and **End Date**.
4. Configure **Initial Batch**:
   - **Batch Name**: e.g., `Morning Batch (7:00 AM - 10:00 AM)`
   - **Batch Capacity**: e.g., `30 Seats`
5. Click **Save Workshop**.

### ⚠️ Automatic Seat Decrementing Rule:
When a visitor registers and completes a successful Razorpay payment:
1. Payment succeeds (`Payment Success`).
2. Workshop registration is logged (`Registration`).
3. **Available seats are automatically decremented** by 1.
4. When remaining seats reach `0`, registration for that batch automatically closes and displays **"Batch Full"**.

---

## 🎓 6. Classes Management (`/admin/classes`)

Manage structured chanting courses and ritual learning tracks.

1. Navigate to **Classes** (`/admin/classes`).
2. Click **Add New Class**.
3. Enter **Class Name**, **Duration** (e.g. `3 Months`), **Suitable For** (e.g. `Beginners & Advanced`), and **Mode** (`Online`, `Offline`, or `Hybrid`).
4. Click **Save Class**.

---

## ✍️ 7. Blog CMS & Articles (`/admin/blogs`)

Publish spiritual articles, news, and Vedic guides.

1. Navigate to **Blogs** (`/admin/blogs`).
2. Click **Publish New Post**.
3. Fill in **Title**, **Slug** (e.g. `significance-of-sandhyavandana`), **Author** (`Veda Brahma Shri Pradeep Nadig`), **Category**, and **Content**.
4. Select a **Cover Image** via Media Library picker.
5. Click **Save & Publish Post**.

---

## 🖼️ 8. Photo & Video Gallery (`/admin/gallery`)

Manage high-resolution photo and video albums.

1. Navigate to **Gallery** (`/admin/gallery`).
2. Click **Add Gallery Item**.
3. Provide **Title**, **Category** (e.g. `Rituals`, `Events`), and select **Media URL** from Media Library.
4. Click **Save Gallery Item**.

---

## ❓ 9. FAQ Management (`/admin/faq`)

Manage expandable questions and answers displayed on the public FAQ page.

1. Navigate to **FAQ** (`/admin/faq`).
2. Click **Add FAQ Item**.
3. Enter **Category**, **Question**, and **Answer**.
4. Click **Save FAQ**.

---

## 📩 10. Enquiries & Workshop Registrations (`/admin/enquiries`)

Inspect all incoming visitor requests and payment transactions.

- **Visitor Enquiries Tab**: View names, mobile numbers, requested service/consultation categories, cities, and current status (`New`, `Contacted`, `Confirmed`, `Completed`, `Rejected`).
- **Status Updater**: Change any enquiry status directly from the dropdown.
- **Workshop Registrations Tab**: View paid participant registrations, full mailing addresses, pin codes, and Razorpay transaction IDs.

---

## 📱 11. WhatsApp Cloud API & Admin Reply Workflow

When a visitor submits an enquiry on the website, a notification is sent to the Admin's WhatsApp number. The Admin can reply directly via WhatsApp using keyword triggers:

| Reply Keyword | Action Executed by System |
| :--- | :--- |
| **`Confirm`** | 1. Updates enquiry status in DB to **`Confirmed`**.<br>2. Automatically creates a **Google Calendar Event**.<br>3. Dispatches Calendar invitation to visitor & admin.<br>4. Sends WhatsApp confirmation message to visitor. |
| **`Reject`** | 1. Updates enquiry status in DB to **`Rejected`**.<br>2. Sends polite unavailability message to visitor via WhatsApp. |
| **`Contact Manually`** | 1. Updates enquiry status in DB to **`Contacted`**.<br>2. Sends notification to visitor that Shri Pradeep Nadig will call shortly. |
| *(Any custom text)* | Forwards the custom message text directly to the visitor's WhatsApp number. |

---

## ⚙️ 12. General Site Settings (`/admin/settings`)

Update website text and legal content without writing code:

- **Hero & Branding**: Edit Site Title, Hero Main Title, and Subtitle text.
- **Contact & WhatsApp**: Edit Mobile Contact Number, WhatsApp Digits, Email Address, and Physical Office Address.
- **Legal Policy Pages**: Update text for Privacy Policy, Terms & Conditions, and Refund Policy pages.
- Click **Save All Settings** to apply changes live to the public website immediately.

---

## ❓ Troubleshooting & Support

- **Forgot Admin Password?**: Reset via Supabase Auth Dashboard -> Users -> Send Password Reset Email.
- **Image Link Broken?**: Ensure image URLs start with `https://` and are accessible publicly. Use the **Media Library** for best results.
- **WhatsApp Webhook Disconnected?**: Verify `WHATSAPP_TOKEN` and `WHATSAPP_VERIFY_TOKEN` in your backend server `.env` file.
