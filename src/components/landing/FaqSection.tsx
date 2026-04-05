import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿Es difícil de configurar?",
    a: "¡Para nada! Nosotros nos encargamos de toda la instalación. En menos de 48 horas tu empleado de IA estará activo y respondiendo a tus clientes.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. El sistema funciona directamente en tu WhatsApp Business. Si sabes usar WhatsApp, ya sabes usar nuestro servicio.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, sin penalizaciones ni letras pequeñas. Cancela cuando quieras desde tu panel o escríbenos por WhatsApp.",
  },
  {
    q: "¿Funciona para mi tipo de negocio?",
    a: "Funciona para cualquier negocio que atienda clientes: salones de belleza, consultorios, restaurantes, tiendas online, gimnasios, coaches, y más. Si recibes mensajes de clientes, este sistema es para ti.",
  },
  {
    q: "¿Qué pasa después de los 60 días gratis?",
    a: "Simplemente eliges el plan que mejor se adapte a tu negocio. Si decides no continuar, no se cobra nada.",
  },
];

const FaqSection = () => (
  <section className="py-16 md:py-24 bg-background" id="faq">
    <div className="container mx-auto max-w-2xl">
      <motion.h2
        className="text-section md:text-section-lg text-center text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Preguntas frecuentes
      </motion.h2>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-lg font-semibold text-foreground">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
