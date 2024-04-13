import React from 'react';
import './card.scss';

export function Card({ product }) {
  return (
    <div className="productCard">
      <img src={product.image} alt={product.name} className="productImage" />
      <div className="productDetails">
        <h2 className="productName">{product.name}</h2>
        <p className="productDescription">{product.description}</p>
        <p className="productPrice">R${product.price}</p>
      </div>
    </div>
  );
}