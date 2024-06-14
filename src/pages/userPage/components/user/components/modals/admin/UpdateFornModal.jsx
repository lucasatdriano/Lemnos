/* eslint-disable react/prop-types */
import { IoClose } from 'react-icons/io5';
import { RiSearch2Line } from 'react-icons/ri';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';

export default function UpdateFornModal({ fornecedores, onSelect, onClose }) {
    const handleChange = () => {};

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
                                        Email: <span>{fornecedor.email}</span>
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
