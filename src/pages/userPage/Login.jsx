import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';
import LoginForm from './components/login/LoginForm';
import RegistrationForm from './components/registration/RegistrationForm';
import User from './components/user/User';
import { cadastrarUsuario } from '../../services/ApiService'; 
import AuthService from '../../services/authService';

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  useEffect(() => {
    if (AuthService.isLoggedIn()) {
      setLoggedIn(true);
    }
  }, []);

  const handleRegistrationSuccess = async (form) => {
    const firstName = form.name.split(" ")[0];

    form.cpf = form.cpf.substring(0, 3) + form.cpf.substring(4, 7) + form.cpf.substring(8, 11) + form.cpf.substring(12);

    const formattedForm = {
      name: form.name,
      cpf: form.cpf,
      email: form.email,
      password: form.password,
    };

    try {
      await cadastrarUsuario(formattedForm);
      toast.success(`Cadastro realizado, ${firstName}!!`);
      handleBackToLogin();
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const handleLogin = (token) => {
    AuthService.login(token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setLoggedIn(false);
  };

  const handleRegistrationForm = () => {
    setShowLoginForm(false);
  };

  const handleBackToLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <main className='container'>
      {loggedIn ? (
        <User onLogout={handleLogout} />
      ) : (
        <div className='loginScreen'>
          {showLoginForm ? (
            <LoginForm onLogin={handleLogin} onCadastroClick={handleRegistrationForm} />
          ) : (
            <RegistrationForm onCadastroSuccess={handleRegistrationSuccess} handleBackToLogin={handleBackToLogin} />
          )}
        </div>
      )}
    </main>
  );
}
