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

/* Niche card shared component */
const NicheCard = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm p-4 lg:p-5 border border-white/10 hover:bg-white/15 transition-colors">
    <div className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-xl bg-primary/20">
      <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
    </div>
    <span className="text-base lg:text-xl font-bold text-white">{label}</span>
  </div>
);

const NichesSection = () => {
  // Pair groups for desktop: (0,1) and (2,3)
  const pairedGroups = [];
  for (let i = 0; i < nicheGroups.length; i += 2) {
    pairedGroups.push([nicheGroups[i], nicheGroups[i + 1]]);
  }

  return (
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

        {/* ===== MOBILE: alternating rows (unchanged) ===== */}
        <div className="md:hidden space-y-10">
          {nicheGroups.map((group, groupIdx) => {
            const isImageLeft = group.imagePosition === "left";
            return (
              <motion.div
                key={groupIdx}
                className={`flex items-center gap-4 ${isImageLeft ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              >
                <div className="w-28 sm:w-36 shrink-0">
                  <img src={group.image} alt={group.alt} className="w-full drop-shadow-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-3">
                    {group.niches.map((n, i) => (
                      <NicheCard key={i} icon={n.icon} label={n.label} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== DESKTOP: paired rows — model | col1 | col2 | model ===== */}
        <div className="hidden md:block space-y-16">
          {pairedGroups.map((pair, pairIdx) => {
            const [left, right] = pair;
            return (
              <motion.div
                key={pairIdx}
                className="flex items-center gap-6 lg:gap-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pairIdx * 0.15 }}
              >
                {/* Left model */}
                <div className="w-44 lg:w-56 xl:w-64 shrink-0">
                  <img src={left.image} alt={left.alt} className="w-full drop-shadow-2xl" />
                </div>

                {/* Left niches column */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-3">
                    {left.niches.map((n, i) => (
                      <NicheCard key={i} icon={n.icon} label={n.label} />
                    ))}
                  </div>
                </div>

                {/* Right niches column */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-3">
                    {right.niches.map((n, i) => (
                      <NicheCard key={i} icon={n.icon} label={n.label} />
                    ))}
                  </div>
                </div>

                {/* Right model */}
                <div className="w-44 lg:w-56 xl:w-64 shrink-0">
                  <img src={right.image} alt={right.alt} className="w-full drop-shadow-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra niches without model */}
        <motion.div
          className="mt-10 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
            {extraNiches.map((n, i) => (
              <div key={i} className="flex-1">
                <NicheCard icon={n.icon} label={n.label} />
              </div>
            ))}
          </div>
        </motion.div>

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
};

export default NichesSection;
