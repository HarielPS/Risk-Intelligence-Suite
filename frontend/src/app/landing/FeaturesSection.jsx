import SectionTitle from "@/app/components/landing/SectionTitle";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div>
      <SectionTitle
        text1="Características"
        text2="Soluciones financieras inteligentes"
        text3="Herramientas diseñadas para darte control total, seguridad y claridad sobre tu dinero, en tiempo real."
      />

      <div className="flex flex-wrap items-center justify-center gap-10 mt-16">
        {/* Feature 1 */}
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <Image
            className="rounded-xl"
            src="/assets/landing/Features/analitica.jpg"
            alt="Analítica predictiva de gastos e ingresos"
            height={400}
            width={400}
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">
            Analítica Predictiva
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Visualiza tus gastos e ingresos con gráficos inteligentes que te
            ayudan a ahorrar de forma automática.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <Image
            className="rounded-xl"
            src="/assets/landing/Features/User.jpg"
            alt="Seguridad bancaria multinivel"
            height={400}
            width={400}
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">
            Seguridad Multi-nivel
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Controla tus tarjetas, límites de MTU y accesos familiares con un
            solo clic desde tu dashboard.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <Image
            className="rounded-xl"
            src="/assets/landing/Features/factura.jpg"
            alt="Facturación bancaria automática"
            height={400}
            width={400}
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">
            Facturación Express
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Genera facturas fiscales de tus movimientos bancarios al instante y
            simplifica tu contabilidad.
          </p>
        </div>
      </div>
    </div>
  );
}
