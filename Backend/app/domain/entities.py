from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import StrEnum


@dataclass(frozen=True)
class SocialLink:
    label: str
    url: str


@dataclass(frozen=True)
class Profile:
    founder_name: str
    company_name: str
    role: str
    headline: str
    story: str
    mission: str
    location: str
    email: str
    website: str
    availability: str
    specialties: list[str]
    socials: list[SocialLink]


class ResourceStatus(StrEnum):
    ONLINE = "online"
    DRAFT = "draft"
    RESTRICTED = "restricted"


@dataclass(frozen=True)
class Resource:
    id: str
    title: str
    description: str
    kind: str
    status: ResourceStatus
    href: str | None = None


@dataclass(frozen=True)
class ContactMessage:
    name: str
    email: str
    message: str
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))


@dataclass(frozen=True)
class AuthenticatedUser:
    username: str

