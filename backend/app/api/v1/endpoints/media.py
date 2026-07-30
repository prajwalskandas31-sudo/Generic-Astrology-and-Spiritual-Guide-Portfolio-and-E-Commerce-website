from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.session import get_db
from app.models.models import MediaItem
from app.schemas.schemas import MediaItemCreate, MediaItemResponse, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

@router.get("", response_model=List[MediaItemResponse])
async def get_media_library(db: AsyncSession = Depends(get_db)):
    query = select(MediaItem).order_by(MediaItem.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=MediaItemResponse, status_code=status.HTTP_201_CREATED)
async def upload_media(
    data: MediaItemCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    media = MediaItem(**data.model_dump())
    db.add(media)
    await db.commit()
    await db.refresh(media)
    return media

@router.delete("/{id}", response_model=MessageResponse)
async def delete_media(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    media = await db.get(MediaItem, id)
    if not media:
        raise HTTPException(status_code=404, detail="Media item not found")
    
    await db.delete(media)
    await db.commit()
    return MessageResponse(message="Media deleted successfully")
