import React from 'react';
import './cardOffer.scss';

export function CardOffer({ offer }) {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="offerCard">
      <img src={offer.image} alt={offer.name} className="offerImage" />
      <p className='offerDescont'>{offer.descont}%</p>
      <div className="offerDetails">
        <h2 className="offerName">{offer.name}</h2>
        <p className='offerPrice'>{BRL.format(offer.price)}</p>
        <p className="offerPriceDescont">À vista <br />
          <span>{BRL.format(offer.price - (offer.price / 100 * offer.descont))}</span> <br />
          no PIX com 15% de desconto
        </p>
        <button type="button" className='btnAdd'>
          Adicionar ao Carrinho
          {/* icon */}
        </button>
      </div>

    </div>
  );
}