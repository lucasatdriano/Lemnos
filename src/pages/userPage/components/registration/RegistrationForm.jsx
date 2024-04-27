import React, { useState, useRef } from 'react';
import { CustomInput } from '../../../../components/inputs/Inputs';
import './registrationForm.scss';
import { validateEmail, validatePwd, validateCpf, formatCPF } from '../../../../utils/regex';

export function RegistrationForm({ onCadastroSuccess, handleBackToLogin }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    setForm(prevState => ({ ...prevState, [name]: newValue }));
  
    const isValid = name === 'cpf' ? validateCpf.test(newValue) : validateEmail.test(form.email);
  
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: !isValid,
    }));
  };

  const handleCpfChange = (e) => {
    let formattedCpf = e.target.value.replace(/\D/g, '');
    if (formattedCpf.length > 3) {
      formattedCpf = formattedCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } 
    setCpf(formattedCpf);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {
      cpf: !validateCpf.test(form.cpf),
      email: !validateEmail.test(form.email),
      confEmail: form.email !== form.confEmail,
      password: !validatePwd.test(form.password),
      confPassword: form.password !== form.confPassword
    };
  
    setErrors(newErrors);
  
    const hasEmptyValues = Object.values(form).some(obj => obj === "");
    const hasErrors = Object.values(newErrors).some(error => error);
  
    if (!hasEmptyValues && !hasErrors) {
      try {
        await fetch('url-da-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
  
        onCadastroSuccess();
        handleBackToLogin();
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    }
  };

  const handleBackToLoginClick = () => {
    handleBackToLogin();
  };

  return (    
    <section className="registration-form-container">
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

      <form onSubmit={handleSubmit} className="registration">
        <h2>Crie sua Conta Lemnos</h2>
        <div className="inputsRegistration">
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
              onChange={handleCpfChange}
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
          <p>
            <CustomInput
              type="password"
              reference={pwdRef}
              label="Senha:"
              maxLength="16"
              id="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            {errors.password && <span className='invalid'>Digite uma Senha válida! (Com no mínimo 8 caracteres)</span>}
          </p>
          <p>
            <CustomInput
              type="password"
              reference={confPwdRef}
              label="Confirme sua Senha:"
              maxLength="16"
              id="confPassword"
              name="confPassword"
              onChange={(e) => handleChange(e)}
            />
            {errors.confPassword && <span className='invalid'>A Senha precisa ser verificada</span>}
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