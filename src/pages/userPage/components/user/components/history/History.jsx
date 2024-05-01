import React, { useState } from 'react';
import HistoryModal from '../modals/historicoModal/HistoryModal';
import './history.scss';

export default function historicoCompras({ compras }) {
  const [mostrarMais, setMostrarMais] = useState(false);
  const [compraSelecionada, setCompraSelecionada] = useState(null);

  const handleToggleMostrar = () => {
    setMostrarMais(!mostrarMais);
  };

  const handleAbrirModal = (compra) => {
    setCompraSelecionada(compra);
  };

  return (
    <div>
        <h2>Histórico de Compras</h2>
        {compras && compras.slice(0, mostrarMais ? compras.length : 3).map((compra, index) => (
            <ul key={index}>
            <li onClick={() => handleAbrirModal(compra)}>
                <h3>Produtos: {compra.produto}</h3>
                <h3>Preço: {compra.preco}</h3>
            </li>
            </ul>
        ))}
        {!mostrarMais && compras && compras.length > 3 && (
            <button onClick={handleToggleMostrar}>Mostrar Mais</button>
        )}
        {mostrarMais && (
            <button onClick={handleToggleMostrar}>Mostrar Menos</button>
        )}
        {compraSelecionada && (
            <HistoryModal compra={compraSelecionada} onClose={() => setCompraSelecionada(null)} />
        )}
    </div>
  );
}