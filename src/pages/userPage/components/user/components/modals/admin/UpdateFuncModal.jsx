import { IoClose } from "react-icons/io5";

export default function UpdateFuncModal({ funcionarios, onSelect, onClose }) {
  return (
    <div className="modal funcionario-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Lista de Funcionários</h2>
        <ul className='listItens'>
          {funcionarios && funcionarios.map((funcionario, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(funcionario.id)}>
              <p><span>Nome: </span>{funcionario.nome}</p> 
              <p><span>Email: </span>{funcionario.email}</p>
              <p><span>Situação: </span>{funcionario.situacao}</p>
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}