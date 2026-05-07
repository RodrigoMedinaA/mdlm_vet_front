import api from './api';

export const catalogoService = {
  // Catálogo de Condiciones
  getCondiciones: async (): Promise<any[]> => {
    const response = await api.get('/condiciones');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },

  getCondicionById: async (id: string): Promise<any> => {
    const response = await api.get(`/condiciones/${id}`);
    return response.data.data || response.data;
  },

  // Catálogo de Alergias
  getAlergias: async (): Promise<any[]> => {
    const response = await api.get('/alergias');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },

  getAlergiaById: async (id: string): Promise<any> => {
    const response = await api.get(`/alergias/${id}`);
    return response.data.data || response.data;
  },
};
