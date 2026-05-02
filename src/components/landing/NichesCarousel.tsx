import { motion } from "framer-motion";
import nicheInmo from "@/assets/niche-inmobiliaria.png";
import nicheHotel from "@/assets/niche-hotel.png";
import nicheSpa from "@/assets/niche-spa.png";
import nicheViajes from "@/assets/niche-agencia-viajes.png";

const slides = [
  { src: nicheInmo, alt: "IA para Inmobiliarias" },
  { src: nicheHotel, alt: "IA para Recepcionistas de Hoteles" },
  { src: nicheSpa, alt: "IA para Spas y Centros de Bienestar" },
  { src: nicheViajes, alt: "IA para Agencias Turísticas" },
];

// Duplicate for seamless infinite loop
const loop = [...slides, ...slides];

const NichesCarousel = () => {
  return (
    <section className="py-14 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto mb-8 text-center px-4">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Nuevos nichos disponibles
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-foreground">
          Empleados IA <span className="text-primary">listos</span> para tu industria
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground max-w-2xl mx-auto">
          Soluciones especializadas que ya están transformando estos negocios.
        </p>
      </div>

      {/* Edge fade masks */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loop.map((s, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[260px] sm:w-[300px] md:w-[340px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-foreground/5 bg-muted"
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NichesCarousel;
