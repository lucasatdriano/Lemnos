import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoVertical from '../../../../assets/imgLemnos/logoVerticalClaro.svg';
import './menuDep.scss';
import MenuFavorite from '../favoriteMenu/MenuFavorite';
import { AiOutlineTeam } from "react-icons/ai";
import { RiMenuUnfoldLine, RiHome4Line , RiShoppingCartLine, RiHeartLine, RiUser3Line, RiSunLine, RiMoonLine } from "react-icons/ri";

export default function MenuDep({ toggleTheme }) {
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
                <Link to="/" className='link' onClick={toggleMenu}>
                    <img src={ LogoVertical } alt="Logo" className='logoMenu'/>
                </Link>
                <hr className='hrMenu'/>

                <h3>Departamentos</h3>
                <ul className='categorias'>    
                    <Link to="/productFilter/Periféricos" className='filterDeps' onClick={toggleMenu}>Periféricos</Link>
                    <Link to="/productFilter/Hardware" className='filterDeps' onClick={toggleMenu}>Hardware</Link>
                    <Link to="/productFilter/Computadores" className='filterDeps' onClick={toggleMenu}>Computadores</Link>
                    <Link to="/productFilter/Kits" className='filterDeps' onClick={toggleMenu}>Kits</Link>
                    <Link to="/productFilter/Eletrônicos" className='filterDeps' onClick={toggleMenu}>Eletrônicos</Link>
                    <Link to="/productFilter/Notebooks e Portáteis" className='filterDeps' onClick={toggleMenu}>Notebooks e Portáteis</Link>
                    <Link to="/productFilter/Video Games" className='filterDeps' onClick={toggleMenu}>Video Games</Link>
                    <Link to="/productFilter/Redes e Wireless" className='filterDeps' onClick={toggleMenu}>Redes e Wireless</Link>
                    <Link to="/productFilter/Realidade Virtual" className='filterDeps' onClick={toggleMenu}>Realidade Virtual</Link>
                    <Link to="/productFilter/Casa Inteligente" className='filterDeps' onClick={toggleMenu}>Casa Inteligente</Link>
                    <Link to="/productFilter/Monitores" className='filterDeps' onClick={toggleMenu}>Monitores</Link>
                </ul>

                <h3>Navegação</h3>
                <nav className='menuNav'>
                    <ul className='navegacoes'>
                        <Link to="/" className='link' onClick={toggleMenu}>
                            <RiHome4Line className='homeIcon'/>
                            Home
                        </Link>
                        <Link to="/about" className='link' onClick={toggleMenu}>
                            <AiOutlineTeam className='aboutIcon'/>
                            Sobre
                        </Link>
                        <Link to="#" className='link' onClick={toggleMenu}>
                            <MenuFavorite className='favotiteIcon' /> 
                            Favoritos
                        </Link>
                        <Link to="/login" className='link' onClick={toggleMenu}>
                            <RiUser3Line className='userIcon' />
                            Conta
                        </Link>
                        <Link to="/cart" className='link' onClick={toggleMenu}>
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
