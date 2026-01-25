// src/lib/api/creditLetters.ts

import { httpClient } from "./httpClient";
import type { CreditLetter } from "../types/creditLetters";

export async function generateCreditLetter(
  userId: string,
  applicationId: string,
): Promise<CreditLetter> {
  const url = `/credit-applications/${userId}/${applicationId}/letter`;
  const letter = await httpClient.post<CreditLetter>(url);

  return letter;
}
