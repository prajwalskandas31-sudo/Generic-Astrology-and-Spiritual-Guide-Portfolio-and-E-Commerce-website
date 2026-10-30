#!/usr/bin/env bash
# Nightly Postgres backup for the pradeep_db container.
# Installed on the VPS via cron (see CI_CD_RUNBOOK.md, "Database backups").
# Keeps the last RETENTION_DAYS days of compressed custom-format dumps.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/apps/pradeep-platform}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
CONTAINER="${CONTAINER:-pradeep_db}"

umask 077
mkdir -p "$BACKUP_DIR"

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
target="$BACKUP_DIR/pradeep_db_$timestamp.dump"
partial="$target.partial"

# Credentials come from the container's own environment, never from this script
docker exec "$CONTAINER" sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$partial"

# A dump that pg_restore cannot list is corrupt — keep the old backups and fail loudly
if ! docker exec -i "$CONTAINER" pg_restore -l < "$partial" > /dev/null; then
  rm -f "$partial"
  echo "[backup-db] $(date -u) FAILED: dump did not verify" >&2
  exit 1
fi

mv "$partial" "$target"
find "$BACKUP_DIR" -name 'pradeep_db_*.dump' -type f -mtime +"$RETENTION_DAYS" -delete

echo "[backup-db] $(date -u) OK: $target ($(du -h "$target" | cut -f1))"
