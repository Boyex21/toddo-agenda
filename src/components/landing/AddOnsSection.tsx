import { motion } from "framer-motion";
import { Palette, Globe, UserPlus, Code, Megaphone } from "lucide-react";

const addons = [
  { icon: Palette, title: "Material de marketing", desc: "Diseños profesionales para tus redes sociales.", price: "desde $15" },
  { icon: Globe, title: "Configuración de dominio", desc: "Te ayudamos a conectar tu dominio personalizado.", price: "desde $10" },
  { icon: UserPlus, title: "Proveedores adicionales", desc: "Agrega más miembros de tu equipo al sistema.", price: "desde $5/mes" },
  { icon: Code, title: "Desarrollo a medida", desc: "Funcionalidades personalizadas para tu negocio.", price: "desde $50" },
  { icon: Megaphone, title: "Campañas de WhatsApp", desc: "Envía promociones masivas a tu base de clientes.", price: "desde $20" },
];

const AddOnsSection = () => (
  <section className="py-16 md:py-24 bg-wa-soft">
    <div className="container mx-auto">
      <motion.h2
        className="text-section md:text-section-lg text-center text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Servicios adicionales
      </motion.h2>
      <p className="mt-3 text-center text-muted-foreground text-body-lg max-w-xl mx-auto">
        Potencia tu automatización con complementos diseñados para crecer.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addons.map((a, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 rounded-2xl bg-card p-5 border border-border shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <a.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                {a.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AddOnsSection;
