from app.domain.entities import Profile
from app.domain.ports import ProfileRepository


class UpdateProfile:
    def __init__(self, repository: ProfileRepository) -> None:
        self._repository = repository

    def execute(self, profile: Profile) -> Profile:
        return self._repository.save(profile)

