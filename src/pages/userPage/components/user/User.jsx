import React, { useState } from 'react';
import './user.scss';
import { CustomInput } from '../../../../components/inputs/Inputs';
import EmailModal from './components/modals/EmailModal';
import PasswordModal from './components/modals/PasswordModal';
import HistoricoCompras from './components/history/History';
import UserImg from '../../../../assets/imgUser.svg';
import { MdLogout } from "react-icons/md";

export default function User({ onLogout }) {
  const [admin, setAdmin] = useState(true);
  const [form, setForm] = useState({
    name: "Lucas Adriano Tavares Gonçalves",
    cpf: "123.456.789-00",
    email: '',
    confEmail: '',
    password: '',
    confPassword: '',
  });
  const [username, setUsername] = useState(form.name.split(" ")[0]);
  
  const [errors, setErrors] = useState({
    cpf: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const historicoExemplo = [
    { id: 1, produto: 'Camiseta', preco: 25.99 },
    { id: 2, produto: 'Calça Jeans', produto2: 'Tênis', preco: 39.99 },
    { id: 3, produto: 'Tênis', preco: 49.99 },
    { id: 4, produto: 'Cinto', preco: 12.99 },
    { id: 5, produto: 'Cinto', preco: 12.99 },
    { id: 6, produto: 'Tênis', preco: 12.99 },
    { id: 7, produto: 'Meia', produto2: 'Camisa', preco: 12.99 },    
    { id: 8, produto: 'Sapato', produto2: 'Blusa', preco: 12.99 },
    { id: 9, produto: 'Cinto', produto2: 'Tênis', preco: 12.99 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "name") {
      const firstName = value.split(" ")[0];
      setUsername(firstName);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };

  const handleSaveChanges = () => {
    console.log('Dados atualizados:', form);
  };

  return (
    <section className="userContainer">
        <div className="userData">
            <div className="user">
            <img src={UserImg} alt="user" />
            <h3>{username}</h3>
            </div>
            <h3 className='editUser' onClick={handleEditProfile}>Editar Perfil</h3>
        </div>

        <hr className='lineUser' />

        <div className="updateInfos">
          <div className="updateInputs">
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
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
              {errors.cpf && <span className='invalid'>{errors.cpf}</span>}
            </p>
          </div>
          <div className="containerButtons">
            <div className='saveButton'>
              <button type="button" onClick={handleSaveChanges} disabled={!isEditing}>Salvar Alterações</button>
            </div>
            <div className='updateButtons'>
              <button type="button" onClick={() => setShowEmailModal(true)} disabled={!isEditing}>Alterar Email</button>
              <button type="button" onClick={() => setShowPasswordModal(true)} disabled={!isEditing}>Alterar Senha</button>
            </div>
          </div>
        </div>

        <hr />

        <div className='containerHistory'>
          <HistoricoCompras compras={historicoExemplo}/>
        </div>

        <div className="typeUser">
          {admin ? (
            <div className="logout">
              <button type='button' onClick={onLogout}>Logout <MdLogout className='icon'/></button>
            </div>
          ) : (
            <>
              <div className="logout">
                <button type='button' onClick={onLogout}>Logout <MdLogout className='icon'/></button>
              </div>
              <div className='adminPage'>
                <button type="button">Sou Admin</button>
              </div>
            </>
          )}
        </div>

        {showEmailModal && (
          <EmailModal onSave={handleSaveEmail} onClose={() => setShowEmailModal(false)} />
        )}

        {showPasswordModal && (
          <PasswordModal onSave={handleSavePassword} onClose={() => setShowPasswordModal(false)} />
        )}
    </section>
  );
}