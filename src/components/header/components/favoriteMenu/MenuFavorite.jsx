import React, { useState, useRef } from 'react';
import './menuFavorite.scss';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { RiHeartLine } from "react-icons/ri";

export default function MenuFavorite({ favorites, removeFromFavorites }) {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
        toggleModal();
    }

    const toggleModal = () => {
        const htmlTag = document.querySelector('html');
        if (isActive) {
            htmlTag.classList.remove('modalOpen');
        } else {
            htmlTag.classList.add('modalOpen');
        }
    }

    return (
        <nav>
            <a href="#">
                <RiHeartLine className='favoriteIcon' onClick={toggleMenu}/>
            </a>

            <div onClick={toggleMenu} className={`modal ${isActive ? "active" : "inactive"}`}></div>

            <div ref={dropDownRef} className={`menuFavorite ${isActive ? "active" : "inactive"}`}>
                <h2>Meus Favoritos</h2>
                <ul className='listaFavoritos'>
                    {favorites.map((favorite, index) => (
                        <li key={index} className='productFav'>
                            <img src={favorite.image} alt={favorite.name} />
                            <div className='containerInfosFav'>
                                <h3>{favorite.name}</h3>
                                <p>Preço: R${favorite.price}</p>
                                <MdFavorite className='iconFav' onClick={() => removeFromFavorites(index)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}