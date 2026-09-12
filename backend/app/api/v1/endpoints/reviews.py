from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Review
from app.schemas.schemas import ReviewCreate, ReviewResponse, ReviewStatusUpdate, MessageResponse
from app.core.security import verify_supabase_token

router = APIRouter()

# Public: Fetch all approved reviews
@router.get("", response_model=List[ReviewResponse])
async def get_approved_reviews(db: AsyncSession = Depends(get_db)):
    query = (
        select(Review)
        .where(Review.status == "Approved")
        .order_by(Review.display_order.asc(), Review.id.desc())
    )
    result = await db.execute(query)
    return result.scalars().all()

# Public: Submit a new client review (starts as Pending)
@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def submit_review(
    data: ReviewCreate,
    db: AsyncSession = Depends(get_db)
):
    review = Review(
        name=data.name,
        city=data.city,
        rating=max(1, min(5, data.rating)),
        service_type=data.service_type,
        comment=data.comment,
        status="Pending",
    )
    db.add(review)
    await db.commit()
    await db.refresh(review)
    return review

# Admin: Fetch all reviews (optionally filter by status: Pending, Approved, Rejected)
@router.get("/admin", response_model=List[ReviewResponse])
async def get_admin_reviews(
    review_status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    query = select(Review)
    if review_status:
        query = query.where(Review.status == review_status)
    query = query.order_by(Review.id.desc())
    result = await db.execute(query)
    return result.scalars().all()

# Admin: Update review status (Approved / Rejected)
@router.put("/admin/{id}/status", response_model=ReviewResponse)
async def update_review_status(
    id: int,
    data: ReviewStatusUpdate,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    review = await db.get(Review, id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if data.status not in ["Pending", "Approved", "Rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status. Must be Pending, Approved, or Rejected")

    review.status = data.status
    await db.commit()
    await db.refresh(review)
    return review

# Admin: Delete a review
@router.delete("/admin/{id}", response_model=MessageResponse)
async def delete_review(
    id: int,
    db: AsyncSession = Depends(get_db),
    auth: dict = Depends(verify_supabase_token)
):
    review = await db.get(Review, id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    await db.delete(review)
    await db.commit()
    return MessageResponse(message="Review deleted successfully")
