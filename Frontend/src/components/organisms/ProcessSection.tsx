import { CheckCircle2 } from "lucide-react";
import { Container } from "../atoms/Container";
import { SectionHeading } from "../atoms/SectionHeading";

const steps = [
  {
    title: "Definir",
    description: "Aterrizamos el problema, el usuario y el primer flujo que realmente debe existir."
  },
  {
    title: "Construir",
    description: "Creamos UI, API y contratos con una arquitectura simple que no cierre puertas."
  },
  {
    title: "Desplegar",
    description: "Lo llevamos a contenedores con healthchecks, proxy y variables listas para homelab."
  },
  {
    title: "Documentar",
    description: "Convertimos lo aprendido en runbooks, plantillas y recursos para seguir creciendo."
  }
];

export function ProcessSection() {
  return (
    <section className="page-section page-section--process">
      <Container>
        <SectionHeading
          eyebrow="Metodo"
          title="Aprender operando sistemas reales"
          description="El ciclo FierceTyke mezcla disciplina de producto con curiosidad de laboratorio: cada release debe servir, ensenar y quedar listo para el siguiente cambio."
        />
        <div className="process-grid">
          {steps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>
                <CheckCircle2 size={20} aria-hidden="true" />
                {step.title}
              </h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

