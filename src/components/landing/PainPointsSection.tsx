import { motion } from "framer-motion";
import { Clock, UserX, CalendarX } from "lucide-react";

const pains = [
  {
    icon: UserX,
    title: "Pierdes clientes por no responder rápido",
    desc: "El 78% de los clientes compran al primero que responde. Si tardas más de 5 minutos, los pierdes.",
  },
  {
    icon: Clock,
    title: "El seguimiento manual te agota",
    desc: "Copiar, pegar, recordar quién te escribió… Es un trabajo de tiempo completo que no genera dinero.",
  },
  {
    icon: CalendarX,
    title: "Tu agenda tiene huecos vacíos",
    desc: "Clientes que cancelan, que no confirman o que simplemente se olvidan. Dinero que dejas en la mesa.",
  },
];

const PainPointsSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto">
      <motion.h2
        className="text-section md:text-section-lg text-center text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        ¿Te suena familiar?
      </motion.h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {pains.map((p, i) => (
          <motion.div
            key={i}
            className="rounded-2xl border border-destructive/20 bg-background p-6 text-center shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10">
              <p.icon className="h-7 w-7 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
            <p className="mt-2 text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PainPointsSection;
