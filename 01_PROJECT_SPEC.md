# 01_PROJECT_SPEC.md

# Project Specification

Version: 1.0
Status: Approved
Purpose: Single source of truth for building the Portfolio + Workshop + Enquiry Management website for Veda Brahma Shri Pradeep Nadig.

---

# 1. Project Overview

Build a modern, responsive, SEO-friendly portfolio website that showcases Mr. Pradeep, his services, consultations, workshops, classes, blogs and gallery.

The website's primary objective is to convert visitors into enquiries and workshop registrations.

This is NOT a traditional e-commerce website.

There are:

- No user accounts
- No shopping cart
- No product inventory
- No order history

The website revolves around enquiries, registrations and communication.

---

# 2. Primary Goals

- Showcase Mr. Pradeep professionally.
- Allow visitors to explore all offerings.
- Allow workshop registrations.
- Allow service and consultation requests.
- Allow class enquiries.
- Integrate WhatsApp communication.
- Integrate Google Calendar.
- Support Razorpay workshop payments.
- Provide a simple admin dashboard.

---

# 3. User Roles

## Visitor

Can

- Browse pages
- Read blogs
- View gallery
- Register for workshops
- Request consultations
- Request services
- Send enquiries
- Contact Mr. Pradeep

---

## Admin

Can

- Login
- Manage content
- Manage offerings
- Manage workshops
- Manage blogs
- Manage gallery
- Manage FAQ
- View enquiries
- Manage website settings

No additional roles are required.

---

# 4. Public Navigation

The following navigation remains visible across every public page.

- About
- Services & Consultations
- Workshops
- Classes
- Blogs
- Gallery
- FAQ
- Contact

Active page should be highlighted.

About always redirects to Home.

---

# 5. Home Page

Sections

1. Hero

Contains

- Title
- Subtitle
- Background image
- Optional CTA

Example title

Veda Brahma Shri Pradeep Nadig

---

2. Navigation Buttons

Horizontal navigation buttons displayed immediately below the hero.

These buttons remain identical throughout the public website.

---

3. About Mr. Pradeep

Contains

- Biography
- Introduction
- Experience
- Achievements
- Images

---

4. Contact CTA

Encourages users to contact Mr. Pradeep.

Primary action

WhatsApp

Secondary actions

Call

Email

---

5. Footer

Contains legal pages and copyright.

---

# 6. Services & Consultations

Single page.

Displayed in two columns.

Column One

Services

Column Two

Consultations

Each item opens its own detail page.

---

# 7. Service Detail Page

Contains

- Title
- Images
- Description
- Benefits
- Optional FAQ
- Contact CTA
- Request Service button

---

# 8. Consultation Detail Page

Contains

- Title
- Images
- Description
- Benefits
- Optional FAQ
- Contact CTA
- Request Consultation button

---

# 9. Common Enquiry Form

One reusable enquiry form.

Fields

- Full Name
- Mobile Number
- Email (optional)
- City
- Type
- Category
- Additional Notes

Type values

- Service
- Consultation
- Class Enquiry

Category is selected using a dropdown.

If the user opened the form from a detail page, Category may already be pre-selected.

---

# 10. Classes

The Classes page contains

- Overview
- Available Classes
- Description
- Duration
- Eligibility
- Contact CTA
- Class Enquiry Button

---

# 11. Class Enquiry Form

Fields

- Full Name
- Mobile Number
- Email (optional)
- City
- Class
- Additional Notes

No preferred date or preferred time is required.

---

# 12. Workshops

Workshop Listing page displays

- Upcoming workshops
- Completed workshops
- Workshop cards

Each workshop opens a detail page.

---

# 13. Workshop Detail Page

Contains

- Cover Image
- Description
- Venue
- Duration
- Date
- Time
- Price
- Available Batches
- Register Button

---

# 14. Workshop Registration Form

Fields

- Full Name
- Mobile Number
- Email (optional)
- Full Address (Mandatory)
- City
- State
- PIN Code
- Workshop
- Batch
- Additional Notes

Workshop selection

If only one workshop is available, pre-select it.

If multiple workshops exist, allow user selection.

Batch selection

If one batch exists

Automatically select it.

If multiple batches exist

Display a dropdown.

---

# 15. Workshop Registration Flow

Visitor

↓

Open Workshop

↓

Read Details

↓

