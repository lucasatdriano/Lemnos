import React from 'react';
import CardBrands from '../../../components/cardBrand/CardBrand';
import imgAMD from '../../../assets/brands/AMD.svg';
import imgDell from '../../../assets/brands/Dell.svg';
import imgIntel from '../../../assets/brands/Intel.svg';
import imgIphone from '../../../assets/brands/Iphone.svg';
import imgLG from '../../../assets/brands/LG.svg';
import imgNvidia from '../../../assets/brands/Nvidia.svg';
import imgPhilips from '../../../assets/brands/Philips.svg';
import imgPositivo from '../../../assets/brands/Positivo.svg';
import imgSamsung from '../../../assets/brands/Samsung.svg';
import imgSony from '../../../assets/brands/Sony.svg';
import '../home.scss';

export default function BrandsList() {

    //chamada da API
  const brands = [
    {
      id: 1,
      name: 'AMD',
      image: imgAMD
    },
    {
      id: 2,
      name: 'Dell',
      image: imgDell
    },
    {
      id: 3,
      name: 'Intel',
      image: imgIntel
    },    
    {
      id: 4,
      name: 'Iphone',
      image: imgIphone
    },    
    {
      id: 5,
      name: 'LG',
      image: imgLG
    },    
    {
      id: 6,
      name: 'Nvidia',
      image: imgNvidia
    },    
    {
      id: 7,
      name: 'Philips',
      image: imgPhilips
    },    
    {
      id: 8,
      name: 'Positivo',
      image: imgPositivo
    },    
    {
      id: 9,
      name: 'Samsung',
      image: imgSamsung
    },
    {
      id: 10,
      name: 'Sony',
      image: imgSony
    },    
  ];

  return (
    <div className="brandsList">
      {brands.map(brand => (
        <CardBrands key={brand.id} brand={brand} />
      ))}
    </div>
  );
}