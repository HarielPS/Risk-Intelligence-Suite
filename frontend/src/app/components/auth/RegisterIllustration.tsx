"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  atTop: boolean;
};

export function RegisterIllustration({ atTop }: Props) {
  return (
    <div
      className={clsx(
        "hidden lg:flex lg:sticky lg:top-0 lg:h-screen items-center justify-center",
        atTop ? "-mt-10" : ""
      )}
    >
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 blur-3xl opacity-40 bg-linear-to-br from-primary to-focus" />
        <div className="relative rounded-3xl bg-background border border-border/60 px-6 py-8 shadow-2xl flex flex-col items-center gap-4 h-[80vh]">
          <Image
            src="/assets/auth/registrarse/registro.jpg"
            alt="Analítica de riesgo Inbursa"
            width={260}
            height={260}
            className="h-full w-full max-w-none rounded-2xl object-cover"
          />
          <p className="text-sm text-muted-foreground text-center">
            Centraliza tus solicitudes de crédito y deja que nuestros modelos de{" "}
            <span className="font-semibold text-primary">
              inteligencia de riesgo
            </span>{" "}
            te ayuden a tomar mejores decisiones.
          </p>
        </div>
      </div>
    </div>
  );
}
