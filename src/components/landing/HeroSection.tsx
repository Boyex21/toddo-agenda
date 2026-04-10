import { motion } from "framer-motion";
import { MessageCircle, Zap } from "lucide-react";
import phoneMockup from "@/assets/phone-mockup.png";
import calendarIcon from "@/assets/calendar-icon.png";
import toddoLogo from "@/assets/toddo-logo.svg";
import UrgencyCounter from "./UrgencyCounter";

const WA_LINK = "https://wa.me/593967383001?text=Quiero%20mi%20prueba%20gratis%20de%2060%20días";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-surface-warm pt-6 pb-16 md:pt-12 md:pb-24">
    <div className="container mx-auto flex flex-col items-center gap-8 md:flex-row md:gap-12">
      {/* Copy */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Brand */}
        {/* Mobile: logo wide, then icon below, then tagline below */}
        <div className="mx-auto mb-6 flex flex-col items-center md:hidden">
          <img
            src={toddoLogo}
            alt="TODDO AI logo"
            className="w-[85%] drop-shadow-lg"
          />
          <img
            src={calendarIcon}
            alt="Ícono de agenda"
            className="mt-3 h-10 w-10"
          />
          <span className="mt-2 text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
            Agenda con inteligencia artificial
          </span>
        </div>
        {/* Desktop: logo large on top, then icon + tagline below */}
        <div className="hidden md:flex flex-col items-start gap-3 mb-6">
          <img
            src={toddoLogo}
            alt="TODDO AI logo"
            className="h-28 lg:h-36 drop-shadow-lg"
          />
          <div className="flex items-center gap-2">
            <img
              src={calendarIcon}
              alt="Ícono de agenda"
              className="h-10 w-10"
            />
            <span className="text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Agenda con inteligencia artificial
            </span>
          </div>
        </div>

        <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
          🔥 Cupos limitados — 60 días GRATIS
        </span>

        <h1 className="text-hero md:text-hero-lg mt-4 text-foreground">
          Tu negocio vendiendo{" "}
          <span className="text-gradient-wa">en automático</span> por WhatsApp
        </h1>

        <p className="mt-4 text-body-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
          Un empleado con inteligencia artificial que responde, agenda, recuerda y da seguimiento a tus clientes <strong>las 24 horas, los 7 días</strong>. Sin contratar personal extra.
        </p>

        <div className="mt-6">
          <UrgencyCounter />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 animate-pulse-soft"
          >
            <MessageCircle className="h-5 w-5" />
            Probar gratis 60 días
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-background px-7 py-4 text-lg font-bold text-primary transition-colors hover:bg-accent"
          >
            <Zap className="h-5 w-5" />
            Hablar por WhatsApp
          </a>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          ✅ Sin compromiso · ✅ Sin tarjeta de crédito · ✅ Cancela cuando quieras
        </p>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
         className="flex-shrink-0 w-40 md:w-56"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ transform: "rotate(-8deg)" }}
      >
        <div className="relative rounded-[2rem] border-[3px] border-foreground/70 bg-foreground/80 p-1.5 shadow-2xl animate-float">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-16 bg-foreground/70 rounded-b-xl z-10" />
          <img
            src={phoneMockup}
            alt="Demostración del chat automatizado por WhatsApp"
            className="w-full rounded-[2rem]"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
