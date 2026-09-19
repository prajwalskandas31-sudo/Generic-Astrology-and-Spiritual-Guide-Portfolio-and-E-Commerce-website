# Tutorial 2: Creating & Managing Workshops & Batch Seats

## Overview & Objective
Learn how to create physical and online workshops, configure pricing and Razorpay payment integration, manage batch capacity, and understand the automatic seat decrementing workflow.

---

## Prerequisites
- Administrator portal access (`/admin/workshops`).
- Workshop banner image URL or file uploaded in the Centralized Media Library.
- Venue address and batch timing details.

---

## Spoken Narration Script (NotebookLM Narration)

"In this tutorial, we will demonstrate how to set up and manage workshops on the platform.

From the Admin navigation menu, click on Workshops. Here you will see all existing workshops, including titles, registration fees, payment status tags, active venues, total batches, and remaining seat counts.

To create a new workshop, click the Create New Workshop button at the top right corner. A modal window will open. Start by filling in the Workshop Title, such as 'Vedic Chanting Mastery Workshop', and verify the auto-generated URL slug.

Next, choose your cover image using the integrated Media Library picker. In the Payment Setup section, toggle Paid Event on, enter the registration fee in Rupees, and select your payment method—either Razorpay Payment Gateway, Custom UPI QR Code, or Free Registration.

Fill in the Start Date, End Date, Venue Name, and physical address. Finally, configure your initial batch by specifying the batch name—for example, 'Morning Batch 7:00 AM to 10:00 AM'—and setting the seat capacity.

Click Save Workshop to publish it live. 

Here is an important rule to remember: Whenever a participant completes a registration and payment on the website, the available seat count for that batch is automatically decremented by 1 in real time. Once remaining seats reach zero, the frontend automatically displays Batch Full and closes new registrations."

---

## Visual Storyboard (NotebookLM Mapping)

### SCENE 1
**SCREENSHOT:** `screenshots/01-workshops-list.png`  
**VISUAL DESCRIPTION:** The Workshops management table displaying active workshop cards (e.g. "Ganesha Idol Making" - ₹250, Razorpay Active, 2 Batches, 1000 seats left), with Participants, Edit, and Delete action buttons.  
**KEY UI ELEMENT:** Create New Workshop button & Workshop Cards  
**NARRATION:** "From the Admin navigation menu, click on Workshops. Here you will see all existing workshops..."

---

## Common Errors & Troubleshooting

| Problem | Cause | Recommended Action |
| :--- | :--- | :--- |
| **"Batch Full" displayed unexpectedly** | Available capacity set to `0` or decremented completely by registrations. | Open workshop editor and increase batch seat capacity or add a new batch. |
| **Payment fails for registrants** | Invalid Razorpay Key ID in backend `.env` or payment toggle disabled. | Ensure Paid Event toggle is ON and verify payment credentials in `/admin/settings`. |

---

## YouTube Metadata & Publishing Specs

- **YouTube Title**: How to Create Workshops & Manage Batch Capacity | Veda Brahma Shri Pradeep Nadig CMS
- **Description**: Learn how to configure workshops, set batch timings, enable Razorpay integration, and handle automatic seat reservation.
- **Chapters**:
  - `00:00` Overview of Workshops Section
  - `00:45` Creating a New Workshop Form
  - `02:00` Payment Gateway & Pricing Setup
  - `03:15` Batch Capacity & Automatic Decrementing Rule
- **Suggested Thumbnail Text**: WORKSHOP CMS GUIDE
- **Keywords**: workshop management, batch capacity, razorpay event booking, cms guide
- **Playlist**: Events & Education Management
