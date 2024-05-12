import React, { useState } from 'react';
import CustomInput from '../../../../components/inputs/Inputs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loginForm.scss';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";

export default function LoginForm({ onLogin, onCadastroClick }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    let newErrors = {};
  
    if (!form.email || !form.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      newErrors.email = 'Digite um Email válido';
    } 
  
    if (!form.password || form.password.length < 8) {
      newErrors.password = 'A Senha deve ter no mínimo 8 caracteres';
    }
  
    setErrors(newErrors);
  
    console.log('Erros:', newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      // Lógica de envio do formulário aqui
      console.log('Dados do formulário:', form);
      toast.success(`Bem Vindo de volta!`);

      onLogin(form.email, form.password);
    }
  };

  const handleCadastroClick = () => {
    onCadastroClick();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-form-container">
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
          <p>
            <CustomInput
              type="text"
              label="Email:"
              id="email"
              name="email"
              maxLength={40}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className='invalid'>{errors.email}</span>}
          </p>

          <p>
            <CustomInput
              type={showPassword ? "text" : "password"}
              label="Senha:"
              id="password"
              name="password"
              minLength={8}
              maxLength={16}
              value={form.password}
              onChange={handleChange}
            />
            {showPassword ? 
              <FaRegEyeSlash className='iconPwd' onClick={togglePasswordVisibility} /> 
            : 
              <FaRegEye className='iconPwd' onClick={togglePasswordVisibility} />
            }
            {errors.password && <span className='invalid'>{errors.password}</span>}
          </p>
        </div>

        <div className="btnLoginForm">
          <button type='submit'>Entrar</button>
          <button type='button' onClick={onCadastroClick}>Cadastre-se</button>
        </div>
      </form>
    </section>
  );
};