from app.domain.entities import Profile
from app.domain.ports import ProfileRepository


class GetProfile:
    def __init__(self, repository: ProfileRepository) -> None:
        self._repository = repository

    def execute(self) -> Profile:
        return self._repository.get()

