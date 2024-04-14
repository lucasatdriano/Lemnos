import React from 'react';
import './card.scss';

export function Card({ product, onClick }) {
  return (
    <div className="productCard" onClick={() => onClick(product.id)}>
      <img src={product.image} alt={product.name} className="productImage" />
      <div className="productDetails">
        <h2 className="productName">{product.name}</h2>
        <p className="productPrice">À vista <br />
          <span>R${product.price}</span> <br />
          no PIX com 15% de desconto
        </p>
      </div>
    </div>
  );
}