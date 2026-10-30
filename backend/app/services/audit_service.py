import datetime
from typing import Any, Iterable, Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import AuditLog


def snapshot_model(obj: Any) -> Optional[dict]:
    """Serialises every column of a SQLAlchemy row into JSON-safe values."""
    if obj is None:
        return None
    data = {}
    for column in obj.__table__.columns:
        value = getattr(obj, column.name, None)
        if isinstance(value, (datetime.datetime, datetime.date)):
            value = value.isoformat()
        data[column.name] = value
    return data


def record_deletion(
    db: AsyncSession,
    auth: dict,
    summary: str,
    target_resource: str,
    records: Iterable[dict],
) -> None:
    """
    Adds an audit row holding full snapshots of records about to be hard-deleted.
    Must be called before db.delete()/commit so the snapshot commits atomically
    with the delete — deleted customer data then stays recoverable from Audit Logs.
    """
    # Identity comes only from verified claims: user_metadata is user-editable in Supabase
    email = (auth or {}).get("email") or (auth or {}).get("sub") or "unknown"
    app_metadata = (auth or {}).get("app_metadata") or {}
    db.add(
        AuditLog(
            user_name=email,
            user_email=email,
            user_role=app_metadata.get("role") or "ADMIN",
            action_category="DELETE",
            action_summary=summary,
            target_resource=target_resource,
            details={"deleted_records": list(records), "source": "server"},
            ip_address="server",
            severity="WARNING",
        )
    )
