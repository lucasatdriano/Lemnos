/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { login, sendFirebaseToken } from '../../../../services/ApiService';
import { sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthService from '../../../../services/authService';
import { auth, googleProvider } from '../../../../services/firebaseConfig';
import CustomInput from '../../../../components/inputs/customInput/Inputs';
import './loginForm.scss';

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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    let newErrors = {};
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || !form.email.match(emailRegex)) {
      newErrors.email = 'Digite um Email válido';
    } 
  
    if (!form.password) {
      newErrors.password = 'A Senha é obrigatória';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const loginSuccess = await login(form);

        if(loginSuccess) {
          onLogin({ email: form.email, password: form.password });
          toast.success("Usuário logado");
        } else {
          toast.error("Usuário não cadastrado");
        }
      } catch (error) {
        console.error('Error during login:', error.code, error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = result.user.accessToken;
      const resultLogin = await sendFirebaseToken(token);

      if(resultLogin){
        onLogin({ email: result.user.email, password: result.user.password });
      }
    } catch (error) {
      console.error('Error during Google login:', error.code, error.message);
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
          <button onClick={handleGoogleLogin}><FcGoogle className='iconGoogle'/>Entrar com Google</button>
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
          <button type='button' onClick={handleCadastroClick}>Cadastre-se</button>
        </div>
      </form>
    </section>
  );
}