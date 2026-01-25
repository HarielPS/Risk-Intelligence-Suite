const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // por si el body viene vacío
  }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Error HTTP ${res.status}`;
    throw new ApiError(msg, res.status);
  }

  return data as T;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  secondLastName?: string;
  country: string;
  birthdate: string;
  acceptTerms: boolean;
  marketingOptIn?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "CLIENT" | "EXECUTIVE";
  firstName: string;
  lastName: string;
}

export function registerUser(payload: RegisterPayload) {
  console.log(">>> registerUser payload", payload);
  return request<AuthUser>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: { email: string; password: string }) {
  console.log(">>> loginUser payload", payload); // debug
  return request<AuthUser>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}