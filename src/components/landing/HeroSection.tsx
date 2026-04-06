import { motion } from "framer-motion";
import { MessageCircle, Zap } from "lucide-react";
import phoneMockup from "@/assets/phone-mockup.png";
import calendarIcon from "@/assets/calendar-icon.png";
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
        <div className="mx-auto mb-6 flex flex-col items-center md:mx-0 md:items-start">
          <img
            src={calendarIcon}
            alt="TODDO AI ícono"
            className="h-20 w-20 md:h-24 md:w-24 drop-shadow-lg"
          />
          <div className="mt-3 flex flex-col items-center md:items-start leading-none">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              TODDO{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                AI
              </span>
            </span>
            <span className="mt-1 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Marketing & Tecnologías
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
        className="flex-shrink-0 w-56 md:w-72"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={phoneMockup}
          alt="Demostración del chat automatizado por WhatsApp"
          className="w-full drop-shadow-2xl animate-float"
          loading="eager"
        />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
