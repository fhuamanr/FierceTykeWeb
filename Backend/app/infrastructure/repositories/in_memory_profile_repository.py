from app.domain.entities import Profile, SocialLink


class InMemoryProfileRepository:
    def __init__(self) -> None:
        self._profile = Profile(
            founder_name="Carlos",
            company_name="FierceTyke",
            role="Desarrollo web, arquitectura y aprendizaje en produccion",
            headline=(
                "Construyo interfaces, servicios y recursos tecnicos para convertir "
                "ideas en productos claros."
            ),
            story=(
                "FierceTyke nace como una empresa de desarrollo fundada por Carlos para "
                "unir dos mundos: software usable para personas reales y aprendizaje "
                "tecnico basado en proyectos que si llegan a produccion."
            ),
            mission=(
                "Ayudo a convertir ideas tecnicas en experiencias claras, sistemas "
                "mantenibles, automatizaciones utiles y contenido que acerque la "
                "programacion a mas personas."
            ),
            location="Lima, Peru",
            email="contacto@fiercetyke.com",
            website="https://fiercetyke.com",
            availability="Abierto a productos web, integraciones, mentorias y laboratorios internos",
            specialties=[
                "Interfaces",
                "APIs",
                "Arquitectura",
                "Infraestructura",
                "Automatizacion",
                "Documentacion",
                "Mentoria",
                "Aprendizaje practico",
            ],
            socials=[
                SocialLink(label="GitHub", url="https://github.com/"),
                SocialLink(label="LinkedIn", url="https://linkedin.com/"),
            ],
        )

    def get(self) -> Profile:
        return self._profile

    def save(self, profile: Profile) -> Profile:
        self._profile = profile
        return self._profile
