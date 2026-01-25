"use client";

import { useAtTop } from "@/hooks/useAtTop";
import { RegisterBackLink } from "./RegisterBackLink";
import { RegisterCard } from "./RegisterCard";
import { RegisterIllustration } from "./RegisterIllustration";
import { RegisterIllustrationMobile } from "./RegisterIllustrationMobile";

export function RegisterPage() {
  const atTop = useAtTop();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10 lg:px-8">
      <div className="relative w-full max-w-6xl">
        <div className="flex sticky top-10 z-4">
            <RegisterBackLink atTop={atTop} />
        </div>

        <div className="mt-8 lg:mt-0 grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <RegisterCard />
          <RegisterIllustration atTop={atTop} />
          <RegisterIllustrationMobile />
        </div>
      </div>
    </div>
  );
}
