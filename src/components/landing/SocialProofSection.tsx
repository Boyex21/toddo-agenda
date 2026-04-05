import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "María G.", biz: "Salón de belleza", quote: "En la primera semana ya había agendado 15 citas sin tocar mi celular. ¡Increíble!" },
  { name: "Carlos R.", biz: "Consultorio dental", quote: "Mis pacientes reciben recordatorios automáticos y las cancelaciones bajaron un 60%." },
  { name: "Ana L.", biz: "Tienda online", quote: "Antes perdía ventas por no responder a tiempo. Ahora la IA responde al instante y mis ventas subieron 40%." },
];

const stats = [
  { value: "500+", label: "Negocios automatizados" },
  { value: "24/7", label: "Atención sin pausas" },
  { value: "3x", label: "Más citas agendadas" },
  { value: "60%", label: "Menos cancelaciones" },
];

const SocialProofSection = () => (
  <section className="py-16 md:py-24 bg-surface-warm">
    <div className="container mx-auto">
      <motion.h2
        className="text-section md:text-section-lg text-center text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Lo que dicen nuestros clientes
      </motion.h2>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="rounded-2xl bg-card p-5 text-center shadow-sm border border-border"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <p className="text-2xl font-extrabold text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="rounded-2xl bg-card p-6 shadow-sm border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-highlight text-highlight" />
              ))}
            </div>
            <p className="text-foreground italic">"{t.quote}"</p>
            <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.biz}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProofSection;
