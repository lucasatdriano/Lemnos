/* eslint-disable react/prop-types */
import { IoClose } from 'react-icons/io5';
import { RiSearch2Line } from 'react-icons/ri';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';

export default function UpdateFuncModal({ funcionarios, onSelect, onClose }) {
    const handleChange = () => {};
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
                <form onSubmit="" className="inputSearch">
                    <CustomInput
                        type={'text'}
                        placeholder={'Pesquisar...'}
                        name={'search'}
                        id={'inputSearch'}
                        value={''}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btnSearch">
                        <RiSearch2Line className="searchIcon" />
                    </button>
                </form>
                <ul className="listItens">
                    {funcionarios &&
                        funcionarios.map((funcionario, index) => (
                            <li
                                className="itemUpdate"
                                key={index}
                                onClick={() => onSelect(funcionario.email)}
                            >
                                <div>
                                    <p>
                                        Nome:{' '}
                                        <span className="spanNome">
                                            {funcionario.nome}
                                        </span>
                                    </p>
                                    <p>
                                        Email: <span>{funcionario.email}</span>
                                    </p>
                                    <p>
                                        Situação:{' '}
                                        <span>{funcionario.situacao}</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                </ul>
                <IoClose onClick={onClose} className="iconClose" />
            </div>
        </div>
    );
}
