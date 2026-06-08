from datetime import datetime, timedelta, timezone
from hmac import compare_digest

from app.core.config import Settings
from app.domain.exceptions import InvalidCredentialsError
from app.infrastructure.security.token_service import TokenService


class AuthenticateUser:
    def __init__(self, settings: Settings, token_service: TokenService) -> None:
        self._settings = settings
        self._token_service = token_service

    def execute(self, username: str, password: str) -> tuple[str, datetime]:
        username_matches = compare_digest(username, self._settings.admin_username)
        password_matches = compare_digest(password, self._settings.admin_password)

        if not username_matches or not password_matches:
            raise InvalidCredentialsError

        expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=self._settings.token_expire_minutes
        )
        token = self._token_service.create_token(subject=username, expires_at=expires_at)
        return token, expires_at

