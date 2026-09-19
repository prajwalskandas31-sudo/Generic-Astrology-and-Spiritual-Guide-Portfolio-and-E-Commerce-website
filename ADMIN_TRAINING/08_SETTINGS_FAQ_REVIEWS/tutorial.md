# Tutorial 8: Managing FAQ, Client Reviews & General Site Settings

## Overview & Objective
Learn how to curate public FAQs, moderate client testimonials/reviews, configure Hero branding, update WhatsApp & Contact details, and set up Razorpay payment integration and legal policies.

---

## Prerequisites
- Administrator portal access (`/admin/faq`, `/admin/reviews`, `/admin/settings`).
- Razorpay Key ID/Secret, WhatsApp Business API credentials, and Meta Token.

---

## Spoken Narration Script (NotebookLM Narration)

"In this tutorial, we will cover public FAQ management, customer review moderation, and overall site configuration.

Click FAQ in the sidebar menu. Here you can organize expandable question-and-answer pairs displayed on your public website. Click Add FAQ Item to add new questions categorized under Services or Consultations.

Next, navigate to Client Reviews. This section acts as a moderation queue for visitor testimonials. Each review displays the client's name, rating, city, and submitted comment. Use the status buttons to approve or reject reviews before they appear publicly.

Finally, open Settings in the admin sidebar. The Settings page is divided into six specialized operational panels:

First, Hero & Branding Settings allows you to update site main titles and subtitles without touching code.

Second, Contact & WhatsApp Information lets you edit public contact numbers, WhatsApp numbers, email addresses, and physical office locations.

Third, WhatsApp Business API & Coexistence allows you to manage Meta Embedded Signup tokens and test trial WhatsApp notification dispatchers.

Fourth, Payment Gateway & UPI Setup provides fields to configure your Razorpay Key ID, Secret, and Custom UPI QR Code details.

Fifth, Google Calendar API Integration shows calendar sync status.

And sixth, Legal Pages Content allows you to edit text for Privacy Policy, Terms & Conditions, and Refund Policy pages. Always click Save All Settings to apply your changes live."

---

## Visual Storyboard (NotebookLM Mapping)

### SCENE 1
**SCREENSHOT:** `screenshots/01-settings-panel.png`  
**VISUAL DESCRIPTION:** The main Settings panel showing tabbed sections for Branding, Contact Info, WhatsApp Business API credentials, Razorpay Keys, and Legal Policies with Save All Settings button.  
**KEY UI ELEMENT:** Save All Settings Button & API Configuration Tabs  
**NARRATION:** "Finally, open Settings in the admin sidebar. The Settings page is divided into six specialized operational panels..."

---

## Common Errors & Troubleshooting

| Problem | Cause | Recommended Action |
| :--- | :--- | :--- |
| **Settings changes not reflecting on site** | Forgotten to click Save All Settings. | Re-open settings panel, ensure fields are updated, and click Save All Settings. |
| **Razorpay modal does not trigger on checkout** | Test keys used in production or key secret empty. | Verify Live Razorpay Key ID (`rzp_live_...`) and secret under Payment Gateway settings. |

---

## YouTube Metadata & Publishing Specs

- **YouTube Title**: Managing FAQ, Client Reviews & Site Settings | Veda Brahma Shri Pradeep Nadig CMS
- **Description**: Guide to moderating reviews, managing FAQs, and updating site branding, payment credentials, and legal policies.
- **Chapters**:
  - `00:00` FAQ Category Management
  - `00:50` Customer Review Moderation Queue
  - `01:45` Hero Branding & Contact Details Setup
  - `02:40` Razorpay Payment Gateway & WhatsApp API Credentials
- **Suggested Thumbnail Text**: SETTINGS & REVIEWS CMS
- **Keywords**: site settings cms, review moderation, razorpay integration, pradeep nadig
- **Playlist**: Core Administration & Setup
