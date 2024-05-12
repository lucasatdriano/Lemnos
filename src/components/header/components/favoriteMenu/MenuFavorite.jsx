import React, { useState, useRef } from 'react';
import './menuFavorite.scss';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { RiHeartLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function MenuFavorite() {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    const toggleMenu = () => {
        setIsActive(!isActive);
        toggleModal();
    }

    const [favorites, setFavorites] = useState([
        { id: 1, name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)', image: 'img', price: 10.99 },
        { id: 2, name: "Produto 2", image: "caminho/para/imagem2.jpg", price: 19.99 }
    ]);

    const removeFromFavorites = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
    };

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
                <IoClose className='iconClose' onClick={toggleMenu}/>       
                <div className="title">
                    <hr />
                    <h2>Meus Favoritos</h2>
                    <hr />
                </div>
                <ul className='listaFavoritos'>
                    {favorites.map((favorite, index) => (
                        <li key={index} className='productFav'>
                            <img src={favorite.image} alt={favorite.name} />
                            <div className='containerInfosFav'>
                                <MdFavorite className='iconFav' onClick={() => removeFromFavorites(index)} />
                                <h3>{favorite.name}</h3>
                                <p>{BRL.format(favorite.price)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}