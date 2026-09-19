# TASK: Create a Complete AI-Generated Admin Training Package

## OBJECTIVE

I need to create a complete set of tutorial videos for administrators of this application.

I do **NOT** want to manually screen-record anything, record my voice, edit videos, or write tutorial scripts myself.

Your job is to thoroughly inspect the existing application and create all the **source material required for NotebookLM to generate AI-narrated tutorial videos**.

The final workflow will be:

**Existing Application → You (audit + screenshots + documentation) → NotebookLM → AI-generated tutorial videos → YouTube**

Therefore, DO NOT attempt to create the videos yourself.

---

# CRITICAL RULES

1. **DO NOT modify, refactor, redesign, or otherwise change the application.**
2. **DO NOT modify production data.**
3. Do not create, delete, publish, cancel, refund, or otherwise perform destructive/irreversible actions unless absolutely necessary for inspection.
4. Prefer existing safe/test/sample records wherever available.
5. Your task is strictly **documentation, workflow discovery, screenshot capture, and tutorial-script generation**.
6. Do not waste tokens explaining your process to me.
7. Do not generate generic documentation based on assumptions.
8. Inspect the actual current application and document what actually exists.
9. Do not invent buttons, fields, workflows, permissions, or functionality.
10. If a functionality does not exist, clearly mark it as **NOT PRESENT** rather than inventing it.
11. Optimize screenshots for human comprehension rather than taking screenshots of every single click.
12. Capture screenshots at meaningful UI states that allow an AI video generator to visually explain the workflow.
13. Assume the final audience is a non-technical administrator who needs clear, practical instructions.
14. Use simple, professional language suitable for narration.
15. Keep each individual tutorial focused on **one specific task/workflow** wherever practical.

---

# PHASE 1 — AUDIT THE ADMIN SYSTEM

First, inspect the complete administrator experience.

Identify:

* Admin login/authentication
* Admin dashboard
* Navigation/sidebar
* Dashboard widgets/statistics
* Workshops/events
* Registrations
* Participants/users
* Payments
* Orders/transactions
* WhatsApp/SMS/email functionality
* Notifications
* Reports
* Exports/downloads
* Search/filtering
* Settings
* User roles and permissions
* Profile/account management
* Any approval/review workflows
* Any automation functionality
* Any other functionality available specifically to administrators

Also identify workflows that involve:

* Creating something
* Editing something
* Publishing/unpublishing
* Approving/rejecting
* Confirming
* Cancelling
* Deleting
* Exporting
* Sending notifications
* Managing payments
* Managing users
* Viewing reports
* Troubleshooting

Do not assume these features exist. Verify them in the actual application.

---

# PHASE 2 — CREATE THE ADMIN FUNCTIONALITY INVENTORY

Create a master inventory of every administrator-facing function.

For each function provide:

* Function name
* Module/section
* What it does
* Who should use it
* Frequency of use (high/medium/low)
* Risk level (low/medium/high)
* Whether it requires special permissions
* Whether it affects users/customers
* Whether it affects money/payments
* Whether it is reversible
* Recommended tutorial priority

Prioritize tutorials that administrators will realistically need.

---

# PHASE 3 — IDENTIFY INDIVIDUAL TUTORIALS

Break the functionality into individual tutorials.

Prefer short, focused tutorials rather than one enormous video.

For example:

### Dashboard

* Admin Dashboard Overview
* Understanding Dashboard Statistics
* Viewing Notifications

### Workshops

* Creating a Workshop
* Editing a Workshop
* Publishing a Workshop
* Unpublishing a Workshop
* Viewing Workshop Details
* Managing Workshop Registrations

### Registrations

* Finding a Registration
* Viewing Participant Details
* Confirming a Registration
* Cancelling a Registration
* Filtering Registrations
* Exporting Registration Data

### Payments

* Checking Payment Status
* Viewing Transaction Details
* Handling Failed Payments
* Refund workflow (only if actually supported)

### Communication

* Sending a Notification
* WhatsApp workflow
* Email workflow
* Registration confirmation workflow

### Reports

* Viewing Reports
* Generating Reports
* Exporting Reports

Use the actual application functionality as the source of truth. Do not blindly follow this example.

---

# PHASE 4 — CAPTURE SCREENSHOTS

For every tutorial, capture screenshots of the most important UI states.

DO NOT capture a screenshot for every mouse movement or click.

Instead, capture screenshots at meaningful stages.

For example, for:

## "How to Create a Workshop"

Capture:

1. Workshops page
2. Create Workshop interface
3. Completed workshop form
4. Important configuration/settings section
5. Successful creation/published state
6. Final workshop view if relevant

For each screenshot, record:

* Screenshot filename
* What the screenshot shows
* Which step it belongs to
* What the narrator should point out
* Which UI element is important

Screenshots must be clear enough for NotebookLM to understand the interface.

Avoid exposing:

* Passwords
* API keys
* Tokens
* Secrets
* Private credentials
* Unnecessary personal information
* Sensitive production data

If real user data appears, obscure/redact it where possible or use safe test data.

---

# PHASE 5 — CREATE THE NARRATION SCRIPT

For EVERY tutorial, create a complete narration script.

The script must be written exactly as an AI narrator could speak it.

Do not write technical notes inside the spoken narration.

Each script should contain:

## TITLE

A concise YouTube-friendly title.

## OBJECTIVE

Explain what the administrator will learn.

## PREREQUISITES

Mention anything they need before beginning.

## NARRATION

Write the complete spoken narration from beginning to end.

The narration should explain:

* Where to start
* What to click
* What information to enter
* What each important field means
* What to verify
* What happens after completing the action
* Any important warnings
* What to do if something goes wrong

Use natural spoken language.

