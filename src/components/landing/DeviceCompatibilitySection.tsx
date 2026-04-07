import { motion } from "framer-motion";
import multiDevice from "@/assets/multi-device.png";

const DeviceCompatibilitySection = () => (
  <section className="py-12 md:py-16 bg-background">
    <div className="container mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Multiplataforma
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-foreground">
          Accede desde <span className="text-gradient-wa">cualquier dispositivo</span>
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground max-w-2xl mx-auto">
          Tu agenda inteligente funciona en celular, tablet y computadora. Controla tu negocio desde donde estés.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <img
          src={multiDevice}
          alt="TODDO AI compatible con celular, tablet y computadora"
          className="w-full"
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

export default DeviceCompatibilitySection;
