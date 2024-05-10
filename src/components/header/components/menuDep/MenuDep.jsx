import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogoVertical from '../../../../assets/logoVerticalClaro.svg';
import './menuDep.scss';
import { AiOutlineTeam } from "react-icons/ai";
import { RiMenuUnfoldLine, RiHome4Line , RiShoppingCartLine, RiHeartLine, RiUser3Line, RiSunLine, RiMoonLine } from "react-icons/ri";

export function MenuDep({ toggleTheme }) {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
        toggleModal();
    }

    const toggleModal = () => {
        const htmlTag = document.querySelector('html');
        const modalOpen = isActive;
        if (modalOpen) {
            htmlTag.classList.remove('modalOpen');
        } else {
            htmlTag.classList.add('modalOpen');
        }
    }

    return (
        <nav className='menuCat'>
            <a href="#" onClick={toggleMenu} className='menuButton'>
                <RiMenuUnfoldLine className='menuIcon' />
            </a>

            <div onClick={toggleMenu} className={`modal ${isActive ? "active" : "inactive"}`}></div>
                        
            <nav ref={dropDownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                <img src={ LogoVertical } alt="Logo" className='logoMenu'/>
                <hr className='hrMenu'/>

                <h3>Departamentos</h3>
                <ul className='categorias'>
                    <li><a href="#">Periféricos</a></li>
                    <li><a href="#">Hardware</a></li>
                    <li><a href="#">Computadores</a></li>
                    <li><a href="#">Kits</a></li>
                    <li><a href="#">Eletrônicos</a></li>
                    <li><a href="#">Notebooks e Portáteis</a></li>
                    <li><a href="#">Video Games</a></li>
                    <li><a href="#">Redes e Wireless</a></li>
                    <li><a href="#">Realidade Virtual</a></li>
                    <li><a href="#">Casa Inteligente</a></li>
                    <li><a href="#">Monitores</a></li>
                </ul>

                <h3>Navegação</h3>
                <nav className='menuNav'>
                    <ul>
                        <Link to="/" className='link'>
                            <RiHome4Line className='homeIcon'/>
                            Home
                        </Link>
                        <Link to="/about" className='link'>
                            <AiOutlineTeam className='aboutIcon'/>
                            Sobre
                        </Link>
                        <Link to="/" className='link'>
                            <RiHeartLine className='favoriteIcon' />
                            Favoritos
                        </Link>
                        <Link to="/login" className='link'>
                            <RiUser3Line className='userIcon' />
                            Conta
                        </Link>
                        <Link to="/cart" className='link'>
                            <RiShoppingCartLine className='cartIcon' />
                            Carrinho
                        </Link>
                    </ul>
                </nav>
                
                <div className='toggleTheme'>
                    <input 
                      type="checkbox" 
                      className="checkbox" 
                      onClick={toggleTheme} 
                      name="chk" 
                    />
                    <label htmlFor="chk" className="label">
                        <RiSunLine className='iconSun'/>
                        <RiMoonLine className='iconMoon'/>
                        <div className="ball"></div>
                    </label>
                </div>
            </nav>
        </nav>
    )
}