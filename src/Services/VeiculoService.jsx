import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getVeiculosNovos = async () => {
    return api.get('/novo/todos');
};

export const getVeiculoNovoByPlaca = async (placa) => {
    return api.get(`/novo/${placa}`);
};

export const saveVeiculoNovo = async (veiculo) => {
    return api.post('/novo', veiculo);
};

export const updateVeiculoNovo = async (veiculo) => {
    return api.put('/novo/atualizar', veiculo);
};

export const deleteVeiculoNovo = async (placa) => {
    return api.delete(`/novo/${placa}`);
};

export const getVeiculosUsados = async () => {
    return api.get('/usado/todos');
};

export const getVeiculoUsadoByPlaca = async (placa) => {
    return api.get(`/usado/${placa}`);
};

export const saveVeiculoUsado = async (veiculo) => {
    return api.post('/usado', veiculo);
};

export const updateVeiculoUsado = async (veiculo) => {
    return api.put('/usado/atualizar', veiculo);
};

export const deleteVeiculoUsado = async (placa) => {
    return api.delete(`/usado/${placa}`);
};
