from app.domain.entities import ContactMessage


class InMemoryContactRepository:
    def __init__(self) -> None:
        self._messages: list[ContactMessage] = []

    def save(self, message: ContactMessage) -> ContactMessage:
        self._messages.append(message)
        return message

    def list(self) -> list[ContactMessage]:
        return list(self._messages)

