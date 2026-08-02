import { fetchStrapiAPI } from './strapi';

export interface UserProfile {
  id: number | string;
  username: string;
  email: string;
  phone?: string;
  fullName?: string;
  avatar?: string;
}

export interface AuthResponse {
  jwt: string;
  user: UserProfile;
}

export interface LoginPayload {
  identifier: string; // email or username
  password?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password?: string;
  phone?: string;
}

/**
 * Layer 1 Authentication Service for Strapi users-permissions
 */
export async function loginUser(payload: LoginPayload): Promise<{ data: AuthResponse | null; error: string | null }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      return { data: null, error: json?.error?.message || 'Login failed. Please check credentials.' };
    }

    return { data: json, error: null };
  } catch (err: unknown) {
    return { data: null, error: err instanceof Error ? err.message : 'Network error during login.' };
  }
}

export async function registerUser(payload: RegisterPayload): Promise<{ data: AuthResponse | null; error: string | null }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      return { data: null, error: json?.error?.message || 'Registration failed.' };
    }

    return { data: json, error: null };
  } catch (err: unknown) {
    return { data: null, error: err instanceof Error ? err.message : 'Network error during registration.' };
  }
}

export async function getAuthUserProfile(token: string): Promise<UserProfile | null> {
  const { data, error } = await fetchStrapiAPI<UserProfile>('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
    revalidate: 0,
  });

  if (error || !data) return null;
  return data;
}
