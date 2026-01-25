
export interface LoginResponse {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}
