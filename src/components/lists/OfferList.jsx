import { useState, useEffect } from 'react';
import Card from '../card/Card';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './offerList.scss';
import { getAllProdutos } from '../../services/ApiService';

export default function OfferList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchDescontos() {
      const data = await getAllProdutos() 
      setProdutos(data);
    }
    fetchDescontos();
  }, []);

  const produtosComDesconto = produtos.filter(produto => produto.desconto > 0);

  return (    
    <div className="offersList">
      <Splide
        options={{
          type: 'carousel',
          perPage: 5,
          perMove: 1,
          speed: 1000,
          arrows: true,
          gap: 350,
          breakpoints: {
            1300: {
              perPage: 4,
            },
            860: {
              perPage: 4,
            },
            560: {
              perPage: 4,
            },
            460: {
              perPage: 4,
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