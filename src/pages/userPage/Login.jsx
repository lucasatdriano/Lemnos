import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';
import LoginForm from './components/login/LoginForm';
import RegistrationForm from './components/registration/RegistrationForm';
import User from './components/user/User';
import cadastrarCliente from '../../services/ApiService'; 

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm , setShowLoginForm] = useState(true);
  
  const handleRegistrationSuccess = (form) => {
    const firstName = form.name.split(" ")[0];
    const formattedForm = {
      name: form.name,
      cpf: form.cpf,
      email: form.email,
      password: form.password,
    };

    cadastrarCliente(formattedForm)
      .then(() => {
        toast.success('Cadastrado realizado!!', firstName);
        handleBackToLogin();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error);
        toast.error('Erro ao cadastrar. Por favor, tente novamente.');
      });
  };
  
  const handleLogin = () => {
    // api
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // api
    setLoggedIn(false);
  };

  const handleRegistration = () => {
    setShowLoginForm(false);
  };

  const handleBackToLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <main className='container'>
      {loggedIn ? (
        <User onLogout={handleLogout}/>
      ) : (
        <div className='loginScreen'>
          {showLoginForm ? (
            <LoginForm onLogin={handleLogin} onCadastroClick={handleRegistration} />
          ) : (
            <RegistrationForm onCadastroSuccess={handleRegistrationSuccess}  handleBackToLogin={handleBackToLogin} />
          )}
        </div>
      )}
    </main>
  );
}