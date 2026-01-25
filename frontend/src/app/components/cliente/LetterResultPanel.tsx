"use client";

import type {
    CreditLetter,
} from "@/lib/types/creditLetters";

interface LetterResultPanelProps {
    letter: CreditLetter | null;
}

export function LetterResultPanel({ letter }: LetterResultPanelProps) {
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
            {letter.bullets.length > 0 && (
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
            {letter.safetyFlags.length > 0 && (
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