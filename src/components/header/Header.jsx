import React, { useState, useEffect } from 'react';
import './header.scss'
import { MenuDep } from './components/menuDep/MenuDep';
import { MenuSearch } from './components/searchMenu/MenuSearch';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine, RiSearch2Line, RiHeartLine, RiUser3Line } from "react-icons/ri";

export function Header({ toggleTheme }) {
    const [shrinkHeader, setShrinkHeader] = useState(false);

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
                <Link to="/">
                    <RiHeartLine className='favoriteIcon' />
                </Link>
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