import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './menuFavorite.scss';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { IoClose } from "react-icons/io5";

export default function MenuFavorite({ onClose }) {
    const navigate = useNavigate();
    const dropDownRef = useRef(null);
    const [favorites, setFavorites] = useState([
        { id: 1, name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)', image: 'img', price: 10.99 },
        { id: 2, name: "Produto 2", image: "caminho/para/imagem2.jpg", price: 19.99 }
    ]);
    const [removingIndex, setRemovingIndex] = useState(null);

    const removeFromFavorites = (index) => {
        setRemovingIndex(index);
        setTimeout(() => {
            const updatedFavorites = [...favorites];
            updatedFavorites.splice(index, 1);
            setFavorites(updatedFavorites);
            setRemovingIndex(null);
        }, 250);
    };

    const handleFavorites = (index) => {
        removeFromFavorites(index);
        onClose();
    };

    return (
        <div onClick={onClose} className='modal'>
            <div className='menuFavorite' onClick={(e) => e.stopPropagation()}>
                <IoClose className='iconClose' onClick={onClose}/>       
                <div className="title">
                    <hr />
                    <h2>Meus Favoritos</h2>
                    <hr />
                </div>
                {favorites.length === 0 ? (
                    <div className="emptyFavMessage">
                        <h2 className='textEmpty'>Você não tem nenhum item adicionado aos Favoritos.</h2>
                        <button className='btnBack' onClick={(e) => {navigate('/productFilter'); onClose();}}>Adicione itens aos Favoritos</button>
                    </div>
                ) : (
                    <ul className='listaFavoritos'>
                        {favorites.map((favorite, index) => (
                            <li key={index} className='productFav' onClick={() => handleFavorites(index)}>
                                <img src={favorite.image} alt={favorite.name} />
                                <div className='containerInfosFav'>
                                    {removingIndex === index ? (
                                        <MdFavoriteBorder className='iconFav' />
                                    ) : (
                                        <MdFavorite className='iconFav' onClick={(e) => {removeFromFavorites(index); e.stopPropagation();}} />
                                    )}
                                    <h3>{favorite.name}</h3>
                                    <p>{favorite.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
