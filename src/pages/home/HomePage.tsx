import { Hero } from "@/shared/components/organisms/Hero";
import { HealthHub } from "./components/HealthDemoHub";
import { DevPlayground } from "@/features/dev-tools/components/DevPlayground";
import { GamificationSystem } from "@/features/gamification/components/GamificationSystem";
import { PersonasSection } from "@/features/onboarding/components/PersonasSection";
import { Footer } from "@/shared/components/organisms/footer/Footer";
import { BenefitsDev } from "@/features/onboarding/components/BenefitsDev";
import { useEffect } from "react";

export function Home() {

  // garantindo scroll no topo apos recarregamento (f5)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-black">
      <Hero />
      <BenefitsDev />
      <GamificationSystem />
      <PersonasSection />
      <HealthHub />
      <DevPlayground />
      <Footer />
    </section>
  );
}
