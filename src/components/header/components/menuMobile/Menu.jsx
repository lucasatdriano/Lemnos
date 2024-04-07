import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';
import { RiShoppingCartLine, RiHeartLine, RiUser3Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

export function MenuNav() {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    return (
        <>
        <nav className='menuNav'>
            <button onClick={onClick} className='menuButton'>
                <BsThreeDotsVertical  className='menuIcon' />
            </button>

            <div onClick={onClick} className={`modal ${isActive ? "active" : "inactive"}`}></div>
            <nav ref={dropDownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                <ul className='navegacao'>
                    <Link to="/" className='linkNav'>
                        <RiHeartLine className='favoriteIcon' />Favoritos
                    </Link>
                    <Link to="/login" className='linkNav'>
                        <RiUser3Line className='userIcon' />Login
                    </Link>
                    <Link to="/" className='linkNav'>
                        <RiShoppingCartLine className='cartIcon' />Carrinho
                    </Link>
                </ul>
            </nav>
        </nav>
        </>
    )
}