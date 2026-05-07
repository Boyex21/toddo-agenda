import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import toddoLogo from "@/assets/toddo-logo.svg";
import calendarIcon from "@/assets/calendar-icon.png";

const Footer = () => (
  <footer className="relative border-t border-border bg-secondary py-10 md:py-14">
    <div className="container mx-auto flex flex-col items-center gap-5 text-center">
      {/* Logo */}
      <img
        src={toddoLogo}
        alt="TODDO AI logo"
        className="w-52 md:w-64 drop-shadow-lg"
      />

      {/* Icon + tagline */}
      <div className="flex items-center gap-2">
        <img src={calendarIcon} alt="Ícono de agenda" className="h-8 w-8" />
        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground">
          Agenda con inteligencia artificial
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} TODDO AI — Marketing & Tecnologías. Todos los derechos reservados.
      </p>
    </div>
    {/* Acceso semi-oculto al panel */}
    <Link
      to="/admin/login"
      aria-label="Acceso al panel"
      title="Acceso panel"
      className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/40 text-muted-foreground/50 backdrop-blur-sm transition-all hover:text-foreground hover:border-border hover:bg-background"
    >
      <Lock className="h-3.5 w-3.5" />
    </Link>
  </footer>
);

export default Footer;
