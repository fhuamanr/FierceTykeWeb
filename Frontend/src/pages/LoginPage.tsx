import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoMark } from "../components/atoms/LogoMark";
import { LoginForm } from "../components/molecules/LoginForm";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/app";

  async function handleLogin(username: string, password: string) {
    await login(username, password);
    navigate(from, { replace: true });
  }

  return (
    <section className="auth-page">
      <section className="auth-shell">
        <Link to="/" className="auth-brand">
          <LogoMark />
          <span>FierceTyke</span>
        </Link>
        <div className="auth-copy">
          <p>Zona privada</p>
          <h1>Acceso operativo</h1>
          <span>Recursos internos, perfil editable y futuras herramientas del homelab.</span>
        </div>
        <LoginForm onSubmit={handleLogin} />
        <Link to="/" className="button button--ghost auth-back-link">
          <span className="button__icon">
            <ArrowLeft size={18} aria-hidden="true" />
          </span>
          <span>Volver al sitio</span>
        </Link>
      </section>
    </section>
  );
}
