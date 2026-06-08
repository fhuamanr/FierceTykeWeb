import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";
import { LogoMark } from "../atoms/LogoMark";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Perfil", href: "/#perfil" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Portafolio", href: "/#portafolio" },
  { label: "Homelab", href: "/#homelab" },
  { label: "Contacto", href: "/#contacto" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Principal">
        <Link className="brand" to="/" onClick={() => setIsOpen(false)}>
          <LogoMark />
          <span>FierceTyke</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${isOpen ? "nav-links--open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <Link
            className="button button--secondary nav-action"
            to={isAuthenticated ? "/app" : "/login"}
            onClick={() => setIsOpen(false)}
          >
            <span className="button__icon">
              <Shield size={18} aria-hidden="true" />
            </span>
            <span>{isAuthenticated ? "Panel" : "Login"}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
