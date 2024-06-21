import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';
import BackToTopButton from './components/backToTop/BackToTop';
import Footer from './components/footer/Footer';
import AnimatedRoutes from './AnimatedRoutes';
import { AuthProvider } from './AuthProvider';
import { NavigationProvider } from './NavigationProvider';

export default function App() {
    const [theme, setTheme] = useState('light');
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const toggleTheme = () => {
        localStorage.setItem('theme', theme);
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <AuthProvider>
            <NavigationProvider>
                <section className={`${localStorage.getItem('theme')}`}>
                    <Header toggleTheme={toggleTheme} />
                    <AnimatedRoutes />
                    <BackToTopButton />
                    <ToastContainer position="bottom-right" />
                    <Footer />
                </section>
            </NavigationProvider>
        </AuthProvider>
    );
}
