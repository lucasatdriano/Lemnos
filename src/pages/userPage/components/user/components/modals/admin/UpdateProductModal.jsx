import React from 'react';
import { IoClose } from "react-icons/io5";

export default function UpdateProductModal({ produtos, onSelect, onClose }) {
  return (
    <div className="modal produto-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Produtos</h2>
        <ul className='listItens'>
          {produtos.map((produto, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(produto)}>
              {produto.nome}
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
};