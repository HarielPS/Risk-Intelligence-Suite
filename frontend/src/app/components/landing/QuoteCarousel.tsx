"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import Image from "next/image";

import "swiper/css";

const services = [
  {
    title: "Responsabilidad Civil",
    description:
      "Cotiza y contrata tu seguro de responsabilidad civil y manejo protegido.",
    image: "/assets/landing/Carousel/responsabilidad-civil.jpg",
    href: "#",
  },
  {
    title: "Línea Habit Inbursa",
    description:
      "Cuida, protege y cuida los más valiosos de tu familia y tu patrimonio.",
    image: "/assets/landing/Carousel/lineaHabit.jpg",
    href: "#",
  },
  {
    title: "Autoexpress",
    description:
      "Contrata y estrena auto fácil y rápido. Ponte al volante sin complicaciones.",
    image: "/assets/landing/Carousel/Autoexpress.jpg",
    href: "#",
  },
  {
    title: "Gastos Médicos",
    description:
      "Protección integral para ti y tu familia con atención en hospitales de alto nivel.",
    image: "/assets/landing/Carousel/gastosMedicos.jpg",
    href: "#",
  },
];

export default function ServicesCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full  mt-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="flex justify-center text-2xl md:text-3xl font-semibold text-foreground">
          Cotiza y contrata en línea
        </h2>

        {/* PANEL tipo “marco” igual que Inbursa */}
        <div className="mt-8 rounded-[40px] bg-muted py-10 px-4 md:px-6 shadow-[0_24px_60px_rgba(0,0,0,0.04)]">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            spaceBetween={23}                      
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="overflow-hidden flex justify-center"
          >
            {services.map((service) => (
              <SwiperSlide key={service.title} className="flex justify-center">
                {/* <article className="group h-full rounded-4xl bg-white overflow-hidden flex flex-col"> */}
                <article className="group h-full max-w-90 mx-auto rounded-4xl bg-white overflow-hidden flex flex-col ">

                  {/* Imagen */}
                  <div className="relative h-52">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col gap-3 flex-1 text-left">
                    <h3 className="text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      {service.description}
                    </p>

                    <a
                      href={service.href}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                    >
                      Ver más
                      <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Flechas abajo, centradas, dentro del marco */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
