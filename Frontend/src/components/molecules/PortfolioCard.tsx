import { ArrowUpRight } from "lucide-react";
import { Badge } from "../atoms/Badge";
import type { PortfolioItem } from "../../types";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="portfolio-card">
      <div>
        <p className="card-kicker">{item.category}</p>
        <h3>{item.title}</h3>
      </div>
      <p>{item.summary}</p>
      <div className="badge-row">
        {item.stack.map((technology) => (
          <Badge key={technology}>{technology}</Badge>
        ))}
      </div>
      <footer>
        <span>{item.impact}</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </footer>
    </article>
  );
}

