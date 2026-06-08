from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_username, get_resource_repository
from app.api.schemas import ResourceSchema
from app.application.use_cases.list_resources import ListResources
from app.infrastructure.repositories.in_memory_resource_repository import InMemoryResourceRepository

router = APIRouter(prefix="/resources", tags=["resources"])


@router.get("", response_model=list[ResourceSchema])
def list_resources(
    _: str = Depends(get_current_username),
    repository: InMemoryResourceRepository = Depends(get_resource_repository),
) -> list[ResourceSchema]:
    use_case = ListResources(repository)
    return [ResourceSchema.from_domain(resource) for resource in use_case.execute()]

