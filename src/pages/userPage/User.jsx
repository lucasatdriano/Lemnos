import React, { useState } from 'react';
import './user.scss';
import { CustomInput } from '../../components/inputs/Inputs';
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
        <div className="userContainer">
          <div className="user">
            <img src="" alt="" />
            <h3></h3>
            <h3></h3>
          </div>
          <div className="updateInfos">
           {/* colocar inputs */}
            <button type="button"></button>
            <button type="button"></button>
          </div>
          <hr />
          <div className="configuration">
            {/* icon */}
            <h4>Ajuda e Configurações</h4>
            {/* icon */}
            <div className="confContainer">
              <Link>Home</Link>
              <Link>Quem Somos</Link>
              <p>Linguagem</p>
              {/* icon */}
              <div className="langs">
                {/* icon */}
                <p></p>
                <hr />
                {/* icon */}
                <p></p>
              </div>
            </div>
          </div>
        </div>
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