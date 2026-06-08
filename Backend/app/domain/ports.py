from typing import Protocol

from app.domain.entities import ContactMessage, Profile, Resource


class ProfileRepository(Protocol):
    def get(self) -> Profile:
        raise NotImplementedError

    def save(self, profile: Profile) -> Profile:
        raise NotImplementedError


class ResourceRepository(Protocol):
    def list(self) -> list[Resource]:
        raise NotImplementedError


class ContactRepository(Protocol):
    def save(self, message: ContactMessage) -> ContactMessage:
        raise NotImplementedError

