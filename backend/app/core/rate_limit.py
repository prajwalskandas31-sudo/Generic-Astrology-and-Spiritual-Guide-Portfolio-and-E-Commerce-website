import time
from collections import defaultdict
from fastapi import Request, HTTPException, status
from typing import Dict, List

class InMemoryRateLimiter:
    """
    In-memory sliding-window rate limiter for public endpoints.
    Protects against automated spam and denial-of-service/API quota exhaustion.
    """
    def __init__(self, requests_per_minute: int = 10, burst: int = 15):
        self.requests_per_minute = requests_per_minute
        self.burst = burst
        self.records: Dict[str, List[float]] = defaultdict(list)
        self.last_cleanup = time.time()

    def _cleanup_old_records(self, now: float):
        # Periodic cleanup of expired IP records to prevent memory growth
        if now - self.last_cleanup > 300:  # Every 5 minutes
            expired_keys = [
                k for k, timestamps in self.records.items()
                if not timestamps or (now - timestamps[-1] > 120)
            ]
            for k in expired_keys:
                del self.records[k]
            self.last_cleanup = now

    def is_blocked(self, key: str) -> bool:
        """True when `key` already has `burst` events in the window; records nothing."""
        now = time.time()
        self._cleanup_old_records(now)
        timestamps = [t for t in self.records.get(key, []) if now - t < 60.0]
        if timestamps:
            self.records[key] = timestamps
        return len(timestamps) >= self.burst

    def record(self, key: str) -> None:
        self.records[key].append(time.time())

    def is_rate_limited(self, key: str) -> bool:
        now = time.time()
        self._cleanup_old_records(now)

        window = 60.0  # 60 second rolling window
        timestamps = [t for t in self.records[key] if now - t < window]

        if len(timestamps) >= self.burst:
            self.records[key] = timestamps
            return True

        timestamps.append(now)
        self.records[key] = timestamps
        return False


def get_client_ip(request: Request) -> str:
    """
    Extracts the client IP behind Caddy. Caddy appends the real peer address as the
    last X-Forwarded-For hop; earlier hops are client-supplied and spoofable.
    """
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()
    if request.client:
        return request.client.host
    return "unknown"


# Rate limiter instances for sensitive public entry points
enquiry_limiter = InMemoryRateLimiter(requests_per_minute=5, burst=8)
review_limiter = InMemoryRateLimiter(requests_per_minute=5, burst=8)
# Admin sign-in / password checks, keyed separately by IP and by account email
login_limiter = InMemoryRateLimiter(requests_per_minute=5, burst=5)
# Failed passwords only, keyed by (account, IP): a bad actor cannot lock out the real admin
login_failure_limiter = InMemoryRateLimiter(requests_per_minute=5, burst=5)
# Account-wide failed passwords from any IP: caps distributed guessing. Set high so a
# single attacker cannot easily lock out the real admin.
account_failure_limiter = InMemoryRateLimiter(requests_per_minute=20, burst=20)

# (account, IP) pairs that signed in successfully recently. These skip the account-wide
# cap, so an attacker tripping it cannot lock the real admin out of their usual device.
TRUSTED_LOGIN_TTL_SECONDS = 30 * 24 * 3600
_trusted_logins: Dict[str, float] = {}


def mark_trusted_login(key: str) -> None:
    now = time.time()
    if len(_trusted_logins) > 1000:
        for k in [k for k, t in _trusted_logins.items() if now - t > TRUSTED_LOGIN_TTL_SECONDS]:
            del _trusted_logins[k]
    _trusted_logins[key] = now


def is_trusted_login(key: str) -> bool:
    seen = _trusted_logins.get(key)
    return seen is not None and time.time() - seen < TRUSTED_LOGIN_TTL_SECONDS

async def check_enquiry_rate_limit(request: Request):
    ip = get_client_ip(request)
    if enquiry_limiter.is_rate_limited(ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many enquiry requests from this IP. Please wait a minute before submitting again.",
            headers={"Retry-After": "60"}
        )

async def check_review_rate_limit(request: Request):
    ip = get_client_ip(request)
    if review_limiter.is_rate_limited(ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many review submissions from this IP. Please wait a minute before submitting again.",
            headers={"Retry-After": "60"}
        )
