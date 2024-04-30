import React, { useState, useRef } from 'react';
import './user.scss';
import { CustomInput } from '../../../../components/inputs/Inputs';
// import EmailModal from './components/emailModal/emailModal';
// import PasswordModal from 'components/passwordModal/PasswordModal';
import UserImg from '../../../../assets/imgUser.svg';

export default function User({ onLogout }) {
  const [admin, setAdmin] = useState(false);
  const [form, setForm] = useState({
    name: "Lucas",
    cpf: "123.456.789-00",
  });
  
  const [errors, setErrors] = useState({
    cpf: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // if (name === "name") {
    //   const firstName = value.split(" ")[0];
    //   setUsername(firstName);
    // }
  };

  const handleEditProfile = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };

  const handleEmailSave = (newEmail) => {
    // Lógica para salvar o email
    setForm(prevForm => ({
      ...prevForm,
      email: newEmail
    }));
    console.log("Novo email:", newEmail);
  };

  const handlePasswordSave = (newPassword) => {
    // Lógica para salvar a senha
    console.log("Nova senha:", newPassword);
  };

  return (
    <section className="userContainer">
        <div className="userData">
            <div className="user">
            <img src={UserImg} alt="user" />
            <h3>{form.name}</h3>
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
            <button type="button" onClick={() => setShowEmailModal(true)} disabled={!isEditing}>Alterar Email</button>
            <button type="button" onClick={() => setShowPasswordModal(true)} disabled={!isEditing}>Alterar Senha</button>
        </div>

        <hr />


        <div className="typeUser">
          {setAdmin ? (
            <div className="logout">
              <button type='button' onClick={onLogout}>Logout {/* icon */}</button>
            </div>
          ) : (
            <>
              <div className="logout">
                <button type='button' onClick={onLogout}>Logout {/* icon */}</button>
              </div>
              <div className='adminPage'>
                <button type="button">Sou Admin</button>
              </div>
            </>
          )}
        </div>

        {showEmailModal && (
          <EmailModal onSave={handleEmailSave} onClose={() => setShowEmailModal(false)} />
        )}

        {showPasswordModal && (
          <PasswordModal onSave={handlePasswordSave} onClose={() => setShowPasswordModal(false)} />
        )}
    </section>
  );
}