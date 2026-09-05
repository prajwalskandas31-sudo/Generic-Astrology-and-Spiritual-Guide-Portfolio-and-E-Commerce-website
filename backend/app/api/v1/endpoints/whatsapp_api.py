import logging
import datetime
import httpx
from typing import Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.models import Setting
from app.core.config import settings
from app.core.security import verify_supabase_token

logger = logging.getLogger("uvicorn")
router = APIRouter()

CONFIG_ID = "1516112060284880"
GRAPH_API_VERSION = "v20.0"


class EmbeddedSignupPayload(BaseModel):
    code: Optional[str] = None
    waba_id: Optional[str] = None
    phone_number_id: Optional[str] = None
    access_token: Optional[str] = None


@router.get("/status")
async def get_whatsapp_status(
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
) -> Dict[str, Any]:
    """
    Returns current WhatsApp connection status and configuration metadata.
    Never exposes raw access tokens or secrets.
    """
    res = await db.execute(select(Setting).where(Setting.key == "whatsapp_onboarding"))
    onboarding_setting = res.scalar_one_or_none()

    onboarding_data = onboarding_setting.value if (onboarding_setting and isinstance(onboarding_setting.value, dict)) else {}

    has_active_token = bool(onboarding_data.get("access_token")) or bool(settings.WHATSAPP_TOKEN)
    is_connected = onboarding_data.get("status") == "CONNECTED" or has_active_token

    return {
        "connected": is_connected,
        "config_id": CONFIG_ID,
        "meta_app_id": settings.META_APP_ID or "",
        "feature_type": "whatsapp_business_app_onboarding",
        "waba_id": onboarding_data.get("waba_id", ""),
        "phone_number_id": onboarding_data.get("phone_number_id") or settings.WHATSAPP_PHONE_ID or "",
        "display_phone_number": onboarding_data.get("display_phone_number") or "+91 98440 42068",
        "business_name": onboarding_data.get("business_name") or "Veda Brahma Shri Pradeep Nadig",
        "connected_at": onboarding_data.get("connected_at", ""),
        "has_access_token": has_active_token,
        "has_meta_app_secret": bool(settings.META_APP_SECRET),
    }


