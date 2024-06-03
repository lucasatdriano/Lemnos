import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

export default function UpdateFornModal({ fornecedores, onSelect, onClose }) {
  return (
    <div className="modal fornecedor-list-modal"  onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Fornecedores</h2>
        <ul className='listItens'>
          {fornecedores && fornecedores.map((fornecedor, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(fornecedor.email)}>
              <div>
                <p>Fornecedor: <span className='spanNome'>{fornecedor.nome}</span></p>
                <p>Email: <span>{fornecedor.email}</span></p>
              </div>
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}

UpdateFornModal.propTypes = {
  fornecedores: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};