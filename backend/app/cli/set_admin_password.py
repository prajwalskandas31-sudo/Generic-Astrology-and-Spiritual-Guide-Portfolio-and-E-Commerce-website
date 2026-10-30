"""
Create an admin account or set its password, directly in the production database.

    docker exec -it pradeep_backend python -m app.cli.set_admin_password prajwal@pradeepnadig.in

The password is typed at a hidden prompt, so it never appears in shell history,
process lists or logs. Setting a password signs that account out everywhere.
"""
import argparse
import asyncio
import getpass
import sys

from sqlalchemy.future import select

from app.core.security import hash_password
from app.db.session import AsyncSessionLocal, engine
from app.models.models import AdminUser, AuditLog

MIN_PASSWORD_LENGTH = 10

KNOWN_ADMINS = {
    "prajwal@pradeepnadig.in": ("Prajwal Skanda S", "PRINCIPAL_ADMIN"),
    "pradeep@pradeepnadig.in": ("Veda Brahma Shri Pradeep Nadig", "MASTER_ADMIN"),
    "staff@pradeepnadig.in": ("Assigned Coordinator", "STAFF_ADMIN"),
}
ROLES = ("PRINCIPAL_ADMIN", "MASTER_ADMIN", "STAFF_ADMIN")


def prompt_password() -> str:
    while True:
        first = getpass.getpass("New password: ")
        if len(first) < MIN_PASSWORD_LENGTH:
            print(f"Password must be at least {MIN_PASSWORD_LENGTH} characters.")
            continue
        if first != getpass.getpass("Repeat password: "):
            print("Passwords did not match, try again.")
            continue
        return first


async def run(email: str, name: str | None, role: str | None, deactivate: bool) -> None:
    async with engine.begin() as conn:
        await conn.run_sync(AdminUser.__table__.create, checkfirst=True)

    async with AsyncSessionLocal() as db:
        admin = (await db.execute(select(AdminUser).where(AdminUser.email == email))).scalar_one_or_none()

        if deactivate:
            if not admin:
                sys.exit(f"No admin account for {email}.")
            admin.is_active = False
            admin.token_version = (admin.token_version or 1) + 1
            summary = f"Admin account {email} deactivated from server console"
        else:
            password_hash = hash_password(prompt_password())
            default_name, default_role = KNOWN_ADMINS.get(email, (None, None))
            if admin:
                admin.password_hash = password_hash
                admin.is_active = True
                admin.token_version = (admin.token_version or 1) + 1
                if name:
                    admin.name = name
                if role:
                    admin.role = role
                summary = f"Admin password for {email} reset from server console"
            else:
                admin = AdminUser(
                    email=email,
                    name=name or default_name or email,
                    role=role or default_role or "STAFF_ADMIN",
                    password_hash=password_hash,
                )
                db.add(admin)
                summary = f"Admin account {email} created from server console"

        db.add(AuditLog(
            user_name="Server Console",
            user_email="system@pradeepnadig.in",
            user_role="PRINCIPAL_ADMIN",
            action_category="SYSTEM",
            action_summary=summary,
            target_resource="Admin Accounts",
            details={"target_email": email},
            ip_address="server",
            severity="CRITICAL",
        ))
        await db.commit()
        print(f"OK: {summary} ({admin.name}, {admin.role}).")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create an admin account or set its password.")
    parser.add_argument("email")
    parser.add_argument("--name", help="Display name (defaults for the known admin emails)")
    parser.add_argument("--role", choices=ROLES)
    parser.add_argument("--deactivate", action="store_true", help="Disable the account and sign it out")
    args = parser.parse_args()
    asyncio.run(run(args.email.strip().lower(), args.name, args.role, args.deactivate))


if __name__ == "__main__":
    main()
