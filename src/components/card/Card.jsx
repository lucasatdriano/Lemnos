import './card.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconAddCart from '../../assets/icons/iconAddCart.svg';

export default function Card({ produto }) {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function handleAddToCart() {
    // Adicione sua lógica para adicionar o produto ao carrinho aqui
    console.log('Produto adicionado ao carrinho:', produto);
  }

  return (
    <Link to={`/product/${produto.id}`} className="productCard">
      <img src={produto.imagemPrincipal} alt={produto.nome} className="productImage" />
      <div className="productDetails">
        <h2 className="productName">{produto.nome}</h2>
        <p className="productPrice">À vista <br />
          <span>{BRL.format(produto.valor)}</span> <br />
          no PIX com 15% de desconto
        </p>
      </div>
      <button type="button" className='btnAdd' onClick={handleAddToCart}>
        Adicionar ao Carrinho
        <img src={iconAddCart} alt="icon add Cart" className='iconAdd' />
      </button>
    </Link>
  );
}

Card.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    imagemPrincipal: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
  }).isRequired,
};