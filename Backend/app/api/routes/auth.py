from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_token_service, settings_dependency
from app.api.schemas import LoginRequest, LoginResponse
from app.application.use_cases.authenticate_user import AuthenticateUser
from app.core.config import Settings
from app.domain.exceptions import InvalidCredentialsError
from app.infrastructure.security.token_service import TokenService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(
    payload: LoginRequest,
    settings: Settings = Depends(settings_dependency),
    token_service: TokenService = Depends(get_token_service),
) -> LoginResponse:
    use_case = AuthenticateUser(settings=settings, token_service=token_service)

    try:
        token, expires_at = use_case.execute(payload.username, payload.password)
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=InvalidCredentialsError.message,
        ) from exc

    return LoginResponse(access_token=token, expires_at=expires_at)

