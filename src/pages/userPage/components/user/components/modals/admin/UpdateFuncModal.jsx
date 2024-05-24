import React from 'react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

export default function UpdateFuncModal({ funcionarios, onSelect, onClose }) {
  return (
    <div className="modal funcionario-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Lista de Funcionários</h2>
        <ul className='listItens'>
          {funcionarios.map((funcionario, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(funcionario.id)}>
              <p><span>Nome: </span>{funcionario.nome}</p> 
              <p><span>Email: </span>{funcionario.email}</p>
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
};

UpdateFuncModal.propTypes = {
  funcionarios: PropTypes.arrayOf(PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};