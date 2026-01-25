"use client";

import Image from "next/image";

export function RegisterIllustrationMobile() {
  return (
    <div className="lg:hidden w-full flex items-center justify-center">
      <div className="relative w-full max-w-md mt-6">
        <div className="absolute inset-0 blur-3xl opacity-40 bg-linear-to-br from-primary to-focus" />
        <div className="relative rounded-3xl bg-background border border-border/60 px-6 py-6 shadow-2xl flex flex-col items-center gap-4">
          <Image
            src="/assets/auth/registrarse/registro.jpg"
            alt="Analítica de riesgo Inbursa"
            width={260}
            height={260}
            className="h-auto w-full rounded-2xl object-cover"
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
