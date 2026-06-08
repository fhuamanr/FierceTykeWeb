import { ExternalLink, LockKeyhole, RadioTower } from "lucide-react";
import type { Resource } from "../../types";

const statusLabels: Record<Resource["status"], string> = {
  draft: "Borrador",
  online: "Online",
  restricted: "Privado"
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = resource.status === "restricted" ? LockKeyhole : RadioTower;
  const domain = resource.href?.replace("https://", "").replace("http://", "");

  return (
    <article className="resource-card">
      <header>
        <span className={`status-dot status-dot--${resource.status}`}>
          <Icon size={16} aria-hidden="true" />
          {statusLabels[resource.status]}
        </span>
        <p>{resource.kind}</p>
      </header>
      <h3>{resource.title}</h3>
      {domain ? <span className="resource-domain">{domain}</span> : null}
      <p>{resource.description}</p>
      {resource.href ? (
        <a href={resource.href} target="_blank" rel="noreferrer">
          Abrir
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
