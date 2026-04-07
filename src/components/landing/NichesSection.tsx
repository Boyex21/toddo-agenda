import { motion } from "framer-motion";
import { Scissors, Sparkles, SmilePlus, UtensilsCrossed, Truck, DoorOpen, MapPin, Droplets, Wrench, Briefcase, Settings } from "lucide-react";
import nicheBeauty from "@/assets/niche-beauty.png";
import nicheBarber from "@/assets/niche-barber.png";

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
  <section className="py-16 md:py-24 bg-foreground text-primary-foreground overflow-hidden">
    <div className="container mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
          Para todo tipo de negocio
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-white">
          Tenemos empleados IA para <span className="text-primary">tu nicho</span>
        </h2>
        <p className="mt-3 text-body-lg text-white/70 max-w-2xl mx-auto">
          No importa tu industria, nuestro agente se adapta a las necesidades de tu negocio.
        </p>
      </motion.div>

      {/* Main layout: content left + images right on desktop; stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Left: niches grid */}
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {niches.map((n, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm p-4 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <n.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-white">{n.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/20 px-5 py-3 text-sm font-bold text-primary">
              <Settings className="h-5 w-5" />
              ¿Tu nicho no está en la lista? Lo personalizamos para ti.
            </div>
          </motion.div>
        </div>

        {/* Right: model images */}
        <motion.div
          className="w-full lg:w-2/5 order-1 lg:order-2 flex justify-center gap-4"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-44 sm:w-52 lg:w-56">
            <img
              src={nicheBarber}
              alt="Barbero profesional usando TODDO AI"
              className="w-full rounded-3xl shadow-2xl object-cover aspect-[3/4]"
            />
          </div>
          <div className="relative w-44 sm:w-52 lg:w-56 mt-8">
            <img
              src={nicheBeauty}
              alt="Estilista profesional usando TODDO AI"
              className="w-full rounded-3xl shadow-2xl object-cover aspect-[3/4]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default NichesSection;
