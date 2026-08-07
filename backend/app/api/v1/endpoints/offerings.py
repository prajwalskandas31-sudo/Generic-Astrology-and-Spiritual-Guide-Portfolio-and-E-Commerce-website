from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Offering
from app.schemas.schemas import OfferingCreate, OfferingResponse, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

from fastapi.responses import JSONResponse

@router.get("", response_model=List[OfferingResponse])
async def get_offerings(type: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    try:
        query = select(Offering).where(Offering.status == "Published")
        if type:
            query = query.where(Offering.type == type)
        query = query.order_by(Offering.display_order.asc(), Offering.id.desc())
        result = await db.execute(query)
        return result.scalars().all()
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Offerings Error: {str(e)}", "error_type": type(e).__name__})

@router.get("/{slug}", response_model=OfferingResponse)
async def get_offering_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    try:
        query = select(Offering).where(Offering.slug == slug)
        result = await db.execute(query)
        offering = result.scalar_one_or_none()
        if not offering:
            raise HTTPException(status_code=404, detail="Offering not found")
        return offering
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Offering Detail Error: {str(e)}", "error_type": type(e).__name__})

@router.post("", response_model=OfferingResponse, status_code=status.HTTP_201_CREATED)
async def create_offering(
    data: OfferingCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    existing = await db.execute(select(Offering).where(Offering.slug == data.slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Offering slug already exists")
    
    offering = Offering(**data.model_dump())
    db.add(offering)
    await db.commit()
    await db.refresh(offering)
    return offering

@router.put("/{id}", response_model=OfferingResponse)
async def update_offering(
    id: int,
    data: OfferingCreate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    offering = await db.get(Offering, id)
    if not offering:
        raise HTTPException(status_code=404, detail="Offering not found")
    
    for key, value in data.model_dump().items():
        setattr(offering, key, value)
    
    await db.commit()
    await db.refresh(offering)
    return offering

@router.delete("/{id}", response_model=MessageResponse)
async def delete_offering(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    offering = await db.get(Offering, id)
    if not offering:
        raise HTTPException(status_code=404, detail="Offering not found")
    
    await db.delete(offering)
    await db.commit()
    return MessageResponse(message="Offering deleted successfully")
