import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', 
});

export const getClientesJuridicos = () => api.get('/clientes/juridico/todos');
export const getClienteJuridicoByCNPJ = (cnpj) => api.get(`/clientes/juridico/${cnpj}`);
export const saveClienteJuridico = (cliente) => api.post('/clientes/juridico', cliente);
export const updateClienteJuridico = (cliente) => api.put('/clientes/juridico', cliente);
export const deleteClienteJuridico = (cnpj) => api.delete(`/clientes/juridico/${cnpj}`);
