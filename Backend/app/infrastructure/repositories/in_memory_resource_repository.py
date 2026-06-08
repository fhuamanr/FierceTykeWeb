from app.domain.entities import Resource, ResourceStatus


class InMemoryResourceRepository:
    def __init__(self) -> None:
        self._resources = [
            Resource(
                id="portainer",
                title="Portainer Homelab",
                description="Acceso operativo al entorno de contenedores, stacks y servicios internos.",
                kind="Infraestructura",
                status=ResourceStatus.RESTRICTED,
                href="https://portainer.fiercetyke.com",
            ),
            Resource(
                id="runbooks",
                title="Runbooks",
                description="Procedimientos para despliegues, backups, rollback y mantenimiento del homelab.",
                kind="Documentacion",
                status=ResourceStatus.DRAFT,
            ),
            Resource(
                id="templates",
                title="Plantillas de Proyectos",
                description="Bases reutilizables para frontends, APIs, workers y automatizaciones de aprendizaje.",
                kind="Codigo",
                status=ResourceStatus.ONLINE,
            ),
            Resource(
                id="coolify",
                title="Coolify Deployments",
                description="Inventario de apps, dominios, healthchecks y variables de despliegue.",
                kind="Deploy",
                status=ResourceStatus.DRAFT,
            ),
        ]

    def list(self) -> list[Resource]:
        return list(self._resources)
