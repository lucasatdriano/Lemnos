import { IoClose } from "react-icons/io5";

export default function UpdateProductModal({ produtos, onSelect, onClose }) {
  return (
    <div className="modal produto-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Produtos</h2>
        <ul className='listItens'>
          {produtos && produtos.map((produto, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(produto)}>
              <p><span>Produto: </span>{produto.nome}</p> 
              <p><span>Preço: </span>{produto.valor}</p>
              <p><span>SubCategoria: </span>{produto.subCategoria}</p> 
              <p><span>Marca: </span>{produto.fabricante}</p>
              <img src={produto.imagemPrincipal} alt={produto.nome} />
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}