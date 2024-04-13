import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogoVertical from '../../../../assets/logoVertical.png';
import './menuDep.scss';
import { RiMenuUnfoldLine, RiCloseFill, RiSunLine, RiMoonLine } from "react-icons/ri";

export function MenuDep({ toggleTheme }) {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
        toggleModal();
    }

    const toggleModal = () => {
        const modalOpen = isActive;
        if (modalOpen) {
            document.body.classList.remove("modal-open");
        } else {
            document.body.classList.add("modal-open");
        }
    }

    return (
        <>
        <nav className='menuCat'>
            <button onClick={toggleMenu} className='menuButton'>
                <RiMenuUnfoldLine className='menuIcon' />
            </button>

            <div onClick={toggleMenu} className={`modal ${isActive ? "active" : "inactive"}`}></div>
                        
            <nav ref={dropDownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                <button onClick={toggleMenu} className='btnFecharMenu'>
                    <RiCloseFill className='menuIcon' />
                </button>

                <img src={ LogoVertical } alt="Logo" className='logo'/>
                <hr />

                <h3>Departamentos</h3>
                <ul className='categorias'>
                    <li><a href="#">Periféricos</a></li>
                    <li><a href="#">Hardware</a></li>
                    <li><a href="#">Computadores Gamer</a></li>
                    <li><a href="#">Computadores Workstation</a></li>
                    <li><a href="#">Kit Upgrade</a></li>
                    <li><a href="#">Eletrônicos</a></li>
                    <li><a href="#">Notebooks e Portáteis</a></li>
                    <li><a href="#">Video Games</a></li>
                    <li><a href="#">Redes e Wireless</a></li>
                    <li><a href="#">Realidade Virtual</a></li>
                    <li><a href="#">Casa Inteligente</a></li>
                    <li><a href="#">Monitores</a></li>
                </ul>

                <h3>Navegação</h3>
                <ul className='menuNav'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">Sobre</Link></li>
                </ul>
                
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
        </>
    )
}