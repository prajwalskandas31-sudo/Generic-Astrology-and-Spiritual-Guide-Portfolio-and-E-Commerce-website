# Tutorial 9: Admin Error Resolution & Operational Troubleshooting Guide

## Overview & Objective
A comprehensive troubleshooting manual and source document for diagnosing, resolving, and preventing common operational errors across the Admin CMS.

---

## 1. Authentication & Access Errors

### Problem 1: Invalid Login Credentials or Access Denied
- **Symptom**: Error notification "Invalid credentials" upon submitting `/admin/login`.
- **Root Cause**: Password typo, unauthorized user account, or Supabase Auth token mismatch.
- **Recommended Action**:
  1. In local dev mode, use default credentials: `admin@pradeepnadig.com` with password `admin123`.
  2. In production mode, reset user password via Supabase Auth Dashboard -> Users -> Send Password Reset Email.
  3. Ensure user account has administrative role privileges in Supabase `auth.users` metadata.

---

## 2. Database Connection & Startup Fallback

### Problem 2: Slow Initial Page Load or Backend Startup Delay
- **Symptom**: Admin dashboard displays loading spinner for 10–15 seconds on startup.
- **Root Cause**: Backend PostgreSQL/Supabase connection timeout before falling back to local SQLite database (`pradeep_dev.db`).
- **Recommended Action**:
  1. Verify network access to Supabase database host on port `5432`.
  2. If running offline or in sandbox mode, set `DATABASE_URL="sqlite+aiosqlite:///./pradeep_dev.db"` in backend `.env` file to enable instant local DB startup.

---

## 3. WhatsApp Cloud API & Webhook Troubleshooting

### Problem 3: WhatsApp Notification / Reply Keyword Failure
- **Symptom**: Visitor submits enquiry, but admin receives no WhatsApp alert; or admin replies `Confirm` / `Reject` on WhatsApp, but enquiry status remains unchanged.
- **Root Cause**: Webhook token mismatch or Meta System User Access Token expired.
- **Recommended Action**:
  1. Verify `WHATSAPP_TOKEN` and `WHATSAPP_VERIFY_TOKEN` in `/admin/settings` -> WhatsApp Business API tab.
  2. Check backend webhook endpoint in Meta Developer Console: `https://<your-domain>/api/v1/whatsapp/webhook`.
  3. Use the "Send Trial Test Message" tool under `/admin/settings` to verify outbound API connectivity.

---

## 4. Payment Gateway & Automatic Decrement Issues

### Problem 4: Razorpay Checkout Fails or "Batch Full" Error Triggered Early
- **Symptom**: Visitor gets payment popup error or workshop shows "Batch Full" when seats are available.
- **Root Cause**: Mismatched Razorpay Key ID/Secret or initial batch capacity set to `0`.
- **Recommended Action**:
  1. Verify Razorpay test/live keys in `/admin/settings`.
  2. Open `/admin/workshops`, edit the affected workshop, and increase the batch capacity or add a new batch.

---

## 5. Media Library & Broken Images

### Problem 5: Cover Image or Gallery Card Broken
- **Symptom**: Image shows broken icon or missing thumbnail on website.
- **Root Cause**: Image link starts with non-secure HTTP or points to private local path.
- **Recommended Action**:
  1. Always register assets in the Centralized Media Library (`/admin/media`).
  2. Use the 1-click `Copy URL` button to paste clean HTTPS image links into offerings, workshops, or blogs.
