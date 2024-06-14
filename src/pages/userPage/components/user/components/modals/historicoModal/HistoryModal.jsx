/* eslint-disable react/prop-types */
import './historyModal.scss';
import { IoClose } from 'react-icons/io5';

export default function HistoryModal({ compra, onClose }) {
    return (
        <div className="modal" onClick={onClose}>
            <div
                className="containerModal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Detalhes da Compra</h2>
                <div>
                    <ul>
                        Produtos:
                        <li>
                            {compra.produto} <span>R$ 20,00</span>
                            <p>Quantidade: 20</p>
                        </li>
                        <li>
                            {compra.produto2} <span>R$ 20,00</span>
                            <p>Quantidade: 20</p>
                        </li>
                    </ul>
                    <div>
                        <p>forma de pagamento: Pix</p>
                        <p>valor total: R$ 1.200</p>
                    </div>
                </div>
                <IoClose onClick={onClose} className="iconClose" />
            </div>
        </div>
    );
}
