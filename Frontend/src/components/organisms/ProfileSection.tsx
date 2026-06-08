import { MapPin, Sparkles } from "lucide-react";
import { Badge } from "../atoms/Badge";
import { Container } from "../atoms/Container";
import { SectionHeading } from "../atoms/SectionHeading";
import type { Profile } from "../../types";

export function ProfileSection({ profile }: { profile: Profile }) {
  const firstName = profile.founderName.split(" ")[0] || profile.founderName;

  return (
    <section className="page-section page-section--profile" id="perfil">
      <Container>
        <SectionHeading
          eyebrow="Perfil"
          title={`${firstName} construye sistemas con proposito`}
          description={profile.story}
        />
        <div className="profile-grid">
          <div className="profile-copy">
            <p>{profile.mission}</p>
            <div className="profile-meta">
              <span>
                <MapPin size={18} />
                {profile.location}
              </span>
              <span>
                <Sparkles size={18} />
                {profile.availability}
              </span>
            </div>
          </div>
          <div className="specialty-panel">
            <p>Especialidades</p>
            <div className="badge-row">
              {profile.specialties.map((specialty) => (
                <Badge key={specialty}>{specialty}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
