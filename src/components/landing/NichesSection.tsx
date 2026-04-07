import { motion } from "framer-motion";
import { Scissors, Sparkles, SmilePlus, UtensilsCrossed, Truck, DoorOpen, MapPin, Droplets, Wrench, Briefcase, Settings } from "lucide-react";

const niches = [
  { icon: Scissors, label: "Peluquerías" },
  { icon: Sparkles, label: "Salones de belleza" },
  { icon: SmilePlus, label: "Odontologías" },
  { icon: UtensilsCrossed, label: "Restaurantes" },
  { icon: Truck, label: "Delivery" },
  { icon: DoorOpen, label: "Puerta a Puerta" },
  { icon: MapPin, label: "Rastreo GPS" },
  { icon: Droplets, label: "Lavadoras y Lubricadoras" },
  { icon: Wrench, label: "Mecánicas" },
  { icon: Briefcase, label: "Profesionales" },
];

const NichesSection = () => (
  <section className="py-16 md:py-24 bg-wa-soft">
    <div className="container mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Para todo tipo de negocio
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-foreground">
          Tenemos empleados IA para <span className="text-gradient-wa">tu nicho</span>
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground max-w-2xl mx-auto">
          No importa tu industria, nuestro agente se adapta a las necesidades de tu negocio.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {niches.map((n, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 shadow-sm border border-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <n.icon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">{n.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground">
          <Settings className="h-5 w-5" />
          ¿Tu nicho no está en la lista? Lo personalizamos para ti.
        </div>
      </motion.div>
    </div>
  </section>
);

export default NichesSection;
