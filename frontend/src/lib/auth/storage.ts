'use client';

import type { AuthUser, LoginResponse } from '../types/auth';

const AUTH_USER_KEY = 'ris_auth_user';
const AUTH_TOKEN_KEY = 'ris_access_token';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    return parsed;
  } catch (err) {
    console.error('[auth/storage] Error parsing stored user', err);
    return null;
  }
}

export function getStoredToken(): string | null {
  if (!isBrowser()) return null;

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuth(login: LoginResponse): void {
  if (!isBrowser()) return;

  const { accessToken, ...user } = login;

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

  if (accessToken) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  }
}

export function clearAuth(): void {
  if (!isBrowser()) return;

  window.localStorage.removeItem(AUTH_USER_KEY);
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}
