import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/card/Card';
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
  'Hardware': ['Armazenamento', 'Coolers', 'Fonte', 'Memória RAM', 'Placa de Vídeo', 'Placa Mãe', 'Processadores'],
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
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const applyFilters = async () => {
    setLoading(true);
    try {
      const filtro = {
        categoria: selectedCategory ?? null,
        subCategoria: selectedSubCategory ?? null,
        marca: selectedBrand ?? null,
        menorPreco: minPrice ?? 0,
        maiorPreco: maxPrice ?? 50000,
      };
  
      const produtosFiltrados = await listarProdutosFiltrados(filtro, 0, 20);
      setFilteredData(produtosFiltrados);
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    applyFilters();
  }, [selectedBrand, selectedCategory, selectedSubCategory, minPrice, maxPrice, searchTerm]);

  const handleClearFilters = () => {
    setSelectedBrand('');
    setSelectedSubCategory('');
    setMinPrice(0);
    setMaxPrice(50000);
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
                <div className='productsList'>
                  {filteredData.map(produto => (
                    <Card key={produto.id} produto={produto} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}