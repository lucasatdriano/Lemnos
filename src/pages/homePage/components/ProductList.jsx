import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/card/Card';
import '../home.scss';

export default function ProductList({ products }) {
  const navigate = useNavigate();

    //chamada da API
  // const products = [
  //   {
  //     id: 1,
  //     name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)',
  //     price: 19.99,
  //     image: logoHorizontal
  //   },
  // ];
  // for (let i = 2; i <= 40; i++) {
  //   products.push({
  //     id: i,
  //     name: `Product ${i}`,
  //     price: Math.random() * 1000, // Preço aleatório entre 0 e 100
  //     image: 'product2.jpg', // Imagem de exemplo
  //     brand: `Brand ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`, // Marcas aleatórias de A a Z
  //     category: `Categoria ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`, // Categorias aleatórias de A a Z
  //     subcategory: `Subcategoria ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}` // Subcategorias aleatórias de A a Z
  //   });
  // }

  return (
    <div className='productsList'>
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}