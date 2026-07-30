# 02_BUILD_GUIDE.md

# Build Guide

Version: 1.0

Purpose: Implementation guide for AI coding agents and developers.

This document defines HOW the application must be built.

The project specification (01_PROJECT_SPEC.md) defines WHAT must be built.

---

# 1. Technology Stack

## Frontend

- Next.js 15+
- App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query

---

## Backend

- FastAPI
- Python 3.12+
- SQLAlchemy
- Pydantic

---

## Database

PostgreSQL

---

## Authentication

Admin Authentication

Preferred:

Supabase Auth

Alternative:

JWT Authentication

Public users do not require login.

---

## Storage

Supabase Storage

Used for

- Images
- Gallery
- Blog Covers
- Workshop Images
- Documents

---

## Integrations

- WhatsApp Business Cloud API
- Razorpay
- Google Calendar API
- Email Provider (Optional)

---

# 2. Project Structure

Frontend

```
app/
components/
features/
hooks/
lib/
services/
types/
styles/
public/
```

Backend

```
app/
    api/
    models/
    schemas/
    services/
    repositories/
    integrations/
    utils/
    core/
```

---

# 3. Frontend Pages

Public

```
/

services

services/[slug]

consultations/[slug]

workshops

workshops/[slug]

classes

blogs

blogs/[slug]

gallery

faq

contact

privacy-policy

terms-and-conditions

refund-policy

cancellation-policy

cookie-policy
```

Admin

```
/admin/login

/admin

/admin/offerings

/admin/workshops

/admin/classes

/admin/blogs

/admin/gallery

/admin/faq

/admin/enquiries

/admin/settings
```

---

# 4. Reusable Components

Navigation

Footer

Hero

Page Header

Section Title

Cards

Buttons

Badges

Forms

Input Fields

Dropdowns

Text Areas

Modals

Toast Notifications

Image Upload

Rich Text Editor

Gallery Grid

Blog Card

Workshop Card

FAQ Accordion

Loading Spinner

Empty State

Pagination

Confirmation Dialog

---

# 5. Shared Layout

Every public page should reuse:

Navigation

↓

Page Content

↓

Contact CTA

↓

Footer

Do not duplicate layouts.

---

# 6. Styling Rules

Primary colours should follow the approved branding.

Typography must remain consistent.

Spacing should follow an 8-point system.

Rounded corners should remain consistent.

Animations should be minimal.

Mobile-first responsive design.

---

# 7. Images

Optimise every uploaded image.

Generate thumbnails where required.

Lazy load images.

Use modern image formats where possible.

---

# 8. Database Tables

offerings

workshops

workshop_batches

classes

blogs

gallery_albums

gallery_items

faq

enquiries

workshop_registrations

settings

admins

---

# 9. API Structure

Offerings

```
GET

POST

PUT

DELETE
```

Workshops

```
GET

POST

PUT

DELETE
```

Workshop Registration

```
POST Register

POST Verify Payment
```

Blogs

```
GET

POST

PUT

DELETE
```

Gallery

```
GET

POST

PUT

DELETE
```

FAQ

```
GET

POST

PUT

DELETE
```

Enquiries

```
POST Create

GET List

GET Detail

PUT Update
```

Settings

```
GET

PUT
```

---

# 10. Form Validation

Validate

Required fields

Email

Phone Number

Address

PIN Code

Dropdown selections

Prevent empty submissions.

Return friendly validation messages.

---

# 11. WhatsApp Service

Responsibilities

Send

Enquiry Received

Registration Success

Reminder

Confirmation

Cancellation

Forward Admin Replies

Admin keywords

Confirm

Reject

Contact Manually

Any other reply is forwarded directly.

---

# 12. Google Calendar

Create events for

Consultations

Appointments

Workshops

Event contains

Title

Description

Date

Time

Location

Invitees

---

# 13. Razorpay

Workflow

Create Order

↓

Complete Payment

↓

Verify Signature

↓

Store Registration

↓

Send Confirmation

Never trust frontend payment success.

Always verify on backend.

---

# 14. Admin Dashboard

Simple navigation.

No unnecessary analytics.

Dashboard should display

Recent Enquiries

Upcoming Workshops

Latest Registrations

Recent Blogs

Quick Actions

