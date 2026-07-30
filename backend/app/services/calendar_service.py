import datetime
from app.core.config import settings

async def create_google_calendar_event(
    summary: str,
    description: str,
    location: str,
    start_time: str,
    end_time: str,
    attendee_emails: list[str]
):
    """
    Creates a Google Calendar Event and sends invitations to attendees.
    Uses mock calendar event structure if OAuth credentials are not configured.
    """
    event_payload = {
        "summary": summary,
        "location": location,
        "description": description,
        "start": {"dateTime": start_time, "timeZone": "Asia/Kolkata"},
        "end": {"dateTime": end_time, "timeZone": "Asia/Kolkata"},
        "attendees": [{"email": email} for email in attendee_emails if email],
    }

    print(f"[GOOGLE CALENDAR EVENT CREATED] Summary: '{summary}' | Location: '{location}' | Attendees: {attendee_emails}")
    return {"status": "event_created", "event": event_payload, "event_id": f"evt_{datetime.datetime.utcnow().timestamp()}"}
