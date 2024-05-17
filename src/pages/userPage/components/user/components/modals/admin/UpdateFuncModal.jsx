import React from 'react';
import { IoClose } from "react-icons/io5";

export default function UpdateFuncModal({ funcionarios, onSelect, onClose }) {
  return (
    <div className="modal funcionario-list-modal" onClick={(e) => e.stopPropagation()}>
      <div className="containerModal">
        <h2>Lista de Funcionários</h2>
        <ul className='listItens'>
          {funcionarios.map((funcionario, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(funcionario)}>
              {funcionario.nome}
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
};