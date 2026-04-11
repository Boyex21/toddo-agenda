import { motion } from "framer-motion";
import { MessageCircle, Zap, Play } from "lucide-react";
import UrgencyCounter from "./UrgencyCounter";

const WA_LINK = "https://wa.me/593967383001?text=Quiero%20mi%20prueba%20gratis%20de%2060%20días";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-surface-warm pt-6 pb-16 md:pt-12 md:pb-24">
    <div className="container mx-auto flex flex-col items-center gap-10 md:flex-row md:gap-14">
      {/* Copy */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
          🔥 Cupos limitados — 60 días GRATIS
        </span>

        <h1 className="text-hero md:text-hero-lg mt-4 text-foreground">
          Tu negocio vendiendo{" "}
          <span className="text-gradient-wa">en automático</span> por WhatsApp
        </h1>

        <p className="mt-4 text-body-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
          Un empleado con inteligencia artificial que responde, agenda, recuerda y da seguimiento a tus clientes{" "}
          <strong>las 24 horas, los 7 días</strong>. Sin contratar personal extra.
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

      {/* YouTube Video — hero spotlight */}
      <motion.div
        className="w-full md:flex-1 md:max-w-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative group">
          {/* Glow effect behind the video */}
          <div className="absolute -inset-2 md:-inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-wa-green/20 to-primary/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Video container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-primary/20 bg-foreground/5">
            {/* Label badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
              <Play className="h-3 w-3 fill-current" />
              Mira cómo funciona
            </div>

            {/* 9:16 vertical on mobile, 16:9 horizontal on desktop */}
            <div className="relative" style={{ paddingBottom: "177.78%" }}>
              <iframe

                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/gVSflIU6G8o?rel=0&modestbranding=1"
                title="Demo completa TODDO AI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
              />
            </div>
          </div>

          {/* Caption below video */}
          <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
            ▶️ Demo de 4 min — Mira cómo tu negocio puede vender en automático
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
