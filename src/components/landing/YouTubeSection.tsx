import { motion } from "framer-motion";

const YouTubeSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Video completo
        </span>
        <h2 className="mt-3 text-section md:text-section-lg text-foreground">
          Conoce todas las <span className="text-gradient-wa">funcionalidades</span>
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground max-w-2xl mx-auto">
          Mira en detalle cómo nuestro empleado IA gestiona citas, responde clientes y aumenta tus ventas.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/gVSflIU6G8o"
            title="Demo completa TODDO AI"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default YouTubeSection;
