import { useMutation, useQuery } from '@tanstack/react-query';
import { loginUser, registerUser, getAuthUserProfile, LoginPayload, RegisterPayload } from '@/services/authService';

/**
 * Layer 2 Hook for User Login Mutation
 */
export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });
}

/**
 * Layer 2 Hook for User Registration Mutation
 */
export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}

/**
 * Layer 2 Hook for Current Logged in User Profile
 */
export function useCurrentUser(token?: string) {
  return useQuery({
    queryKey: ['current-user', token],
    queryFn: () => (token ? getAuthUserProfile(token) : null),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 15,
  });
}
