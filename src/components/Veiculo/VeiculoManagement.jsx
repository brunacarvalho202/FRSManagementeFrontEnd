import React, { useEffect, useState } from 'react';
import './VeiculoManagement.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import search from '../../assets/search-button.svg';
import { 
    getVeiculosNovos, saveVeiculoNovo, updateVeiculoNovo, deleteVeiculoNovo,
    getVeiculosUsados, saveVeiculoUsado, updateVeiculoUsado, deleteVeiculoUsado
} from '../../Services/VeiculoService';

const VeiculoManagement = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [filteredVeiculos, setFilteredVeiculos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        placa: '',
        categoria: '',
        atpv: '',
        nota_fiscal: '',
        vistoria: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isNovo, setIsNovo] = useState(true);

    useEffect(() => {
        fetchVeiculos();
    }, [isNovo]);

    const fetchVeiculos = async () => {
        try {
            const response = isNovo ? await getVeiculosNovos() : await getVeiculosUsados();
            setVeiculos(response.data);
            setFilteredVeiculos(response.data);
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredVeiculos(veiculos);
        } else {
            setFilteredVeiculos(
                veiculos.filter(veiculo =>
                    veiculo.placa.includes(e.target.value)
                )
            );
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedForm = {
                ...form,
                atpv: form.atpv ? btoa(form.atpv) : '',
                nota_fiscal: form.nota_fiscal ? btoa(form.nota_fiscal) : '',
                vistoria: form.vistoria ? btoa(form.vistoria) : ''
            };

            if (isEditing) {
                if (isNovo) {
                    await updateVeiculoNovo(formattedForm);
                } else {
                    await updateVeiculoUsado(formattedForm);
                }
            } else {
                if (isNovo) {
                    await saveVeiculoNovo(formattedForm);
                } else {
                    await saveVeiculoUsado(formattedForm);
                }
            }
            fetchVeiculos();
            closeModal();
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
        }
    };

    const handleDelete = async (placa) => {
        try {
            if (isNovo) {
                await deleteVeiculoNovo(placa);
            } else {
                await deleteVeiculoUsado(placa);
            }
            fetchVeiculos();
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
        }
    };

    const openModal = () => {
        document.getElementById('modal-wrapper').classList.add('active');
    };

    const closeModal = () => {
        document.getElementById('modal-wrapper').classList.remove('active');
        setForm({
            placa: '',
            categoria: '',
            atpv: '',
            nota_fiscal: '',
            vistoria: ''
        });
    };

    const openEditModal = (veiculo) => {
        setForm({
            ...veiculo,
            atpv: veiculo.atpv ? atob(veiculo.atpv) : '',
            nota_fiscal: veiculo.nota_fiscal ? atob(veiculo.nota_fiscal) : '',
            vistoria: veiculo.vistoria ? atob(veiculo.vistoria) : ''
        });
        setIsEditing(true);
        openModal();
    };

    const toggleVeiculoType = () => {
        setIsNovo(!isNovo);
        fetchVeiculos();
    };

    return (
        <div className="veiculo-management">
            <Header />
            <div className="content">
                <div className="veiculo-wrapper">
                    <div className="veiculo-header">
                        <span>Controle de Veículos</span>
                        <div className="header-buttons">
                            <button onClick={toggleVeiculoType} type="button" className="banner-button3">
                                {isNovo ? 'Veículos Usados' : 'Veículos Novos'}
                            </button>
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    id="search" 
                                    className="search-input" 
                                    placeholder="Buscar por Placa" 
                                    value={searchTerm} 
                                    onChange={handleSearch} 
                                />
                                <div className="search-icon">
                                    <img src={search} alt="Search Icon" />
                                </div>
                            </div>
                            <button onClick={() => openModal()} type="button" className="banner-button2" id="BTN-new">ADICIONAR</button>
                        </div>
                    </div>

                    <div className="veiculo-info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Placa</th>
                                    <th>Categoria</th>
                                    <th className="acao">Editar</th>
                                    <th className="acao">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVeiculos.map((veiculo) => (
                                    <tr key={veiculo.placa}>
                                        <td>{veiculo.placa}</td>
                                        <td>{veiculo.categoria}</td>
                                        <td className="acao">
                                            <button onClick={() => openEditModal(veiculo)}>Editar</button>
                                        </td>
                                        <td className="acao">
                                            <button onClick={() => handleDelete(veiculo.placa)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-wrapper" id="modal-wrapper">
                        <div className="modal">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="placa">Placa</label>
                                <input id="placa" type="text" value={form.placa} onChange={handleInputChange} required />

                                <label htmlFor="categoria">Categoria</label>
                                <input id="categoria" type="text" value={form.categoria} onChange={handleInputChange} required />

                                <label htmlFor="atpv">ATPV</label>
                                <input id="atpv" type="file" onChange={(e) => handleInputChange({ target: { id: 'atpv', value: e.target.files[0] } })} required={isNovo} />

                                {isNovo && (
                                    <>
                                        <label htmlFor="nota_fiscal">Nota Fiscal</label>
                                        <input id="nota_fiscal" type="file" onChange={(e) => handleInputChange({ target: { id: 'nota_fiscal', value: e.target.files[0] } })} required={isNovo} />
                                    </>
                                )}

                                {!isNovo && (
                                    <>
                                        <label htmlFor="vistoria">Vistoria</label>
                                        <input id="vistoria" type="file" onChange={(e) => handleInputChange({ target: { id: 'vistoria', value: e.target.files[0] } })} required={!isNovo} />
                                    </>
                                )}

                                <div className="modal-buttons">
                                    <button type="button" className="banner-button2" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="banner-button2">{isEditing ? 'Atualizar' : 'Salvar'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default VeiculoManagement;