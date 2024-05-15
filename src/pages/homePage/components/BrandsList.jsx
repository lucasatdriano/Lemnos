import React from 'react';
import CardBrands from '../../../components/cardBrand/CardBrand';
import imgAMD from '../../../assets/brands/amd.svg';
import imgApple from '../../../assets/brands/apple.svg';
import imgDell from '../../../assets/brands/dell.svg';
import imgIntel from '../../../assets/brands/intel.svg';
import imgLG from '../../../assets/brands/lg.svg';
import imgNvidia from '../../../assets/brands/nvidia.svg';
import imgPhilips from '../../../assets/brands/philips.svg';
import imgPositivo from '../../../assets/brands/positivo.svg';
import imgSamsung from '../../../assets/brands/samsung.svg';
import imgSony from '../../../assets/brands/sony.svg';
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