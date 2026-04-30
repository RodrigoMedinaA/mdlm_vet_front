import { create } from 'zustand';
import api from '@/utils/api';
import { User } from '@/interfaces/User';
import { LoginCredentials, AuthTokenResponse } from '@/interfaces/Auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  /** Inicia sesión con email y contraseña */
  login: (credentials: LoginCredentials) => Promise<boolean>;

  /** Cierra sesión */
  logout: () => void;

  /** Restaura la sesión desde localStorage (al cargar la app) */
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post<AuthTokenResponse>('/auth/login', credentials);

      // Guardar token en localStorage
      localStorage.setItem('access_token', data.access_token);

      set({
        user: data.user,
        token: data.access_token,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Error al iniciar sesión';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null, token: null, error: null });
  },

  hydrate: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        set({ token });
        // Opcionalmente obtener datos del usuario
        api
          .get<User>('/auth/me')
          .then(({ data }) => set({ user: data }))
          .catch(() => {
            localStorage.removeItem('access_token');
            set({ token: null });
          });
      }
    }
  },
}));
