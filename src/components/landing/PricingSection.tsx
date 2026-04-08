import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import UrgencyCounter from "./UrgencyCounter";

const WA_LINK = "https://wa.me/593967383001?text=Quiero%20mi%20prueba%20gratis%20de%2060%20días";

const PricingSection = () => (
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
      </motion.div>

      <div className="mt-6 flex justify-center">
        <UrgencyCounter />
      </div>

      {/* Installation */}
      <motion.div
        className="mt-10 mx-auto max-w-md rounded-2xl border-2 border-primary bg-card p-6 text-center shadow-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Instalación única</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="text-xl text-muted-foreground line-through">$400</span>
          <span className="text-4xl font-extrabold text-primary">$80</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">80% de descuento por lanzamiento</p>
      </motion.div>

      {/* Plans */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
        {/* Plan 1 */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Plan Esencial</p>
          <p className="mt-2 text-4xl font-extrabold text-foreground">$25<span className="text-lg font-medium text-muted-foreground">/mes</span></p>
          <ul className="mt-6 space-y-3 text-foreground">
            {["Empleado IA 24/7", "Agenda automática", "Alertas de nuevas citas"].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-background px-6 py-3 font-bold text-primary transition-colors hover:bg-accent"
          >
            Elegir plan
          </a>
        </motion.div>

        {/* Plan 2 */}
        <motion.div
          className="relative rounded-2xl border-2 border-primary bg-card p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
            Más popular
          </span>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Plan Completo</p>
          <p className="mt-2 text-4xl font-extrabold text-foreground">$50<span className="text-lg font-medium text-muted-foreground">/mes</span></p>
          <ul className="mt-6 space-y-3 text-foreground">
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
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Activar prueba gratis
          </a>
        </motion.div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        🎁 Solicita tu demostración de 60 días GRATIS · Sin compromiso · Cancela cuando quieras
      </p>
    </div>
  </section>
);

export default PricingSection;
