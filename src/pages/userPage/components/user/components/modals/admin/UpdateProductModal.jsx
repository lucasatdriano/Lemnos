import React from 'react';

export default function UpdateProductModal({ produtos, onSelect }) {
  return (
    <div className="modal produto-list-modal" onClick={(e) => e.stopPropagation()}>
      <div className="containerModal">
        <h2>Lista de Produtos</h2>
        <ul>
          {produtos.map((produto, index) => (
            <li key={index} onClick={() => onSelect(produto)}>
              {produto.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};