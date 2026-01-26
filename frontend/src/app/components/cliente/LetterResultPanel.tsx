"use client";

import type { CreditLetter } from "@/lib/types/creditLetters";

interface LetterResultPanelProps {
  letter: CreditLetter | null;
  loading: boolean;
}

export function LetterResultPanel({ letter, loading }: LetterResultPanelProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-slate-900">
            Carta de Explicabilidad
          </h3>
          <span className="inline-flex items-center text-xs text-slate-500">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Generando carta...
          </span>
        </div>
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
        Aún no se ha generado una carta de explicabilidad. Envía una solicitud
        para recibir una carta.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <h3 className="text-lg font-medium text-slate-900 mb-3">
        Carta de Explicabilidad - Decisión:{" "}
        <span
          className={
            letter.decision === "APPROVE"
              ? "text-emerald-600"
              : letter.decision === "REVIEW"
              ? "text-amber-600"
              : "text-rose-600"
          }
        >
          {letter.decision}
        </span>
      </h3>
      <p className="whitespace-pre-line text-slate-800 mb-4">
        {letter.letterText}
      </p>
      {(letter.bullets?.length ?? 0) > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-semibold text-slate-900 mb-2">
            Puntos clave:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-slate-800">
            {letter.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      )}
      {(letter.safetyFlags?.length ?? 0) > 0 && (
        <div>
          <h4 className="text-md font-semibold text-slate-900 mb-2">
            Alertas de seguridad:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-rose-800">
            {letter.safetyFlags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
