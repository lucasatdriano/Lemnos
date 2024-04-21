import React, { useState } from 'react';
import './user.scss';
import { Link } from 'react-router-dom';
import { CustomInput } from '../../components/inputs/Inputs';
import { LoginForm } from './components/login/LoginForm';
import { RegistrationForm } from './components/registration/RegistrationForm';
import { RiMenuUnfoldLine, RiCloseFill, RiSunLine, RiMoonLine } from "react-icons/ri";

export function Login({ toggleTheme }) {
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
    <main className='container'>
      <section className="userContainer">

        <div className="userData">
          <div className="user">
            <img src="" alt="user" />
            <h3>Lucas</h3>
          </div>
          <h3>Editar Perfil</h3>
        </div>

        <div className="updateInfos">
          {/* colocar inputs */}
          <button type="button">Adicionar Endereço</button>
          <button type="button">Alterar Senha</button>
        </div>

        <hr />

        <div className="configuration">
          {/* icon */}
          <h4>Ajuda e Configurações</h4>
          {/* icon */}

          <div className="confContainer">
            <Link to="/">Home</Link>
            <Link to="/about">Quem Somos</Link>

            {/*<p>Linguagem</p>
            icon

            <div className="langs">
              <div className="portuguese">
                icon 
                <p>Português</p>
              </div>

              <hr />
              <div className="english">
                icon 
                <p>Inglês</p>
              </div>
            </div> */}

            <div className='toggleTheme'>
              <input 
                type="checkbox" 
                className="checkbox" 
                onClick={toggleTheme} 
                name="chk" 
              />
              <label htmlFor="chk" className="label">
                <RiSunLine className='iconSun'/>
                <RiMoonLine className='iconMoon'/>
                <div className="ball"></div>
              </label>
            </div>

          </div>
        </div>
        <button type="button">Sou Admin</button>
      </section>
      {loggedIn ? (
        <div>
          <p>Você está logado como {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='loginScreen'>
          {showLogin ? (
            // <></>
            <LoginForm onLogin={handleLogin} onCadastroClick={handleRegistration} />
          ) : (
            <RegistrationForm handleBackToLogin={handleBackToLogin} />
          )}
        </div>
      )}
    </main>
  );
}