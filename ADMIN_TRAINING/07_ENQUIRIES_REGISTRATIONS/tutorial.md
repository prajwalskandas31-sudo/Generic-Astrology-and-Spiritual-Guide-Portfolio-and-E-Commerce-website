# Tutorial 7: Enquiries, Registrations & WhatsApp Automation Workflow

## Overview & Objective
Learn how to manage incoming visitor service/consultation enquiries, inspect paid workshop participant registrations, update status badges, and utilize WhatsApp Cloud API reply keywords (`Confirm`, `Reject`, `Contact`).

---

## Prerequisites
- Administrator portal access (`/admin/enquiries`).
- Configured WhatsApp Cloud API Webhook and token settings (`/admin/settings`).

---

## Spoken Narration Script (NotebookLM Narration)

"Welcome to the Enquiries, Registrations, and WhatsApp Automation tutorial. This core module manages all incoming visitor requests and payment transactions.

Navigate to Enquiries & Regs from the admin sidebar. Across the top, you'll find filter tabs: Active Requests, Rejected & Cancelled, Completed / Archived, and Workshop Registrations. You can also filter by category or search by customer name, phone number, or Gothra using the real-time search bar.

On the Active Requests tab, each card details the visitor's name, mobile number, city, requested service or consultation category, and current operational status.

To update an enquiry status directly from the web panel, click the status dropdown and select New, Contacted, Confirmed, Completed, or Rejected.

Now, let's explore the powerful WhatsApp Cloud API Automation Workflow. Whenever a visitor submits an enquiry on your site, an instant notification is sent to your personal admin WhatsApp number.

You can manage the enquiry directly from your phone without opening the admin panel by replying with keyword triggers:

Replying 'Confirm' updates the enquiry status in your database to Confirmed, automatically creates a Google Calendar Event, dispatches a calendar invitation, and sends a WhatsApp confirmation message to the visitor.

Replying 'Reject' updates the status to Rejected and sends a polite unavailability message to the visitor.

Replying 'Contact' updates the status to Contacted and notifies the visitor that Shri Pradeep Nadig will call shortly.

Finally, clicking the Workshop Registrations tab displays paid participant registrations, complete with full mailing addresses, pin codes, and Razorpay transaction IDs."

---

## Visual Storyboard (NotebookLM Mapping)

### SCENE 1
**SCREENSHOT:** `screenshots/01-enquiries-list.png`  
**VISUAL DESCRIPTION:** The Enquiries & Workshop Registrations hub showing search bar, tab navigation (Active Requests, Rejected, Archived, Workshop Registrations), enquiry cards with status dropdowns and customer details.  
**KEY UI ELEMENT:** Status Dropdown Select & Search Bar  
**NARRATION:** "Navigate to Enquiries & Regs from the admin sidebar. Across the top, you'll find filter tabs..."

### SCENE 2
**SCREENSHOT:** `screenshots/02-whatsapp-automation-rule.png`  
**VISUAL DESCRIPTION:** Diagram of WhatsApp Cloud API keyword triggers table showing reply commands (`Confirm`, `Reject`, `Contact`) and their automated backend actions.  
**KEY UI ELEMENT:** WhatsApp Keyword Automation Triggers  
**NARRATION:** "Whenever a visitor submits an enquiry... an instant notification is sent to your admin WhatsApp number..."

---

## Common Errors & Troubleshooting

| Problem | Cause | Recommended Action |
| :--- | :--- | :--- |
| **WhatsApp reply keywords do not execute backend actions** | Webhook URL mismatch or `WHATSAPP_VERIFY_TOKEN` incorrect. | Verify webhook endpoint `http://<your-domain>/api/v1/whatsapp/webhook` in Meta Developer Console. |
| **Google Calendar event not created on `Confirm`** | Google Calendar API service account credentials missing or expired. | Check Google Calendar API connection status under `/admin/settings`. |

---

## YouTube Metadata & Publishing Specs

- **YouTube Title**: Enquiry Management & WhatsApp Keyword Automation | Veda Brahma Shri Pradeep Nadig CMS
- **Description**: Learn how to manage customer ritual enquiries, track workshop registrations, and automate confirmations via WhatsApp reply keywords.
- **Chapters**:
  - `00:00` Enquiries Hub & Filter Tabs
  - `00:55` Updating Enquiry Statuses
  - `01:45` WhatsApp Cloud API Keyword Triggers (`Confirm`, `Reject`, `Contact`)
  - `03:00` Workshop Registrations & Payment Tracking
- **Suggested Thumbnail Text**: ENQUIRIES & WHATSAPP AUTOMATION
- **Keywords**: enquiry management, whatsapp automation, razorpay transaction tracking, pradeep nadig
- **Playlist**: Operations, Automation & Troubleshooting
