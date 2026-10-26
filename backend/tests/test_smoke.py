import time

import jwt
import pytest

API = "/api/v1"
JWT_SECRET = "ci-test-jwt-secret-not-used-in-production"


def make_token(secret=JWT_SECRET, expires_in=3600):
    now = int(time.time())
    return jwt.encode(
        {"sub": "ci-admin", "role": "authenticated", "iat": now, "exp": now + expires_in},
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
