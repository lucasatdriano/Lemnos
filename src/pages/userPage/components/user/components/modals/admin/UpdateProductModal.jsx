import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

export default function UpdateProductModal({ produtos, onSelect, onClose }) {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="modal produto-list-modal" onClick={(e) => { onClose(); e.stopPropagation(); }} >
      <div className="containerModal">
        <h2>Lista de Produtos</h2>
        <ul className='listItens'>
          {produtos && produtos.map((produto, index) => (
            <li className='itemUpdate' key={index} onClick={() => onSelect(produto)}>
              <img src={produto.imagemPrincipal} alt={produto.nome} />
              <div className='infos'>
                <p>Produto: <span>{produto.nome}</span></p>
                <p>Preço: <span>{BRL.format(produto.valorTotal)}</span></p>
                <p>Desconto: <span>{produto.desconto}%</span></p>
                <p>Preço c/ Desconto: <span>{BRL.format(produto.valorComDesconto)}</span></p>
                <p>Categoria: <span>{produto.categoria}</span></p>
                <p>SubCategoria: <span>{produto.subCategoria}</span></p>
                <p>Marca: <span>{produto.fabricante}</span></p>
              </div>
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