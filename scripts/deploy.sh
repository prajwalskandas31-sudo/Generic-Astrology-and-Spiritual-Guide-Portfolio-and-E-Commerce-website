#!/usr/bin/env bash
# Runs ON THE VPS (piped over SSH by .github/workflows/deploy.yml).
# Usage: deploy.sh <commit-sha>
# Moves `main` to the exact commit CI tested, rebuilds the containers, waits for
# the health checks and rolls back to the previous commit if they do not pass.
set -euo pipefail

TARGET_SHA="${1:?commit sha required}"
APP_DIR="/opt/apps/pradeep-platform"
cd "$APP_DIR"

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "ERROR: tracked files were edited directly on the VPS. Commit or discard them first:"
  git status --short --untracked-files=no
  exit 1
fi

PREVIOUS_SHA="$(git rev-parse HEAD)"
echo "Current: $PREVIOUS_SHA"
echo "Target:  $TARGET_SHA"

git fetch --quiet origin main
if ! git cat-file -e "${TARGET_SHA}^{commit}" 2>/dev/null; then
  echo "ERROR: $TARGET_SHA not found after fetching 'origin'. Is the VPS 'origin' remote the private repo?"
  exit 1
fi

wait_healthy() {
  for _ in $(seq 1 30); do
    if curl -fsS --max-time 5 http://127.0.0.1:8000/api/v1/health >/dev/null \
      && curl -fsS --max-time 10 -o /dev/null http://127.0.0.1:3000/; then
      return 0
    fi
    sleep 5
  done
  return 1
}

release() {
  git checkout --quiet -B main "$1"
  docker compose build backend frontend
  docker compose up -d --remove-orphans
}

release "$TARGET_SHA"

if wait_healthy; then
  echo "Deploy OK: $TARGET_SHA"
  docker compose ps
  docker image prune -f >/dev/null
  exit 0
fi

echo "Health checks failed for $TARGET_SHA - rolling back to $PREVIOUS_SHA"
docker compose logs --tail=80 backend frontend || true
release "$PREVIOUS_SHA"
if wait_healthy; then
  echo "Rollback OK: running $PREVIOUS_SHA"
else
  echo "ROLLBACK ALSO UNHEALTHY - manual attention needed"
fi
exit 1
