import os
import sys

# Settings are read at import time, so the test environment must be in place
# before anything under `app` is imported. CI points DATABASE_URL at a
# throwaway Postgres service; locally it falls back to SQLite.
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///./ci_test.db")
os.environ["ENVIRONMENT"] = "test"
os.environ["SUPABASE_JWT_SECRET"] = "ci-test-jwt-secret-not-used-in-production"

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client():
    # Entering the context runs the lifespan hook (schema migration + seed).
    with TestClient(app) as c:
        yield c
