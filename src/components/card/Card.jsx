import React from 'react';
import './card.scss';
import { useNavigate } from 'react-router-dom';
import iconAddCart from '../../assets/icons/iconAddCart.svg';

export default function Card({ product }) {
  const navigate = useNavigate();
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function handleClickCard() {
    navigate(`/product/${product.id}`);
  }

  function handleAddToCart() {
    // Adicione sua lógica para adicionar o produto ao carrinho aqui
    console.log('Produto adicionado ao carrinho:', product);
  }

  return (
    <div className="productCard" onClick={handleClickCard}>
      <img src={product.image} alt={product.name} className="productImage" />
      <div className="productDetails">
        <h2 className="productName">{product.name}</h2>
        <p className="productPrice">À vista <br />
          <span>{BRL.format(product.price)}</span> <br />
          no PIX com 15% de desconto
        </p>
      </div>
      <button type="button" className='btnAdd' onClick={handleAddToCart}>
        Adicionar ao Carrinho
        <img src={iconAddCart} alt="icon add Cart" className='iconAdd' />
      </button>
    </div>
  );
}