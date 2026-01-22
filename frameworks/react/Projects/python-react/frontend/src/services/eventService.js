import axios from 'axios';
import API_BASE_URL from './config';

// Criar instância do axios com a URL base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviço para a API de eventos
const eventService = {
  // Obter todos os eventos com filtros opcionais
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.tipo) params.append('tipo', filters.tipo);
      if (filters.status) params.append('status', filters.status);
      
      const response = await api.get('/items', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao carregar eventos',
      };
    }
  },

  // Obter configurações (tipos e status permitidos)
  getConfig: async () => {
    try {
      const response = await api.get('/config');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao carregar configurações',
      };
    }
  },

  // Criar novo evento
  create: async (eventData) => {
    try {
      const response = await api.post('/items', eventData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar evento',
      };
    }
  },

  // Atualizar evento completo
  update: async (id, eventData) => {
    try {
      const response = await api.put(`/items/${id}`, eventData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao atualizar evento',
      };
    }
  },

  // Atualizar apenas o status
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/items/${id}/status`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao atualizar status',
      };
    }
  },

  // Deletar evento
  delete: async (id) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao deletar evento',
      };
    }
  },
};

export default eventService;
