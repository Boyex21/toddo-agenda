import { motion } from "framer-motion";
import { Bot, CalendarCheck, Bell, RotateCcw, TrendingUp } from "lucide-react";

const features = [
  { icon: Bot, title: "Responde 24/7 con IA", desc: "Tu empleado virtual atiende cada mensaje al instante, sin descansos." },
  { icon: CalendarCheck, title: "Agenda automática", desc: "Tus clientes agendan citas directamente por WhatsApp sin que tú intervengas." },
  { icon: Bell, title: "Notificaciones en tiempo real", desc: "Recibe alertas cuando un cliente agenda, cancela o necesita atención." },
  { icon: RotateCcw, title: "Recordatorios automáticos", desc: "Reduce cancelaciones enviando recordatorios antes de cada cita." },
  { icon: TrendingUp, title: "Seguimiento para repetir ventas", desc: "El sistema contacta a tus clientes pasados para generar recompra." },
];

const SolutionSection = () => (
  <section className="py-16 md:py-24 bg-wa-soft">
    <div className="container mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          La solución
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-foreground">
          Tu empleado de IA en WhatsApp
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground max-w-2xl mx-auto">
          Automatiza todo el ciclo de venta: desde la primera respuesta hasta el seguimiento post-servicio.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="rounded-2xl bg-card p-6 shadow-sm border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
