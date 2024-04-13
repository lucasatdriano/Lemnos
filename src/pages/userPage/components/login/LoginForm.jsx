import React, { useState, useRef } from 'react';
import { CustomInput } from '../../../../components/inputs/Inputs';
import './loginForm.scss';


export function LoginForm({ onLogin, onCadastroClick }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef();
  const pwdRef = useRef();

  const handleChange = (e) => {
    e.target.name;
    e.target.value;
    let newProp = form;
    newProp[e.target.name] = e.target.value;
    setForm({...newProp})
  }

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para realizar o login
    onLogin(email, password);
  };

  const handleCadastroClick = () => {
    // Chama a função para mudar para a tela de cadastro
    onCadastroClick();
  };

  return (
    <div className="login-form-container">
      <div className="loginCredencial">
        <h2>Entre com sua Conta do Google</h2>
        <div className="btnCredencials">  
          <button></button>
        </div>
      </div>

      <div className='containerSeparate'>
        <hr />
        <h3>OU</h3>
        <hr />
      </div>

      <form onSubmit={handleLogin} className="login">
        <h2>Digite seu Email e sua Senha</h2>
        <div className="inputsLogin">

          <CustomInput 
            type="email" 
            reference={emailRef} 
            label="Email:"
            onBlur={(e) => handleChange(e)}
          />
          <CustomInput 
            type="password" 
            reference={pwdRef} 
            label="Senha:"
            onBlur={(e) => handleChange(e)}
          />
        </div>

        <div className="btnLoginForm">
          <button type='submit'>Entrar</button>
          <button type='button' onClick={onCadastroClick}>Cadastre-se</button>
        </div>
      </form>
    </div>
  );
};