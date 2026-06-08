from app.domain.entities import Resource, ResourceStatus


class InMemoryResourceRepository:
    def __init__(self) -> None:
        self._resources = [
            Resource(
                id="portainer",
                title="Portainer Homelab",
                description="Panel de administracion del entorno de contenedores del homelab.",
                kind="Infraestructura",
                status=ResourceStatus.RESTRICTED,
                href="https://portainer.fiercetyke.com",
            ),
            Resource(
                id="excalidraw",
                title="Excalidraw",
                description="Pizarra visual para bocetar ideas, arquitectura y flujos de producto.",
                kind="Herramienta",
                status=ResourceStatus.ONLINE,
                href="https://excalidraw.fiercetyke.com",
            ),
            Resource(
                id="coolify",
                title="Coolify",
                description="Centro de despliegues, dominios, variables y estado de aplicaciones.",
                kind="Deploy",
                status=ResourceStatus.RESTRICTED,
                href="https://coolify.fiercetyke.com",
            ),
            Resource(
                id="fiercetyke",
                title="FierceTyke Web",
                description="Sitio publico principal para perfil, portafolio, contacto y marca.",
                kind="Sitio",
                status=ResourceStatus.ONLINE,
                href="https://fiercetyke.com",
            ),
            Resource(
                id="drawio",
                title="Draw.io",
                description="Diagramas tecnicos, mapas de arquitectura y documentacion visual.",
                kind="Herramienta",
                status=ResourceStatus.ONLINE,
                href="https://drawio.fiercetyke.com",
            ),
            Resource(
                id="mermaid",
                title="Mermaid",
                description="Diagramas como texto para documentar procesos, sistemas y decisiones.",
                kind="Documentacion",
                status=ResourceStatus.ONLINE,
                href="https://mermaid.fiercetyke.com",
            ),
        ]

    def list(self) -> list[Resource]:
        return list(self._resources)
