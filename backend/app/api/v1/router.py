from fastapi import APIRouter
from app.api.v1.endpoints import (
    offerings, workshops, payments, classes_api,
    blogs, gallery, media, faq, enquiries, settings, admin, webhooks, requests_api
)

api_router = APIRouter()

@api_router.get("/", tags=["API v1 Root"])
async def api_v1_root():
    return {
        "version": "v1",
        "endpoints": [
            "/offerings",
            "/workshops",
            "/classes",
            "/blogs",
            "/gallery",
            "/media",
            "/faq",
            "/enquiries",
            "/requests",
            "/settings",
            "/payments"
        ]
    }

api_router.include_router(offerings.router, prefix="/offerings", tags=["Offerings"])
api_router.include_router(workshops.router, prefix="/workshops", tags=["Workshops"])
api_router.include_router(payments.router, prefix="/payments", tags=["Payments"])
api_router.include_router(classes_api.router, prefix="/classes", tags=["Classes"])
api_router.include_router(blogs.router, prefix="/blogs", tags=["Blogs"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["Gallery"])
api_router.include_router(media.router, prefix="/media", tags=["Media Library"])
api_router.include_router(faq.router, prefix="/faq", tags=["FAQ"])
api_router.include_router(enquiries.router, prefix="/enquiries", tags=["Enquiries"])
api_router.include_router(requests_api.router, prefix="/requests", tags=["Request Threads"])
api_router.include_router(settings.router, prefix="/settings", tags=["Settings"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Dashboard"])
api_router.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])

