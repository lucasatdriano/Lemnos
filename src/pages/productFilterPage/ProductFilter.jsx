import Card from '../../components/card/Card';
import Loading from '../../components/loading/Loading';
import DoubleInputRange from '../../components/inputs/doubleInput/DoubleInput';
import { useState, useEffect, useRef } from 'react';
import { listarProdutosFiltrados } from '../../services/apiProductService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './productFilter.scss';

const brands = [
    'Acer',
    'AMD',
    'Apple',
    'Asus',
    'Dell',
    'Gigabyte',
    'Logitech',
    'Intel',
    'JBL',
    'Lenovo',
    'LG',
    'Microsoft',
    'NVIDIA',
    'Philips',
    'Positivo',
    'Samsung',
    'Sony',
    'Xiaomi',
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
    'Casa Inteligente': [
        'Assistente Virtual',
        'Controles Smarts',
        'Lâmpadas Inteligentes',
        'Sensores',
    ],
    Computadores: ['Computadores Gamers', 'Computadores Workstation'],
    Eletrônicos: [
        'Acessórios de Console',
        'Carregadores',
        'Refrigeração',
        'Smart Box',
    ],
    Hardware: [
        'Armazenamento',
        'Coolers',
        'Fonte',
        'Memória RAM',
        'Placa de Vídeo',
        'Placa Mãe',
        'Processadores',
    ],
    Kits: ['Gamer', 'Periféricos', 'Upgrade'],
    Monitores: ['Monitores Gamers', 'Monitores Workstation'],
    'Notebooks e Portáteis': ['Notebooks', 'Smartphones', 'Tablets'],
    Periféricos: [
        'Caixa de Som',
        'Fone de Ouvido',
        'Microfone',
        'Mouse',
        'Mousepad',
        'Teclado',
    ],
    'Realidade Virtual': ['Óculos de VR', 'Periféricos de VR'],
    'Redes e wireless': [
        'Access Point',
        'Adaptadores',
        'Cabos',
        'Cabos de Redes',
        'Roteadores',
        'Switches',
    ],
    'Video Games': ['Console de Mesa', 'Portátil'],
};

export default function ProductFilter() {
    const { category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedEvaluation, setSelectedEvaluation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000);
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const endOfPageRef = useRef();
    const observer = useRef();

    const applyFilters = async (pageToLoad = 0) => {
        setLoading(true);
        try {
            const filtro = {
                nome: searchTerm ?? null,
                categoria: selectedCategory ?? null,
                subCategoria: selectedSubCategory ?? null,
                marca: selectedBrand ?? null,
                menorPreco: minPrice ?? 0,
                maiorPreco: maxPrice ?? 50000,
                avaliacao: selectedEvaluation
                    ? parseInt(selectedEvaluation, 10)
                    : null,
            };

            const produtosFiltrados = await listarProdutosFiltrados(
                filtro,
                pageToLoad,
                20
            );
            if (pageToLoad === 0) {
                setFilteredData(produtosFiltrados);
            } else {
                setFilteredData((prevData) => [
                    ...prevData,
                    ...produtosFiltrados,
                ]);
            }
            setHasMore(produtosFiltrados.length === 20);
        } catch (error) {
            console.error('Erro ao aplicar filtros:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        applyFilters(0);
    }, [
        selectedBrand,
        selectedCategory,
        selectedSubCategory,
        minPrice,
        maxPrice,
        searchTerm,
        selectedEvaluation,
    ]);

    useEffect(() => {
        const handleObserver = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !loading) {
                setPage((prev) => prev + 1);
            }
        };

        if (endOfPageRef.current) {
            observer.current = new IntersectionObserver(handleObserver);
            observer.current.observe(endOfPageRef.current);
        }

        return () => {
            if (observer.current && endOfPageRef.current) {
                observer.current.unobserve(endOfPageRef.current);
            }
        };
    }, [hasMore, loading]);

    useEffect(() => {
        if (page > 0) {
            applyFilters(page);
        }
    }, [page]);

    const handleClearFilters = () => {
        setSelectedBrand('');
        setSelectedSubCategory('');
        setMinPrice(0);
        setMaxPrice(50000);
        setSelectedEvaluation('');
        setSearchTerm('');
        setSelectedCategory('');
        setPage(0);
        setHasMore(true);
        navigate(`/productFilter`);
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        setPage(0);
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search') || '';
        navigate(
            `/productFilter/${newCategory}${searchTerm ? `?search=${searchTerm}` : ''}`
        );
    };

    return (
        <main className="mainFilters">
            <section className="product-filter-container">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Todas as Categorias</option>
                    {categorias.map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                    <option value="">Todas as SubCategorias</option>
                    {(subcategoriasPorCategoria[selectedCategory] || []).map(
                        (subcategoria, index) => (
                            <option key={index} value={subcategoria}>
                                {subcategoria}
                            </option>
                        )
                    )}
                </select>

                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">Todas as Marcas</option>
                    {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>

                <DoubleInputRange
                    minValue={minPrice}
                    maxValue={maxPrice}
                    setMinValue={setMinPrice}
                    setMaxValue={setMaxPrice}
                />

                <select
                    value={selectedEvaluation}
                    onChange={(e) => setSelectedEvaluation(e.target.value)}
                >
                    <option value="">Qualquer Nota</option>
                    <option value="1">1 estrela</option>
                    <option value="2">2 estrelas</option>
                    <option value="3">3 estrelas</option>
                    <option value="4">4 estrelas</option>
                    <option value="5">5 estrelas</option>
                </select>
            </section>

            <hr className="hrFilter" />

            <section className="filtered-data-container">
                {loading && page === 0 ? (
                    <Loading />
                ) : (
                    <>
                        {filteredData.length === 0 && (
                            <div className="emptyFilterMessage">
                                <h2 className="textEmpty">
                                    Parece que não há resultados para os filtros
                                    escolhidos. Por favor, revise suas opções e
                                    tente novamente.
                                </h2>
                                <button
                                    type="button"
                                    className="btnBackFilter"
                                    onClick={handleClearFilters}
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        )}

                        {filteredData.length > 0 && (
                            <>
                                <div className="productsList">
                                    {filteredData.map((produto) => (
                                        <Card
                                            key={produto.id}
                                            produto={produto}
                                        />
                                    ))}
                                </div>
                                {loading && (
                                    <div className="loadingProducts">
                                        <Loading />
                                    </div>
                                )}
                                <div
                                    ref={endOfPageRef}
                                    className="end-of-page"
                                ></div>
                            </>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}
