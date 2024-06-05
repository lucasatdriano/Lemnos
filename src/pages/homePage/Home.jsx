import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slide from './components/carousel/Carousel';
import Card from '../../components/card/Card';
import BrandsList from './components/BrandsList';
import OfferList from '../../components/lists/OfferList';
import './home.scss';
import kits from '../../assets/deps/imgKitUpgrade.svg';
import videoGame from '../../assets/deps/imgVideoGame.svg';
import monitor from '../../assets/deps/imgMonitor.svg';
import computador from '../../assets/deps/imgPcGamer.svg';
import portatil from '../../assets/deps/imgNotebookPortatil.svg';
import perifericos from '../../assets/deps/imgPerifericos.svg';

export default function Home() {
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

  const mainProducts = produtos.slice(0, 20);
  const produtosSemDesconto = mainProducts.filter(produto => produto.desconto == 0);

  return (
    <>
      <main>
        <Slide />

        <section className='brands'>
          <h2>Principais Marcas</h2>
          <BrandsList />
        </section>
        
        <section className='mainDep'>
          <h2>Principais Departamentos</h2>

          <div className="containerDeps">
            <Link to="/productFilter/Computadores" className='gridItem item1'>
              <img src={computador} alt="imagem filtro computadores" />
              <h3>Computadores</h3>
            </Link>

            <Link to="/productFilter/Notebooks e Portáteis" className='gridItem item2'>
              <img src={portatil} alt="imagem filtro notebook e portáteis" />
              <h3>Notebook e Portáteis</h3>
            </Link>

            <Link to="/productFilter/Kits" className='gridItem item3'>
              <img src={kits} alt="imagem filtro kits" />
              <h3>Kits</h3>
            </Link>

            <Link to="/productFilter/Periféricos" className='gridItem item4'>
              <img src={perifericos} alt="imagem filtro periféricos" />
              <h3>Periféricos</h3>
            </Link>
            
            <Link to="/productFilter/Monitores" className='gridItem item5'>
              <img src={monitor} alt="imagem filtro monitores" />
              <h3>Monitores</h3>
            </Link>

            <Link to="/productFilter/Video Games" className='gridItem item6'>
              <img src={videoGame} alt="imagem filtro video games" />
              <h3>Video Games</h3>
            </Link>
        
          </div>
        </section>

        <section className='offers'>
          <h2>Ofertas</h2>
          <OfferList  />
        </section>

        <section className='mainProds'>
          <h2>Principais Produtos</h2>
          <div className='productsList'>
            {produtosSemDesconto.map(produto => (
              <Card key={produto.id} produto={produto} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}