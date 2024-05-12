import React from 'react';
import './cardBrand.scss';

export default function CardBrands({ brand }) {
  return (
    <div className='brandCard'>
        <img src={brand.image} alt={brand.name} className="brandImage" />
        <h3 className="brandName">{brand.name}</h3>
        <p>Ver Produtos</p>
    </div>
  );
}