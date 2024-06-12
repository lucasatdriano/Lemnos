import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './menuSearch.scss';
import { RiSearch2Line } from 'react-icons/ri';
import { getAllProdutos } from '../../../../services/ApiService';

export default function MenuSearch() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProdutos] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    useEffect(() => {
        async function fetchProdutos() {
            const data = await getAllProdutos() 
            setProdutos(data);
          }
          fetchProdutos();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredProducts([]);
            setShowResults(false);
            return;
        }

        const filteredResults = products.filter(product =>
            product.nome.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredProducts(filteredResults);
        setShowResults(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/productFilter?search=${searchTerm}`);
        setFilteredProducts([]);
        setShowResults(false);
    };

    const handleSearchResultClick = (productId) => {
        navigate(`/product/${productId}`);
        setSearchTerm('');
        setFilteredProducts([]);
        setShowResults(false);
    };

    return (
        <div className="searchContainer">
            <form onSubmit={handleSearch} className="inputSearch">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    name="search"
                    id="inputSearch"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">
                    <RiSearch2Line className="searchIcon" />
                </button>
            </form>
            {showResults && filteredProducts.length > 0 && (
                <ul className="searchResults">
                    {filteredProducts.map(product => (
                        <Link
                            to={`/product/${product.id}`}
                            className="itemSearch"
                            key={product.id}
                            onClick={() => handleSearchResultClick(product.id)}
                        >
                            <div className="containerVisual">
                                <img src={product.imagemPrincipal} alt={product.nome} />
                                <h4>{product.nome}</h4>
                            </div>
                            <p>{BRL.format(product.valorComDesconto)}</p>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
}