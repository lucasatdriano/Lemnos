import React, { useState } from 'react';
import './registrationForm.scss';

export function RegistrationForm({ onCadastroSuccess }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastrado, setCadastrado] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Aqui você pode adicionar a lógica para enviar os dados do cadastro para o servidor
//     // Por exemplo, enviar uma requisição POST com os dados para uma API

//     // Após o cadastro ser concluído com sucesso, chame a função onCadastroSuccess
//      setCadastrado(true);
//      onCadastroSuccess();
//   };

  const handleBackToLoginClick = () => {
    // Chama a função para voltar para a tela de login
    onBackToLogin();
  };

  return (
    <div className={`registration-form-container ${showRegistration ? 'show-registration' : ''}`}>
      <h2>Tela de Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <button onClick={handleBackToLoginClick}>Voltar para Login</button>
    </div>
  );
};