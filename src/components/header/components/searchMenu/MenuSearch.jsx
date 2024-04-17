import React, { useState } from 'react';
import './menuSearch.scss';
import { RiSearch2Line } from 'react-icons/ri';

export function MenuSearch({ onSearchResultClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearchChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
  
      // Aqui você pode fazer a chamada à API para buscar os produtos
      // Por enquanto, vamos apenas simular uma lista de produtos estática
      const products = [
        { id: 1, name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
      ];

      // Filtra os produtos com base no termo de pesquisa
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
  
      setSearchResults(filteredResults);
    };
  
    const handleSearch = (event) => {
      event.preventDefault(); // Impede o envio do formulário padrão
      // Aqui você pode adicionar mais lógica se necessário
    };
  
    const handleSearchResultClick = (productId) => {
      onSearchResultClick(productId);
      setSearchTerm('');
      setSearchResults([]);
    };
  
    return (
        <div className="searchContainer">
            <form onSubmit={handleSearch} className="inputSearch">
                <input
                    type="text"
                    placeholder="Search..."
                    name='search'
                    id='inputSearch'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">
                    <RiSearch2Line className='searchIcon' />
                </button>
            </form>
              <ul className="searchResults">
              {searchResults.map(product => (
                <li key={product.id} onClick={() => handleSearchResultClick(product.id)}>
                  {product.name}
                </li>
              ))}
            </ul>
        </div>
    );
}