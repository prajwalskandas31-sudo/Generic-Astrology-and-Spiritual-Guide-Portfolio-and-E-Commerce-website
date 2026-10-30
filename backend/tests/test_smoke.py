import time

import jwt
import pytest

API = "/api/v1"
JWT_SECRET = "ci-test-jwt-secret-not-used-in-production"


def make_token(secret=JWT_SECRET, expires_in=3600, email="prajwal@pradeepnadig.in"):
    now = int(time.time())
    return jwt.encode(
        {"sub": "ci-admin", "email": email, "role": "authenticated", "iat": now, "exp": now + expires_in},
        secret,
        algorithm="HS256",
    )


def test_health(client):
    res = client.get(f"{API}/health")
    assert res.status_code == 200
    assert res.json() == {"status": "healthy"}


@pytest.mark.parametrize(
    "path",
    ["/offerings", "/workshops", "/courses", "/live-events", "/blogs", "/faq"],
)
def test_public_listing_endpoints(client, path):
    res = client.get(f"{API}{path}")
    assert res.status_code == 200, res.text
    assert isinstance(res.json(), list)


ADMIN_ROUTES = [
    ("get", "/admin/stats"),
    ("get", "/admin/registrations"),
    ("post", "/offerings"),
    ("post", "/faq"),
    ("get", "/admin/audit-logs"),
    ("post", "/admin/audit-logs"),
    ("get", "/calendar/status"),
]


@pytest.mark.parametrize("method,path", ADMIN_ROUTES)
def test_admin_routes_reject_missing_token(client, method, path):
    res = getattr(client, method)(f"{API}{path}")
    assert res.status_code == 401


@pytest.mark.parametrize("method,path", ADMIN_ROUTES)
def test_admin_routes_reject_forged_token(client, method, path):
    headers = {"Authorization": f"Bearer {make_token(secret='attacker-secret')}"}
    res = getattr(client, method)(f"{API}{path}", headers=headers)
    assert res.status_code == 401


def test_admin_routes_reject_expired_token(client):
    headers = {"Authorization": f"Bearer {make_token(expires_in=-60)}"}
    res = client.get(f"{API}/admin/stats", headers=headers)
    assert res.status_code == 401


def test_admin_stats_with_valid_token(client):
    headers = {"Authorization": f"Bearer {make_token()}"}
    res = client.get(f"{API}/admin/stats", headers=headers)
    assert res.status_code == 200, res.text


def test_deleting_records_preserves_full_snapshot_in_audit_log(client):
    headers = {"Authorization": f"Bearer {make_token()}"}
    created = client.post(
        f"{API}/enquiries",
        json={
            "enquiry_type": "Consultation",
            "name": "Snapshot Test Devotee",
            "mobile": "9000000001",
            "city": "Bengaluru",
            "additional_notes": "keep me recoverable",
        },
    )
    assert created.status_code == 201, created.text
    enquiry_id = created.json()["id"]
    request_id = created.json()["request_id"]

    assert client.delete(f"{API}/enquiries/{enquiry_id}", headers=headers).status_code == 200
    assert client.delete(f"{API}/requests/{request_id}", headers=headers).status_code == 200

    logs = client.get(f"{API}/admin/audit-logs", headers=headers).json()
    deletions = {log["target_resource"]: log for log in logs if log["action_category"] == "DELETE"}

    enquiry_snapshot = deletions[f"/enquiries/{enquiry_id}"]["details"]["deleted_records"][0]
    assert enquiry_snapshot["mobile"] == "9000000001"
    assert enquiry_snapshot["additional_notes"] == "keep me recoverable"

    request_snapshot = deletions[f"/requests/{request_id}"]["details"]["deleted_records"][0]
    assert request_snapshot["request_id"] == request_id
    assert request_snapshot["customer"]["name"] == "Snapshot Test Devotee"


def test_valid_session_for_non_admin_account_is_forbidden(client):
    headers = {"Authorization": f"Bearer {make_token(email='visitor@example.com')}"}
    res = client.get(f"{API}/admin/audit-logs", headers=headers)
    assert res.status_code == 403


def test_remote_verification_without_jwt_secret(client, monkeypatch):
    from app.core import security

    monkeypatch.setattr(security.settings, "SUPABASE_JWT_SECRET", None)
    monkeypatch.setattr(security.settings, "SUPABASE_URL", "https://example.supabase.co")
    monkeypatch.setattr(security.settings, "SUPABASE_ANON_KEY", "anon-key")
    security._remote_cache.clear()

    class FakeResponse:
        def __init__(self, status_code, body=None):
            self.status_code = status_code
            self._body = body or {}

        def json(self):
            return self._body

    def fake_get(url, headers, timeout):
        assert url == "https://example.supabase.co/auth/v1/user"
        if headers["Authorization"] == "Bearer good-admin-session":
            return FakeResponse(200, {"id": "u1", "email": "pradeep@pradeepnadig.in", "role": "authenticated"})
        return FakeResponse(401)

    monkeypatch.setattr(security.httpx, "get", fake_get)

    ok = client.get(f"{API}/admin/audit-logs", headers={"Authorization": "Bearer good-admin-session"})
    assert ok.status_code == 200, ok.text
    bad = client.get(f"{API}/admin/audit-logs", headers={"Authorization": "Bearer stolen-or-expired"})
    assert bad.status_code == 401
