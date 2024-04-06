import React, { useState, useEffect } from 'react';
import './header.scss'
import { Menu } from './components/menuDep/Menu';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine, RiSearch2Line, RiHeartLine, RiUser3Line, RiMenuUnfoldLine } from "react-icons/ri";

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
            <Menu toggleTheme={toggleTheme} />
            
            <Link to="Lemnos/" className='logo'>LOGO</Link>
            
            <nav>
                <ul className='navegation'>
                    <li><Link to="Lemnos/">Home</Link></li>
                    <li><Link to="Lemnos/about">Sobre</Link></li>
                </ul>
            </nav>
            
            <div className='inputSearch'>
                <input type="text" placeholder='Search:' name='search' id='inputSearch'/>
                <RiSearch2Line className='searchIcon'/>
            </div>
            
            <nav className='menuDesktop'>
                <Link to="Lemnos/">
                    <RiHeartLine className='favoriteIcon' />
                </Link>
                <Link to="Lemnos/login">
                    <RiUser3Line className='userIcon' />
                </Link>
                <Link to="Lemnos/">
                    <RiShoppingCartLine className='cartIcon' />
                </Link>
            </nav>

            {/* <MenuMobile className='menuMobile'/> */}
        </header>
        </>
    )
}