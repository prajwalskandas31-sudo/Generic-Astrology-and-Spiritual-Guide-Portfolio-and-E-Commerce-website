# Tutorial 6: Centralized Media Library & Photo/Video Gallery

## Overview & Objective
Learn how to use the Centralized Media Library to register high-resolution images, copy URLs with 1-click re-use across the site, and curate public Photo & Video Albums.

---

## Prerequisites
- Administrator portal access (`/admin/media` and `/admin/gallery`).
- Image or video URLs (hosted on Supabase Storage, CDN, or cloud host).

---

## Spoken Narration Script (NotebookLM Narration)

"In this tutorial, we will explore the Media Management System, which powers images across your entire platform.

Instead of re-uploading images separately for every offering, workshop, or blog post, the platform uses a Centralized Media Library. Click Media Library in the sidebar to access it.

To register a new asset, enter a clear Asset Title—such as 'Ganapathi Homa Fire Ritual Banner'—and paste the public image URL or upload the file. Click Upload or Register Asset. The system creates a visual card displaying the asset.

Notice the Copy URL button on each media card. Clicking Copy URL copies the exact asset link to your clipboard with one click. When creating an offering or workshop, you can simply click the Media Library picker button to select any saved image instantly.

Next, navigate to Gallery in the sidebar to manage public photo and video albums. Click Add Gallery Item, specify the Item Title, select the Category—such as Rituals, Events, or Consultations—and paste your Media URL from the Media Library. Click Save Gallery Item to update your public gallery."

---

## Visual Storyboard (NotebookLM Mapping)

### SCENE 1
**SCREENSHOT:** `screenshots/01-media-library.png`  
**VISUAL DESCRIPTION:** The Media Library interface showing asset registration panel, asset cards with title preview, Copy URL button, and Delete controls.  
**KEY UI ELEMENT:** Copy URL Button & Register Asset Form  
**NARRATION:** "Instead of re-uploading images separately for every offering... the platform uses a Centralized Media Library..."

### SCENE 2
**SCREENSHOT:** `screenshots/02-gallery-list.png`  
**VISUAL DESCRIPTION:** The Photo & Video Gallery management page displaying categorized grid cards (Rituals, Poojas, Events) with image previews, category tags, Add Gallery Item button.  
**KEY UI ELEMENT:** Add Gallery Item Button & Category Badges  
**NARRATION:** "Next, navigate to Gallery in the sidebar to manage public photo and video albums..."

---

## Common Errors & Troubleshooting

| Problem | Cause | Recommended Action |
| :--- | :--- | :--- |
| **Image fails to preview in Media Library** | URL is HTTP instead of HTTPS or points to a non-public link. | Use HTTPS public URLs (e.g., Supabase Storage bucket URLs). |
| **Gallery image appears stretched** | Non-standard image aspect ratio uploaded. | Upload high-resolution landscape images (16:9 or 4:3 aspect ratio). |

---

## YouTube Metadata & Publishing Specs

- **YouTube Title**: Centralized Media Library & Gallery Management | Veda Brahma Shri Pradeep Nadig CMS
- **Description**: Learn how to register media assets once, copy URLs with 1-click, and build photo/video albums.
- **Chapters**:
  - `00:00` Centralized Media Library Concept
  - `00:50` Registering Media Assets & 1-Click Copy
  - `01:40` Re-using Assets across Offerings & Workshops
  - `02:30` Public Gallery & Photo Album Curation
- **Suggested Thumbnail Text**: MEDIA LIBRARY & GALLERY
- **Keywords**: media library cms, image asset management, gallery curation, pradeep nadig
- **Playlist**: Core Administration & Setup
