import React from 'react';
import './card.scss';
import { useNavigate } from 'react-router-dom';

export function Card({ product, onClick }) {
  const navigate = useNavigate();
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function handleClickButton() {
    navigate(`/product/${id}`);
  }

  return (
    <div className="productCard" onClick={handleClickButton}>
      <img src={product.image} alt={product.name} className="productImage" />
      <div className="productDetails">
        <h2 className="productName">{product.name}</h2>
        <p className="productPrice">À vista <br />
          <span>{BRL.format(product.price)}</span> <br />
          no PIX com 15% de desconto
        </p>
      </div>
    </div>
  );
}