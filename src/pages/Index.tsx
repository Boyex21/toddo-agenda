import { MessageCircle } from "lucide-react";
import { useLeadForm } from "@/components/landing/LeadFormContext";

import HeroSection from "@/components/landing/HeroSection";
import DeviceCompatibilitySection from "@/components/landing/DeviceCompatibilitySection";
import PainPointsSection from "@/components/landing/PainPointsSection";
import SolutionSection from "@/components/landing/SolutionSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import NichesSection from "@/components/landing/NichesSection";
import DemoSection from "@/components/landing/DemoSection";
import YouTubeSection from "@/components/landing/YouTubeSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import PricingSection from "@/components/landing/PricingSection";
import AddOnsSection from "@/components/landing/AddOnsSection";
import CtaBanner from "@/components/landing/CtaBanner";
import FaqSection from "@/components/landing/FaqSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const { openForm } = useLeadForm();

  return (
    <>
      <HeroSection />
      <DeviceCompatibilitySection />
      <PainPointsSection />
      <SolutionSection />
      <NichesSection />
      <BenefitsSection />
      <DemoSection />
      <YouTubeSection />
      <CtaBanner headline="¿Listo para vender en automático?" />
      <SocialProofSection />
      <PricingSection />
      <AddOnsSection />
      <CtaBanner headline="Quiero automatizar mi WhatsApp ahora" />
      <FaqSection />
      <Footer />

      {/* Floating WhatsApp button */}
      <button
        onClick={() => openForm("floating-button")}
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse-soft"
      >
        <MessageCircle className="h-7 w-7 text-primary-foreground" />
      </button>
    </>
  );
};

export default Index;
