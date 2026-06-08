from functools import lru_cache
from typing import Annotated

from fastapi import Depends, Header, HTTPException, status

from app.core.config import Settings, get_settings
from app.domain.exceptions import InvalidTokenError
from app.infrastructure.repositories.in_memory_contact_repository import InMemoryContactRepository
from app.infrastructure.repositories.in_memory_profile_repository import InMemoryProfileRepository
from app.infrastructure.repositories.in_memory_resource_repository import InMemoryResourceRepository
from app.infrastructure.security.token_service import TokenService

profile_repository = InMemoryProfileRepository()
resource_repository = InMemoryResourceRepository()
contact_repository = InMemoryContactRepository()


def get_profile_repository() -> InMemoryProfileRepository:
    return profile_repository


def get_resource_repository() -> InMemoryResourceRepository:
    return resource_repository


def get_contact_repository() -> InMemoryContactRepository:
    return contact_repository


@lru_cache
def get_token_service() -> TokenService:
    return TokenService(get_settings().token_secret)


def get_current_username(
    authorization: Annotated[str | None, Header()] = None,
    token_service: TokenService = Depends(get_token_service),
) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token requerido",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.split(" ", 1)[1]

    try:
        return token_service.verify(token)
    except InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc


def settings_dependency() -> Settings:
    return get_settings()
