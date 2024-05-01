import React, { useState } from 'react';
import { CustomInput } from '../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";

export default function PasswordModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    password: '',
    confPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  const handleSave = () => {
    e.preventDefault();

    const errors = {};
    
    if (!form.password || form.password.length < 8) {
      errors.password = 'A Senha deve ter no mínimo 8 caracteres';
    }

    if (form.password !== form.confPassword) {
      errors.confPassword = 'As Senhas devem ser iguais';
    }

    setErrors(errors);

    console.log('Erros:', errors);

    if (Object.keys(errors).length === 0) {
      // Lógica de envio do formulário aqui
      console.log('Dados do formulário:', form);
      onSave(form.password);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal">
        <h2>Atualizar Senha</h2>
          <p>
            <CustomInput
              type="password"
              label="Senha:"
              id="password"
              name="password"
              minLength={8}
              maxLength={16}
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className='invalid'>{errors.password}</span>}
          </p>

          <p>
            <CustomInput
              type="password"
              label="Confirme sua Senha:"
              id="confPassword"
              name="confPassword"
              maxLength={16}
              value={form.confPassword}
              onChange={handleChange}
            />
            {errors.confPassword && <span className='invalid'>{errors.confPassword}</span>}
          </p>
        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}
