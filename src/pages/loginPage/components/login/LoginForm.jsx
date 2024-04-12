import React, { useState, useRef } from 'react';
import { CustomInput } from '../../../../components/inputs/Inputs';
import './loginForm.scss';

export function LoginForm({ onLogin, onCadastroClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const pwdRef = useRef();

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para realizar o login
    onLogin(username, password);
  };

  // const handleCadastroClick = () => {
  //   // Chama a função para mudar para a tela de cadastro
  //   setShowRegistration(true);
  //   onCadastroClick();
  // };

  return (
    <section id="login">
      <div className="login-form-container">
        <div className="loginCredencial">
          <h2>Entre com suas Redes Sociais</h2>
          <div className="btnCredencials">  
            <button></button>
          </div>
        </div>

        <div className='containerSeparate'>
          <hr />
          <h3>OU</h3>
          <hr />
        </div>

        <form action="" className="login">
          <h2>Digite seu Email e sua Senha</h2>
          <div className="inputsLogin">
            <CustomInput type="email" reference={emailRef} label="Email:"/>
            <CustomInput type="password" reference={pwdRef} label="Senha:"/>
          </div>

          <div className="btnLoginForm">
            <button onClick={handleLogin}>Entrar</button>
            <button>Cadastre-se</button>
          </div>
        </form>
      </div>
    </section>
  );
};