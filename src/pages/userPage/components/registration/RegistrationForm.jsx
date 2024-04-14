import React, { useState, useRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { CustomInput } from '../../../../components/inputs/Inputs';
import './registrationForm.scss';
import { validateEmail, validatePwd, validateCpf, formatCPF } from '../../../../utils/regex'

export function RegistrationForm({ onCadastroSuccess, handleBackToLogin }) {
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    confEmail: "",
    password: "",
    confPassword: ""
  });
  
  const [errors, setErrors] = useState({
    cpf: false,
    email: false,
    confEmail: false,
    password: false,
    confPassword: false
  });
  const [flipKey, setFlipKey] = useState(0);

  const nameRef = useRef();
  const cpfRef = useRef();
  const emailRef = useRef();
  const confEmailRef = useRef();
  const pwdRef = useRef();
  const confPwdRef = useRef();

  const [emptyValue, setEmptyValue] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'cpf') {
      newValue = formatCPF(value);
    }
    setForm(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let emptyValues = Object.values(form).some(obj => obj === "");
    setEmptyValue(emptyValues);
  
    const newErrors = {
      cpf: !validateCpf.test(form.cpf),
      email: !validateEmail.test(form.email),
      confEmail: form.email !== form.confEmail,
      password: !validatePwd.test(form.password),
      confPassword: form.password !== form.confPassword
    };
  
    setErrors(newErrors);
  
    if (!emptyValues && !Object.values(newErrors).some(error => error)) {
      // Por exemplo, enviar uma requisição POST com os dados para uma API
  
      // Após o cadastro ser concluído com sucesso, chame a função onCadastroSuccess
      onCadastroSuccess();
      handleBackToLogin();
    }
  };

  const handleBackToLoginClick = () => {
    handleBackToLogin();
    setFlipKey(prevKey => prevKey + 1);
  };

  return (    
    <Flipper flipKey={flipKey}>
      <Flipped flipId="registration-container">
        <div className="registration-form-container">
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

          <form onSubmit={(e) => {handleSubmit(e)}} className="registration">
            <h2>Crie sua Conta Lemnos</h2>
            <div className="inputsRegistration">
              <CustomInput 
                type="text" 
                reference={nameRef} 
                label="Nome Completo:"
                maxlength="40"
                name="name"
                onBlur={(e) => handleChange(e)}
              />
              { emptyValue && form["name"] ? <span className='invalide'>O Campo Nome precisa ser preenchido</span> : ""}
              <CustomInput 
                type="text" 
                reference={cpfRef} 
                label="CPF:"
                maxlength="14"
                name="cpf"
                value={form.cpf}
                onBlur={(e) => handleChange(e)}
              />
              { emptyValue && form["cpf"] ? <span className='invalide'>O Campo CPF precisa ser preenchido</span> : ""}
              { errors.cpf && <span className='invalide'>Digite um CPF válido!</span>}
              <CustomInput 
                type="text" 
                reference={emailRef} 
                label="Email:"
                maxlength="40"
                name="email"
                onBlur={(e) => handleChange(e)}
              />
              { emptyValue && form["email"] ? <span className='invalide'>O Campo Email precisa ser preenchido</span> : ""}
              { errors.email && <span className='invalide'>Digite um Email válido!</span>}
              <CustomInput 
                type="text" 
                reference={confEmailRef} 
                label="Confirme seu Email:"
                maxlength="40"
                name="confEmail"
                onBlur={(e) => handleChange(e)}
              />
              { emptyValue && form["confEmail"] ? <span className='invalide'>O Email precisa ser verificado</span> : ""}
              <CustomInput 
                type="password" 
                reference={pwdRef} 
                label="Senha:"
                maxlength="16"
                name="password"
                onBlur={(e) => handleChange(e)}
              />
              { emptyValue && form["password"] ? <span className='invalide'>O Campo Senha precisa ser preenchido</span> : ""}
              {errors.password && <span className='invalide'>Digite uma Senha válida! (Com no mínimo 8 caracteres)</span>}
              <CustomInput 
                type="password" 
                reference={confPwdRef} 
                label="Confirme sua Senha:"
                maxlength="16"
                name="confPassword"
                onBlur={(e) => handleChange(e)}
              />
              { emptyValue && form["confPassword"] ? <span className='invalide'>A Senha precisa ser verificado</span> : ""}
            </div>
            
            <div className="btnRegistrationForm">
              <button type="submit">Cadastrar</button>
              <button type='button' onClick={handleBackToLoginClick}>Voltar para Login</button>
            </div>
          </form>
        </div>
      </Flipped>
    </Flipper>
  );
};