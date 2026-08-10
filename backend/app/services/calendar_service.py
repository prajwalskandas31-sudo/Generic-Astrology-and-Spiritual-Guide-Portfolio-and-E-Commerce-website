import datetime
import httpx
from typing import List, Optional, Dict, Any
from app.core.config import settings

GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3/calendars/primary/events"


async def get_google_access_token() -> Optional[str]:
    """
    Exchanges GOOGLE_REFRESH_TOKEN for a temporary OAuth 2.0 access token.
    Returns access token string or None if credentials are missing or invalid.
    """
    client_id = settings.GOOGLE_CLIENT_ID.strip() if settings.GOOGLE_CLIENT_ID else None
    client_secret = settings.GOOGLE_CLIENT_SECRET.strip() if settings.GOOGLE_CLIENT_SECRET else None
    refresh_token = settings.GOOGLE_REFRESH_TOKEN.strip() if settings.GOOGLE_REFRESH_TOKEN else None

    if not (client_id and client_secret and refresh_token):
        return None

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                GOOGLE_TOKEN_URL,
                data={
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "refresh_token": refresh_token,
                    "grant_type": "refresh_token",
                },
            )
            if resp.status_code == 200:
                token_data = resp.json()
                return token_data.get("access_token")
            else:
                print(f"[Google OAuth Token Error]: Status {resp.status_code} - {resp.text}")
                return None
    except Exception as e:
        print(f"[Google OAuth Token Exception]: {e}")
        return None


async def check_google_calendar_status() -> Dict[str, Any]:
    """
    Checks if Google Calendar API OAuth credentials are configured and functional.
    """
    has_client_id = bool(settings.GOOGLE_CLIENT_ID and settings.GOOGLE_CLIENT_ID.strip())
    has_client_secret = bool(settings.GOOGLE_CLIENT_SECRET and settings.GOOGLE_CLIENT_SECRET.strip())
    has_refresh_token = bool(settings.GOOGLE_REFRESH_TOKEN and settings.GOOGLE_REFRESH_TOKEN.strip())

    configured = has_client_id and has_client_secret and has_refresh_token

    if not configured:
        return {
            "configured": False,
            "connected": False,
            "mode": "Fallback (One-Click Web Links)",
            "message": "Google OAuth credentials not configured. Running in Graceful Fallback Mode.",
            "details": {
                "has_client_id": has_client_id,
                "has_client_secret": has_client_secret,
                "has_refresh_token": has_refresh_token,
            }
        }

    token = await get_google_access_token()
    if token:
        return {
            "configured": True,
            "connected": True,
            "mode": "Server-side API",
            "message": "Google Calendar API connected and ready.",
            "details": {
                "has_client_id": True,
                "has_client_secret": True,
                "has_refresh_token": True,
            }
        }

    return {
        "configured": True,
        "connected": False,
        "mode": "Fallback (Token Refresh Failed)",
        "message": "Google OAuth credentials set, but token refresh failed. Please verify credentials.",
        "details": {
            "has_client_id": has_client_id,
            "has_client_secret": has_client_secret,
            "has_refresh_token": has_refresh_token,
        }
    }


def format_iso_datetime(dt_str: str) -> str:
    """
    Ensures datetime string is formatted as ISO 8601 with timezone suffix.
    Default timezone is +05:30 (IST / Asia/Kolkata).
    """
    dt_str = dt_str.strip()
    if "+" in dt_str or "Z" in dt_str or dt_str.endswith("00"):
        return dt_str

    if "T" not in dt_str:
        dt_str = f"{dt_str}T10:00:00"

    return f"{dt_str}+05:30"


async def create_google_calendar_event(
    summary: str,
    description: str,
    location: str,
    start_time: str,
    end_time: str,
    attendee_emails: List[str],
    create_meet_link: bool = False
) -> Dict[str, Any]:
    """
    Creates a Google Calendar Event and sends invitations to attendees.
    Uses real Google Calendar API v3 if credentials are available, or mock event structure if in fallback mode.
    """
    valid_emails = [e.strip() for e in attendee_emails if e and "@" in e]
    start_iso = format_iso_datetime(start_time)
    end_iso = format_iso_datetime(end_time)

    access_token = await get_google_access_token()

    if access_token:
        event_body = {
            "summary": summary,
            "location": location,
            "description": description,
            "start": {"dateTime": start_iso, "timeZone": "Asia/Kolkata"},
            "end": {"dateTime": end_iso, "timeZone": "Asia/Kolkata"},
            "attendees": [{"email": email} for email in valid_emails],
        }

        if create_meet_link:
            event_body["conferenceData"] = {
                "createRequest": {
                    "requestId": f"req_{int(datetime.datetime.utcnow().timestamp())}",
                    "conferenceSolutionKey": {"type": "hangoutsMeet"}
                }
            }

        params = {"sendUpdates": "all"}
        if create_meet_link:
            params["conferenceDataVersion"] = "1"

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(
                    GOOGLE_CALENDAR_API_BASE,
                    json=event_body,
                    params=params,
                    headers={
                        "Authorization": f"Bearer {access_token}",
                        "Content-Type": "application/json",
                    }
                )
                if resp.status_code in (200, 201):
                    data = resp.json()
                    event_id = data.get("id")
                    html_link = data.get("htmlLink")
                    meet_link = data.get("hangoutLink")

                    print(f"[GOOGLE CALENDAR API EVENT CREATED] Summary: '{summary}' | ID: {event_id} | Link: {html_link}")

                    return {
                        "status": "event_created",
                        "mode": "API",
                        "event_id": event_id,
                        "html_link": html_link,
                        "meet_link": meet_link,
                        "summary": summary,
                        "attendees": valid_emails,
                        "event_payload": data
                    }
                else:
                    print(f"[Google Calendar API Error]: Status {resp.status_code} - {resp.text}")
        except Exception as e:
            print(f"[Google Calendar API Exception]: {e}")

    # Fallback mode response
    mock_id = f"evt_{int(datetime.datetime.utcnow().timestamp())}"
    encoded_title = summary.replace(" ", "%20")
    encoded_details = description.replace(" ", "%20").replace("\n", "%0A")
    encoded_loc = location.replace(" ", "%20")
    mock_link = f"https://calendar.google.com/calendar/render?action=TEMPLATE&text={encoded_title}&details={encoded_details}&location={encoded_loc}"

    print(f"[GOOGLE CALENDAR FALLBACK] Summary: '{summary}' | Location: '{location}' | Attendees: {valid_emails}")

    return {
        "status": "event_created_fallback",
        "mode": "Fallback",
        "event_id": mock_id,
        "html_link": mock_link,
        "meet_link": None,
        "summary": summary,
        "attendees": valid_emails,
        "message": "Event prepared in fallback mode (One-click Google Calendar web link)."
    }

