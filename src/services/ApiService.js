import axios from 'axios';

const ApiService = {
  fetchData: async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      throw error;
    }
  },

  submitData: async (endpoint, data) => {
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      throw error;
    }
  },

  // Outras funções aqui
};

export default ApiService;