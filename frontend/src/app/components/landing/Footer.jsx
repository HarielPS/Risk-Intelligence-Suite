import { navLinks } from "@/app/data/navLinks";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-40 w-full text-slate-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">
        {/* Logo + descripción */}
        <div className="md:max-w-114">
          <a href="/">
            <Image
              className="h-9 md:h-9.5 w-auto shrink-0"
              src="/assets/logo/largo/inbursa_logo_largo_azulFuerte.svg"
              alt="Inbursa logo"
              width={140}
              height={40}
              priority
              fetchPriority="high"
            />
          </a>
          <p className="mt-6">
            Optimiza tu dinero con la nueva banca digital de Inbursa. Administra
            cuentas, tarjetas, pagos y facturación desde una sola plataforma,
            con la solidez de un grupo financiero global.
          </p>
        </div>

        {/* Enlaces + contacto */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Producto</h2>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-600 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5 text-gray-800">
              ¿Necesitas ayuda?
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium text-slate-700">
                  Atención Inbursa
                </span>
                <br />
                55 5447 8000
              </p>
              <p>
                <span className="font-medium text-slate-700">Soporte digital</span>
                <br />
                soporte@inbursa.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center pb-5 text-xs md:text-sm">
        © {new Date().getFullYear()} Grupo Financiero Inbursa. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}
