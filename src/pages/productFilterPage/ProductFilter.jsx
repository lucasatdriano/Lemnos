import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/card/Card';
import './productFilter.scss';
import logoHorizontal from '../../assets/logoHorizontal.png';

export function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para carregar mais produtos quando o usuário rolar para o final da página
  const loadMoreProducts = () => {
    setLoading(true);
    // Simulação de chamada assíncrona para a API
    setTimeout(() => {
      const newProducts = [
        // Aqui você carrega os próximos produtos da API, por exemplo, com uma chamada fetch
        // Você pode adicionar os produtos em uma nova página ou apenas anexá-los à lista existente
        // Neste exemplo, estou apenas simulando a adição de produtos
        ...products,
        {
          id: products.length + 1,
          name: `Product ${products.length + 1}`,
          price: Math.floor(Math.random() * 10000), // Preço aleatório
          image: logoHorizontal
        }
      ];
      setProducts(newProducts);
      setLoading(false);
    }, 1000); // Simula uma chamada assíncrona de 1 segundo
  };

  // Efeito para carregar mais produtos quando a página for carregada inicialmente
  useEffect(() => {
    loadMoreProducts();
  }, []);

  // Efeito para adicionar event listener para verificar quando o usuário rolar até o final da página
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <main>
      <div className='productsList'>
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
        {loading && <div>Carregando...</div>}
      </div>
    </main>
  );
}