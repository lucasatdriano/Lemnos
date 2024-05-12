import React, { useState, useEffect } from 'react';
import './header.scss'
import MenuDep from './components/menuDep/MenuDep';
import MenuSearch from './components/searchMenu/MenuSearch';
import MenuFavorite from './components/favoriteMenu/MenuFavorite';
import { Link } from 'react-router-dom';
import img from '../../assets/imgLemnos/logoHorizontal.svg';
import { RiShoppingCartLine, RiSearch2Line, RiHeartLine, RiUser3Line } from "react-icons/ri";

export function Header({ toggleTheme }) {
    const [shrinkHeader, setShrinkHeader] = useState(false);

    const [favorites, setFavorites] = useState([
        { id: 1, name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)', image: 'img', price: 10.99 },
        { id: 2, name: "Produto 2", image: "caminho/para/imagem2.jpg", price: 19.99 }
    ]);

    const removeFromFavorites = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShrinkHeader(true);
                
            } else {
                setShrinkHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchResultClick = (productId) => {
    
    };
    
    return (
        <header className={`header ${shrinkHeader ? 'shrink' : ''}`}>
            <div id='headerContent'></div>
            <MenuDep toggleTheme={toggleTheme} className='menuDepartamento' />
            
            <Link to="/" className='logo'>Lemnos</Link>
            
            <nav>
                <ul className='navegation'>
                    <Link to="/" className='link'>Home</Link>
                    <Link to="/about" className='link'>Sobre</Link>
                </ul>
            </nav>
            
            <MenuSearch onSearchResultClick={handleSearchResultClick} />
            
            <nav className='menuDesktop'>
                <MenuFavorite favorites={favorites} removeFromFavorites={removeFromFavorites} />
                <Link to="/login">
                    <RiUser3Line className='userIcon' />
                </Link>
                <Link to="/cart">
                    <RiShoppingCartLine className='cartIcon' />
                </Link>
            </nav>
        </header>
    )
}