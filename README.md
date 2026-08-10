# Veda Brahma Shri Pradeep Nadig - Platform & Admin CMS

A high-performance, full-stack web application and Content Management System (CMS) designed for **Veda Brahma Shri Pradeep Nadig**. Built for scaling spiritual offerings, rituals, consultations, workshops with Razorpay payments, WhatsApp Cloud API workflows, Google Calendar scheduling, and an Admin CMS.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, TanStack Query, Lucide Icons.
- **Backend**: FastAPI (Python 3.12), SQLAlchemy 2.0 (Async), Asyncpg, Pydantic v2, Supabase Auth JWT Security.
- **Database**: PostgreSQL (Supabase ready).
- **Integrations**: WhatsApp Cloud API, Google Calendar API, Razorpay Payment Gateway.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **PostgreSQL**: v14.0 or higher (Running locally or on Supabase)

---

### 1. Database Setup
1. Ensure PostgreSQL is running on `localhost:5432`.
2. Create a database named `pradeep_db`:
   ```sql
   CREATE DATABASE pradeep_db;
   ```

---

### 2. Backend Setup

1. Open terminal in project root and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Create and activate Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create environment file `.env` inside `backend/`:
   ```env
   PROJECT_NAME="Pradeep Nadig Backend"
   API_V1_STR="/api/v1"
   DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/pradeep_db"
   
   # Supabase Auth Configuration
   SUPABASE_URL="https://your-supabase-project.supabase.co"
   SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_JWT_SECRET="your-jwt-secret"

   # WhatsApp Cloud API Configuration
   WHATSAPP_TOKEN="your-whatsapp-access-token"
   WHATSAPP_PHONE_ID="your-whatsapp-phone-id"
   WHATSAPP_VERIFY_TOKEN="your-webhook-verify-token"

   # Razorpay Configuration
   RAZORPAY_KEY_ID="rzp_test_xxxxxx"
   RAZORPAY_SECRET="your-razorpay-secret"
   ```

5. Seed the database with initial tables and data:
   ```bash
   python seed.py
   ```

6. Start backend development server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - API Documentation: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

---

### 3. Frontend Setup

1. Navigate to `frontend/`:
   ```bash
   cd ../frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Create environment file `.env.local` inside `frontend/`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
   NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   ```

4. Start frontend development server:
   ```bash
   npm run dev
   ```
   - Public Website: `http://localhost:3000`
   - Admin Login: `http://localhost:3000/admin/login`

---

## 🧪 Running Automated Tests

Run backend API and integration test suites:

```bash
# 1. Test all core REST APIs
python backend/verify_backend.py

# 2. Test WhatsApp Webhook Admin reply workflow & Google Calendar integration
python backend/verify_integrations.py

# 3. Test Next.js production build compilation
cd frontend
npm run build
```

---

## 🌐 Production Deployment Guide

### 1. Deploy Database on Supabase
1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Under **Project Settings -> Database**, copy the **Transaction Connection String** (PostgreSQL URI).
3. Set `DATABASE_URL` in backend environment settings (use `postgresql+asyncpg://...`).
4. Run `python seed.py` pointing to your Supabase PostgreSQL database to create tables and initial data.

---

### 2. Deploy Backend API (Render / Railway / Fly.io)

#### Option A: Deploying on Render
1. Create a new **Web Service** on Render connected to your Git repository.
2. Environment: `Python 3`
3. Root Directory: `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables:
   - `DATABASE_URL` (From Supabase)
   - `SUPABASE_URL`
   - `SUPABASE_JWT_SECRET`
   - `WHATSAPP_TOKEN`
   - `WHATSAPP_PHONE_ID`
   - `WHATSAPP_VERIFY_TOKEN`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_SECRET`

---

### 3. Deploy Frontend on Vercel

1. Import your Git repository to [Vercel](https://vercel.com).
2. Set Root Directory: `frontend`
3. Framework Preset: `Next.js`
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend API URL (`https://generic-astrology-and-spiritual-guide.onrender.com/api/v1`)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
5. Click **Deploy**.

---

## 📱 WhatsApp Webhook Configuration

1. Go to **Meta for Developers -> WhatsApp -> Configuration**.
2. Set **Callback URL**: `https://<your-backend-domain>/api/v1/webhooks/whatsapp`
3. Set **Verify Token**: Matching `WHATSAPP_VERIFY_TOKEN` in `.env`.
4. Subscribe to the `messages` webhook field.

### Admin Reply Keywords:
- **`Confirm`**: Confirms visitor enquiry, creates Google Calendar event, sends calendar invitation, dispatches confirmation message to visitor via WhatsApp.
- **`Reject`**: Marks enquiry as rejected and sends polite update to visitor.
- **`Contact Manually`**: Marks enquiry as contacted and sends callback alert to visitor.

---

## 📄 License & Attribution

Developed for **Veda Brahma Shri Pradeep Nadig**. All rights reserved.
