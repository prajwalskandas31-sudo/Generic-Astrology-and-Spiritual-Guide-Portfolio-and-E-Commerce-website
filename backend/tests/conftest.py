import os
import sys

# Settings are read at import time, so the test environment must be in place
# before anything under `app` is imported. CI points DATABASE_URL at a
# throwaway Postgres service; locally it falls back to SQLite.
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///./ci_test.db")
os.environ["ENVIRONMENT"] = "test"
os.environ["ADMIN_JWT_SECRET"] = "ci-test-admin-jwt-secret-not-used-in-production"

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from fastapi.testclient import TestClient

from app.main import app

ADMIN_EMAIL = "ci-admin@pradeepnadig.in"
ADMIN_PASSWORD = "ci-admin-password-123"


async def upsert_admin(email, password, role="PRINCIPAL_ADMIN", is_active=True):
    from sqlalchemy.future import select

    from app.core.security import hash_password
    from app.db.session import get_db
    from app.models.models import AdminUser

    # Same session the app uses (including its local SQLite fallback)
    sessions = get_db()
    db = await sessions.__anext__()
    try:
        admin = (await db.execute(select(AdminUser).where(AdminUser.email == email))).scalar_one_or_none()
        if not admin:
            admin = AdminUser(email=email, name=email.split("@")[0], role=role, password_hash="")
            db.add(admin)
        admin.password_hash = hash_password(password)
        admin.role = role
        admin.is_active = is_active
        admin.token_version = (admin.token_version or 0) + 1
        await db.commit()
    finally:
        await sessions.aclose()


@pytest.fixture(scope="session")
def client():
    # Entering the context runs the lifespan hook (schema migration + seed).
    with TestClient(app) as c:
        # Runs on the app's own event loop so the async engine stays on one loop
        c.portal.call(upsert_admin, ADMIN_EMAIL, ADMIN_PASSWORD)
        yield c


@pytest.fixture(autouse=True)
def reset_login_rate_limit():
    from app.core.rate_limit import account_failure_limiter, login_failure_limiter, login_limiter

    login_limiter.records.clear()
    login_failure_limiter.records.clear()
    account_failure_limiter.records.clear()


def login(client, email=ADMIN_EMAIL, password=ADMIN_PASSWORD):
    res = client.post("/api/v1/admin/auth/login", json={"email": email, "password": password})
    assert res.status_code == 200, res.text
    return res.json()


@pytest.fixture
def admin_headers(client):
    return {"Authorization": f"Bearer {login(client)['access_token']}"}
