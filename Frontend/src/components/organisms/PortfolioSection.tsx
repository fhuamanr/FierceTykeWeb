import { Container } from "../atoms/Container";
import { SectionHeading } from "../atoms/SectionHeading";
import { PortfolioCard } from "../molecules/PortfolioCard";
import type { PortfolioItem } from "../../types";

export function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  return (
    <section className="page-section page-section--portfolio" id="portafolio">
      <Container>
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos que muestran criterio y oficio"
          description="Cada pieza del portafolio parte de una necesidad concreta: comunicar mejor, operar mejor, aprender mejor o transformar una idea en una herramienta usable."
        />
        <div className="portfolio-grid">
          {items.map((item) => (
            <PortfolioCard item={item} key={item.id} />
          ))}
        </div>
      </Container>
    </section>
  );
}
