"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: "new-password" | "current-password";
  placeholder?: string;
  required?: boolean;
};

export function PasswordField({
  label,
  name,
  value,
  onChange,
  autoComplete = "new-password",
  placeholder = "••••••••",
  required = true,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="
            block w-full rounded-md
            bg-background text-foreground
            px-3 py-2
            border border-border
            placeholder:text-secondary
            focus:outline-none
            focus:ring-2 focus:ring-ring
            pr-10
          "
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="
            absolute inset-y-0 right-0 flex items-center pr-3
            text-muted-foreground hover:text-foreground
          "
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
