from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Blog
from app.schemas.schemas import BlogCreate, BlogResponse, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

@router.get("", response_model=List[BlogResponse])
async def get_blogs(category: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    query = select(Blog)
    if category:
        query = query.where(Blog.category == category)
    query = query.order_by(Blog.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{slug}", response_model=BlogResponse)
async def get_blog_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    query = select(Blog).where(Blog.slug == slug)
    result = await db.execute(query)
    blog = result.scalar_one_or_none()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog

@router.post("", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
async def create_blog(
    data: BlogCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    existing = await db.execute(select(Blog).where(Blog.slug == data.slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Blog slug already exists")
    
    blog = Blog(**data.model_dump())
    db.add(blog)
    await db.commit()
    await db.refresh(blog)
    return blog

@router.put("/{id}", response_model=BlogResponse)
async def update_blog(
    id: int,
    data: BlogCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    blog = await db.get(Blog, id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    for key, value in data.model_dump().items():
        setattr(blog, key, value)
        
    await db.commit()
    await db.refresh(blog)
    return blog

@router.delete("/{id}", response_model=MessageResponse)
async def delete_blog(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    blog = await db.get(Blog, id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    await db.delete(blog)
    await db.commit()
    return MessageResponse(message="Blog post deleted successfully")