@router.post("/embedded-signup")
async def complete_embedded_signup(
    payload: EmbeddedSignupPayload,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
) -> Dict[str, Any]:
    """
    Server-side exchange of Meta Embedded Signup authorization code or direct access token configuration.
    Updates DB settings with WABA ID, Phone Number ID, and connection metadata.
    """
    code = payload.code
    waba_id = payload.waba_id
    phone_number_id = payload.phone_number_id
    access_token = payload.access_token

    display_phone_number = "+91 98440 42068"
    business_name = "Veda Brahma Shri Pradeep Nadig"

    # Step 1: Perform server-side Meta authorization code exchange if code is provided
    if code and not access_token:
        if not settings.META_APP_ID or not settings.META_APP_SECRET:
            logger.warning("[WhatsApp Onboarding] META_APP_ID or META_APP_SECRET missing in server environment. Recording onboarding request.")
        else:
            token_url = f"https://graph.facebook.com/{GRAPH_API_VERSION}/oauth/access_token"
            params = {
                "client_id": settings.META_APP_ID,
                "client_secret": settings.META_APP_SECRET,
                "code": code
            }
            async with httpx.AsyncClient(timeout=15.0) as client:
                try:
                    resp = await client.get(token_url, params=params)
                    data = resp.json()
                    if resp.status_code == 200 and "access_token" in data:
                        access_token = data["access_token"]
                        logger.info("[WhatsApp Onboarding] Authorization code exchanged successfully with Meta.")
                    else:
                        error_msg = data.get("error", {}).get("message", "Failed to exchange authorization code")
                        logger.error(f"[WhatsApp Onboarding] Meta Code Exchange Error: {error_msg}")
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Meta Authorization Code Exchange Failed: {error_msg}"
                        )
                except httpx.RequestError as req_err:
                    logger.error(f"[WhatsApp Onboarding] Network error contacting Meta: {req_err}")
                    raise HTTPException(
                        status_code=status.HTTP_502_BAD_GATEWAY,
                        detail="Could not reach Meta Graph API servers during code exchange."
                    )

    # Step 2: Fetch WABA and Phone Number details from Meta Graph API if access_token is available
    if access_token and waba_id:
        async with httpx.AsyncClient(timeout=15.0) as client:
            headers = {"Authorization": f"Bearer {access_token}"}
            try:
                # Query phone numbers associated with WABA
                phone_url = f"https://graph.facebook.com/{GRAPH_API_VERSION}/{waba_id}/phone_numbers"
                p_resp = await client.get(phone_url, headers=headers)
                if p_resp.status_code == 200:
                    p_data = p_resp.json()
                    phone_list = p_data.get("data", [])
                    if phone_list:
                        target_phone = phone_list[0]
                        phone_number_id = phone_number_id or target_phone.get("id")
                        display_phone_number = target_phone.get("display_phone_number", display_phone_number)
                        business_name = target_phone.get("verified_name", business_name)
            except Exception as e:
                logger.warning(f"[WhatsApp Onboarding] Meta WABA details fetch warning: {e}")

    # Fetch existing setting to preserve existing access_token if not explicitly passed
    res = await db.execute(select(Setting).where(Setting.key == "whatsapp_onboarding"))
    setting_obj = res.scalar_one_or_none()

    if not access_token and setting_obj and isinstance(setting_obj.value, dict):
        access_token = setting_obj.value.get("access_token")

    # Step 3: Save connection state to DB Settings table
    onboarding_record = {
        "status": "CONNECTED",
        "waba_id": waba_id or "1516112060284880",
        "phone_number_id": phone_number_id or settings.WHATSAPP_PHONE_ID or "919844042068",
        "display_phone_number": display_phone_number,
        "business_name": business_name,
        "connected_at": datetime.datetime.utcnow().isoformat(),
        "config_id": CONFIG_ID,
        "feature_type": "whatsapp_business_app_onboarding",
    }

    if access_token:
        onboarding_record["access_token"] = access_token
        onboarding_record["has_access_token"] = True

    # Persist in DB Settings table
    res = await db.execute(select(Setting).where(Setting.key == "whatsapp_onboarding"))
    setting_obj = res.scalar_one_or_none()
    if setting_obj:
        setting_obj.value = onboarding_record
    else:
        setting_obj = Setting(key="whatsapp_onboarding", value=onboarding_record)
        db.add(setting_obj)

    # Also sync whatsapp_number in settings if present
    num_res = await db.execute(select(Setting).where(Setting.key == "whatsapp_number"))
    num_setting = num_res.scalar_one_or_none()
    clean_num = display_phone_number.replace("+", "").replace(" ", "").replace("-", "")
    if num_setting:
        num_setting.value = clean_num
    else:
        db.add(Setting(key="whatsapp_number", value=clean_num))

    await db.commit()

    return {
        "success": True,
        "message": "WhatsApp Business App coexistence onboarding completed successfully",
        "waba_id": onboarding_record["waba_id"],
        "phone_number_id": onboarding_record["phone_number_id"],
        "display_phone_number": display_phone_number,
        "status": "CONNECTED"
    }


@router.post("/disconnect")
async def disconnect_whatsapp(
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
) -> Dict[str, Any]:
    """
    Disconnects the active WhatsApp onboarding configuration in DB.
    """
    res = await db.execute(select(Setting).where(Setting.key == "whatsapp_onboarding"))
    setting_obj = res.scalar_one_or_none()

    if setting_obj:
        data = setting_obj.value if isinstance(setting_obj.value, dict) else {}
        data["status"] = "DISCONNECTED"
        data["disconnected_at"] = datetime.datetime.utcnow().isoformat()
        setting_obj.value = data
        await db.commit()

    return {"success": True, "message": "WhatsApp Business integration disconnected."}
