import { motion } from "framer-motion";
import { Bot, Bell, RotateCcw, TrendingUp, MessageSquare, Smartphone } from "lucide-react";

const whatItems = [
  {
    icon: Smartphone,
    title: "Directo en tu WhatsApp + App de agenda",
    desc: "Trabaja y atiende directamente desde tu WhatsApp, y para ti como dueño, una app de agenda para controlar todo.",
  },
  {
    icon: MessageSquare,
    title: "90% automático",
    desc: "Funciona respondiendo y gestionando clientes sin que tengas que intervenir constantemente.",
  },
];

const howItems = [
  {
    icon: Bot,
    title: "Empleado IA 24/7",
    desc: "Responde todos los mensajes incluso en madrugada con el objetivo de agendar citas.",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    desc: "Te avisa a ti y a tu equipo cada vez que se genera una agenda automática en un grupo de WhatsApp.",
  },
  {
    icon: RotateCcw,
    title: "Recordatorios",
    desc: "Reduce ausencias y retrasos enviando avisos a los clientes antes de su cita.",
  },
  {
    icon: TrendingUp,
    title: "Seguimiento",
    desc: "Vuelve a contactar a tus clientes automáticamente (20, 30 días, etc.) para generar nuevas ventas.",
  },
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
          Todo funciona de forma automática para que puedas enfocarte en atender y hacer crecer tu negocio. 🤝 Nosotros estaremos contigo en todo el proceso.
        </p>
      </motion.div>

      {/* ¿Qué hace? — 2 cards */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-center text-lg font-bold text-primary mb-5">📌 ¿Qué hace el sistema?</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {whatItems.map((f, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-card p-6 shadow-sm border-2 border-primary/20"
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
      </motion.div>

      {/* ¿Cómo lo hace? — 4 cards */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-center text-lg font-bold text-primary mb-5">⚙️ ¿Cómo lo hace?</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItems.map((f, i) => (
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
      </motion.div>
    </div>
  </section>
);

export default SolutionSection;
