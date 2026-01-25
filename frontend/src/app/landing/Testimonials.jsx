import SectionTitle from "@/app/components/landing/SectionTitle";
import TestimonialCard from "@/app/components/landing/TestimonialCard";
import { testimonialsData } from "@/app/data/testimonialsData";
import Marquee from "react-fast-marquee";

export default function Testimonials() {
  return (
    <div className="mt-20">
      <SectionTitle
        text1="Testimonios"
        text2="Historias de confianza"
        text3="Clientes que gestionan su patrimonio, empresas y operaciones diarias con la nueva banca Inbursa."
      />

      <Marquee
        className="max-w-5xl mx-auto mt-11"
        gradient={true}
        speed={25}
      >
        <div className="flex items-center justify-center py-5">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ),
          )}
        </div>
      </Marquee>

      <Marquee
        className="max-w-5xl mx-auto"
        gradient={true}
        speed={25}
        direction="right"
      >
        <div className="flex items-center justify-center py-5">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ),
          )}
        </div>
      </Marquee>
    </div>
  );
}
