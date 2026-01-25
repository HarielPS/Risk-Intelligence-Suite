"use client";

import { FormEvent, useState } from "react";
import type { CreateCreditApplicationDto } from "@/lib/types/creditApplications";

interface CreditApplicationFormProps {
  loading: boolean;
  onSubmit: (values: CreateCreditApplicationDto) => Promise<void> | void;
}

// === Tablas de opciones (mapping etiqueta -> código numérico del modelo) ===

const PURPOSE_OPTIONS = [
  { value: 0, label: "Otros" },
  { value: 1, label: "Auto nuevo" },
  { value: 2, label: "Auto usado" },
  { value: 3, label: "Muebles" },
  { value: 4, label: "Electrodomésticos" },
  { value: 5, label: "Reparaciones" },
  { value: 6, label: "Educación" },
  { value: 7, label: "Vacaciones" },
  { value: 8, label: "Reentrenamiento" },
  { value: 9, label: "Negocios pequeños" },
  { value: 10, label: "Negocios" },
];

const EMPLOYMENT_DURATION_OPTIONS = [
  { value: 1, label: "< 1 año" },
  { value: 2, label: "1 a 4 años" },
  { value: 3, label: "4 a 7 años" },
  { value: 4, label: "≥ 7 años" },
  { value: 5, label: "Desconocido" },
];

const INSTALLMENT_RATE_OPTIONS = [
  { value: 1, label: "< 20% del ingreso" },
  { value: 2, label: "20% a 25%" },
  { value: 3, label: "25% a 35%" },
  { value: 4, label: "≥ 35%" },
];

const CREDIT_HISTORY_OPTIONS = [
  { value: 0, label: "Historial muy débil / desconocido" },
  { value: 1, label: "Crédito crítico" },
  { value: 2, label: "Crédito en curso" },
  { value: 3, label: "Crédito previo al día" },
  { value: 4, label: "Excelente historial" },
];

const ACCOUNT_STATUS_OPTIONS = [
  { value: 1, label: "Saldo negativo / sin cuenta" },
  { value: 2, label: "Saldo bajo" },
  { value: 3, label: "Saldo medio" },
  { value: 4, label: "Saldo alto / estable" },
];

const SAVINGS_OPTIONS = [
  { value: 1, label: "< 100 unidades" },
  { value: 2, label: "100 – 500" },
  { value: 3, label: "500 – 1000" },
  { value: 4, label: "> 1000" },
  { value: 5, label: "Sin cuenta de ahorros" },
];

const PERSONAL_STATUS_OPTIONS = [
  { value: 1, label: "Mujer soltera" },
  { value: 2, label: "Mujer casada / viuda" },
  { value: 3, label: "Hombre casado / viudo" },
  { value: 4, label: "Hombre soltero" },
];

const OTHER_DEBTORS_OPTIONS = [
  { value: 1, label: "Ninguno" },
  { value: 2, label: "Co-deudor" },
  { value: 3, label: "Garante" },
];

const PRESENT_RESIDENCE_OPTIONS = [
  { value: 1, label: "< 1 año" },
  { value: 2, label: "1 a 4 años" },
  { value: 3, label: "4 a 7 años" },
  { value: 4, label: "≥ 7 años" },
];

const PROPERTY_OPTIONS = [
  { value: 1, label: "Bienes inmuebles" },
  { value: 2, label: "Seguro de vida" },
  { value: 3, label: "Auto u otros activos" },
  { value: 4, label: "Sin activos relevantes" },
];

const OTHER_INSTALLMENT_PLANS_OPTIONS = [
  { value: 1, label: "Ninguno" },
  { value: 2, label: "En banco" },
  { value: 3, label: "En tienda" },
];

const HOUSING_OPTIONS = [
  { value: 1, label: "Renta" },
  { value: 2, label: "Propia" },
  { value: 3, label: "Sin renta (familia, etc.)" },
];

const NUMBER_CREDITS_OPTIONS = [
  { value: 1, label: "1 crédito" },
  { value: 2, label: "2–3 créditos" },
  { value: 3, label: "4–5 créditos" },
  { value: 4, label: "≥ 6 créditos" },
];

const JOB_OPTIONS = [
  { value: 1, label: "Desempleado / no calificado" },
  { value: 2, label: "No calificado" },
  { value: 3, label: "Empleado calificado" },
  { value: 4, label: "Altamente calificado / directivo" },
];

const PEOPLE_LIABLE_OPTIONS = [
  { value: 1, label: "1 persona a cargo" },
  { value: 2, label: "≥ 2 personas a cargo" },
];

const TELEPHONE_OPTIONS = [
  { value: 1, label: "No tiene teléfono" },
  { value: 2, label: "Tiene teléfono" },
];

const FOREIGN_WORKER_OPTIONS = [
  { value: 1, label: "Trabajador extranjero" },
  { value: 2, label: "No es trabajador extranjero" },
];

