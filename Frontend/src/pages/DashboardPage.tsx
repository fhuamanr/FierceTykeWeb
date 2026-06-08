import { LogOut, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { Container } from "../components/atoms/Container";
import { LogoMark } from "../components/atoms/LogoMark";
import { SectionHeading } from "../components/atoms/SectionHeading";
import { ProfileForm } from "../components/molecules/ProfileForm";
import { ResourceCard } from "../components/molecules/ResourceCard";
import { useAuth } from "../context/AuthContext";
import { fallbackProfile, fallbackResources } from "../data/fallback";
import { api } from "../services/api";
import type { Profile, Resource } from "../types";

export function DashboardPage() {
  const { logout, token } = useAuth();
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [resources, setResources] = useState<Resource[]>(fallbackResources);
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
            title="Recursos y configuracion"
            description="Este espacio queda preparado para conectar Portainer, runbooks, repositorios y futuras herramientas internas."
          />
          {isLoading ? <p className="loading-line">Sincronizando datos...</p> : null}
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <SectionHeading
              eyebrow="Perfil publico"
              title="Contenido editable"
              description="Los cambios viajan al backend y se reflejan en la home cuando la API esta activa."
            />
            <ProfileForm profile={profile} onSave={handleSave} />
          </div>

          <div className="dashboard-panel">
            <SectionHeading
              eyebrow="Recursos"
              title="Zona privada"
              description="Lista inicial para accesos del homelab y activos internos."
            />
            <div className="resource-grid">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

