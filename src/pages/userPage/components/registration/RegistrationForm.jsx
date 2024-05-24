import React, { useState } from 'react';
import CustomInput from '../../../../components/inputs/customInput/Inputs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './registrationForm.scss';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function RegistrationForm({ onCadastroSuccess, handleBackToLogin }) {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    confEmail: '',
    password: '',
    confPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedForm = {
      ...form,
    };

    const errors = {};

    if (!form.name) {
      errors.name = 'O campo Nome é obrigatório';   
    } else if (/\d/.test(form.name)) {
      errors.name = 'O campo Nome não pode conter números';
    }

   const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    if (!form.cpf.match(cpfRegex)) {
      errors.cpf = 'Digite um CPF válido';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || !form.email.match(emailRegex)) {
      errors.email = 'Digite um Email válido';
    } 

    if (form.email !== form.confEmail) {
      errors.confEmail = 'Os Emails devem ser iguais';
    }

    if (!form.password || form.password.length < 8) {
      errors.password = 'A Senha deve ter no mínimo 8 caracteres';
    }

    if (!form.confPassword) {
      errors.confPassword = 'Confirmar Senha é obrigatório';
    } else if (form.password !== form.confPassword) {
      errors.confPassword = 'As Senhas devem ser iguais';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      delete formattedForm.confPassword;
      delete formattedForm.confEmail;
      onCadastroSuccess(formattedForm);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  return (    
    <section className="registration-form-container">
      <div className="loginCredencial">
        <h2>Entre com sua Conta do Google</h2>
        <div className="btnCredencials">  
          <button><FcGoogle className='iconGoogle'/>Entrar com Google</button>
        </div>
      </div>

      <div className='containerSeparate'>
        <hr />
        <h3>OU</h3>
        <hr />
      </div>

      <form className="registration" onSubmit={handleSubmit}>
        <h2>Crie sua Conta Lemnos</h2>
        <div className="inputsRegistration">
          <p>
            <CustomInput
              type="text"
              label="Nome Completo:"
              id="name"
              name="name"
              maxLength={40}
              minLength={5}
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className='invalid'>{errors.name}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="CPF:"
              id="cpf"
              name="cpf"
              maxLength={14}
              minLength={14}
              value={form.cpf}
              mask="CPF"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              onChange={handleChange}
            />
            {errors.cpf && <span className='invalid'>{errors.cpf}</span>}
          </p>

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
              type="text"
              label="Confirme seu Email:"
              id="confEmail"
              name="confEmail"
              maxLength={40}
              value={form.confEmail}
              onChange={handleChange}
            />
            {errors.confEmail && <span className='invalid'>{errors.confEmail}</span>}
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

          <p>
            <CustomInput
              type={showConfPassword ? "text" : "password"}
              label="Confirme sua Senha:"
              id="confPassword"
              name="confPassword"
              maxLength={16}
              value={form.confPassword}
              onChange={handleChange}
            />
            {showConfPassword ? 
              <FaRegEyeSlash className='iconPwd' onClick={toggleConfPasswordVisibility} /> 
            : 
              <FaRegEye className='iconPwd' onClick={toggleConfPasswordVisibility} />
            }
            {errors.confPassword && <span className='invalid'>{errors.confPassword}</span>}
          </p>
        </div>
        
        <div className="btnRegistrationForm">
          <button type="submit">Cadastrar</button>
          <button type='button' onClick={handleBackToLogin}>Voltar para Login</button>
        </div>
      </form>
    </section>
  );
};