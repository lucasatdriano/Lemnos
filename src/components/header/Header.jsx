import React, { useState, useEffect } from 'react';
import './header.scss'
import { MenuDep } from './components/menuDep/Menu';
import { MenuNav } from './components/menuMobile/Menu';
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
    
    return (
        <>
        <header className={`header ${shrinkHeader ? 'shrink' : ''}`}>
            <div id='headerContent'></div>
            <MenuDep toggleTheme={toggleTheme} />
            
            <Link to="/" className='logo'>LOGO</Link>
            
            <nav>
                <ul className='navegation'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">Sobre</Link></li>
                </ul>
            </nav>
            
            <div className='inputSearch'>
                <input type="text" placeholder='Search:' name='search' id='inputSearch'/>
                <RiSearch2Line className='searchIcon'/>
            </div>
            
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
        </>
    )
}