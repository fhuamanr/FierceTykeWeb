import { Mail, RadioTower } from "lucide-react";
import { Container } from "../atoms/Container";
import { SectionHeading } from "../atoms/SectionHeading";
import { ContactForm } from "../molecules/ContactForm";
import type { Profile } from "../../types";

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section className="page-section page-section--contact" id="contacto">
      <Container>
        <div className="contact-layout">
          <div>
            <SectionHeading
              eyebrow="Contactanos"
              title="Trae una idea, un problema o un servicio por ordenar"
              description="Podemos partir por una landing, una API, una herramienta interna o una mejora de despliegue. Lo importante es que el primer paso deje una base real."
            />
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} />
                {profile.email}
              </a>
              <a href={profile.website} target="_blank" rel="noreferrer">
                <RadioTower size={18} />
                {profile.website.replace("https://", "")}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
