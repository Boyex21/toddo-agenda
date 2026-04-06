import HeroSection from "@/components/landing/HeroSection";
import PainPointsSection from "@/components/landing/PainPointsSection";
import SolutionSection from "@/components/landing/SolutionSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import DemoSection from "@/components/landing/DemoSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import PricingSection from "@/components/landing/PricingSection";
import AddOnsSection from "@/components/landing/AddOnsSection";
import CtaBanner from "@/components/landing/CtaBanner";
import FaqSection from "@/components/landing/FaqSection";
import Footer from "@/components/landing/Footer";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/593967383001?text=Quiero%20mi%20prueba%20gratis%20de%2060%20días";

const Index = () => (
  <>
    <HeroSection />
    <PainPointsSection />
    <SolutionSection />
    <BenefitsSection />
    <CtaBanner headline="¿Listo para vender en automático?" />
    <SocialProofSection />
    <PricingSection />
    <AddOnsSection />
    <CtaBanner headline="Quiero automatizar mi WhatsApp ahora" />
    <FaqSection />
    <Footer />

    {/* Floating WhatsApp button */}
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-soft"
    >
      <MessageCircle className="h-7 w-7 text-primary-foreground" />
    </a>
  </>
);

export default Index;
