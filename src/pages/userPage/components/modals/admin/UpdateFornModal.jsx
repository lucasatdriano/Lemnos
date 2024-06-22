/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { IoClose } from 'react-icons/io5';
import { RiSearch2Line } from 'react-icons/ri';
import CustomInput from '../../../../../components/inputs/customInput/Inputs';
import { useEffect, useState } from 'react';

export default function UpdateFornModal({ onSelect, onClose }) {
    const [fornecedores, setFornecedores] = useState([]);
    const [search, setSearch] = useState('');

    const applyFilters = async () => {
        try {
            const filtro = {
                nome: search,
            };
            const fornecedoresFiltrados = await listarProdutosFiltrados(
                filtro,
                5
            );
            setFornecedores(fornecedoresFiltrados);
        } catch (error) {
            console.error('Erro ao aplicar filtros:', error);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [search]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCleanFilter = () => {
        setSearch('');
    };

    return (
        <div
            className="modal fornecedor-list-modal"
            onClick={(e) => {
                onClose();
                e.stopPropagation();
            }}
        >
            <div className="containerModal">
                <h2>Lista de Fornecedores</h2>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="inputSearch"
                >
                    <CustomInput
                        type={'text'}
                        placeholder={'Pesquisar...'}
                        name={'search'}
                        id={'inputSearch'}
                        value={search}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btnSearch">
                        <RiSearch2Line className="searchIcon" />
                    </button>
                </form>
                {fornecedores.length == 0 ? (
                    <div className="emptyMessage">
                        <h2 className="textEmpty">
                            Fornecedor não encontrado. Revise e tente novamente.
                        </h2>
                        <button
                            type="button"
                            className="btnBack"
                            onClick={handleCleanFilter}
                        >
                            Limpar Filtro
                        </button>
                    </div>
                ) : (
                    <ul className="listItens">
                        {fornecedores &&
                            fornecedores.map((fornecedor, index) => (
                                <li
                                    className="itemUpdate"
                                    key={index}
                                    onClick={() => onSelect(fornecedor.email)}
                                >
                                    <div>
                                        <p>
                                            Fornecedor:{' '}
                                            <span className="spanNome">
                                                {fornecedor.nome}
                                            </span>
                                        </p>
                                        <p>
                                            Email:{' '}
                                            <span>{fornecedor.email}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
                <IoClose onClick={onClose} className="iconClose" />
            </div>
        </div>
    );
}
