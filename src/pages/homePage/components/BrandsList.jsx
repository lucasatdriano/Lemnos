import React from 'react';
import { Brands } from '../../../components/cardBrand/CardBrand';
import '../home.scss';

export function BrandsList() {
  const brands = [
    {
      id: 1,
      name: 'Gigabite',
      image: 'product2.jpg'
    },
    {
      id: 2,
      name: 'Gigabite',
      image: 'product2.jpg'
    },
    {
      id: 3,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 4,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 5,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 6,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 7,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 8,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 9,
      name: 'Gigabite',
      image: 'product2.jpg'
    },    
    {
      id: 10,
      name: 'Gigabite',
      image: 'product2.jpg'
    },
  ];

  return (
    <div className="brandsList">
      {brands.map(brand => (
        <Brands key={brand.id} brand={brand} />
      ))}
    </div>
  );
}