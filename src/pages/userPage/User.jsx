import React, { useState } from 'react';
import './user.scss';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { LoginForm } from './components/login/LoginForm';
import { RegistrationForm } from './components/registration/RegistrationForm';

export function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
      setUsername(username);
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  const handleRegistration = () => {
    setShowLogin(false);
  };

  const handleBackToLogin = () => {
    setShowLogin(true);
  };
  
  return (
    <>
      <div className='container'>
        {loggedIn ? (
          <div>
            <p>Você está logado como {username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className='loginScreen'>
            {showLogin ? (
              <LoginForm onLogin={handleLogin} onCadastroClick={handleRegistration} />
            ) : (
              <RegistrationForm handleBackToLogin={handleBackToLogin} />
            )}
          </div>
        )}
      </div>
    </>
  );
}