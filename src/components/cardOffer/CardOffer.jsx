import React from 'react';
import './cardOffer.scss';

export function CardOffer({ offer }) {
  return (
    <div className="offerCard">
      <img src={offer.image} alt={offer.name} className="offerImage" />
      <p className='offerDescont'>{offer.descont}%</p>
      <div className="offerDetails">
        <h2 className="offerName">{offer.name}</h2>
        <p className='offerPrice'>R${offer.price}</p>
        <p className="offerPriceDescont">À vista <br />
          <span>R${(offer.price - (offer.price / 100 * offer.descont)).toFixed(2)}</span> <br />
          no PIX com 15% de desconto
        </p>
      </div>
    </div>
  );
}