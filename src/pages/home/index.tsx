// src/pages/Home/index.tsx
import { Hero } from "@/shared/components/organisms/Hero";
// import { DevStatsPreview } from "@/shared/components/organisms/DevStatsPreview";
import { HealthDashboard } from "@/shared/components/organisms/HealthDashboard";
import { DevPlayground } from "@/shared/components/organisms/DevPlayground";
import { GamificationSystem } from "@/shared/components/organisms/GamificationSystem";
import { PersonasSection } from "@/shared/components/organisms/PersonasSection";
import { Footer } from "@/shared/components/organisms/footer/Footer";
import { BenefitsDev } from "@/shared/components/organisms/BenefitsDev";
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
      <HealthDashboard />
      <DevPlayground />
      <Footer />
    </section>
  );
}
