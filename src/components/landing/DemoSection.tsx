import { motion } from "framer-motion";
import whatsappDemo from "@/assets/whatsapp-demo.jpg";

const DemoSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Míralo en acción
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-foreground">
          Así trabaja tu empleado IA
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground max-w-2xl mx-auto">
          Recordatorios automáticos, seguimiento y atención 24/7 — todo desde WhatsApp.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16">
        {/* Video mockup */}
        <motion.div
          className="relative mx-auto w-64 md:w-72"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-[2.5rem] border-[6px] border-foreground/80 bg-foreground/90 p-2 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-foreground/80 rounded-b-2xl" />
            <video
              className="w-full rounded-[2rem] bg-black"
              autoPlay
              loop
              muted
              playsInline
              poster={whatsappDemo}
            >
              <source src="/videos/whatsapp-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Screenshot mockup */}
        <motion.div
          className="relative mx-auto w-64 md:w-72 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <span className="mb-3 text-lg font-bold text-foreground">⏰ Recordatorios</span>
          <div className="relative rounded-[2.5rem] border-[6px] border-foreground/80 bg-foreground/90 p-2 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-foreground/80 rounded-b-2xl" />
            <img
              src={whatsappDemo}
              alt="Recordatorios automáticos por WhatsApp"
              className="w-full rounded-[2rem]"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DemoSection;
