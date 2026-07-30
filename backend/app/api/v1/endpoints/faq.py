from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.db.session import get_db
from app.models.models import FAQItem
from app.schemas.schemas import FAQCreate, FAQResponse, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

@router.get("", response_model=List[FAQResponse])
async def get_faqs(category: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    query = select(FAQItem)
    if category:
        query = query.where(FAQItem.category == category)
    query = query.order_by(FAQItem.display_order.asc(), FAQItem.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
async def create_faq(
    data: FAQCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    faq = FAQItem(**data.model_dump())
    db.add(faq)
    await db.commit()
    await db.refresh(faq)
    return faq

@router.put("/{id}", response_model=FAQResponse)
async def update_faq(
    id: int,
    data: FAQCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    faq = await db.get(FAQItem, id)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ item not found")
    
    for key, value in data.model_dump().items():
        setattr(faq, key, value)
        
    await db.commit()
    await db.refresh(faq)
    return faq

@router.delete("/{id}", response_model=MessageResponse)
async def delete_faq(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    faq = await db.get(FAQItem, id)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ item not found")
    
    await db.delete(faq)
    await db.commit()
    return MessageResponse(message="FAQ item deleted successfully")
