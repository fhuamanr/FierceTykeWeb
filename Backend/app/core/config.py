import os
from dataclasses import dataclass
from functools import lru_cache


def _csv(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    app_name: str = "FierceTyke API"
    app_env: str = os.getenv("APP_ENV", "development")
    api_prefix: str = "/api/v1"
    token_secret: str = os.getenv("TOKEN_SECRET", "dev-secret-change-me")
    token_expire_minutes: int = int(os.getenv("TOKEN_EXPIRE_MINUTES", "720"))
    admin_username: str = os.getenv("ADMIN_USERNAME", "admin")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "change-me-now")
    allowed_origins: list[str] | None = None

    def __post_init__(self) -> None:
        if self.allowed_origins is None:
            origins = os.getenv(
                "ALLOWED_ORIGINS",
                "http://localhost:5173,http://localhost:8080,https://fiercetyke.com",
            )
            object.__setattr__(self, "allowed_origins", _csv(origins))


@lru_cache
def get_settings() -> Settings:
    return Settings()
