"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";

type Props = {
  atTop: boolean;
};

export function RegisterBackLink({ atTop }: Props) {
  return (
    <Link
      href="/"
      className={clsx(
        `
        fixed top-4 z-50
        inline-flex items-center gap-2
        text-sm font-medium
        transition-all duration-300
        `,
        atTop
          ? "text-muted-foreground hover:text-foreground"
          : `
            bg-background text-foreground
            rounded-full shadow-md
            px-3 py-2
            hover:shadow-lg
            border-2
          `
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Volver al inicio</span>
    </Link>
  );
}
