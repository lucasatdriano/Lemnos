import './card.scss';
import './cardOffer.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconAddCart from '../../assets/icons/iconAddCart.svg';

export default function Card({ produto }) {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function handleAddToCart() {
    // Adicione sua lógica para adicionar o produto ao carrinho aqui
    console.log('Produto adicionado ao carrinho:', produto);
  }

  const hasDiscount = produto.desconto > 0;

  return (
    <>
      <div className='descont'>
        <div className={hasDiscount ? "offerCard" : "productCard"}>
          <Link to={`/product/${produto.id}`} className={hasDiscount ? "" : "productLink"}>
            {hasDiscount && <p className='offerDescont'>{produto.desconto}%</p>}
            <img 
              src={produto.imagemPrincipal} 
              alt={produto.nome} 
              className={hasDiscount ? "offerImage" : "productImage"} 
            />
            <div className={hasDiscount ? "offerDetails" : "productDetails"}>
              <h2 className={hasDiscount ? "offerName" : "productName"}>{produto.nome}</h2>
              {hasDiscount ? (
                <>
                  <p className='offerPrice'>{BRL.format(produto.valorTotal)}</p>
                  <p className="offerPriceDescont">À vista <br />
                    <span>{BRL.format(produto.valorComDesconto)}</span> <br />
                    no PIX com 15% de desconto
                  </p>
                </>
              ) : (
                <p className="productPrice">À vista <br />
                  <span>{BRL.format(produto.valorTotal)}</span> <br />
                  no PIX com 15% de desconto
                </p>
              )}
            </div>
          </Link>
          <button type="button" className='btnAdd' onClick={handleAddToCart}>
            Adicionar ao Carrinho
            <img src={iconAddCart} alt="icon add Cart" className='iconAdd' />
          </button>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    imagemPrincipal: PropTypes.string.isRequired,
    valorComDesconto: PropTypes.number.isRequired,
    valorTotal: PropTypes.number,
    desconto: PropTypes.number,
  }).isRequired,
};
