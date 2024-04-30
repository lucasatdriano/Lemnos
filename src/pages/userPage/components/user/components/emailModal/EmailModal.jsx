import React, { useState } from 'react';
import { CustomInput } from '../../../../../../components/inputs/Inputs';

export default function EmailModal({ onSave, onClose }) {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar o email
    onSave(email);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Atualizar Email</h2>
      <CustomInput
        type="text"
        label="Novo Email:"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}