import type { ContactPayload, LoginResponse, Profile, Resource } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.detail ?? "No se pudo completar la solicitud");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  login(username: string, password: string) {
    return request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
  },

  getProfile() {
    return request<Profile>("/profile");
  },

  updateProfile(profile: Profile, token: string) {
    return request<Profile>("/profile", {
      method: "PUT",
      token,
      body: JSON.stringify(profile)
    });
  },

  getResources(token: string) {
    return request<Resource[]>("/resources", { token });
  },

  sendContact(payload: ContactPayload) {
    return request<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
};

