from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_username, get_profile_repository
from app.api.schemas import ProfileSchema
from app.application.use_cases.get_profile import GetProfile
from app.application.use_cases.update_profile import UpdateProfile
from app.infrastructure.repositories.in_memory_profile_repository import InMemoryProfileRepository

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=ProfileSchema)
def get_profile(
    repository: InMemoryProfileRepository = Depends(get_profile_repository),
) -> ProfileSchema:
    use_case = GetProfile(repository)
    return ProfileSchema.from_domain(use_case.execute())


@router.put("", response_model=ProfileSchema)
def update_profile(
    payload: ProfileSchema,
    _: str = Depends(get_current_username),
    repository: InMemoryProfileRepository = Depends(get_profile_repository),
) -> ProfileSchema:
    use_case = UpdateProfile(repository)
    return ProfileSchema.from_domain(use_case.execute(payload.to_domain()))

