import Hero from "@/components/sections/Hero";
import TeamSection from "@/components/sections/TeamSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import OfferSection from "@/components/sections/OfferSection";
import InstagramBridge from "@/components/sections/InstagramBridge";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <TeamSection />
        <WorkSection />
        <ServicesSection />
        <SocialProofSection />
        <OfferSection />
        <InstagramBridge />
      </main>
      <SiteFooter />
    </>
  );
}
