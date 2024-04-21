import React, { useState, useEffect } from 'react';
import './header.scss'
import { MenuDep } from './components/menuDep/MenuDep';
import { MenuNav } from './components/menuMobile/MenuNavMob';
import { MenuSearch } from './components/searchMenu/MenuSearch';
import LogoHorizontal from '../../assets/logoHorizontal.png';
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
        // Lógica para manipular o clique no resultado de pesquisa
    };
    
    return (
        <header className={`header ${shrinkHeader ? 'shrink' : ''}`}>
            <div id='headerContent'></div>
            <MenuDep toggleTheme={toggleTheme} />
            
            <Link to="/">
                <a href="" className='logo'>Lemnos</a>
            </Link>
            
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
                <Link to="/">
                    <RiShoppingCartLine className='cartIcon' />
                </Link>
            </nav>

            <nav className='menuMobile'>
                <MenuNav />
            </nav>
        </header>
    )
}