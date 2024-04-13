import React, { useState } from 'react';
import './registrationForm.scss';
import { validateEmail, validatePwd, validateCpf, formatCPF } from '../../../../utils/regex'

export function RegistrationForm({ onCadastroSuccess }) {
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    confEmail: "",
    password: "",
    confPassword: ""
  });

  const [cadastrado, setCadastrado] = useState(false);
  
  const [errors, setErrors] = useState({
    cpf: false,
    email: false,
    password: false
  });

  const nameRef = useRef();
  const cpfRef = useRef()
  const emailRef = useRef();
  const pwdRef = useRef();

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
      password: !validatePwd.test(form.password)
    };
  
    setErrors(newErrors);
  
    if (!emptyValues && !newErrors.cpf && !newErrors.email && !newErrors.password) {
      // Por exemplo, enviar uma requisição POST com os dados para uma API
  
      // Após o cadastro ser concluído com sucesso, chame a função onCadastroSuccess
      setCadastrado(true);
      onCadastroSuccess();
    }
  };

  const handleBackToLoginClick = () => {
  };

  return (
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
        <h2>Digite seu Email e sua Senha</h2>
        <div className="inputsRegistration">
          <CustomInput 
            type="text" 
            reference={nameRef} 
            label="Nome Completo:"
            name="name"
            onBlur={(e) => handleChange(e)}
          />
          { emptyValue && form["name"] ? <span className='invalide'>O Campo Nome precisa ser preenchido</span> : ""}
          <CustomInput 
            type="text" 
            reference={cpfRef} 
            label="CPF:"
            name="cpf"
            value={form.cpf}
            onBlur={(e) => handleChange(e)}
          />
          { emptyValue && form["cpf"] ? <span className='invalide'>O Campo CPF precisa ser preenchido</span> : ""}
          { errors.cpf && <span className='invalide'>Digite um CPF válido!</span>}
          <CustomInput 
            type="email" 
            reference={emailRef} 
            label="Email:"
            name="email"
            onBlur={(e) => handleChange(e)}
          />
          { emptyValue && form["email"] ? <span className='invalide'>O Campo Email precisa ser preenchido</span> : ""}
          { errors.email && <span className='invalide'>Digite um Email válido!</span>}
          <CustomInput 
            type="email" 
            reference={confEmailRef} 
            label="Confirme seu Email:"
            name="confEmail"
            onBlur={(e) => handleChange(e)}
          />
          { emptyValue && form["confEmail"] ? <span className='invalide'>O Email precisa ser verificado</span> : ""}
          <CustomInput 
            type="password" 
            reference={pwdRef} 
            label="Senha:"
            name="password"
            onBlur={(e) => handleChange(e)}
          />
          { emptyValue && form["password"] ? <span className='invalide'>O Campo Senha precisa ser preenchido</span> : ""}
          {errors.password && <span className='invalide'>Digite uma Senha válida! (Com no mínimo 8 caracteres)</span>}
          <CustomInput 
            type="password" 
            reference={confPwdRef} 
            label="Confirme sua Senha:"
            name="confPassword"
            onBlur={(e) => handleChange(e)}
          />
          { emptyValue && form["confPassword"] ? <span className='invalide'>A Senha precisa ser verificado</span> : ""}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <button type='button' onClick={handleBackToLoginClick}>Voltar para Login</button>
    </div>
  );
};