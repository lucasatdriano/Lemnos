import React, { useState, useRef } from 'react';
import './user.scss';
import { CustomInput } from '../../../../components/inputs/Inputs';

export default function User() {
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({
    name: "",
    cpf: "",
  });
  
  const [errors, setErrors] = useState({
    cpf: false,
  });

  const nameRef = useRef();
  const cpfRef = useRef();

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
      setUsername(username);
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };


  const handleRegistrationSuccess = (firstName) => {
    // Lógica para lidar com o cadastro bem-sucedido
    console.log("Cadastro bem-sucedido! Primeiro nome:", firstName);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "name") {
      const firstName = value.split(" ")[0];
      setUsername(firstName);
    }
  };

  return (
    <section className="userContainer">
        <div className="userData">
            <div className="user">
            <img src='{}' alt="user" />
            <h3>{username}Lucas</h3>
            </div>
            <h3 className='editUser'>Editar Perfil</h3>
        </div>

        <hr className='lineUser' />

        <div className="updateInfos">
            <div className="updateInputs">
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
                value={form.cpf}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                onChange={(e) => handleChange(e)}
                />
                {errors.cpf && <span className='invalid'>Digite um CPF válido!</span>}
            </p>
            </div>
            <button type="button">Alterar Email</button>
            <button type="button">Alterar Senha</button>
        </div>

        <hr />

        <div className="typeUser">
            <div className="logout">
            <button type='button' onClick={handleLogout}>Logout {/* icon */}</button>
            </div>
            <div className='adminPage'>
            <button type="button">Sou Admin</button>
            </div>
        </div>
    </section>
  );
}