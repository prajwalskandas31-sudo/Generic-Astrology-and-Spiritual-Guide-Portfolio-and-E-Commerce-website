# VPS Production Deployment & Architecture Reference

## 🖥️ Server Details

- **Host**: Hostinger VPS
- **IP Address**: `200.234.32.65`
- **Operating System**: Ubuntu 24.04.4 LTS
- **SSH User**: `skanda`
- **Active Application Directory**: `/opt/apps/pradeep-platform`

---

## 📁 Directory Map

```text
HOSTINGER VPS
IP: 200.234.32.65
OS: Ubuntu 24.04.4 LTS
User: skanda

/
├── opt/
│   └── apps/
│       ├── pradeep-platform/                 ← MAIN APPLICATION ROOT
│       │   │
│       │   ├── .git/                         ← Git repository metadata
│       │   ├── .gitignore
│       │   ├── .env                          ← 🔐 PRODUCTION SECRETS — VPS ONLY
│       │   ├── .env.example                  ← Template, safe to keep in GitHub
│       │   ├── docker-compose.yml            ← Docker orchestration
│       │   ├── Caddyfile.example             ← Reference only
│       │   ├── README.md
│       │   ├── 00_AGENT_INSTRUCTIONS.md
│       │   ├── 01_PROJECT_SPEC.md
│       │   ├── 02_BUILD_GUIDE.md
│       │   ├── ADMIN_GUIDE.md
│       │   ├── IMPLEMENT.md
│       │   ├── VPS_DEPLOYMENT.md             ← This reference file
│       │   │
│       │   ├── backend/
│       │   │   ├── Dockerfile                 ← Backend image
│       │   │   ├── requirements.txt
│       │   │   ├── seed.py
│       │   │   └── app/
│       │   │       └── ...
│       │   │
│       │   └── frontend/
│       │       ├── Dockerfile                 ← Next.js image
│       │       ├── package.json
│       │       ├── package-lock.json
│       │       ├── .env.example
│       │       ├── public/
│       │       └── src/
│       │           └── ...
│       │
│       ├── backend/                           ← Legacy/empty directory (do not use)
│       ├── frontend/                          ← Legacy/empty directory (do not use)
│       └── reverse-proxy/                     ← Legacy/empty directory (do not use)
│
└── etc/
    └── caddy/
        ├── Caddyfile                          ← 🔐 ACTIVE VPS CADDY CONFIG
        └── ...
```

> ⚠️ **Note**: The directories `/opt/apps/backend`, `/opt/apps/frontend`, and `/opt/apps/reverse-proxy` are legacy directories from initial setup and are **inactive**. The active deployment root is always `/opt/apps/pradeep-platform`.

---

## 🔐 Environment Variables & GitHub vs VPS Distinction

```text
GITHUB REPOSITORY
│
├── Application source code
├── Dockerfiles
├── docker-compose.yml
├── .env.example
├── backend/.env.example
├── frontend/.env.example
└── Caddyfile.example
        │
        │ git pull
        ▼
VPS: /opt/apps/pradeep-platform
│
├── .env                  🔐 REAL PRODUCTION CREDENTIALS (VPS ONLY)
├── backend/
├── frontend/
├── docker-compose.yml
└── ...
        │
        ├── Docker → pradeep_backend
        │             └── :8000
        │
        └── Docker → pradeep_frontend
                      └── :3000

VPS: /etc/caddy/Caddyfile
        │
        ▼
      CADDY
   :80 / :443
        │
        ├── /api/* → 127.0.0.1:8000
        │
        └── everything else → 127.0.0.1:3000
```

### Production `.env` Location
The real production environment variables live at:
```text
/opt/apps/pradeep-platform/.env
```

### Environment Variable Keys Configured on VPS:
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_SECRET`
- `WHATSAPP_TOKEN`
- `WHATSAPP_PHONE_ID`
- `WHATSAPP_VERIFY_TOKEN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

---

## 🌐 Production Traffic Flow

```text
Internet
   │
   ▼
pradeepnadig.in
   │
   ▼
200.234.32.65
   │
   ▼
Caddy Reverse Proxy (/etc/caddy/Caddyfile)
   │
   ├──────── /api/* ────────► FastAPI Backend (Docker)
   │                          127.0.0.1:8000
   │
   └──────── /* ────────────► Next.js Frontend (Docker)
                              127.0.0.1:3000
                                    │
                                    ▼
                              Supabase PostgreSQL / Cloud Services
```

---

## 🚀 Future Deployments & Update Workflow

To deploy new changes pushed to GitHub:

```bash
cd /opt/apps/pradeep-platform
git pull origin main
docker compose build
docker compose up -d
docker compose ps
```

> **Caddy Management**: Caddy handles automatic SSL/TLS certificates and routing. Normally, Caddy does not need to be restarted or modified for routine application code updates.
