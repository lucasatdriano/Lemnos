import { useState } from 'react';
import CustomInput from '../../../../components/inputs/customInput/Inputs';
import './loginForm.scss';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { auth, googleProvider, facebookProvider } from '../../../../services/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { sendFirebaseToken } from '../../../../services/ApiService';
import AuthService from '../../../../services/authService';

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
  
    if (!form.password || form.password.length < 8) {
      newErrors.password = 'A Senha deve ter no mínimo 8 caracteres';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;
        console.log('Login successful:', user);
        onLogin({ email: form.email, password: form.password });
      } catch (error) {
        console.error('Error during login:', error.code, error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const tokenServer = await sendFirebaseToken(user.accessToken);
      await AuthService.loginServer(tokenServer);
      console.log('Google login successful:', user);
      onLogin({ email: localStorage.getItem('token').email, password: null });
    } catch (error) {
      console.error('Error during Google login:', error.code, error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log('Facebook login successful:', user);
      onLogin({ email: user.email, password: null });
    } catch (error) {
      console.error('Error during Facebook login:', error.code, error.message);
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
        <h2>Entre com sua Conta</h2>
        <div className="btnCredencials">  
          <button onClick={handleGoogleLogin}><FcGoogle className='iconGoogle'/>Entrar com Google</button>
          <button className='btnFace' onClick={handleFacebookLogin}><FaFacebook className='iconFacebook'/>Entrar com Facebook</button>
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
          <button type='button' onClick={handleCadastroClick}>Cadastre-se</button>
        </div>
      </form>
    </section>
  );
}