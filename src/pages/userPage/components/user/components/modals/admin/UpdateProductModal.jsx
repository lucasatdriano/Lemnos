import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

export default function UpdateProductModal({ produtos, onSelect, onClose }) {
  return (
    <div className="modal produto-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Produtos</h2>
        <ul className='listItens'>
          {produtos && produtos.map((produto, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(produto)}>
              <p>Produto: <span>{produto.nome}</span></p> 
              <p>Preço: <span>{produto.valor}</span></p>
              <p>SubCategoria: <span>{produto.subCategoria}</span></p> 
              <p>Marca: <span>{produto.fabricante}</span></p>
              <img src={produto.imagemPrincipal} alt={produto.nome} />
            </li>
          ))}
        </ul>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}

UpdateProductModal.propTypes = {
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      valor: PropTypes.string.isRequired,
      subCategoria: PropTypes.string.isRequired,
      fabricante: PropTypes.string.isRequired,
      imagemPrincipal: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};