import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductFilter() {
  const { category } = useParams();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

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

  // Função para aplicar os filtros aos dados
  const applyFilters = (products) => {
    return products.filter(item => {
      // Aplicar filtros conforme necessário
      if (selectedBrand && item.brand !== selectedBrand) {
        return false;
      }
      if (selectedPrice && item.price > parseInt(selectedPrice)) {
        return false;
      }
      if (selectedSubCategory && item.subcategory !== selectedSubCategory) {
        return false;
      }
      return true;
    });
  };

  const filteredData = applyFilters(products);

  useEffect(() => {
    // Simula a seleção da categoria ao acessar a tela de filtros
    setSelectedBrand(category); // Ou setSelectedPrice(category), dependendo do que você deseja usar como categoria inicial
  }, [category]);

  return (
    <div>
      {/* Componentes de filtro */}
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">Todas as marcas</option>
        <option value="Brand A">Brand A</option>
        <option value="Brand B">Brand B</option>
        {/* Adicione mais opções de marca conforme necessário */}
      </select>

      <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
        <option value="">Qualquer preço</option>
        <option value="10">Até R$ 10,00</option>
        <option value="20">Até R$ 20,00</option>
        {/* Adicione mais opções de preço conforme necessário */}
      </select>

      <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
        <option value="">Todas as subcategorias</option>
        <option value="Subcategory 1">Subcategoria 1</option>
        <option value="Subcategory 2">Subcategoria 2</option>
        {/* Adicione mais opções de subcategoria conforme necessário */}
      </select>

      {/* Dados filtrados */}
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name} - Marca: {item.brand}, Preço: {item.price}, Subcategoria: {item.subcategory}</li>
        ))}
      </ul>
    </div>
  );
}