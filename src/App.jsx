import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './global.scss';
import { Header } from './components/header/Header';
import { BackToTopButton } from './components/backToTop/BackToTop';
import { Footer } from './components/footer/Footer';

export function App() {
  const [theme, setTheme] = useState('light');
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <section className={`${theme}`}>
        <Header toggleTheme={toggleTheme} />
        <Outlet />
        <BackToTopButton />
        <Footer />
      </section>
    </>
  );
}