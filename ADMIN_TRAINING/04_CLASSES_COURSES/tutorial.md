# Tutorial 4: Managing Structured Classes & Vedic Courses

## Overview & Objective
Learn how to manage ongoing chanting classes, set up long-form structured courses (e.g., Jyotish Praveena, Vastu Shastra), configure learning modes (Offline/Online/Hybrid), and trigger WhatsApp Student Broadcasts.

---

## Prerequisites
- Administrator portal access (`/admin/classes` and `/admin/courses`).
- Course curriculum, learning duration, and fee structure.
- Active WhatsApp Cloud API token configured in settings for student broadcasts.

---

## Spoken Narration Script (NotebookLM Narration)

"In this tutorial, we will explore the management of structured chanting classes, long-term courses, and live spiritual events.

From the sidebar navigation, click on Classes to manage daily or weekly group chanting sessions such as Advanced Rudram Chanting or Sandhyavandana classes. Click Add New Class to open the creation modal, where you can specify the Class Name, Mode—selecting Offline, Online, or Hybrid—Duration, Target Audience, and Payment Fee details.

Next, navigate to Courses in the admin sidebar. Here you will find long-form certification tracks, including Jyotish Praveena, Prashna Marga, and Vastu Shastra. Each course card displays its active status, duration, fee, and payment gateway integration state.

A powerful feature on the Courses page is the WhatsApp Broadcast button on each card. Clicking WhatsApp Broadcast opens an instant message dispatcher, allowing you to send class updates, Zoom links, or study material directly to enrolled students on WhatsApp.

Finally, the Live Events section allows you to manage special online sankalpa events like Mahashivaratri Grand Night or Navratri Chandi Homa, complete with live stream links and registration passes."

---

## Visual Storyboard (NotebookLM Mapping)

### SCENE 1
**SCREENSHOT:** `screenshots/01-classes-list.png`  
**VISUAL DESCRIPTION:** The Classes admin interface listing courses such as "Advanced Rudram & Chamakam Chanting" (Offline) and "Daily Sandhyavandana & Mantras" (Hybrid) with Add New Class button.  
**KEY UI ELEMENT:** Add New Class Button & Mode Badges  
**NARRATION:** "From the sidebar navigation, click on Classes to manage daily or weekly group chanting sessions..."

### SCENE 2
**SCREENSHOT:** `screenshots/02-courses-list.png`  
**VISUAL DESCRIPTION:** The Courses admin grid showing 9 structured courses (Jyotish Praveena, Vastu Shastra, etc.) with WhatsApp Broadcast buttons, Payment Active badges, Edit and Delete controls.  
**KEY UI ELEMENT:** WhatsApp Broadcast Button & Fee Status  
**NARRATION:** "Next, navigate to Courses... A powerful feature on the Courses page is the WhatsApp Broadcast button..."

### SCENE 3
**SCREENSHOT:** `screenshots/03-live-events-list.png`  
**VISUAL DESCRIPTION:** Live Events panel displaying active live stream events (Mahashivaratri, Surya Grahan Pooja) with mode tags and pass fee indicators.  
**KEY UI ELEMENT:** Mode Badge & Live Stream Link  
**NARRATION:** "Finally, the Live Events section allows you to manage special online sankalpa events..."

---

## Common Errors & Troubleshooting

| Problem | Cause | Recommended Action |
| :--- | :--- | :--- |
| **WhatsApp Broadcast fails to send** | `WHATSAPP_TOKEN` or Phone ID invalid in backend server `.env`. | Verify token validity under `/admin/settings` -> WhatsApp Business API tab. |
| **Class mode not reflecting on website** | Unsaved changes in form. | Re-open editor, select proper mode dropdown, and click Save Class. |

---

## YouTube Metadata & Publishing Specs

- **YouTube Title**: Managing Vedic Classes, Certification Courses & Live Broadcasts | Veda Brahma Shri Pradeep Nadig CMS
- **Description**: Guide to setting up chanting classes, managing long-term Vedic courses, and sending WhatsApp broadcasts to students.
- **Chapters**:
  - `00:00` Managing Chanting Classes
  - `01:10` Configuring Vedic Certification Courses
  - `02:15` WhatsApp Student Broadcast Workflow
  - `03:20` Live Streaming Events & Sankalpa Setup
- **Suggested Thumbnail Text**: CLASSES & COURSES CMS
- **Keywords**: chanting classes cms, vedic astrology course, whatsapp broadcast, pradeep nadig
- **Playlist**: Events & Education Management
