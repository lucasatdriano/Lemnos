import { useState, useEffect } from 'react';
import './header.scss';
import MenuDep from './components/menuDep/MenuDep';
import MenuSearch from './components/searchMenu/MenuSearch';
import MenuFavorite from './components/favoriteMenu/MenuFavorite';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine, RiHeartLine, RiUser3Line } from 'react-icons/ri';

// eslint-disable-next-line react/prop-types
export default function Header({ toggleTheme }) {
    const [shrinkHeader, setShrinkHeader] = useState(false);
    const [showFavoriteMenu, setShowFavoriteMenu] = useState(false);

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
                    <Link to="/login">
                        <RiUser3Line className="userIcon" />
                    </Link>
                    <Link to="/cart">
                        <RiShoppingCartLine className="cartIcon" />
                    </Link>
                </nav>
            </header>

            {showFavoriteMenu && <MenuFavorite onClose={handleCloseMenuFav} />}
        </>
    );
}
