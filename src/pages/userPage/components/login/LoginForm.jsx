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
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleLogin = (e) => {
    e.preventDefault(); // Evitar que o formulário seja submetido
    onLogin(form.email, form.password); // Acesso aos valores do estado form
  };

  const handleCadastroClick = () => {
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
            name="email"
            value={form.email}
            onBlur={(e) => handleChange(e)}
          />
          <CustomInput 
            type="password" 
            reference={pwdRef} 
            label="Senha:"
            name="password"
            value={form.password}
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