"use client";

import type {
  CreditApplicationResponse,
  RiskBand,
} from "@/lib/types/creditApplications";

interface CreditResultPanelProps {
  result: CreditApplicationResponse | null;
}

function riskBandClasses(band: RiskBand) {
  switch (band) {
    case "LOW":
      return "border-emerald-200 bg-emerald-50 text-emerald-900";
    case "MEDIUM":
      return "border-amber-200 bg-amber-50 text-amber-900";
    case "HIGH":
      return "border-rose-200 bg-rose-50 text-rose-900";
  }
}

function riskBandLabel(band: RiskBand) {
  switch (band) {
    case "LOW":
      return "Riesgo BAJO";
    case "MEDIUM":
      return "Riesgo MEDIO";
    case "HIGH":
      return "Riesgo ALTO";
  }
}

export function CreditResultPanel({ result }: CreditResultPanelProps) {
  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
        Aún no has enviado una solicitud. Completa el formulario para estimar el
        riesgo de crédito.
      </div>
    );
  }

  const probabilityPct = (result.probabilityDefault * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div
        className={`rounded-xl border px-4 py-3 flex items-center justify-between ${riskBandClasses(
          result.riskBand
        )}`}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide">
            Banda de riesgo
          </p>
          <p className="text-lg font-semibold">{riskBandLabel(result.riskBand)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide">
            Probabilidad de incumplimiento
          </p>
          <p className="text-2xl font-semibold">{probabilityPct}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Principales factores del modelo
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Explicación generada a partir de los valores de entrada y las
          contribuciones del modelo (tipo SHAP).
        </p>

        <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
          {result.topFeatures.map((f) => (
            <div
              key={f.feature + f.value_label}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
            >
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-800">
                    {f.feature_label}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Valor: <span className="font-mono">{f.value_label}</span> (
                    {f.raw_value})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-500">
                    Contribución SHAP
                  </p>
                  <p className="font-mono text-[11px]">
                    {f.shap_value.toFixed(4)}
                  </p>
                  <p
                    className={`mt-0.5 text-[11px] font-medium ${
                      f.impact_direction === "INCREASES_RISK"
                        ? "text-rose-700"
                        : f.impact_direction === "REDUCES_RISK"
                        ? "text-emerald-700"
                        : "text-slate-600"
                    }`}
                  >
                    {f.impact_text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-2 text-[10px] text-slate-400">
          Este panel tiene fines ilustrativos y no sustituye una política de
          riesgo formal.
        </p>
      </div>
    </div>
  );
}
