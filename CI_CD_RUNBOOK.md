# CI/CD Runbook

How code gets from your laptop to **pradeepnadig.in**, and what to do when something goes wrong.

> Never paste passwords, tokens or private keys into this file, chats, or commits.

---

## 1. The normal workflow

```powershell
git add .
git commit -m "describe the change"
git push private-origin main
```

That's it. GitHub Actions then:

```text
push to main (private repo)
        │
        ▼
CI ──► Frontend: type-check + production build
   ──► Backend:  smoke tests on a throwaway Postgres
   ──► Docker:   both images build
        │  (all must pass — otherwise nothing is deployed)
        ▼
Deploy ──► SSH to VPS
       ──► move server to the exact tested commit
       ──► docker compose build + up -d
       ──► wait for health checks (up to ~2.5 min)
       ──► pass: done   │   fail: automatic rollback to previous version
        ▼
Public check ──► https://pradeepnadig.in/, /api/v1/health, /sitemap.xml must return 200
```

**Where to watch:** GitHub → `pradeep-nadig-private-app` → **Actions** tab.
Or from the terminal:

```powershell
gh run list -R prajwalskandas31-sudo/pradeep-nadig-private-app --limit 5
gh run watch -R prajwalskandas31-sudo/pradeep-nadig-private-app
```

A typical run takes 4–6 minutes. Runs that change no app code finish the deploy in seconds (Docker reuses cached images).

### Important remote names

| Remote | Repo | Visibility | Deploys? |
|---|---|---|---|
| `private-origin` | `pradeep-nadig-private-app` | Private | **Yes** — always push here |
| `origin` | `Generic-Astrology-...-E-Commerce-website` | **Public** | No (CI only) |

`git push` with no remote name goes to `origin` (the **public** repo). Always type `private-origin`.

---

## 2. Files that make up the pipeline

| File | Purpose |
|---|---|
| `.github/workflows/ci.yml` | The checks. Runs on every PR and on pushes to non-main branches. |
| `.github/workflows/deploy.yml` | On push to `main`: runs `ci.yml`, then deploys. Only deploys from the private repo. |
| `scripts/deploy.sh` | Runs **on the VPS** during deploy. Checkout, build, health-check, rollback. |
| `backend/tests/` | Backend smoke tests (health, public endpoints, admin auth). |
| `backend/requirements-dev.txt` | Backend deps + pytest. |

### GitHub secrets (private repo → Settings → Secrets and variables → Actions)

| Secret | What it is |
|---|---|
| `VPS_HOST` | Server IP |
| `VPS_USER` | SSH user (`skanda`) |
| `VPS_SSH_KEY` | Private half of the deploy key (`~/.ssh/pradeep_deploy_v2` on the laptop) |
| `VPS_KNOWN_HOSTS` | Server's public host fingerprints (output of `ssh-keyscan 200.234.32.65`) |

---

## 3. Troubleshooting

Open the failed run in the Actions tab, click the red job, and expand the red step. Match what you see below.

### 3.1 "Frontend (type-check + build)" failed

Your code has a TypeScript error or the Next.js build broke. **Nothing was deployed; the live site is untouched.**

Reproduce locally:

```powershell
cd frontend
npx tsc --noEmit
npm run build
```

Fix, commit, push again.

### 3.2 "Backend (smoke tests on Postgres)" failed

A backend change broke the API, a public endpoint, or admin authentication. **Nothing was deployed.**

Reproduce locally (uses SQLite instead of Postgres):

```powershell
cd backend
venv\Scripts\python.exe -m pip install -r requirements-dev.txt
venv\Scripts\python.exe -m pytest tests -q
```

If a test fails because you *intentionally* changed behaviour (e.g. renamed an endpoint), update `backend/tests/test_smoke.py` in the same commit.

### 3.3 "Docker images build" failed

Usually a new dependency missing from `package.json` / `requirements.txt`, or a Dockerfile change. **Nothing was deployed.**

Reproduce locally (needs Docker Desktop): `docker compose build backend frontend`

### 3.4 Deploy log says `Health checks failed ... rolling back`

The new version built but didn't become healthy. The script **automatically rolled back**; the site should be running the previous version. Confirm:

