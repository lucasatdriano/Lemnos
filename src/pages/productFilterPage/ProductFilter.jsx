import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoHorizontal from '../../assets/imgLemnos/logoHorizontal.svg';
import DoubleInputRange from '../../components/inputs/doubleInput/DoubleInput';
import './productFilter.scss';

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
  'Casa Inteligente', 
  'Computadores', 
  'Eletrônicos',
  'Hardware', 
  'Kits', 
  'Monitores',
  'Notebooks e Portáteis', 
  'Periféricos',
  'Realidade Virtual', 
  'Redes e Wireless', 
  'Video Games', 
];

const subcategoriasPorCategoria = {
  'Casa Inteligente': ['Assistente Virtual', 'Controles Smarts', 'Lâmpadas Inteligentes', 'Sensores'],
  'Computadores': ['Computadores Gamers', 'Computadores Workstation'],
  'Eletrônicos': ['Acessórios de Console', 'Carregadores', 'Refrigeração', 'Smart Box'],
  'Hardware': ['Armazenamento', 'Coolers', 'Fonte', 'Memória RAM', 'Placa de vídeo', 'Placa Mãe', 'Processadores'],
  'Kits': ['Gamer', 'Periféricos', 'Upgrade'],
  'Monitores': ['Monitores Gamers', 'Monitores Workstation'],
  'Notebooks e Portáteis': ['Notebooks', 'Smartphones', 'Tablets'],
  'Periféricos': ['Caixa de Som', 'Fone de Ouvido', 'Microfone', 'Mouse', 'Mousepad', 'Teclado'],
  'Realidade Virtual': ['Óculos de VR', 'Periféricos de VR'],
  'Redes e wireless': ['Access Point', 'Adaptadores', 'Cabos', 'Cabos de Redes', 'Roteadores', 'Switches'],
  'Video Games': ['Console de Mesa', 'Portátil']
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
    price: parseFloat((Math.random() * 10000).toFixed(2)),
    image: logoHorizontal,
    brand: brand,
    category: category,
    subcategory: subcategory,
  });
}

export default function ProductFilter() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  
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
    setSearchTerm(search);
  }, [search]);

  useEffect(() => {
    applyFilters();
  }, [selectedBrand, selectedCategory, selectedSubCategory, minPrice, maxPrice, searchTerm]);
  
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    if (maxPrice && parseFloat(value) > parseFloat(maxPrice)) {
      toast.warning('O valor mínimo não pode ser maior que o valor máximo.');
      setMaxPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (minPrice && parseFloat(value) < parseFloat(minPrice)) {
      toast.warning('O valor máximo não pode ser menor que o valor mínimo.');
      setMinPrice(value);
    }
  };

  const handleClearFilters = () => {
    setSelectedBrand('');
    setSelectedSubCategory('');
    setMinPrice(0);
    setMaxPrice(10000);
    setSearchTerm('');
    setSelectedCategory('');
    navigate(`/productFilter`);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    navigate(`/productFilter/${newCategory}${searchTerm ? `?search=${searchTerm}` : ''}`);
  };
  
  return (
    <main className='mainFilters'>
      <section className="product-filter-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas as Categorias</option>
          {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>

        <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
          <option value="">Todas as SubCategorias</option>
          {(subcategoriasPorCategoria[selectedCategory] || []).map((subcategoria, index) => (
            <option key={index} value={subcategoria}>{subcategoria}</option>
          ))}
        </select>

        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">Todas as Marcas</option>
          {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
          ))}
        </select>

        <DoubleInputRange 
          minValue={minPrice}
          maxValue={maxPrice}
          setMinValue={setMinPrice}
          setMaxValue={setMaxPrice}
        />

      </section>

      <section className="filtered-data-container">
        <hr className='hrFilter' />
        
        {loading ? (
          <div className="loadingIndicator">
            <h2 className='textLoading'>Carregando...</h2>
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
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
                <ul className='listResults'>
                  {filteredData.map(item => (
                    <li key={item.id} className='listItemResults'>
                      {/* <img className='imgProduct' src={item.image} alt={item.name} /> */}
                      <div>
                        <h3 className='titleProduct'>{item.name}</h3>
                        <p className='priceProduct'>{BRL.format(item.price)}</p>
                        <p>categoria: {item.category}</p>
                        <p>Subcategoria: {item.subcategory}</p>
                      </div>
                    </li>
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
