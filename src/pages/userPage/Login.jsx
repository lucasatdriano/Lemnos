import React, { useState, useRef } from 'react';
import './login.scss';
import LoginForm from './components/login/LoginForm';
import RegistrationForm from './components/registration/RegistrationForm';
import User from './components/user/User';

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

  const handleRegistrationSuccess = (firstName) => {
    // Lógica para lidar com o cadastro bem-sucedido
    console.log("Cadastro bem-sucedido! Primeiro nome:", firstName);
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
    <main className='container'>
       <User />
      {loggedIn ? (
        <></>
        // <User />
      ) : (
        <div className='loginScreen'>
          {showLogin ? (
            <LoginForm onLogin={handleLogin} onCadastroClick={handleRegistration} />
          ) : (
            <RegistrationForm handleRegistrationSuccess={handleRegistrationSuccess}  handleBackToLogin={handleBackToLogin} />
          )}
        </div>
      )}
    </main>
  );
}