from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.session import get_db
from app.models.models import ClassItem
from app.schemas.schemas import ClassCreate, ClassResponse, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

@router.get("", response_model=List[ClassResponse])
async def get_classes(db: AsyncSession = Depends(get_db)):
    query = select(ClassItem).where(ClassItem.status == "Active").order_by(ClassItem.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=ClassResponse, status_code=status.HTTP_201_CREATED)
async def create_class(
    data: ClassCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    class_item = ClassItem(**data.model_dump())
    db.add(class_item)
    await db.commit()
    await db.refresh(class_item)
    return class_item

@router.put("/{id}", response_model=ClassResponse)
async def update_class(
    id: int,
    data: ClassCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    item = await db.get(ClassItem, id)
    if not item:
        raise HTTPException(status_code=404, detail="Class not found")
    
    for key, value in data.model_dump().items():
        setattr(item, key, value)
        
    await db.commit()
    await db.refresh(item)
    return item

@router.delete("/{id}", response_model=MessageResponse)
async def delete_class(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    item = await db.get(ClassItem, id)
    if not item:
        raise HTTPException(status_code=404, detail="Class not found")
    
    await db.delete(item)
    await db.commit()
    return MessageResponse(message="Class deleted successfully")
