from fastapi import APIRouter, Depends, status

from app.api.dependencies import get_contact_repository
from app.api.schemas import ContactRequest, ContactResponse
from app.application.use_cases.register_contact_message import RegisterContactMessage
from app.infrastructure.repositories.in_memory_contact_repository import InMemoryContactRepository

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def register_contact_message(
    payload: ContactRequest,
    repository: InMemoryContactRepository = Depends(get_contact_repository),
) -> ContactResponse:
    use_case = RegisterContactMessage(repository)
    use_case.execute(payload.to_domain())
    return ContactResponse(message="Mensaje recibido")

