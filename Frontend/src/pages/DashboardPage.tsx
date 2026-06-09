import { Edit3, LockKeyhole, LogOut, RefreshCcw, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";
import { Container } from "../components/atoms/Container";
import { LogoMark } from "../components/atoms/LogoMark";
import { SectionHeading } from "../components/atoms/SectionHeading";
import { ProfileForm } from "../components/molecules/ProfileForm";
import { ResourceCard } from "../components/molecules/ResourceCard";
import { useAuth } from "../context/AuthContext";
import { fallbackProfile, fallbackResources } from "../data/fallback";
import { api } from "../services/api";
import type { Profile, Resource } from "../types";

type DashboardTab = "profile" | "content" | "private";

const dashboardTabs = [
  { id: "profile", label: "Perfil", icon: UserRound },
  { id: "content", label: "Contenido editable", icon: Edit3 },
  { id: "private", label: "Zona privada", icon: LockKeyhole }
] satisfies Array<{ id: DashboardTab; label: string; icon: typeof UserRound }>;

export function DashboardPage() {
  const { logout, token } = useAuth();
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [resources, setResources] = useState<Resource[]>(fallbackResources);
  const [activeTab, setActiveTab] = useState<DashboardTab>("profile");
  const [isLoading, setIsLoading] = useState(true);

  async function loadDashboard() {
    if (!token) return;

    setIsLoading(true);
    try {
      const [nextProfile, nextResources] = await Promise.all([
        api.getProfile(),
        api.getResources(token)
      ]);
      setProfile(nextProfile);
      setResources(nextResources);
    } catch {
      setProfile(fallbackProfile);
      setResources(fallbackResources);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, [token]);

  async function handleSave(nextProfile: Profile) {
    if (!token) return;
    const savedProfile = await api.updateProfile(nextProfile, token);
    setProfile(savedProfile);
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <Link to="/" className="brand">
          <LogoMark />
          <span>FierceTyke</span>
        </Link>
        <div className="dashboard-actions">
          <Button variant="secondary" icon={<RefreshCcw size={18} />} onClick={loadDashboard}>
            Recargar
          </Button>
          <Button variant="ghost" icon={<LogOut size={18} />} onClick={logout}>
            Salir
          </Button>
        </div>
      </header>

      <Container className="dashboard-container">
        <section className="dashboard-intro">
          <SectionHeading
            eyebrow="Panel privado"
            title="Centro de control"
            description="Administra lo que se ve en la web publica, edita contenido y accede a las herramientas internas del homelab desde un espacio separado."
          />
          {isLoading ? <p className="loading-line">Sincronizando datos...</p> : null}
        </section>

        <nav className="dashboard-tabs" aria-label="Secciones del panel privado">
          {dashboardTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                aria-current={isActive ? "page" : undefined}
                className={`dashboard-tab ${isActive ? "dashboard-tab--active" : ""}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <Icon size={18} aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "profile" ? (
          <section className="dashboard-panel dashboard-panel--profile">
            <div className="profile-overview">
              <div className="profile-overview__copy">
                <SectionHeading
                  eyebrow="Perfil publico"
                  title={`${profile.founderName} construye FierceTyke`}
                  description="Vista rapida de lo que la home comunica sobre ti, tu enfoque y tus capacidades."
                />
                <div className="profile-summary">
                  <p className="profile-summary__headline">{profile.headline}</p>
                  <p>{profile.story}</p>
                  <p>{profile.mission}</p>
                </div>
                <div className="profile-meta profile-meta--dashboard">
                  <span>{profile.location}</span>
                  <span>{profile.availability}</span>
                  <span>{profile.email}</span>
                </div>
                <div className="badge-row">
                  {profile.specialties.map((specialty) => (
                    <Badge key={specialty}>{specialty}</Badge>
                  ))}
                </div>
              </div>
              <aside className="dashboard-brand-preview" aria-label="Marca FierceTyke Dev">
                <img src="/assets/fiercetyke-dev.png" alt="FierceTyke Dev" />
                <p>
                  Para iconos chicos uso el monograma FF. La ilustracion completa funciona mejor
                  como pieza de marca grande.
                </p>
              </aside>
            </div>
          </section>
        ) : null}

        {activeTab === "content" ? (
          <section className="dashboard-panel">
            <SectionHeading
              eyebrow="Contenido editable"
              title="Contenido editable"
              description="Los cambios viajan al backend y se reflejan en la home cuando la API esta activa."
            />
            <ProfileForm profile={profile} onSave={handleSave} />
          </section>
        ) : null}

        {activeTab === "private" ? (
          <section className="dashboard-panel">
            <SectionHeading
              eyebrow="Recursos"
              title="Zona privada"
              description="Accesos directos a las aplicaciones publicadas del homelab y herramientas internas disponibles."
            />
            <div className="resource-grid">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
