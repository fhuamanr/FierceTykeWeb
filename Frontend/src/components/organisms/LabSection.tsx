import { Activity, Container as ContainerIcon, GitBranch, ShieldCheck } from "lucide-react";
import { Container } from "../atoms/Container";
import { SectionHeading } from "../atoms/SectionHeading";

const stack = [
  "Interfaces web",
  "APIs",
  "Contenedores",
  "Despliegues",
  "Automatizacion",
  "Observabilidad",
  "Documentacion",
  "Laboratorio propio"
];

export function LabSection() {
  return (
    <section className="page-section page-section--lab" id="homelab">
      <Container>
        <div className="lab-layout">
          <div>
            <SectionHeading
              eyebrow="Homelab"
              title="Infraestructura propia para aprender mejor"
              description="Mantener un laboratorio propio permite probar ideas, desplegar servicios, documentar decisiones y entender el ciclo completo de un producto digital."
            />
            <div className="stack-cloud" aria-label="Stack FierceTyke">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="lab-console" aria-label="Estado del laboratorio">
            <div className="lab-console__header">
              <span />
              <span />
              <span />
            </div>
            <div className="lab-console__body">
              <p>
                <ContainerIcon size={18} />
                sitio publico
                <strong>healthy</strong>
              </p>
              <p>
                <Activity size={18} />
                servicios internos
                <strong>internal</strong>
              </p>
              <p>
                <GitBranch size={18} />
                rutas seguras
                <strong>proxied</strong>
              </p>
              <p>
                <ShieldCheck size={18} />
                private zone
                <strong>token auth</strong>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
