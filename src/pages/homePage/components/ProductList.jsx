import React from 'react';
import { Card } from '../../../components/card/Card';

export function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      image: 'product1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    // Adicionar mais produtos
  ];

  return (
    <div>
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}