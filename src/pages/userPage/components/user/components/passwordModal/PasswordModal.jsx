import React, { useState } from 'react';
import { CustomInput } from '../../../../../../components/inputs/Inputs';

export default function PasswordModal({ onSave, onClose }) {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar a senha
    onSave(password);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Atualizar Senha</h2>
      <CustomInput
        type="password"
        label="Nova Senha:"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
