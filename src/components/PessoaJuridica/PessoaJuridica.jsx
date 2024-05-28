import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './PessoaJuridica.css';

const PessoaJuridica = () => {
    return (
        <div className="cliente-controle">
            <Header />
            <div className="content">
                <div className="cliente-wrapper">
                    <div className="cliente-header">
                        <span>Controle de Clientes - Pessoa Jurídica</span>
                        <button onClick={() => openModal()} className="banner-button2" id="new">Adicionar</button>
                    </div>

                    <div className="cliente-info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Função</th>
                                    <th>Salário</th>
                                    <th className="acao">Editar</th>
                                    <th className="acao">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-wrapper" id="modal-wrapper">
                        <div className="modal">
                            <form>
                                <label htmlFor="m-nome">Nome</label>
                                <input id="m-name" type="text" required />

                                <label htmlFor="m-endereço">Endereço</label>
                                <input id="m-adress" type="text" required />

                                <label htmlFor="m-funcao">CNPJ</label>
                                <input id="m-function" type="text" required />

                                <label htmlFor="m-salario">Inscrição Estadual</label>
                                <input id="m-salary" type="text" required />

                                <label htmlFor="m-telefone">Telefone (Principal)</label>
                                <input id="m-telephone" type="text" required />

                                <label htmlFor="m-telefone2">Telefone (Opcional)</label>
                                <input id="m-telephone2" type="text" required />

                                <div className="modal-buttons">
                                    <button type="button" id="btn-cancelar" className="banner-button2" onClick={() => closeModal()}>Cancelar</button>
                                    <button type="submit" id="btn-salvar" className="banner-button2">Salvar</button>
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

function openModal() {
    document.getElementById('modal-wrapper').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-wrapper').classList.remove('active');
}

export default PessoaJuridica;
