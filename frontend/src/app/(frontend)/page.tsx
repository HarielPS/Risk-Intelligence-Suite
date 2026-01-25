import { FaqSection } from "@/app/landing/FaqSection";
import FeaturesSection from "@/app/landing/FeaturesSection";
import HeroSection from "@/app/landing/HeroSection";
import Testimonials from "@/app/landing/Testimonials";
import TrustedCompanies from "@/app/landing/TrustedCompanies";
import ServicesCarousel from "@/app/components/landing/QuoteCarousel";

export default function Page() {
  return (
    <>
      <section id="inicio">
        <HeroSection />
      </section>

      <section id="soluciones">
        <TrustedCompanies />
        <ServicesCarousel />
      </section>

      <section id="caracteristicas">
        <FeaturesSection />
      </section>

      <section id="testimonios">
        <Testimonials />
      </section>

      <section id="faq">
        <FaqSection />
      </section>
    </>
  );
}
