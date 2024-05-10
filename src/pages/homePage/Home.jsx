import React from 'react';
import { Slide } from './components/carousel/Carousel';
import './home.scss'
import kitUpgrade from '../../assets/imgKitUpgrade.svg';
import videoGame from '../../assets/imgVideoGame.svg';
import monitor from '../../assets/imgMonitor.svg';
import computadorGamer from '../../assets/imgPcGamer.svg';
import portatil from '../../assets/imgNotebookPortatil.svg';
import perifericos from '../../assets/imgPerifericos.svg';
import logoHorizontal from '../../assets/logoHorizontal.svg'
import { ProductList } from './components/ProductList';
import { BrandsList } from './components/BrandsList';
import { OfferList } from './components/OfferList';

export function Home() {
  const products = [
    {
      id: 1,
      name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)',
      price: 19.99,
      image: logoHorizontal,
      brand: `Brand ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      category: `Categoria ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      subcategory: `Subcategoria ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}` 
    },
  ];
  for (let i = 2; i <= 40; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.random() * 1000,
      image: 'product2.jpg',
      brand: `Brand ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      category: `Categoria ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      subcategory: `Subcategoria ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
    });
  }

  const mainProducts = products.slice(0, 10);

  return (
    <>
      <main>
        <Slide />
        
        <section className='mainDep'>
          <h2>Principais Departamentos</h2>

          <div className="containerDeps">
            <div className='gridItem item1'>
              <img src={computadorGamer} alt="imagem filtro computadores gamers" />
              <h3>Computadores</h3>
            </div>

            <div className='gridItem item2'>
              <img src={portatil} alt="imagem filtro notebook e portáteis" />
              <h3>Notebook e Portáteis</h3>
            </div>

            <div className='gridItem item3'>
              <img src={kitUpgrade} alt="imagem filtro kit upgrade" />
              <h3>Kits</h3>
            </div>

            <div className='gridItem item4'>
              <img src={perifericos} alt="imagem filtro periféricos" />
              <h3>Periféricos</h3>
            </div>
            
            <div className='gridItem item5'>
              <img src={monitor} alt="imagem filtro monitores" />
              <h3>Monitores</h3>
            </div>

            <div className='gridItem item6'>
              <img src={videoGame} alt="imagem filtro video games" />
              <h3>Video Games</h3>
            </div>
        
          </div>
        </section>

        <section className='offers'>
          <h2>Ofertas</h2>
          <OfferList  />
        </section>

        <section className='mainProds'>
          <h2>Principais Produtos</h2>
          <ProductList products={mainProducts}/>
        </section>

        <section className='brands'>
          <h2>Principais Marcas</h2>
          <BrandsList />
        </section>
      </main>
    </>
  )
}