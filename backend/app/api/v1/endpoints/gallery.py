from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.db.session import get_db
from app.models.models import GalleryItem, GalleryAlbum
from app.schemas.schemas import (
    GalleryItemCreate, GalleryItemResponse,
    GalleryAlbumCreate, GalleryAlbumResponse, MessageResponse
)
from app.core.security import verify_supabase_token

router = APIRouter()

@router.get("", response_model=List[GalleryItemResponse])
async def get_gallery_items(db: AsyncSession = Depends(get_db)):
    query = select(GalleryItem).order_by(GalleryItem.display_order.asc(), GalleryItem.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/albums", response_model=List[GalleryAlbumResponse])
async def get_gallery_albums(db: AsyncSession = Depends(get_db)):
    query = select(GalleryAlbum).options(selectinload(GalleryAlbum.items)).order_by(GalleryAlbum.display_order.asc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/items", response_model=GalleryItemResponse, status_code=status.HTTP_201_CREATED)
async def create_gallery_item(
    data: GalleryItemCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    item = GalleryItem(**data.model_dump())
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item

@router.post("/albums", response_model=GalleryAlbumResponse, status_code=status.HTTP_201_CREATED)
async def create_gallery_album(
    data: GalleryAlbumCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    album = GalleryAlbum(**data.model_dump())
    db.add(album)
    await db.commit()
    res = await db.execute(select(GalleryAlbum).options(selectinload(GalleryAlbum.items)).where(GalleryAlbum.id == album.id))
    return res.scalar_one()

@router.delete("/items/{id}", response_model=MessageResponse)
async def delete_gallery_item(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    item = await db.get(GalleryItem, id)
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    await db.delete(item)
    await db.commit()
    return MessageResponse(message="Gallery item deleted successfully")
