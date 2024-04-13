import React, { useState } from 'react';
import { RiErrorWarningLine } from "react-icons/ri";
import { FaExclamation } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/Header'
import './notFound.scss';

export function NotFound() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <body className={`${theme}`}>
        <Header toggleTheme={toggleTheme}/>

        <main className='bgScreen'>
          <div className="notFound">
              <h1>404</h1>
              <FaExclamation className="iconError"/>
          </div>
          <div className="desc">
              <h3>Página não encontrada</h3>
              <p>A página que você procura não existe ou não está disponível no momento.</p>
          </div>
          <button className='btnHome' onClick={() => navigate('/')}>Voltar para o início</button>
        </main>
    </body>
  );
}