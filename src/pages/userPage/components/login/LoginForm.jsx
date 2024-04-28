import React, { useState, useRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { CustomInput } from '../../../../components/inputs/Inputs';
import './loginForm.scss';

export default function LoginForm({ onLogin, onCadastroClick }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [flipKey, setFlipKey] = useState(0);

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
    setFlipKey(prevKey => prevKey + 1);
  };

  return (
    <Flipper flipKey={flipKey}>
      <Flipped flipId="login-container">
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
                type="text" 
                reference={emailRef} 
                label="Email:"
                id="email"
                name="email"
                value={form.email}
                onBlur={(e) => handleChange(e)}
              />
              <CustomInput 
                type="password" 
                reference={pwdRef} 
                label="Senha:"
                id="password"
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
      </Flipped>
    </Flipper>
  );
};