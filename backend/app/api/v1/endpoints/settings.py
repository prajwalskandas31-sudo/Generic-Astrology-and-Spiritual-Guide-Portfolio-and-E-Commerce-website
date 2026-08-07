from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Dict, Any
from app.db.session import get_db
from app.models.models import Setting
from app.schemas.schemas import SettingUpdate, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

from fastapi.responses import JSONResponse

@router.get("", response_model=Dict[str, Any])
async def get_all_settings(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(Setting))
        settings_items = result.scalars().all()
        return {s.key: s.value for s in settings_items}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Settings Error: {str(e)}", "error_type": type(e).__name__})

@router.put("/{key}", response_model=MessageResponse)
async def update_setting(
    key: str,
    data: SettingUpdate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    result = await db.execute(select(Setting).where(Setting.key == key))
    setting = result.scalar_one_or_none()
    
    if setting:
        setting.value = data.value
    else:
        setting = Setting(key=key, value=data.value)
        db.add(setting)
        
    await db.commit()
    return MessageResponse(message=f"Setting for '{key}' updated successfully")