- Log ends with `Rollback OK: running <sha>` → site is fine. Read the `docker compose logs` printed just above it to find the error, fix, push again.
- Log ends with `ROLLBACK ALSO UNHEALTHY` → **site may be down.** Go to section 4 (manual recovery) immediately.

### 3.5 Deploy log says `ERROR: <sha> not found after fetching 'origin'`

The VPS could not download new code from GitHub. Almost always: **the GitHub token stored in the VPS's git remote expired or was revoked.** The live site keeps running the last good version — nothing is broken, just stuck.

Fix — create a new token and put it on the server:

1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token.
   - Repository access: *Only select repositories* → `pradeep-nadig-private-app`
   - Permissions: **Contents → Read-only** (nothing else)
   - Expiration: your choice (note the date in your calendar)
2. SSH to the server and update the remote (replace `NEW_TOKEN`):
   ```bash
   ssh skanda@200.234.32.65
   cd /opt/apps/pradeep-platform
   git remote set-url origin https://NEW_TOKEN@github.com/prajwalskandas31-sudo/pradeep-nadig-private-app.git
   git fetch origin main      # must finish without asking for a password
   ```
3. Re-run the failed deploy: open the run in the Actions tab → **Re-run all jobs**.

*(Permanent alternative that never expires: a read-only **deploy key** for the server, added under the private repo's Settings → Deploy keys.)*

### 3.6 Deploy log says `ERROR: tracked files were edited directly on the VPS`

Someone changed a code file on the server by hand. The deploy refuses to overwrite it. The log lists the files.

```bash
ssh skanda@200.234.32.65
cd /opt/apps/pradeep-platform
git diff                       # see what was changed
```

- If the change matters: copy it into your laptop's repo, commit and push it properly.
- Then discard it on the server: `git checkout -- .`
- Re-run the deploy from the Actions tab.

`.env` is not tracked by git, so editing secrets in `.env` on the server is fine and never triggers this.

### 3.7 "Public smoke check" failed, but deploy said OK

The containers are healthy on the server but the public URL isn't returning 200. Usually Caddy, DNS or SSL — not your code.

```bash
ssh skanda@200.234.32.65
sudo systemctl status caddy
sudo journalctl -u caddy --since "15 min ago"
curl -I http://127.0.0.1:3000/          # frontend directly
curl http://127.0.0.1:8000/api/v1/health # backend directly
```

### 3.8 Deploy step fails at SSH: `Permission denied (publickey)` or `Host key verification failed`

- **Permission denied** → the deploy key was removed from the server's `~/.ssh/authorized_keys`, or the `VPS_SSH_KEY` secret is wrong. See section 5 (rotate the deploy key).
- **Host key verification failed** → the server was rebuilt/reinstalled and has new fingerprints. Update the secret:
  ```powershell
  ssh-keyscan 200.234.32.65 2>$null | gh secret set VPS_KNOWN_HOSTS -R prajwalskandas31-sudo/pradeep-nadig-private-app
  ```
  Only do this if *you* know the server was rebuilt. An unexpected fingerprint change can mean someone is impersonating your server.

### 3.9 `git push` is rejected: `refusing to allow a Personal Access Token to create or update workflow`

Happens only when your commit changes files in `.github/workflows/`. The token saved in the `private-origin` remote lacks the `workflow` permission. Push through your `gh` login instead:

```powershell
git -c credential.helper= -c "credential.helper=!gh auth git-credential" push https://github.com/prajwalskandas31-sudo/pradeep-nadig-private-app.git main
```

Normal code changes push fine with `git push private-origin main`.

### 3.10 `git push private-origin main` fails with `Authentication failed`

The token in your laptop's `private-origin` remote expired. Switch the remote to your `gh` login permanently:

```powershell
git remote set-url private-origin https://github.com/prajwalskandas31-sudo/pradeep-nadig-private-app.git
gh auth setup-git
```

---

## 4. Manual recovery (when automation can't help)

### Roll back to a known-good version

**Preferred** — undo the bad commit and let the pipeline deploy:

```powershell
git log --oneline -5           # find the bad commit
git revert <bad-sha>
git push private-origin main
```

**Emergency** — site is down and you can't wait ~5 minutes:

```bash
ssh skanda@200.234.32.65
cd /opt/apps/pradeep-platform
git log --oneline -10                    # pick the last good sha
git checkout -B main <good-sha>
docker compose build backend frontend
docker compose up -d
docker compose ps                        # all should say (healthy) within ~1 min
```

The next normal push will deploy over this as usual.

### Deploy by hand (if GitHub Actions itself is down)

```bash
ssh skanda@200.234.32.65
cd /opt/apps/pradeep-platform
git fetch origin main
bash scripts/deploy.sh "$(git rev-parse origin/main)"
```

This runs the same script the pipeline uses, including health checks and rollback.

### Re-run a deploy without new code

Actions tab → **Deploy** workflow → **Run workflow** → branch `main`. Useful after fixing a server-side problem (sections 3.5–3.8).

---

## 5. Maintenance tasks

### Rotate the deploy key (if it leaks, or yearly)

On the laptop (PowerShell):

```powershell
ssh-keygen -t ed25519 -f $HOME\.ssh\pradeep_deploy_v3 -N '""' -C github-actions-deploy-v3
type $HOME\.ssh\pradeep_deploy_v3.pub | ssh skanda@200.234.32.65 "cat >> ~/.ssh/authorized_keys"
Get-Content $HOME\.ssh\pradeep_deploy_v3 -Raw | gh secret set VPS_SSH_KEY -R prajwalskandas31-sudo/pradeep-nadig-private-app
```

Then remove the old key from the server. Each key line ends with its comment; delete the line containing a unique chunk of the **old** public key (open `$HOME\.ssh\pradeep_deploy_v2.pub` and copy ~15 characters from the middle):

```powershell
ssh skanda@200.234.32.65 'sed -i /PASTE_UNIQUE_CHUNK/d ~/.ssh/authorized_keys'
```

> PowerShell tip: don't put double quotes *inside* single-quoted ssh commands — Windows PowerShell strips them and the remote command breaks. Use patterns without spaces or quotes, as above.

Finally delete the old key files from `$HOME\.ssh\`.

### Require manual approval before every deploy

Private repo → Settings → Environments → `production` → **Required reviewers** → add yourself. After CI passes, the run waits until you click **Approve and deploy** in the Actions tab.

### Database backups

`scripts/backup-db.sh` runs nightly at 02:30 server time from `skanda`'s crontab. It writes a verified `pg_dump` to `/opt/apps/pradeep-platform/backups/` (owner-only permissions, ignored by git) and keeps 14 days.

```bash
ssh skanda@200.234.32.65
ls -lh /opt/apps/pradeep-platform/backups/      # list backups
tail -20 /opt/apps/pradeep-platform/backups/backup.log
bash /opt/apps/pradeep-platform/scripts/backup-db.sh   # take one now
```

Copy one off the server (do this weekly — server-only backups die with the server):

```powershell
scp skanda@200.234.32.65:/opt/apps/pradeep-platform/backups/<file>.dump $HOME\Backups\pradeep-db\
```

Restore (overwrites the live database — take a fresh backup first):

```bash
docker exec -i pradeep_db sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' < backups/<file>.dump
```

Dumps contain customer contact details: keep downloaded copies private.

### Add a new environment variable / secret for the app

App secrets live **only** in `/opt/apps/pradeep-platform/.env` on the VPS — not in GitHub.

```bash
ssh skanda@200.234.32.65
nano /opt/apps/pradeep-platform/.env
```

Then re-run the Deploy workflow (or push any change). If it's a `NEXT_PUBLIC_*` variable it is baked in at build time, so a rebuild is required — the deploy does that.

---

## 6. Known gaps / future work

- **ESLint is not part of CI.** The project's ESLint setup crashes on start (`@rushstack/eslint-patch` incompatibility). Fix the config, then add `npx eslint .` to the frontend job.
- **Smoke tests are basic.** They catch broken builds, crashes and auth regressions, not every bug. Add tests to `backend/tests/` as features grow.
- **GitHub Actions Node 20 warnings.** `actions/checkout@v4`, `setup-node@v4`, `setup-python@v5` still run but show deprecation warnings; bump to newer major versions when convenient.
- **Short downtime during deploys.** `docker compose up -d` restarts changed containers; expect a few seconds of errors during a deploy that changes app code.
