from app.domain.entities import ContactMessage
from app.domain.ports import ContactRepository


class RegisterContactMessage:
    def __init__(self, repository: ContactRepository) -> None:
        self._repository = repository

    def execute(self, message: ContactMessage) -> ContactMessage:
        return self._repository.save(message)

