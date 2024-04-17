import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/card/Card';
import '../home.scss';
import logoHorizontal from '../../../assets/logoHorizontal.png'

export function ProductList() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)',
      price: 19.99,
      image: logoHorizontal
    },
    {
      id: 2,
      name: 'Product 2',
      price: 24.99,
      image: '../../../assets/logoHorizontal.png'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 4,
      name: 'Product 4',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 5,
      name: 'Product 5',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 6,
      name: 'Product 6',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 7,
      name: 'Product 7',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 8,
      name: 'Product 8',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 9,
      name: 'Product 9',
      price: 24.99,
      image: 'product2.jpg'
    },
    {
      id: 10,
      name: 'Product 10',
      price: 24.99,
      image: 'product2.jpg'
    },
  ];

  const handleProductClick = (productId) => {
    navigate.push(`/product/${productId}`);
  };

  return (
    <div className='productsList'>
      {products.map(product => (
        <Card key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
      ))}
    </div>
  );
}