export function CreditApplicationForm({
  loading,
  onSubmit,
}: CreditApplicationFormProps) {
  const [form, setForm] = useState<CreateCreditApplicationDto>({
    durationMonths: 24,
    purpose: 1,
    amount: 5000,
    employmentDuration: 3,
    installmentRate: 2,
    creditHistory: 2,     // crédito en curso
    accountStatus: 2,     // saldo bajo
    savings: 3,           // 500–1000
    personalStatusSex: 3,
    otherDebtors: 1,
    presentResidence: 3,
    property: 2,
    otherInstallmentPlans: 3,
    housing: 2,
    numberCredits: 2,
    job: 3,
    peopleLiable: 2,
    telephone: 2,
    foreignWorker: 2,
  });

  function handleNumberChange(
    field: keyof CreateCreditApplicationDto,
    value: string
  ) {
    const parsed = Number(value);
    setForm((prev) => ({
      ...prev,
      [field]: isNaN(parsed) ? ("" as any) : parsed,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1) Datos básicos de la solicitud */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* durationMonths */}
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Duración del crédito (meses)
          </label>
          <input
            type="number"
            min={1}
            max={120}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={form.durationMonths}
            onChange={(e) =>
              handleNumberChange("durationMonths", e.target.value)
            }
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Entre 1 y 120 meses.
          </p>
        </div>

        {/* purpose */}
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Propósito del crédito
          </label>
          <select
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={form.purpose}
            onChange={(e) => handleNumberChange("purpose", e.target.value)}
          >
            {PURPOSE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value} - {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Monto y antigüedad laboral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* amount */}
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Monto del crédito
          </label>
          <input
            type="number"
            min={1}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={form.amount}
            onChange={(e) => handleNumberChange("amount", e.target.value)}
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Unidades monetarias.
          </p>
        </div>

        {/* employmentDuration */}
        <div>
          <label className="block text-xs font-medium text-slate-700">
            Antigüedad laboral
          </label>
          <select
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={form.employmentDuration}
            onChange={(e) =>
              handleNumberChange("employmentDuration", e.target.value)
            }
          >
            {EMPLOYMENT_DURATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value} - {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* % cuota / ingreso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* installmentRate */}
        <div>
          <label className="block text-xs font-medium text-slate-700">
            % cuota / ingreso
          </label>
          <select
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={form.installmentRate}
            onChange={(e) =>
              handleNumberChange("installmentRate", e.target.value)
            }
          >
            {INSTALLMENT_RATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value} - {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden" />
      </div>

      {/* 2) Datos del cliente */}
      <fieldset className="border border-slate-200 rounded-lg p-3">
        <legend className="px-1 text-[11px] font-medium text-slate-500">
          Datos adicionales del cliente
        </legend>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* personalStatusSex */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Estado civil y sexo
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.personalStatusSex}
              onChange={(e) =>
                handleNumberChange("personalStatusSex", e.target.value)
              }
            >
              {PERSONAL_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* otherDebtors */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Otros deudores
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.otherDebtors}
              onChange={(e) =>
                handleNumberChange("otherDebtors", e.target.value)
              }
            >
              {OTHER_DEBTORS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* presentResidence */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Tiempo en residencia
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.presentResidence}
              onChange={(e) =>
                handleNumberChange("presentResidence", e.target.value)
              }
            >
              {PRESENT_RESIDENCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* property */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Propiedad
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.property}
              onChange={(e) => handleNumberChange("property", e.target.value)}
            >
              {PROPERTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* otherInstallmentPlans */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Otros planes de pago
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.otherInstallmentPlans}
              onChange={(e) =>
                handleNumberChange("otherInstallmentPlans", e.target.value)
              }
            >
              {OTHER_INSTALLMENT_PLANS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* housing */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Tipo de vivienda
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.housing}
              onChange={(e) => handleNumberChange("housing", e.target.value)}
            >
              {HOUSING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* numberCredits */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Número de créditos existentes
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.numberCredits}
              onChange={(e) =>
                handleNumberChange("numberCredits", e.target.value)
              }
            >
              {NUMBER_CREDITS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* job */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Ocupación
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.job}
              onChange={(e) => handleNumberChange("job", e.target.value)}
            >
              {JOB_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* peopleLiable */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Personas a cargo
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.peopleLiable}
              onChange={(e) =>
                handleNumberChange("peopleLiable", e.target.value)
              }
            >
              {PEOPLE_LIABLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* telephone */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Teléfono
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.telephone}
              onChange={(e) =>
                handleNumberChange("telephone", e.target.value)
              }
            >
              {TELEPHONE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* foreignWorker */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700">
              Trabajador extranjero
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.foreignWorker}
              onChange={(e) =>
                handleNumberChange("foreignWorker", e.target.value)
              }
            >
              {FOREIGN_WORKER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* 3) Datos internos del banco (demo) */}
      <fieldset className="border border-indigo-200 rounded-lg p-3 bg-indigo-50/40">
        <legend className="px-1 text-[11px] font-medium text-indigo-700">
          Datos internos del banco (modo demo)
        </legend>

        <p className="mt-1 text-[11px] text-indigo-700/80">
          En un entorno real, estos valores se obtienen de la cuenta corriente,
          ahorros e historial del cliente directamente desde los sistemas del
          banco. En esta demo puedes ajustarlos manualmente para ver cómo cambia
          el riesgo.
        </p>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          {/* accountStatus */}
          <div>
            <label className="block text-[11px] font-medium text-slate-800">
              Estado de la cuenta corriente
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.accountStatus}
              onChange={(e) =>
                handleNumberChange("accountStatus", e.target.value)
              }
            >
              {ACCOUNT_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* savings */}
          <div>
            <label className="block text-[11px] font-medium text-slate-800">
              Cuenta de ahorros
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.savings}
              onChange={(e) => handleNumberChange("savings", e.target.value)}
            >
              {SAVINGS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* creditHistory */}
          <div>
            <label className="block text-[11px] font-medium text-slate-800">
              Historial crediticio
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={form.creditHistory}
              onChange={(e) =>
                handleNumberChange("creditHistory", e.target.value)
              }
            >
              {CREDIT_HISTORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value} - {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </fieldset>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex items-center justify-center
            rounded-md bg-sky-600 px-4 py-2
            text-sm font-semibold text-white
            shadow-sm
            hover:bg-sky-700
            cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {loading ? "Enviando solicitud..." : "Calcular riesgo de crédito"}
        </button>
      </div>
    </form>
  );
}