---

# 15. Content Editors

Offerings

Rich Text

Images

SEO Fields

---

Blogs

Rich Text

Cover Image

Tags

SEO Fields

---

Gallery

Album

Upload

Caption

Sort Order

---

FAQ

Question

Answer

Category

---

# 16. Settings

Editable

Site Name

Logo

Contact Numbers

WhatsApp Number

Email

Address

Social Links

Google Maps Link

Footer Text

Legal Content

---

# 17. SEO

Generate

Sitemap

robots.txt

Canonical URLs

Open Graph Tags

Twitter Cards

Schema.org JSON-LD

Friendly URLs

Meta Tags

Alt Text

---

# 18. Performance

Use

Server Components wherever possible.

Client Components only when necessary.

Optimise bundle size.

Optimise images.

Prefetch internal routes.

Avoid unnecessary re-renders.

---

# 19. Security

Protect Admin Routes.

Sanitise user input.

Rate limit public forms.

Validate uploads.

Protect API endpoints.

Store secrets in environment variables.

Never expose credentials.

---

# 20. Environment Variables

Frontend

```
NEXT_PUBLIC_API_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Backend

```
DATABASE_URL

SUPABASE_SERVICE_KEY

JWT_SECRET

WHATSAPP_TOKEN

WHATSAPP_PHONE_ID

RAZORPAY_KEY_ID

RAZORPAY_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_REFRESH_TOKEN

SMTP_HOST

SMTP_PORT

SMTP_USER

SMTP_PASSWORD
```

---

# 21. Error Handling

Handle

404

500

Validation Errors

Payment Failure

API Failure

Missing Records

Display user-friendly messages.

Log server errors.

---

# 22. Logging

Log

API Errors

Payment Events

WhatsApp Events

Calendar Events

Authentication Events

Unexpected Exceptions

---

# 23. Deployment

Frontend

Vercel

Backend

Render / Railway / VPS

Database

Supabase PostgreSQL

Storage

Supabase Storage

Domain

Custom Domain

HTTPS

Mandatory

---

# 24. Backup

Regular database backups.

Media stored safely.

Ability to restore production database.

---

# 25. Testing Checklist

Home Page

Navigation

Forms

Offerings

Blogs

Gallery

FAQ

Workshop Registration

Payments

Calendar

WhatsApp

Admin Dashboard

Mobile Responsiveness

SEO

Accessibility

---

# 26. Build Order

Phase 1

Project Setup

Database

Authentication

Basic Layout

---

Phase 2

Homepage

Navigation

Footer

Legal Pages

---

Phase 3

Offerings

Classes

Blogs

Gallery

FAQ

---

Phase 4

Workshop Module

Batch Management

Registration

Payments

Calendar

---

Phase 5

WhatsApp Integration

Notifications

Admin Reply Workflow

---

Phase 6

Admin Dashboard

Content Management

Settings

---

Phase 7

SEO

Testing

Bug Fixes

Deployment

---

# 27. Coding Standards

Use TypeScript everywhere.

Keep components small.

Prefer composition over duplication.

Reuse components.

Avoid hardcoded values.

Use constants.

Use enums where applicable.

Follow REST naming conventions.

Write clean, readable code.

Keep business logic in backend.

---

# 28. Definition of Done

The implementation is complete when:

✓ All pages from the specification exist.

✓ Navigation works correctly.

✓ Admin can manage all content.

✓ Forms validate correctly.

✓ Workshop registration works end-to-end.

✓ Razorpay payment verification works.

✓ WhatsApp notifications work.

✓ Google Calendar events are created successfully.

✓ Website is responsive.

✓ SEO essentials are implemented.

✓ Production deployment succeeds.

✓ No critical defects remain.

---

# 29. AI Coding Agent Instructions

When implementing this project:

- Follow `01_PROJECT_SPEC.md` as the functional source of truth.
- Follow this document for implementation decisions.
- Do not introduce features not defined in the specification.
- Prefer reusable components over duplicate implementations.
- Keep the UI simple, responsive, and accessible.
- Build incrementally in the order defined above.
- Ensure every completed feature is production-ready before moving to the next.
- If a requirement is ambiguous, choose the simplest implementation that satisfies the specification rather than adding complexity.

---

End of File