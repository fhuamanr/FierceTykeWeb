import type { PortfolioItem, Profile, Resource } from "../types";

export const fallbackProfile: Profile = {
  founderName: "Carlos",
  companyName: "FierceTyke",
  role: "Desarrollo web, arquitectura y aprendizaje en produccion",
  headline:
    "Construyo interfaces, servicios y recursos tecnicos para convertir ideas en productos claros.",
  story:
    "FierceTyke nace como una empresa de desarrollo fundada por Carlos para unir dos mundos: software usable para personas reales y aprendizaje tecnico basado en proyectos que si llegan a produccion.",
  mission:
    "Ayudo a convertir ideas tecnicas en experiencias claras, sistemas mantenibles, automatizaciones utiles y contenido que acerque la programacion a mas personas.",
  location: "Lima, Peru",
  email: "contacto@fiercetyke.com",
  website: "https://fiercetyke.com",
  availability: "Abierto a productos web, integraciones, mentorias y laboratorios internos",
  specialties: [
    "Interfaces",
    "APIs",
    "Arquitectura",
    "Infraestructura",
    "Automatizacion",
    "Documentacion",
    "Mentoria",
    "Aprendizaje practico"
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" }
  ]
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "homelab-control",
    title: "Panel de Operacion",
    category: "Infraestructura",
    summary:
      "Panel privado para centralizar servicios, recursos, runbooks y accesos operativos de un entorno tecnico propio.",
    stack: ["Infraestructura", "Automatizacion", "Operaciones"],
    impact: "Convierte servicios dispersos en una plataforma mas gobernable."
  },
  {
    id: "dev-portfolio",
    title: "Portfolio Operativo",
    category: "Marca personal",
    summary:
      "Sitio editable para mostrar perfil, proyectos, servicios, contacto y zona privada con una identidad tecnica sobria.",
    stack: ["Interfaces", "Contenido", "Identidad"],
    impact: "Hace que FierceTyke sea una presencia publica y una consola interna al mismo tiempo."
  },
  {
    id: "learning-tools",
    title: "Learning Ops",
    category: "Educacion",
    summary:
      "Sistema de recursos para documentar guias, plantillas, ejercicios y flujos de desarrollo orientados a programadores en crecimiento.",
    stack: ["Guias", "Plantillas", "Documentacion"],
    impact: "Transforma cada proyecto en material reutilizable para ensenar mejor."
  },
  {
    id: "api-foundation",
    title: "Base de Servicios",
    category: "Backend",
    summary:
      "Base de servicios con contratos claros, reglas separadas e infraestructura desacoplada para crecer sin perder orden.",
    stack: ["APIs", "Arquitectura", "Seguridad"],
    impact: "Reduce deuda temprana y permite cambiar repositorios sin romper el producto."
  }
];

export const fallbackResources: Resource[] = [
  {
    id: "portainer",
    title: "Portainer Homelab",
    description: "Acceso operativo al entorno de contenedores, stacks y servicios internos.",
    kind: "Infraestructura",
    status: "restricted",
    href: "https://portainer.fiercetyke.com"
  },
  {
    id: "runbooks",
    title: "Runbooks",
    description: "Procedimientos para despliegues, backups, rollback y mantenimiento del homelab.",
    kind: "Documentacion",
    status: "draft"
  },
  {
    id: "templates",
    title: "Plantillas de Proyectos",
    description: "Bases reutilizables para frontends, APIs, workers y automatizaciones de aprendizaje.",
    kind: "Codigo",
    status: "online"
  },
  {
    id: "coolify",
    title: "Coolify Deployments",
    description: "Inventario de apps, dominios, healthchecks y variables de despliegue.",
    kind: "Deploy",
    status: "draft"
  }
];