Click Register

↓

Complete Registration Form

↓

Pay using Razorpay

↓

Payment Successful

↓

Registration Stored

↓

WhatsApp Confirmation Sent

↓

Google Calendar Invite Created

↓

Workshop Completed

Payment is mandatory before registration is confirmed.

---

# 16. Contact

Every public page includes a visible Contact CTA.

Primary option

WhatsApp

Secondary options

- Call
- Email

---

# 17. Blogs

Contains

- Blog Listing
- Categories
- Individual Blog Pages

Every blog includes

- Title
- Cover Image
- Author
- Date
- Content
- Related Blogs

---

# 18. Gallery

Supports

- Images
- Videos (optional)

Gallery items can be grouped into albums.

---

# 19. FAQ

Simple searchable FAQ page.

Questions displayed as expandable accordions.

---

# 20. Legal Pages

Separate pages

- Privacy Policy
- Terms & Conditions
- Refund Policy
- Cancellation Policy
- Cookie Policy

Each page includes

- Title
- Content
- Back to Home button

Navigation menu is not required on legal pages.

---

# 21. Contact Workflow

Visitor

↓

Clicks Contact

↓

Chooses WhatsApp

↓

WhatsApp Chat Opens

Call and Email remain optional alternatives.

---

# 22. Service / Consultation Workflow

Visitor

↓

Opens Offering

↓

Clicks Request

↓

Completes Form

↓

Enquiry Saved

↓

WhatsApp Notification Sent to Admin

↓

Acknowledgement Sent to Visitor

↓

Admin Replies from WhatsApp

The backend interprets predefined keywords such as:

- Confirm
- Contact Manually
- Reject

Any other message is forwarded directly to the visitor.

If "Confirm" is used and a meeting is applicable:

- Create Google Calendar event
- Invite both parties
- Notify visitor via WhatsApp

If "Contact Manually" is used:

- Notify visitor that Mr. Pradeep will contact them directly.
- Include contact details.

If "Reject" is used:

- Send a polite rejection message.

---

# 23. Admin Dashboard Modules

- Dashboard
- Offerings
- Workshops
- Classes
- Blogs
- Gallery
- FAQ
- Enquiries
- Settings

The interface must remain simple and suitable for non-technical users.
---

# 24. Content Management

All website content must be editable through the Admin Dashboard.

Admin should be able to Create, Edit, Publish, Unpublish and Delete:

- Offerings
- Workshops
- Classes
- Blogs
- Gallery Albums
- Gallery Media
- FAQ
- Hero Content
- About Section
- Homepage Images
- Contact Details
- Footer Content
- Legal Pages

No code changes should be required for content updates.

---

# 25. Offerings

Offerings represent both Services and Consultations.

Each Offering contains:

- ID
- Type (Service | Consultation)
- Title
- Slug
- Short Description
- Full Description
- Images
- Display Order
- Status
- SEO Title
- SEO Description
- FAQ (Optional)

Status values

- Draft
- Published
- Archived

---

# 26. Workshops

Each workshop contains:

- Title
- Slug
- Cover Image
- Description
- Start Date
- End Date
- Venue
- Address
- Google Maps Link (Optional)
- Duration
- Price
- Capacity
- Registration Deadline
- Status
- Featured Flag
- SEO Title
- SEO Description

Status

- Draft
- Published
- Completed
- Archived

---

# 27. Workshop Batches

Every workshop supports one or more batches.

Each batch contains:

- Batch Name
- Start Time
- End Time
- Capacity
- Remaining Seats
- Status

If only one batch exists:

Automatically select it during registration.

---

# 28. Classes

Each class contains:

- Name
- Description
- Duration
- Suitable For
- Mode (Online / Offline / Hybrid)
- Status

---

# 29. Blogs

Each blog contains:

- Title
- Slug
- Cover Image
- Author
- Publish Date
- Category
- Tags
- Content
- SEO Title
- SEO Description

---

# 30. Gallery

Gallery supports

- Albums
- Images
- Videos (Optional)

Each item contains

- Title
- Description
- Media
- Category
- Display Order

---

# 31. FAQ

Each FAQ contains

- Question
- Answer
- Category
- Display Order

---

# 32. Enquiries

Every enquiry contains

- Enquiry ID
- Enquiry Type
- Name
- Mobile
- Email
- City
- Category
- Additional Notes
- Status
- Created At

