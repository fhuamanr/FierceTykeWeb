import { useEffect, useState } from "react";
import { ContactSection } from "../components/organisms/ContactSection";
import { HeroSection } from "../components/organisms/HeroSection";
import { LabSection } from "../components/organisms/LabSection";
import { PortfolioSection } from "../components/organisms/PortfolioSection";
import { ProcessSection } from "../components/organisms/ProcessSection";
import { ProfileSection } from "../components/organisms/ProfileSection";
import { ServicesSection } from "../components/organisms/ServicesSection";
import { fallbackProfile, portfolioItems } from "../data/fallback";
import { api } from "../services/api";
import type { Profile } from "../types";

export function HomePage() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);

  useEffect(() => {
    api
      .getProfile()
      .then(setProfile)
      .catch(() => setProfile(fallbackProfile));
  }, []);

  return (
    <>
      <HeroSection profile={profile} />
      <ProfileSection profile={profile} />
      <ServicesSection />
      <PortfolioSection items={portfolioItems} />
      <LabSection />
      <ProcessSection />
      <ContactSection profile={profile} />
    </>
  );
}
