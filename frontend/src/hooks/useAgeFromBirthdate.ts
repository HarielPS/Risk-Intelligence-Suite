"use client";

import { useMemo } from "react";

/**
 * Hook que calcula la edad a partir de una fecha de nacimiento (YYYY-MM-DD).
 * Devuelve `number` o `null` si la fecha no es válida.
 */
export function useAgeFromBirthdate(birthdate?: string | null) {
  const age = useMemo(() => {
    if (!birthdate) return null;

    const birth = new Date(birthdate);
    if (Number.isNaN(birth.getTime())) return null;

    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Si aún no ha cumplido años este año, restamos 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      years--;
    }

    return years;
  }, [birthdate]);

  return age;
}
