import React from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { CardOffer } from '../../../components/cardOffer/CardOffer';
import '../home.scss';
import logoHorizontal from '../../../assets/logoHorizontal.png'

export function OfferList() {
  
    //chamada da API
  const offers = [
    {
      id: 1,
      name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)',
      price: 2049.99,
      descont: 12,
      image: logoHorizontal
    },
    {
      id: 2,
      name: 'Product 2',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 4,
      name: 'Product 4',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 5,
      name: 'Product 5',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 6,
      name: 'Product 6',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 7,
      name: 'Product 7',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 8,
      name: 'Product 8',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 9,
      name: 'Product 9',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
    {
      id: 10,
      name: 'Product 10',
      price: 24.99,
      descont: 12,
      image: 'product2.jpg'
    },
  ];

  return (    
    <div className="offersList">
      <Splide
        options={{
          type: 'carousel',
          perPage: 3,
          perMove: 1,
          speed: 1000,
          arrows: true,
          breakpoints: {
            1300: {
              perPage: 2,
            },
            860: {
              perPage: 1,
            },
            500: {
              perPage: 1,
            },
          },
        }}
      >
        {offers.map(offer => (     
          <SplideSlide>
            <CardOffer key={offer.id} offer={offer} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}