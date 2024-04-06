import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './global.scss';
import { Header } from './components/header/Header';
import { BackToTopButton } from './components/backToTop/BackToTop';
import { Footer } from './components/footer/Footer';

export function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <body className={`${theme}`}>
        <Header toggleTheme={toggleTheme} />
        <Outlet />
        <BackToTopButton />
        <Footer />
      </body>
    </>
  );
}