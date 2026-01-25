import { ChevronRightIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[url('/assets/hero-section-dot-image.png')] bg-cover bg-no-repeat">
      {/* Pill superior */}
      <a
        href="https://www.inbursa.com/sites/gfi/personas/serviciosdigitales"
        className="flex items-center gap-2 rounded-full p-1 pr-3 mt-30 text-focus bg-indigo-50"
      >
        <span className="bg-focus text-white text-xs px-3.5 py-1 rounded-full">
          NUEVO
        </span>
        <p className="flex items-center gap-1">
          <span>Conoce la nueva banca Inbursa</span>
          <ChevronRightIcon size={16} />
        </p>
      </a>

      {/* Título principal */}
      <h1 className="text-[40px]/12 md:text-[54px]/16 font-semibold max-w-3xl mt-4">
        <span className="bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          El futuro de tus finanzas
        </span>{" "}
        , con la solidez de Inbursa.
      </h1>

      {/* Subtítulo */}
      <p className="text-base text-slate-600 max-w-lg mt-5">
        Gestiona tu patrimonio con herramientas inteligentes, automatización de
        pagos y el respaldo de una infraestructura global. Sin fricciones, todo
        desde un mismo lugar.
      </p>

      {/* Botones */}
      <div className="flex items-center gap-4 mt-6">
        <button className="bg-primary hover:bg-primary-hover cursor-pointer transition px-8 py-3 rounded-md text-white">
          <span>Abrir cuenta en minutos</span>
        </button>
        <button className="flex items-center justify-center gap-2 border border-primary px-5 py-3 rounded-md text-primary hover:bg-secondary-hover cursor-pointer">
          <SparklesIcon size={16} />
          <span>Explorar servicios IA</span>
        </button>
      </div>

      {/* Imagen principal */}
      <Image
        className="w-full max-w-xl mt-16 drop-shadow-2xl drop-shadow-blue-500/15 mx-auto"
        src="/assets/hero-section-card-image.svg"
        alt="Tarjeta y panel financiero de la nueva banca Inbursa"
        width={1000}
        height={500}
        priority
        fetchPriority="high"
      />
    </div>
  );
}
