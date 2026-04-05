import { motion } from "framer-motion";
import { CalendarPlus, BatteryCharging, DollarSign } from "lucide-react";

const benefits = [
  { icon: CalendarPlus, title: "Más citas agendadas", desc: "Tu agenda se llena sin que levantes un dedo." },
  { icon: BatteryCharging, title: "Menos trabajo manual", desc: "Deja de copiar y pegar mensajes. La IA hace el trabajo repetitivo." },
  { icon: DollarSign, title: "Más ingresos sin contratar", desc: "Aumenta tus ventas sin el costo de un empleado adicional." },
];

const BenefitsSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto">
      <motion.h2
        className="text-section md:text-section-lg text-center text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Tu negocio <span className="text-gradient-wa">transformado</span>
      </motion.h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <b.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{b.title}</h3>
            <p className="mt-2 text-muted-foreground max-w-xs mx-auto">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
