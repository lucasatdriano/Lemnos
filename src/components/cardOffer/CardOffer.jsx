import React from 'react';
import './cardOffer.scss';

export function CardOffer({ offer }) {
  return (
    <div className="productCard">
      <img src={offer.image} alt={offer.name} className="productImage" />
      <p className='productDescont'>{offer.descont}%</p>
      <div className="productDetails">
        <h2 className="productName">{offer.name}</h2>
        <p className="productDescription">{offer.description}</p>
        <p className='productPrice'>R${offer.price}</p>
        <p className="productPriceDescont">R${(offer.price / 100 * offer.descont).toFixed(2)}</p>
      </div>
    </div>
  );
}