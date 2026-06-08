from app.domain.entities import Resource
from app.domain.ports import ResourceRepository


class ListResources:
    def __init__(self, repository: ResourceRepository) -> None:
        self._repository = repository

    def execute(self) -> list[Resource]:
        return self._repository.list()

