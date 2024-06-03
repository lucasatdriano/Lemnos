import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './offerList.scss';

export default function OfferList() {
  const [produtos, setProdutos] = useState([]);
  const baseUri = "http://localhost:8080/api";

  useEffect(() => { 
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`${baseUri}/produto`, {
          timeout: 10000,
        });
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao listar Produtos:', error);
      }
    };
  
    fetchProdutos();
  }, []);

  const produtosComDesconto = produtos.filter(produto => produto.desconto > 0);

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
          },
        }}
      >
        {produtosComDesconto.map(produto => (
          <SplideSlide key={produto.id}>
            <Card produto={produto} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}