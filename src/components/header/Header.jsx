import React, { useState, useEffect } from 'react';
import './header.scss'
import { MenuDep } from './components/menuDep/MenuDep';
import { MenuNav } from './components/menuMobile/MenuNavMob';
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
    
    return (
        <>
        <header className={`header ${shrinkHeader ? 'shrink' : ''}`}>
            <div id='headerContent'></div>
            <MenuDep toggleTheme={toggleTheme} />
            
            <Link to="/">
                <a href="" className='logo'>Lemnos</a>
                {/* <img src={ LogoHorizontal } alt="logo" className='logo'/> */}
            </Link>
            
            <nav>
                <ul className='navegation'>
                    <Link to="/" className='link'>Home</Link>
                    <Link to="/about" className='link'>Sobre</Link>
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