Avoid phrases like:

"Click the aforementioned button."

Prefer:

"Select the Create Workshop button."

---

# PHASE 6 — MAP NARRATION TO SCREENSHOTS

This is extremely important.

For every tutorial, create a visual storyboard.

Use this structure:

### SCENE 1

**SCREENSHOT:** `01-workshops-page.png`

**VISUAL DESCRIPTION:**
Describe exactly what the viewer should see.

**NARRATION:**
Write the narration spoken while this screenshot is displayed.

**KEY UI ELEMENT:**
Identify the button/field/section the viewer should pay attention to.

---

### SCENE 2

**SCREENSHOT:** `02-create-workshop.png`

**VISUAL DESCRIPTION:**
...

**NARRATION:**
...

**KEY UI ELEMENT:**
...

Continue until the workflow is complete.

The resulting storyboard must allow NotebookLM to understand:

**what is being shown + what should be explained + in what order.**

---

# PHASE 7 — COMMON ERRORS AND TROUBLESHOOTING

For every tutorial, identify realistic problems the administrator may encounter.

Examples:

* Required field missing
* Invalid information
* Payment not completed
* User not found
* Permission denied
* Button disabled
* Duplicate registration
* Failed notification
* Network/server error
* Unexpected status

Only document errors that are actually possible based on the current implementation.

For each:

**Problem → Cause → Recommended action**

---

# PHASE 8 — CREATE NOTEBOOKLM-READY SOURCE MATERIAL

The final documentation must be structured so that it can be uploaded directly to NotebookLM.

Create:

## 1. MASTER ADMIN TRAINING GUIDE

A comprehensive document explaining the entire admin system.

## 2. INDIVIDUAL TUTORIAL DOCUMENTS

Create one document/section per tutorial.

Each should contain:

* Tutorial title
* Objective
* Prerequisites
* Step-by-step instructions
* Screenshots
* Screenshot descriptions
* Narration
* Visual storyboard
* Expected result
* Common errors
* Important warnings

## 3. MASTER TUTORIAL INDEX

Create a table containing:

| # | Tutorial | Module | Difficulty | Priority | Approx. Video Length |
| - | -------- | ------ | ---------- | -------- | -------------------- |

Estimate the ideal duration rather than artificially making tutorials long.

Prefer approximately:

* Simple task: 1–3 minutes
* Normal workflow: 3–5 minutes
* Complex workflow: 5–8 minutes

Do not make videos unnecessarily long.

---

# PHASE 9 — YOUTUBE-READY INFORMATION

For each tutorial provide:

### YouTube Title

Clear and searchable.

### Description

A concise description of what the administrator will learn.

### Chapters

If appropriate, provide timestamps/sections.

### Suggested Thumbnail Text

Keep it short.

### Keywords

Provide relevant search keywords.

### Suggested Playlist

Identify which training playlist/module it belongs to.

---

# PHASE 10 — FINAL QUALITY CHECK

Before finishing, verify:

### FUNCTIONALITY

* Every important admin functionality has been considered.
* No major administrator workflow has been omitted.

### ACCURACY

* Every instruction corresponds to the actual current UI.
* No buttons/fields/features have been invented.
* No outdated workflow has been documented.

### SCREENSHOTS

* Every important tutorial has useful screenshots.
* Screenshots are readable.
* Screenshots contain no secrets.
* Screenshots are taken at meaningful states rather than every click.

### NARRATION

* Narration is natural and understandable.
* Instructions are explicit.
* Technical jargon is minimized.
* Narration corresponds to the displayed screenshot.

### SAFETY

* No production data was modified.
* No destructive actions were performed unnecessarily.
* No credentials/secrets are exposed.

---

# FINAL OUTPUT STRUCTURE

Produce the final package in this structure:

ADMIN_TRAINING/
│
├── 00_MASTER_ADMIN_GUIDE
│
├── 00_TUTORIAL_INDEX
│
├── 01_DASHBOARD/
│   ├── tutorial.md
│   └── screenshots/
│
├── 02_WORKSHOPS/
│   ├── create-workshop/
│   │   ├── tutorial.md
│   │   └── screenshots/
│   ├── edit-workshop/
│   │   ├── tutorial.md
│   │   └── screenshots/
│   └── ...
│
├── 03_REGISTRATIONS/
│   └── ...
│
├── 04_PAYMENTS/
│   └── ...
│
├── 05_COMMUNICATION/
│   └── ...
│
├── 06_USERS/
│   └── ...
│
├── 07_REPORTS/
│   └── ...
│
└── 08_TROUBLESHOOTING/
└── ...

The exact folder structure may be adapted to the actual application's modules.

---

# IMPORTANT: TOKEN AND EFFICIENCY OPTIMIZATION

Be efficient.

Do NOT repeatedly inspect the same page unnecessarily.

Reuse screenshots where the same UI state is relevant to multiple tutorials.

Do not generate excessively verbose documentation.

Do not generate duplicate explanations.

Do not attempt to create video files.

Do not attempt to generate audio files.

Do not attempt to narrate the videos yourself.

The deliverable is the **high-quality source material that another AI system such as NotebookLM can use to generate the videos.**

---

# SUCCESS CRITERIA

When this task is complete, I should be able to take the generated documentation and screenshots, upload them into NotebookLM, and ask it:

> "Create a tutorial video explaining this administrator workflow. Use the supplied screenshots as the visual reference and follow the supplied narration/storyboard."

I should NOT need to:

* Screen-record the website
* Write scripts
* Take screenshots manually
* Record my voice
* Explain the workflow myself
* Figure out what tutorials are needed

Your job is to do the discovery and preparation work now.

**Start by auditing the existing application and then build the complete Admin Training Package.**
