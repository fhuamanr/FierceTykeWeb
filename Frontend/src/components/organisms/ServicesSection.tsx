import { Blocks, GraduationCap, Rocket, Workflow } from "lucide-react";
import { Container } from "../atoms/Container";
import { SectionHeading } from "../atoms/SectionHeading";

const services = [
  {
    icon: Rocket,
    title: "Interfaces web",
    description:
      "Experiencias claras, rapidas y faciles de usar, pensadas para comunicar, vender o resolver tareas reales.",
    signal: "Usabilidad, criterio visual y rendimiento"
  },
  {
    icon: Workflow,
    title: "APIs mantenibles",
    description:
      "Servicios y contratos bien organizados para conectar productos, automatizaciones y datos sin crear deuda innecesaria.",
    signal: "Arquitectura clara desde el inicio"
  },
  {
    icon: Blocks,
    title: "Homelab y despliegues",
    description:
      "Ambientes de publicacion, dominios, rutas internas y controles de salud para operar proyectos con confianza.",
    signal: "Infraestructura simple, observable y repetible"
  },
  {
    icon: GraduationCap,
    title: "Aprendizaje aplicado",
    description:
      "Guias, plantillas y recursos que convierten cada proyecto en material para ensenar programacion con contexto real.",
    signal: "Construir, explicar, repetir"
  }
];

export function ServicesSection() {
  return (
    <section className="page-section page-section--dark" id="servicios">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="De idea tecnica a producto visible"
          description="FierceTyke se mueve entre interfaz, backend, infraestructura y ensenanza. La meta no es solo escribir codigo: es dejar soluciones claras, utiles y faciles de explicar."
        />
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.title}>
                <span className="service-card__icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <strong>{service.signal}</strong>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
