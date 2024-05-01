import React from 'react';
import './historyModal.scss';
import { IoClose } from "react-icons/io5";

export default function HistoryModal({ compra, onClose }) {
  return (
    <div className="modal">
      <div className="containerModal">
        <IoClose onClick={onClose} className='iconClose' />
        <h2>Detalhes da Compra</h2>
        <div>
            <ul>Produtos: 
                <li>{compra.produto} <span>R$ 20,00</span><p>Quantidade: 20</p></li>
                <li>{compra.produto2} <span>R$ 20,00</span><p>Quantidade: 20</p></li> 
            </ul>
            <div>
              <p>forma de pagamento: Pix</p>
              <p>valor total: R$ 1.200</p>
            </div>
        </div>
      </div>
    </div>
  );
}
