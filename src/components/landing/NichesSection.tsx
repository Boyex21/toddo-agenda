import { motion } from "framer-motion";
import { Scissors, Sparkles, SmilePlus, UtensilsCrossed, Truck, DoorOpen, MapPin, Droplets, Wrench, Briefcase, Settings } from "lucide-react";
import nicheBeauty from "@/assets/niche-beauty.png";
import nicheBarber from "@/assets/niche-barber.png";
import nicheDelivery from "@/assets/niche-delivery.png";
import nicheDental from "@/assets/niche-dental.png";

const nicheGroups = [
  {
    image: nicheBarber,
    alt: "Barbero profesional",
    imagePosition: "left" as const,
    niches: [
      { icon: Scissors, label: "Peluquerías" },
      { icon: Sparkles, label: "Salones de belleza" },
    ],
  },
  {
    image: nicheBeauty,
    alt: "Estilista profesional",
    imagePosition: "right" as const,
    niches: [
      { icon: SmilePlus, label: "Odontologías" },
      { icon: UtensilsCrossed, label: "Restaurantes" },
    ],
  },
  {
    image: nicheDelivery,
    alt: "Repartidor profesional",
    imagePosition: "left" as const,
    niches: [
      { icon: Truck, label: "Delivery" },
      { icon: DoorOpen, label: "Puerta a Puerta" },
    ],
  },
  {
    image: nicheDental,
    alt: "Profesional de salud",
    imagePosition: "right" as const,
    niches: [
      { icon: Droplets, label: "Lavadoras y Lubricadoras" },
      { icon: Wrench, label: "Mecánicas" },
    ],
  },
];

const extraNiches = [
  { icon: Briefcase, label: "Profesionales" },
  { icon: MapPin, label: "Rastreo GPS" },
];

const NichesSection = () => (
  <section className="py-16 md:py-24 bg-foreground text-primary-foreground overflow-hidden">
    <div className="container mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
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

      {/* Alternating rows */}
      <div className="space-y-10 md:space-y-16">
        {nicheGroups.map((group, groupIdx) => {
          const isImageLeft = group.imagePosition === "left";
          return (
            <motion.div
              key={groupIdx}
              className={`flex items-center gap-4 md:gap-10 ${isImageLeft ? "flex-row md:flex-row" : "flex-row-reverse md:flex-row-reverse"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            >
              {/* Model image — always to one side */}
              <div className="w-28 sm:w-36 md:w-52 lg:w-64 shrink-0">
                <img
                  src={group.image}
                  alt={group.alt}
                  className="w-full drop-shadow-2xl"
                />
              </div>

              {/* Niche cards */}
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.niches.map((n, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm p-3 md:p-4 border border-white/10 hover:bg-white/15 transition-colors"
                    >
                      <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                        <n.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <span className="text-sm md:text-base font-bold text-white">{n.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom niche CTA */}
      <motion.div
        className="mt-10 text-center"
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
  </section>
);

export default NichesSection;
