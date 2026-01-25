"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PasswordField } from "@/app/components/auth/PasswordField";
import { useAgeFromBirthdate } from "@/hooks/useAgeFromBirthdate";
import { registerUser } from "@/lib/api-client";

export function RegisterCard() {
  const router = useRouter()
  // === estados de formulario ===
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [country, setCountry] = useState("MX");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const age = useAgeFromBirthdate(birthdate);

  // === estados de UI ===
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("Debes aceptar los términos y condiciones.");
      return;
    }

    if (!birthdate) {
      setErrorMsg("La fecha de nacimiento es obligatoria.");
      return;
    }

    try {
      setLoading(true);

      console.log(">>> handleSubmit form values", {
        email,
        firstName,
        lastName,
        secondLastName,
        country,
        birthdate,
        password,
        confirmPassword,
        acceptTerms,
        marketingOptIn,
      });


      const user = await registerUser({
        email,
        password,
        firstName,
        lastName,
        secondLastName: secondLastName || undefined,
        country,
        birthdate,
        acceptTerms,
        marketingOptIn,
      });

      console.log("Usuario registrado:", user);
      setSuccessMsg(
        "Cuenta creada correctamente. Ahora puedes iniciar sesión."
      );
      router.push("/login")
      // Aquí luego podemos hacer router.push("/login")
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-secondary text-secondary-foreground border border-border rounded-2xl shadow-xl px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <Image
            src="/assets/logo/corto/inbursa_logo_corto_blanco.svg"
            alt="Inbursa"
            width={24}
            height={24}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            Plataforma de riesgo Inbursa
          </p>
          <p className="text-sm text-muted-foreground">
            Configura tu perfil para evaluar solicitudes de crédito.
          </p>
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight mb-1">
        Crea tu cuenta
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Carga tu información básica y algunos datos financieros para que
        podamos estimar tu riesgo crediticio inicial.
        <br />
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Inicia sesión aquí
        </Link>
        .
      </p>

      {errorMsg && (
        <p className="mb-3 text-sm font-medium text-destructive">
          {errorMsg}
        </p>
      )}

      {successMsg && (
        <p className="mb-3 text-sm font-medium text-success">
          {successMsg}
        </p>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Información de acceso */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Información de acceso
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-background text-foreground
                  px-3 py-2
                  border border-border
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
                placeholder="nombre@empresa.com"
              />
            </div>

            {/* Nombre(s) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre(s)
              </label>
              <input
                type="text"
                name="first_name"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-background text-foreground
                  px-3 py-2
                  border border-border
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
                placeholder="p. ej. Juan Carlos"
              />
            </div>

            {/* Primer apellido */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Primer apellido
              </label>
              <input
                type="text"
                name="last_name"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-background text-foreground
                  px-3 py-2
                  border border-border
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
                placeholder="p. ej. Pérez"
              />
            </div>

            {/* Segundo apellido */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Segundo apellido
              </label>
              <input
                type="text"
                name="second_last_name"
                autoComplete="additional-name"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-background text-foreground
                  px-3 py-2
                  border border-border
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
                placeholder="p. ej. Gómez (opcional)"
              />
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium mb-1">
                País
              </label>
              <select
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-background text-foreground
                  px-3 py-2
                  border border-border
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
                required
              >
                <option value="" disabled>
                  Elige un país
                </option>
                <option value="MX">México</option>
                <option value="US">Estados Unidos</option>
                <option value="CA">Canadá</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>

            {/* Contraseña */}
            <PasswordField
              label="Contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <PasswordField
              label="Confirmar contraseña"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />


            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="birthdate"
                required
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-background text-foreground
                  px-3 py-2
                  border border-border
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
              />
              {age !== null && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Edad estimada:{" "}
                  <span className="font-semibold">{age}</span> años
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
            />
            <span>
              Al registrarte, aceptas los{" "}
              <button
                type="button"
                className="text-primary hover:text-primary-hover underline underline-offset-2"
              >
                Términos y Condiciones
              </button>{" "}
              y el{" "}
              <button
                type="button"
                className="text-primary hover:text-primary-hover underline underline-offset-2"
              >
                Aviso de Privacidad
              </button>{" "}
              de Inbursa.
            </span>
          </label>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
            />
            <span>
              Deseo recibir comunicaciones sobre productos, actualizaciones y
              recursos de Inbursa.
            </span>
          </label>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-2 inline-flex w-full items-center justify-center
            rounded-md bg-primary px-4 py-2.5
            text-sm font-semibold text-primary-foreground
            hover:bg-primary-hover
            focus:outline-none focus:ring-2 focus:ring-ring
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
