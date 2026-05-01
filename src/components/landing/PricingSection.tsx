import { motion } from "framer-motion";
import { Check, MessageCircle, HelpCircle, Sparkles } from "lucide-react";
import UrgencyCounter from "./UrgencyCounter";
import { useLeadForm } from "./LeadFormContext";
import { useCurrency } from "./CurrencyContext";
import CurrencySwitcher from "./CurrencySwitcher";

const PricingSection = () => {
  const { openForm, openDoubtsChat } = useLeadForm();
  const { format } = useCurrency();

  return (
    <section className="py-16 md:py-24 bg-foreground" id="precios">
      <div className="container mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full bg-highlight/20 px-4 py-1 text-sm font-semibold text-highlight">
            Oferta de lanzamiento
          </span>
          <h2 className="mt-3 text-section md:text-section-lg text-white">
            Precios que se pagan solos
          </h2>
          <p className="mt-2 text-lg text-white/70 max-w-xl mx-auto">
            Con una sola cita recuperada al mes ya cubriste tu inversión.
          </p>
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <CurrencySwitcher variant="dark" />
          <UrgencyCounter variant="on-primary" />
        </div>

        {/* Instalación única */}
        <motion.div
          className="mt-10 mx-auto max-w-md rounded-2xl border border-highlight/40 bg-gradient-to-br from-highlight/10 to-highlight/5 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-highlight/20 px-3 py-1 text-xs font-bold text-highlight uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            Instalación única
          </div>
          <p className="mt-3 flex items-baseline justify-center gap-3">
            <span className="text-2xl font-medium text-white/40 line-through">{format(400)}</span>
            <span className="text-5xl font-extrabold text-primary">{format(80)}</span>
          </p>
          <p className="mt-2 text-sm font-medium text-highlight">
            80% de descuento por lanzamiento
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Plan 1 */}
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">Plan Esencial</p>
            <p className="mt-2 text-4xl font-extrabold text-white">
              {format(25)}<span className="text-lg font-medium text-white/60">/mes</span>
            </p>
            <ul className="mt-6 space-y-3 text-white">
              {["Empleado IA 24/7", "Agenda automática", "Alertas de nuevas citas"].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openForm("pricing-essential")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-background px-6 py-3 font-bold text-primary transition-colors hover:bg-accent"
            >
              Elegir plan
            </button>
          </motion.div>

          {/* Plan 2 */}
          <motion.div
            className="relative rounded-2xl border-2 border-primary bg-white/10 p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
              Más popular
            </span>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">Plan Completo</p>
            <p className="mt-2 text-4xl font-extrabold text-white">
              {format(50)}<span className="text-lg font-medium text-white/60">/mes</span>
            </p>
            <ul className="mt-6 space-y-3 text-white">
              {[
                "Todo del Plan Esencial",
                "Recordatorios automáticos",
                "Seguimiento post-servicio",
                "Campañas de reactivación",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openForm("pricing-complete")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              Activar prueba gratis
            </button>
          </motion.div>
        </div>

        {/* Doubts CTA secundario */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => openDoubtsChat("Sección de Precios")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/30 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
          >
            <HelpCircle className="h-5 w-5" />
            Tengo dudas, hablar por WhatsApp
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          🎁 Solicita tu demostración de 60 días GRATIS · Sin compromiso · Cancela cuando quieras
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
