"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// autenticacion y proteccion de ruta
import { getStoredUser } from "@/lib/auth/storage";
import type { AuthUser } from "@/lib/types/auth";

// Dto y funciones de endpoint
import type {
  CreditApplicationResponse,
  CreateCreditApplicationDto,
  CreditApplicationResult
} from "@/lib/types/creditApplications";

// createCreditApplication y resultado de solicitud
import { CreditApplicationForm } from "@/app/components/cliente/CreditApplicationForm";
import { CreditResultPanel } from "@/app/components/cliente/CreditResultPanel";
import {
  createCreditApplication,
} from "@/lib/api/creditApplications";


// creacion y resultado de letter
import { generateCreditLetter } from "@/lib/api/creditLetters";
import type { CreditLetter } from "@/lib/types/creditLetters";
import { LetterResultPanel } from "../components/cliente/LetterResultPanel";


export default function ClientePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // estados para resultado de solicitud y carta
  const [result, setResult] = useState<CreditApplicationResponse | null>(null);
  const [letter, setLetter] = useState<CreditLetter | null>(null);

  useEffect(() => {
    const stored = getStoredUser();

    if (!stored) {
      router.replace("/login");
      return;
    }

    setUser(stored);
    setCheckedAuth(true);
  }, [router]);

  async function handleSubmit(formValues: CreateCreditApplicationDto) {
    if (!user) return;
    setErrorMsg(null);
    setLoading(true);
    setLetter(null);

    try {
      const response = await createCreditApplication(user.id, formValues);
      setResult(response);
      
      
      // 2.2 Generar carta de explicabilidad
      try{
        const letterResponse = await generateCreditLetter(user.id, response.id);
        setLetter(letterResponse);
      }catch(err){
        console.error("Error al generar carta de explicabilidad:", err);
      }
    } catch (err: any) {
      console.error("Error al crear solicitud de crédito:", err);
      setErrorMsg(
        err?.message ??
          "Ocurrió un error al procesar la solicitud de crédito."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!checkedAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Cargando sesión...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const fullName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email;

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        
        <header className="mb-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Hola, {fullName} 👋
          </h1>
          <p className="text-sm text-slate-600">
            Bienvenido a tu panel de solicitud de crédito.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Rol:{" "}
            <span className="font-mono px-1 py-0.5 rounded bg-slate-100">
              {user.role}
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Tu ID de cliente para las solicitudes es:{" "}
            <span className="font-mono px-1 py-0.5 rounded bg-slate-100">
              {user.id}
            </span>
          </p>
        </header>

        {errorMsg && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-medium text-slate-900 mb-2">
              Solicitud de crédito
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Completa los datos para estimar el riesgo de incumplimiento con el
              modelo de crédito.
            </p>

            <CreditApplicationForm loading={loading} onSubmit={handleSubmit} />
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-slate-900">
              Resultado del modelo
            </h2>
            <CreditResultPanel result={result} />
            <LetterResultPanel letter={letter} />
          </section>
        </div>
      </div>

    </main>
  );
}
