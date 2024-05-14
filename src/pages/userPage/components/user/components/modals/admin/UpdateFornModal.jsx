import React from 'react';

export default function UpdateFornModal({ fornecedores, onSelect }) {
  return (
    <div className="modal fornecedor-list-modal" onClick={(e) => e.stopPropagation()}>
      <div className="containerModal">
        <h2>Lista de Fornecedores</h2>
        <ul>
          {fornecedores.map((fornecedor, index) => (
            <li key={index} onClick={() => onSelect(fornecedor)}>
              {fornecedor.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};