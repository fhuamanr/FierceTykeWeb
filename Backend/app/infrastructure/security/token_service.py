import base64
import hashlib
import hmac
import json
from datetime import datetime, timezone
from typing import Any

from app.domain.exceptions import InvalidTokenError


def _b64encode(payload: bytes) -> str:
    return base64.urlsafe_b64encode(payload).decode("utf-8").rstrip("=")


def _b64decode(payload: str) -> bytes:
    padding = "=" * (-len(payload) % 4)
    return base64.urlsafe_b64decode(f"{payload}{padding}")


class TokenService:
    def __init__(self, secret: str) -> None:
        self._secret = secret.encode("utf-8")

    def create_token(self, subject: str, expires_at: datetime) -> str:
        header = {"alg": "HS256", "typ": "JWT"}
        payload = {"sub": subject, "exp": int(expires_at.timestamp())}

        encoded_header = _b64encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
        encoded_payload = _b64encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
        signature = self._sign(f"{encoded_header}.{encoded_payload}")

        return f"{encoded_header}.{encoded_payload}.{signature}"

    def verify(self, token: str) -> str:
        try:
            encoded_header, encoded_payload, signature = token.split(".")
        except ValueError as exc:
            raise InvalidTokenError from exc

        expected_signature = self._sign(f"{encoded_header}.{encoded_payload}")
        if not hmac.compare_digest(signature, expected_signature):
            raise InvalidTokenError

        payload = self._decode_payload(encoded_payload)
        expires_at = datetime.fromtimestamp(int(payload["exp"]), tz=timezone.utc)

        if expires_at <= datetime.now(timezone.utc):
            raise InvalidTokenError

        return str(payload["sub"])

    def _sign(self, value: str) -> str:
        digest = hmac.new(self._secret, value.encode("utf-8"), hashlib.sha256).digest()
        return _b64encode(digest)

    def _decode_payload(self, encoded_payload: str) -> dict[str, Any]:
        try:
            payload = json.loads(_b64decode(encoded_payload))
            if not isinstance(payload.get("sub"), str) or "exp" not in payload:
                raise InvalidTokenError
            return payload
        except (json.JSONDecodeError, ValueError, TypeError) as exc:
            raise InvalidTokenError from exc

