import { IoClose } from "react-icons/io5";

export default function UpdateFornModal({ fornecedores, onSelect, onClose }) {
  return (
    <div className="modal fornecedor-list-modal"  onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Fornecedores</h2>
        <ul className='listItens'>
          {fornecedores && fornecedores.map((fornecedor, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(fornecedor)}>
              <p><span>Fornecedor: </span>{fornecedor.nome}</p> 
              <p><span>Email: </span>{fornecedor.email}</p>
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}