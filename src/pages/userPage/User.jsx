import React, { useState, useRef } from 'react';
import './user.scss';
import { CustomInput } from '../../components/inputs/Inputs';
import { LoginForm } from './components/login/LoginForm';
import { RegistrationForm } from './components/registration/RegistrationForm';

export function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [cpf, setCpf] = useState('');
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    confEmail: "",
    password: "",
    confPassword: "",
  });
  
  const [errors, setErrors] = useState({
    cpf: false,
    email: false,
    confEmail: false,
    password: false,
    confPassword: false,
  });

  const nameRef = useRef();
  const cpfRef = useRef();
  const emailRef = useRef();
  const confEmailRef = useRef();
  const pwdRef = useRef();
  const confPwdRef = useRef();

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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <main className='container'>
      <section className="userContainer">
        <div className="userData">
          <div className="user">
            <img src='{}' alt="user" />
            <h3>{username}</h3>
          </div>
          <h3 className='editUser'>Editar Perfil</h3>
        </div>

        <hr />

        <div className="updateInfos">
          <div className="updateInputs">
            <p>
              <CustomInput
                type="text"
                reference={nameRef}
                label="Nome Completo:"
                maxLength="40"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </p>
            <p>
              <CustomInput
                type="text"
                reference={cpfRef}
                label="CPF:"
                maxLength={14}
                id="cpf"
                name="cpf"
                value={cpf}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                onChange={(e) => handleChange(e)}
              />
              {errors.cpf && <span className='invalid'>Digite um CPF válido!</span>}
            </p>
            <p>
              <CustomInput
                type="text"
                reference={emailRef}
                label="Email:"
                maxLength="40"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              {errors.email && <span className='invalid'>Digite um Email válido!</span>}
            </p>
            <p>
              <CustomInput
                type="text"
                reference={confEmailRef}
                label="Confirme seu Email:"
                maxLength="40"
                id="confEmail"
                name="confEmail"
                onChange={(e) => handleChange(e)}
              />
              {errors.confEmail && <span className='invalid'>O Email precisa ser verificado</span>}
            </p>
          </div>
          <button type="button">Alterar Email</button>
          <button type="button">Alterar Senha</button>
        </div>

        <hr />

        <div className="typeUser">
          <div className="logout">
            <button type='button' onClick={handleLogout}>Logout {/* icon */}</button>
          </div>
          <div className='adminPage'>
            <button type="button">Sou Admin</button>
          </div>
        </div>
      </section>
      {loggedIn ? (
        <div>
          <p>Você está logado como {username}</p>
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