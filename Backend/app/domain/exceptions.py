class DomainError(Exception):
    message = "Operacion no permitida"


class InvalidCredentialsError(DomainError):
    message = "Credenciales invalidas"


class InvalidTokenError(DomainError):
    message = "Token invalido o expirado"

