import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoHorizontal from '../../assets/imgLemnos/logoHorizontal.svg';
import './productFilter.scss';
import DoubleInputRange from '../../components/inputs/doubleInput/DoubleInputRange';

export default function ProductFilter() {
  const { category, search } = useParams();
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const brands = [
    'AMD',
    'Dell',
    'Intel',
    'Apple',
    'LG',
    'Nvidia',
    'Philips',
    'Positivo',
    'Samsung',
    'Sony',
  ];
  
  const categorias = [
    'Periféricos',
    'Hardware',
    'Computadores',
    'Kits',
    'Eletrônicos',
    'Notebooks e Portáteis',
    'Video Games',
    'Redes e wireless',
    'Realidade Virtual',
    'Casa Inteligente',
    'Monitores'
  ];

  const subcategoriasPorCategoria = {
    'Periféricos': ['Teclado', 'Mouse', 'Microfone', 'Fone de Ouvido', 'Caixa de Som', 'Mousepad'],
    'Hardware': ['Processadores', 'Placa Mãe', 'Memórias', 'Armazenamento', 'Fonte', 'Coolers', 'Placa de vídeo'],
    'Computadores': ['Computadores Gamers', 'Computadores Workstation'],
    'Kits': ['Upgrade', 'Gamer', 'Periféricos'],
    'Eletrônicos': ['Acessórios de Console', 'Carregadores', 'Smart Box', 'Refrigeração'],
    'Notebooks e Portáteis': ['Notebooks', 'Tablets', 'Smartphones'],
    'Video Games': ['Portátil', 'Console de Mesa'],
    'Redes e wireless': ['Roteadores', 'Adaptadores', 'Cabos', 'Cabos de Redes', 'Switches', 'Access Point'],
    'Realidade Virtual': ['Óculos'],
    'Casa Inteligente': ['Assistente Virtual', 'Sensores', 'Lâmpadas Inteligentes', 'Controles Smarts'],
    'Monitores': ['Monitores Gamers', 'Monitores Workstation']
  };
  
  const products = [
    {
      id: 1,
      name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)',
      price: 19.99,
      image: logoHorizontal,
      brand: `Apple`,
      category: 'Computadores',
      subcategory: 'Computadores Workstation'
    },
  ];
  for (let i = 2; i <= 100; i++) {
    const category = categorias[Math.floor(Math.random() * categorias.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const subcategories = subcategoriasPorCategoria[category];
    const subcategory = subcategories ? subcategories[Math.floor(Math.random() * subcategories.length)] : '';
    products.push({
      id: i,
      name: `Product ${i}`,
      price: parseFloat((Math.random() * 1000).toFixed(2)),
      image: logoHorizontal,
      brand: brand,
      category: category,
      subcategory: subcategory,
    });
  }

  const applyFilters = () => {
    setLoading(true);
    const filtered = products.filter(item => {
      if (selectedBrand && item.brand !== selectedBrand) {
        return false;
      }
      if (minPrice && item.price < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && item.price > parseFloat(maxPrice)) {
        return false;
      }
      if (selectedSubCategory && item.subcategory !== selectedSubCategory) {
        return false;
      }
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
    setTimeout(() => {
      setFilteredData(filtered);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    setSearchTerm(search || '');
  }, [search]);

  useEffect(() => {
    applyFilters();
  }, [selectedBrand, selectedCategory, selectedSubCategory, minPrice, maxPrice, searchTerm]);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    if (maxPrice && parseFloat(e.target.value) > parseFloat(maxPrice)) {
      toast.warning('O valor mínimo não pode ser maior que o valor máximo.');
      setMaxPrice(e.target.value);
    }
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    if (minPrice && parseFloat(e.target.value) < parseFloat(minPrice)) {
      toast.warning('O valor máximo não pode ser menor que o valor mínimo.');
      setMinPrice(e.target.value);
    }
  };

  const handleClearFilters = () => {
    setSelectedBrand('');
    setSelectedSubCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
  };

  return (
    <main className='mainFilters'>
      <section className="product-filter-container">
        <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
          <option value="">Todas as subCategorias</option>
          {categorias.map((categoria, index) => (
            selectedCategory === categoria && subcategoriasPorCategoria[categoria].map((subcategoria, index) => (
              <option key={index} value={subcategoria}>{subcategoria}</option>
            ))
          ))}
        </select>

        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">Todas as marcas</option>
          {brands.map((brands, index) => (
              <option key={index} value={brands}>{brands}</option>
          ))}
        </select>

        <DoubleInputRange />

        <select value={minPrice} onChange={handleMinPriceChange}>
          <option value="">Qualquer preço</option>
          <option value="10">De {BRL.format(10)}</option>
          <option value="20">De {BRL.format(20)}</option>
          <option value="50">De {BRL.format(50)}</option>
          <option value="100">De {BRL.format(100)}</option>
          <option value="250">De {BRL.format(250)}</option>
          <option value="500">De {BRL.format(500)}</option>
          <option value="1000">De {BRL.format(1000)}</option>
          <option value="5000">De {BRL.format(5000)}</option>
          <option value="10000">De {BRL.format(10000)}</option>
        </select>

        <select value={maxPrice} onChange={handleMaxPriceChange}>
          <option value="">Qualquer preço</option>
          <option value="10">Até {BRL.format(10)}</option>
          <option value="20">Até {BRL.format(20)}</option>
          <option value="50">Até {BRL.format(50)}</option>
          <option value="100">Até {BRL.format(100)}</option>
          <option value="250">Até {BRL.format(250)}</option>
          <option value="500">Até {BRL.format(500)}</option>
          <option value="1000">Até {BRL.format(1000)}</option>
          <option value="5000">Até {BRL.format(5000)}</option>
          <option value="10000">Até {BRL.format(10000)}</option>
        </select>

      </section>

      <hr className='hrFilter' />

      <section className="filtered-data-container">
        {loading ? (
          <div className="loadingIndicator">
            <h2 className='textEmpty'>Carregando...</h2>
            <div class="dot-spinner">
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
            </div>
          </div>
        ) : (
          <>
            {filteredData.length === 0 && (
              <div className="emptyFilterMessage">
                <h2 className='textEmpty'>Parece que não há resultados para os filtros escolhidos. Por favor, revise suas opções e tente novamente.</h2>
                <button type='button' className='btnBackFilter' onClick={handleClearFilters}>Limpar Filtros</button>
              </div>
            )}

            {filteredData.length > 0 && (
              <>
                <ul>
                  {filteredData.map(item => (
                    <li key={item.id}>{item.name} - Marca: {item.brand}, Preço: {BRL.format(item.price)}, categoria: {item.category},  Subcategoria: {item.subcategory}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
