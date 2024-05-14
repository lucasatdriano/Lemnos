import React from 'react';
import CardBrands from '../../../components/cardBrand/CardBrand';
import imgAMD from '../../../assets/brands/amd2.svg';
import imgApple from '../../../assets/brands/apple2.svg';
import imgDell from '../../../assets/brands/dell2.svg';
import imgIntel from '../../../assets/brands/intel2.svg';
import imgLG from '../../../assets/brands/lg2.svg';
import imgNvidia from '../../../assets/brands/nvidia2.svg';
import imgPhilips from '../../../assets/brands/philips2.svg';
import imgPositivo from '../../../assets/brands/positivo2.svg';
import imgSamsung from '../../../assets/brands/samsung2.svg';
import imgSony from '../../../assets/brands/sony2.svg';
import '../home.scss';

export default function BrandsList() {

  const brands = [
    {
      id: 1,
      name: 'AMD',
      image: imgAMD
    },
    {
      id: 2,
      name: 'Apple',
      image: imgApple
    },    
    {
      id: 3,
      name: 'Dell',
      image: imgDell
    },
    {
      id: 4,
      name: 'Intel',
      image: imgIntel
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