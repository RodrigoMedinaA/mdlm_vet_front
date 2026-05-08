import { create } from 'zustand';
import api from '@/utils/api';
import { User } from '@/interfaces/User';
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  /** Setea el usuario y token tras el callback del SSO */
  setAuth: (user: User, token: string) => void;

  /** Cierra sesión */
  logout: () => Promise<void>;

  /** Restaura la sesión desde localStorage (al cargar la app) */
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setAuth: (user: User, token: string) => {
    set({ user, token, error: null });
  },

  logout: async () => {
    try {
      // Opcional: Avisar al backend de veterinaria
      await api.post('/auth/logout').catch(() => {});
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
      set({ user: null, token: null, error: null });
      
      // Redirigir al inicio o al logout central del SSO si estuviera configurado
      window.location.href = '/';
    }
  },

  hydrate: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const userInfo = localStorage.getItem('user_info');
      
      if (token) {
        set({ token });
        if (userInfo) {
          set({ user: JSON.parse(userInfo) });
        } else {
          // Si hay token pero no info, intentamos recuperar
          api
            .get<User>('/auth/me')
            .then(({ data }) => {
              set({ user: data });
              localStorage.setItem('user_info', JSON.stringify(data));
            })
            .catch(() => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user_info');
              set({ token: null, user: null });
            });
        }
      }
    }
  },
}));
