/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { IoClose } from 'react-icons/io5';
import { RiSearch2Line } from 'react-icons/ri';
import CustomInput from '../../../../../components/inputs/customInput/Inputs';
import { useEffect, useState } from 'react';
import { getFuncionarioByNome } from '../../../../../services/FuncionarioService';

export default function UpdateFuncModal({ onSelect, onClose }) {
    const [funcionarios, setFuncionarios] = useState([]);
    const [search, setSearch] = useState('');

    const applyFilters = async () => {
        try {
            if(search.length == 0) {
                setFuncionarios([]);
                return;
            }
            const funcionariosFiltrados = await getFuncionarioByNome(search);
            if(funcionarios == funcionariosFiltrados) return;
            setFuncionarios(funcionariosFiltrados);
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
            className="modal funcionario-list-modal"
            onClick={(e) => {
                onClose();
                e.stopPropagation();
            }}
        >
            <div
                className="containerModal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Lista de Funcionários</h2>
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
                {funcionarios.length == 0 ? (
                    <div className="emptyMessage">
                        <h2 className="textEmpty">
                            funcionário não encontrado. Revise e tente
                            novamente.
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
                        {funcionarios && funcionarios.map((funcionario, index) => (
                            <li
                                className="itemUpdate"
                                key={index}
                                onClick={() => onSelect(funcionario.email)}
                            >
                                <div>
                                    <p>
                                        Nome:{' '}
                                        <span className="spanNome">
                                            {funcionario}
                                        </span>
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
