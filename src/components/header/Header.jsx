/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine, RiHeartLine, RiUser3Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import MenuDep from './components/menuDep/MenuDep';
import MenuSearch from './components/searchMenu/MenuSearch';
import MenuFavorite from './components/favoriteMenu/MenuFavorite';
import AuthService from '../../services/AuthService';
import './header.scss';
import { listarCarrinho } from '../../services/UsuarioProdutoService';

export default function Header({ toggleTheme }) {
    const [shrinkHeader, setShrinkHeader] = useState(false);
    const [showFavoriteMenu, setShowFavoriteMenu] = useState(false);
    const [carrinho, setCarrinho] = useState({ produtos: [] });
    const [isLoggedIn, setIsLoggedIn] = useState(
        AuthService.isLoggedIn() || AuthService.isLoggedInWithGoogle()
    );

    useEffect(() => {
        fetchCarrinho();
        const interval = setInterval(fetchCarrinho, 100);
        return () => clearInterval(interval);
    }, []);

    const fetchCarrinho = async () => {
        if (AuthService.isLoggedIn()) {
            try {
                const response = await listarCarrinho();

                if (response && response.produtos) {
                    setCarrinho(response);
                } else {
                    setCarrinho({ produtos: [] });
                }
            } catch (error) {
                console.error('Erro ao contar a quantidade do carrinho', error);
                setCarrinho({ produtos: [] });
            }
        }
    };

    const userImg = useSelector(
        (state) => state.user.userImg || AuthService.getGoogleProfilePhoto()
    );

    const handleShowMenuFav = () => {
        setShowFavoriteMenu(true);
        const htmlTag = document.querySelector('html');
        htmlTag.classList.add('modalOpen');
    };

    const handleCloseMenuFav = () => {
        setShowFavoriteMenu(false);
        const htmlTag = document.querySelector('html');
        htmlTag.classList.remove('modalOpen');
    };

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

    useEffect(() => {
        const handleAuthChange = (loggedIn) => {
            setIsLoggedIn(loggedIn);
        };

        AuthService.subscribe(handleAuthChange);

        return () => {
            AuthService.unsubscribe(handleAuthChange);
        };
    }, []);

    return (
        <>
            <header className={`header ${shrinkHeader ? 'shrink' : ''}`}>
                <div id="headerContent"></div>
                <MenuDep
                    toggleTheme={toggleTheme}
                    showMenuFav={handleShowMenuFav}
                    className="menuDepartamento"
                />

                <Link to="/" className="logo">
                    Lemnos
                </Link>

                <nav>
                    <ul className="navegation">
                        <Link to="/" className="link">
                            Home
                        </Link>
                        <Link to="/about" className="link">
                            Sobre
                        </Link>
                    </ul>
                </nav>

                <MenuSearch />

                <nav className="menuDesktop">
                    <a href="#" onClick={handleShowMenuFav}>
                        <RiHeartLine className="favIcon" />
                    </a>
                    <Link to="/login" className="linkIcons">
                        {userImg && isLoggedIn ? (
                            <img src={userImg} alt="User" className="userImg" />
                        ) : (
                            <RiUser3Line className="userIcon" />
                        )}
                    </Link>
                    <Link to="/cart" className="linkIcons">
                        {carrinho.produtos && carrinho.produtos.length > 0 ? (
                            <>
                                <span className="spanCarrinhoLength">
                                    {carrinho.produtos.length}
                                </span>
                                <RiShoppingCartLine className="cartIcon" />
                            </>
                        ) : (
                            <RiShoppingCartLine className="cartIcon" />
                        )}
                    </Link>
                </nav>
            </header>

            {showFavoriteMenu && <MenuFavorite onClose={handleCloseMenuFav} />}
        </>
    );
}
