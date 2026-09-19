# Tutorial 1: Admin Dashboard Overview & Operational Controls

## Overview & Objective
Learn how to access the **Veda Brahma Shri Pradeep Nadig Admin Portal**, interpret real-time metric cards, navigate the sidebar, and utilize Quick Action shortcuts to perform common management tasks in seconds.

---

## Prerequisites
- Operational web browser (Chrome, Edge, Safari, Firefox).
- Admin credentials (`admin@pradeepnadig.com` or Supabase Auth login).
- Active internet connection to connect to backend service on port 8000 / production database.

---

## Spoken Narration Script (NotebookLM Narration)

"Welcome to the Administrator Training Series for the Veda Brahma Shri Pradeep Nadig platform. In this tutorial, we will walk you through the Admin Dashboard, which serves as your central command center.

To access the portal, open your browser and navigate to the admin login page. Enter your registered email address and secure password, then click Sign In.

Once authenticated, you will immediately land on the Admin Dashboard. Across the top of the screen, you'll see six color-coded metric cards representing your operational categories: Services, Consultations, Workshops, Classes, Courses, and Live Events. Clicking any card instantly filters your incoming enquiries and registrations.

Directly below the metrics is the Quick Actions bar. Here, single-click buttons allow you to create new ritual offerings, schedule upcoming workshops, publish blog articles, or access the Centralized Media Library without clicking through multiple menus.

Further down the page, three primary monitoring panels display live activity: Recent Enquiries from site visitors, Upcoming Workshops with batch pricing details, and Recent Registrations showing payment status tags.

On the left side of your screen, the persistent dark amber sidebar provides direct navigation to all CMS sections, including Offerings, Workshops, Gallery, Client Reviews, and Settings. Whenever you finish your administrative session, click the Sign Out button at the bottom of the sidebar to secure your portal."

---

## Visual Storyboard (NotebookLM Mapping)

### SCENE 1
**SCREENSHOT:** `screenshots/01-admin-dashboard.png`  
**VISUAL DESCRIPTION:** The main Admin Dashboard overview showing top header text, six colorful metric cards (Services, Consultation, Workshops, Classes, Courses, Live Events), Quick Actions bar, and 3-column operational layout.  
**KEY UI ELEMENT:** Quick Actions Bar & Top Metrics Cards  
**NARRATION:** "Once authenticated, you will immediately land on the Admin Dashboard. Across the top of the screen, you'll see six color-coded metric cards..."

---

## Common Errors & Troubleshooting

| Problem | Cause | Recommended Action |
| :--- | :--- | :--- |
| **Dashboard fails to load ("Loading Admin Dashboard...")** | Backend API connection timed out or is offline. | Verify python backend server is running (`http://127.0.0.1:8000`) and check internet connection. |
| **Logged out automatically** | Bearer token expired or cleared from local storage. | Re-authenticate at `/admin/login`. |

---

## YouTube Metadata & Publishing Specs

- **YouTube Title**: How to Navigate the Admin Dashboard | Veda Brahma Shri Pradeep Nadig CMS
- **Description**: Comprehensive overview of the Admin Dashboard metrics, quick shortcuts, and operational panels.
- **Chapters**:
  - `00:00` Introduction & Login
  - `00:45` Overview Metrics & Category Counters
  - `01:30` Quick Actions Bar Shortcuts
  - `02:15` Enquiries, Workshops & Registrations Panels
- **Suggested Thumbnail Text**: ADMIN DASHBOARD GUIDE
- **Keywords**: admin dashboard, cms tutorial, pradeep nadig admin, website management
- **Playlist**: Core Administration & Setup
