import time

import jwt
import pytest

from tests.conftest import ADMIN_EMAIL, ADMIN_PASSWORD, login, upsert_admin

API = "/api/v1"
JWT_SECRET = "ci-test-admin-jwt-secret-not-used-in-production"


def make_token(secret=JWT_SECRET, expires_in=3600, sub="1", ver=1):
    now = int(time.time())
    return jwt.encode(
        {"iss": "pradeepnadig-admin", "sub": sub, "ver": ver, "email": ADMIN_EMAIL,
         "role": "PRINCIPAL_ADMIN", "iat": now, "exp": now + expires_in},
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
    ("get", "/admin/auth/me"),
    ("post", "/admin/auth/change-password"),
]


@pytest.mark.parametrize("method,path", ADMIN_ROUTES)
def test_admin_routes_reject_missing_token(client, method, path):
    res = getattr(client, method)(f"{API}{path}")
    assert res.status_code == 401


@pytest.mark.parametrize("method,path", ADMIN_ROUTES)
def test_admin_routes_reject_forged_token(client, method, path):
    headers = {"Authorization": f"Bearer {make_token(secret='attacker-secret-attacker-secret-xx')}"}
    res = getattr(client, method)(f"{API}{path}", headers=headers)
    assert res.status_code == 401


def test_admin_routes_reject_expired_token(client):
    headers = {"Authorization": f"Bearer {make_token(expires_in=-60)}"}
    res = client.get(f"{API}/admin/stats", headers=headers)
    assert res.status_code == 401


def test_login_rejects_wrong_password_and_unknown_account(client):
    wrong = client.post(f"{API}/admin/auth/login", json={"email": ADMIN_EMAIL, "password": "not-the-password"})
    assert wrong.status_code == 401
    unknown = client.post(f"{API}/admin/auth/login", json={"email": "nobody@example.com", "password": "whatever-123"})
    assert unknown.status_code == 401


def test_login_is_rate_limited(client):
    statuses = [
        client.post(f"{API}/admin/auth/login", json={"email": ADMIN_EMAIL, "password": "bad-guess"}).status_code
        for _ in range(7)
    ]
    assert 429 in statuses


def test_failed_attempts_from_one_ip_do_not_lock_out_the_admin_elsewhere(client):
    attacker = {"X-Forwarded-For": "203.0.113.9"}
    for _ in range(6):
        client.post(f"{API}/admin/auth/login", headers=attacker, json={"email": ADMIN_EMAIL, "password": "bad-guess"})
    blocked = client.post(f"{API}/admin/auth/login", headers=attacker,
                          json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert blocked.status_code == 429

    # Spoofed left-most hop is ignored; the proxy-appended address identifies the client
    spoofed = {"X-Forwarded-For": "203.0.113.9, 198.51.100.7"}
    admin = client.post(f"{API}/admin/auth/login", headers=spoofed,
                        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert admin.status_code == 200, admin.text


def test_admin_stats_with_valid_session(client, admin_headers):
    res = client.get(f"{API}/admin/stats", headers=admin_headers)
    assert res.status_code == 200, res.text
    me = client.get(f"{API}/admin/auth/me", headers=admin_headers).json()
    assert me["email"] == ADMIN_EMAIL


def test_password_change_revokes_old_sessions(client):
    email, old_password, new_password = "ci-rotate@pradeepnadig.in", "rotate-old-pass-1", "rotate-new-pass-2"
    client.portal.call(upsert_admin, email, old_password, "STAFF_ADMIN")
    old_token = login(client, email, old_password)["access_token"]
    old_headers = {"Authorization": f"Bearer {old_token}"}

    wrong_current = client.post(f"{API}/admin/auth/change-password", headers=old_headers,
                                json={"email": email, "current_password": "nope-nope-nope", "new_password": new_password})
    assert wrong_current.status_code == 400

    changed = client.post(f"{API}/admin/auth/change-password", headers=old_headers,
                          json={"email": email, "current_password": old_password, "new_password": new_password})
    assert changed.status_code == 200, changed.text
    assert changed.json()["access_token"]

    assert client.get(f"{API}/admin/stats", headers=old_headers).status_code == 401
    login(client, email, new_password)

    # Password never lands in the audit trail
    logs = client.get(f"{API}/admin/audit-logs", headers={"Authorization": f"Bearer {changed.json()['access_token']}"})
    assert new_password not in logs.text and old_password not in logs.text


def test_staff_cannot_reset_other_accounts(client):
    client.portal.call(upsert_admin, "ci-staff@pradeepnadig.in", "staff-pass-12345", "STAFF_ADMIN")
    staff = {"Authorization": f"Bearer {login(client, 'ci-staff@pradeepnadig.in', 'staff-pass-12345')['access_token']}"}
    res = client.post(f"{API}/admin/auth/change-password", headers=staff,
                      json={"email": ADMIN_EMAIL, "new_password": "hijacked-password-1"})
    assert res.status_code == 403
    login(client, ADMIN_EMAIL, ADMIN_PASSWORD)


def test_deactivated_account_session_is_rejected(client):
    email = "ci-leaver@pradeepnadig.in"
    client.portal.call(upsert_admin, email, "leaver-pass-12345", "STAFF_ADMIN")
    headers = {"Authorization": f"Bearer {login(client, email, 'leaver-pass-12345')['access_token']}"}
    client.portal.call(upsert_admin, email, "leaver-pass-12345", "STAFF_ADMIN", False)
    assert client.get(f"{API}/admin/stats", headers=headers).status_code == 401


def test_deleting_records_preserves_full_snapshot_in_audit_log(client, admin_headers):
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

    assert client.delete(f"{API}/enquiries/{enquiry_id}", headers=admin_headers).status_code == 200
    assert client.delete(f"{API}/requests/{request_id}", headers=admin_headers).status_code == 200

    logs = client.get(f"{API}/admin/audit-logs", headers=admin_headers).json()
    deletions = {log["target_resource"]: log for log in logs if log["action_category"] == "DELETE"}

    enquiry_snapshot = deletions[f"/enquiries/{enquiry_id}"]["details"]["deleted_records"][0]
    assert enquiry_snapshot["mobile"] == "9000000001"
    assert enquiry_snapshot["additional_notes"] == "keep me recoverable"

    request_snapshot = deletions[f"/requests/{request_id}"]["details"]["deleted_records"][0]
    assert request_snapshot["request_id"] == request_id
    assert request_snapshot["customer"]["name"] == "Snapshot Test Devotee"


def test_distributed_guessing_is_capped_per_account(client):
    for i in range(20):
        client.post(f"{API}/admin/auth/login", headers={"X-Forwarded-For": f"198.18.0.{i}"},
                    json={"email": ADMIN_EMAIL, "password": "bad-guess"})
    res = client.post(f"{API}/admin/auth/login", headers={"X-Forwarded-For": "198.18.1.1"},
                      json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert res.status_code == 429
