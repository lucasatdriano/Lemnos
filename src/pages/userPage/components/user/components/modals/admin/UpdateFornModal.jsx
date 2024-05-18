import React from 'react';
import { IoClose } from "react-icons/io5";

export default function UpdateFornModal({ fornecedores, onSelect, onClose }) {
  return (
    <div className="modal fornecedor-list-modal"  onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Fornecedores</h2>
        <ul className='listItens'>
          {fornecedores.map((fornecedor, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(fornecedor)}>
              {fornecedor.nome}
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
};