Status values

- New
- Contacted
- Confirmed
- Completed
- Rejected

---

# 33. Workshop Registrations

Each registration stores

- Registration ID
- Workshop
- Batch
- Name
- Mobile
- Email
- Address
- City
- State
- PIN Code
- Payment Status
- Amount
- Transaction ID
- Registration Date

---

# 34. Contact Information

Editable through Admin.

Fields

- Mobile Number
- WhatsApp Number
- Email
- Office Address
- Google Maps Link
- Working Hours
- Social Media Links

---

# 35. WhatsApp Integration

The backend is responsible for:

- Sending enquiry notifications
- Sending acknowledgements
- Sending workshop confirmations
- Sending registration confirmations
- Sending reminder messages
- Forwarding admin replies

Messages should use predefined templates where possible.

---

# 36. Google Calendar Integration

Calendar events are created only when required.

Examples

- Consultation
- Service Visit
- Workshop

Each event should include

- Title
- Date
- Time
- Location
- Description

Both parties receive invitations.

---

# 37. Razorpay

Used only for workshop registrations.

Workflow

Registration

↓

Payment

↓

Verify Payment

↓

Store Registration

↓

Send Confirmation

No other payment flows are required.

---

# 38. Search Engine Optimisation

Every public page should support:

- SEO Title
- Meta Description
- Canonical URL
- Open Graph Image
- Structured Data
- Sitemap
- Robots.txt

Friendly URLs should be used throughout.

Examples

/services/ganapathi-homa

/workshops/vedic-chanting

/blogs/how-to-perform-sandhyavandana

---

# 39. Performance Requirements

The website should

- Load quickly
- Be mobile responsive
- Optimise images
- Lazy load media
- Cache static assets
- Minimise unnecessary requests

---

# 40. Accessibility

Follow accessibility best practices.

Include

- Keyboard navigation
- Proper headings
- Alt text
- Accessible forms
- Good colour contrast

---

# 41. Security

- Validate all inputs.
- Protect admin routes.
- Prevent spam submissions.
- Secure payment verification.
- Store sensitive configuration in environment variables.
- Never expose API secrets.

---

# 42. Error Handling

User-friendly messages should be displayed for

- Failed submissions
- Payment failures
- Invalid links
- Missing content
- Server errors

Internal errors must be logged.

---

# 43. Functional Requirements

The system must allow visitors to:

- View all public pages.
- Submit enquiries.
- Register for workshops.
- Complete workshop payments.
- Contact Mr. Pradeep.
- Read blogs.
- Browse galleries.
- Read FAQs.

The system must allow the admin to:

- Manage all website content.
- Manage enquiries.
- Manage workshop registrations.
- View payment records.
- Update legal pages.
- Update contact information.

---

# 44. Non-Functional Requirements

The application should be:

- Responsive
- Fast
- Secure
- SEO-friendly
- Easy to maintain
- Simple to operate
- Production-ready

---

# 45. Acceptance Criteria

The project is considered complete when:

✓ Home page matches the approved design.

✓ Navigation works across every page.

✓ Services and Consultations are fully manageable.

✓ Classes can receive enquiries.

✓ Workshops support registration, batches and payments.

✓ Workshop registrations generate successful confirmations.

✓ WhatsApp notifications are delivered.

✓ Google Calendar events are created where applicable.

✓ Blogs are manageable.

✓ Gallery is manageable.

✓ FAQs are manageable.

✓ Legal pages exist.

✓ Contact options work.

✓ Admin can manage all content without code changes.

✓ Website is mobile responsive.

✓ SEO essentials are implemented.

✓ Production deployment succeeds.

---

# 46. Out of Scope

The following are intentionally excluded:

- User registration/login
- Shopping cart
- Product inventory
- Coupon system
- Wishlist
- Reviews & Ratings
- Live Chat
- CRM
- Analytics Dashboard
- Multi-language support (Phase 1)
- AI chatbot

These can be considered in future versions if required.

---

# 47. Project Completion Definition

The project is complete when:

- All approved pages are implemented.
- All workflows function correctly.
- All forms submit successfully.
- Payments are verified.
- Notifications are delivered.
- Calendar integration works.
- Admin can independently manage the website.
- The application is deployed to production.
- No critical or high-severity defects remain.

---

End of File