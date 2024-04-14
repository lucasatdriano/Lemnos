import React from 'react';
import { Card } from '../../../components/card/Card';
import '../home.scss';

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
    {
      id: 3,
      name: 'Product 3',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 9,
      name: 'Product 9',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 10,
      name: 'Product 10',
      description: 'Description of Product 2',
      price: 24.99,
      image: 'product2.jpg'
    },
  ];

  return (
    <div className='productsList'>
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}