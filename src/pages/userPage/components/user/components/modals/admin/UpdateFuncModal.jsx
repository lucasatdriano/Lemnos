import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

export default function UpdateFuncModal({ funcionarios, onSelect, onClose }) {
  return (
    <div className="modal funcionario-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Lista de Funcionários</h2>
        <ul className='listItens'>
          {funcionarios && funcionarios.map((funcionario, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(funcionario.email)}>
              <div>
                <p>Nome: <span className='spanNome'>{funcionario.nome}</span></p>
                <p>Email: <span>{funcionario.email}</span></p>
                <p>Situação: <span>{funcionario.situacao}</span></p>
              </div>
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}

UpdateFuncModal.propTypes = {
  funcionarios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      situacao: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};