import { ArrowRight, Boxes, Code2, ServerCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../atoms/Container";
import type { Profile } from "../../types";

type HeroSectionProps = {
  profile: Profile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="hero" id="inicio">
      <img src="/assets/fiercetyke-hero.png" alt="" aria-hidden="true" />
      <div className="hero__overlay" />
      <Container className="hero__content">
        <p className="hero__eyebrow">{profile.role}</p>
        <h1>{profile.companyName}</h1>
        <p className="hero__lead">{profile.headline}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#portafolio">
            <span className="button__icon">
              <ArrowRight size={18} aria-hidden="true" />
            </span>
            <span>Ver portafolio</span>
          </a>
          <Link className="button button--ghost" to="/login">
            <span className="button__icon">
              <ServerCog size={18} aria-hidden="true" />
            </span>
            <span>Zona privada</span>
          </Link>
        </div>
        <div className="hero__signals" aria-label="Areas principales">
          <span>
            <Code2 size={18} />
            Desarrollo
          </span>
          <span>
            <Boxes size={18} />
            Contenedores
          </span>
          <span>
            <ServerCog size={18} />
            Homelab
          </span>
        </div>
      </Container>
    </section>
  );
}
