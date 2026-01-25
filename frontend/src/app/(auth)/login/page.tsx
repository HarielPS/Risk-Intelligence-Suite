"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api-client";
// import { saveAuthUser } from "@/lib/auth-storage";
import { setAuth } from "@/lib/auth/storage";
import { PasswordField } from "@/app/components/auth/PasswordField";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    try {
      setLoading(true);

      console.log(">>> login form values", { email, password });

      const user = await loginUser({ email, password });

      const loginResponse = await loginUser({ email, password });

      console.log(">>> login OK, user:", loginResponse);

      setAuth(loginResponse);

      // Mandar al home de cliente
      router.push("/cliente");
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(
        err?.message ??
          "No fue posible iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 lg:px-8 text-foreground">
      <Link
        href="/"
        className="
          absolute top-6 left-6
          inline-flex items-center gap-2
          text-sm font-medium
          text-muted-foreground
          hover:text-foreground
          transition-colors
        "
      >
        <ArrowLeft className="h-5 w-5" />
        Volver al inicio
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/assets/logo/largo/inbursa_logo_largo_azulFuerte.svg"
          alt="Inbursa"
          width={40}
          height={40}
          className="mx-auto h-30 w-auto"
        />

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-foreground">
          Accede a tu cuenta Inbursa
        </h2>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Ingresa con tu correo electrónico y contraseña
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMsg && (
          <p className="mb-4 text-sm font-medium text-destructive">
            {errorMsg}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Correo */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Correo electrónico
            </label>

            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  block w-full rounded-md
                  bg-secondary text-secondary-foreground
                  px-3 py-2
                  border border-border
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2 focus:ring-ring
                "
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <PasswordField
              label="Contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <div className="mt-1 text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-focus hover:text-focus-hover"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Botón */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="
                flex w-full justify-center rounded-md
                bg-primary text-primary-foreground
                px-3 py-2 text-sm font-semibold
                hover:bg-primary-hover
                focus:outline-none
                focus:ring-2 focus:ring-ring
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          ¿Aún no tienes una cuenta?{" "}
          <Link
            href="/registrarse"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
