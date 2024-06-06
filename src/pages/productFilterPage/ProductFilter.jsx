import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoubleInputRange from '../../components/inputs/doubleInput/DoubleInput';
import './productFilter.scss';
import { listarProdutosFiltrados } from '../../services/apiProductService'; 

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

export default function ProductFilter() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        const filtro = {
          categoria: selectedCategory || '',
          subCategoria: selectedSubCategory || '',
          marca: selectedBrand || '',
          menorPreco: minPrice !== undefined ? minPrice : 0,
          maiorPreco: maxPrice !== undefined ? maxPrice : 10000,
        };
        const produtosFiltrados = await listarProdutosFiltrados(filtro);
        setFilteredData(produtosFiltrados);
      } catch (error) {
        toast.error('Erro ao buscar produtos.');
      } finally {
        setLoading(false);
      }
    };
  
    applyFilters();
  }, [selectedBrand, selectedCategory, selectedSubCategory, minPrice, maxPrice, searchTerm]);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

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