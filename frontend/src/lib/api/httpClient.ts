'use client';

import { getStoredToken } from '../auth/storage';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: any;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = getStoredToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (typeof options.headers === 'object' && !Array.isArray(options.headers)) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let errorBody: any = null;
    try {
      errorBody = await res.json();
    } catch {
    }

    const message =
      errorBody?.message ??
      errorBody?.error ??
      `HTTP error ${res.status}`;

    throw new Error(message);
  }

  if (res.status === 204) {
    // No Content
    return undefined as T;
  }

  const data = (await res.json()) as T;
  return data;
}

export const httpClient = {
  get:    <T>(path: string)        => request<T>(path, { method: 'GET' }),
  post:   <T>(path: string, body?: any) =>
    request<T>(path, { method: 'POST', body }),
  put:    <T>(path: string, body?: any) =>
    request<T>(path, { method: 'PUT', body }),
  patch:  <T>(path: string, body?: any) =>
    request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string)        => request<T>(path, { method: 'DELETE' }),
};
