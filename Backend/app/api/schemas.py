from datetime import datetime

from pydantic import BaseModel, Field

from app.domain.entities import ContactMessage, Profile, Resource, SocialLink


class SocialLinkSchema(BaseModel):
    label: str
    url: str

    @classmethod
    def from_domain(cls, link: SocialLink) -> "SocialLinkSchema":
        return cls(label=link.label, url=link.url)

    def to_domain(self) -> SocialLink:
        return SocialLink(label=self.label, url=self.url)


class ProfileSchema(BaseModel):
    founderName: str = Field(min_length=2)
    companyName: str = Field(min_length=2)
    role: str
    headline: str
    story: str
    mission: str
    location: str
    email: str
    website: str
    availability: str
    specialties: list[str]
    socials: list[SocialLinkSchema]

    @classmethod
    def from_domain(cls, profile: Profile) -> "ProfileSchema":
        return cls(
            founderName=profile.founder_name,
            companyName=profile.company_name,
            role=profile.role,
            headline=profile.headline,
            story=profile.story,
            mission=profile.mission,
            location=profile.location,
            email=profile.email,
            website=profile.website,
            availability=profile.availability,
            specialties=profile.specialties,
            socials=[SocialLinkSchema.from_domain(link) for link in profile.socials],
        )

    def to_domain(self) -> Profile:
        return Profile(
            founder_name=self.founderName,
            company_name=self.companyName,
            role=self.role,
            headline=self.headline,
            story=self.story,
            mission=self.mission,
            location=self.location,
            email=self.email,
            website=self.website,
            availability=self.availability,
            specialties=self.specialties,
            socials=[link.to_domain() for link in self.socials],
        )


class ResourceSchema(BaseModel):
    id: str
    title: str
    description: str
    kind: str
    status: str
    href: str | None = None

    @classmethod
    def from_domain(cls, resource: Resource) -> "ResourceSchema":
        return cls(
            id=resource.id,
            title=resource.title,
            description=resource.description,
            kind=resource.kind,
            status=resource.status.value,
            href=resource.href,
        )


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_at: datetime


class ContactRequest(BaseModel):
    name: str = Field(min_length=2)
    email: str = Field(min_length=5)
    message: str = Field(min_length=5)

    def to_domain(self) -> ContactMessage:
        return ContactMessage(name=self.name, email=self.email, message=self.message)


class ContactResponse(BaseModel):
    message: str

