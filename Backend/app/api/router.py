from fastapi import APIRouter

from app.api.routes import auth, contact, health, profile, resources

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(profile.router)
api_router.include_router(resources.router)
api_router.include_router(contact.router)

