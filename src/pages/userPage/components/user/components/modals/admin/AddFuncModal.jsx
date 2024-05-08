import React, { useState } from 'react';
import { CustomInput } from '../../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";

export default function FuncionarioModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    salario: '',
    departamento: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};
    // Validação dos campos aqui, por exemplo:
    if (!form.nome) {
      newErrors.nome = 'Nome do funcionário é obrigatório';
    }
    // Adicione mais validações conforme necessário

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Lógica de envio do formulário aqui
      console.log('Dados do funcionário:', form);
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Funcionário</h2>
        <p>
          <CustomInput
            type="text"
            label="Nome do Funcionário:"
            id="nome"
            name="nome"
            maxLength={50}
            value={form.nome}
            onChange={handleChange}
          />
          {errors.nome && <span className='invalid'>{errors.nome}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Cargo:"
            id="cargo"
            name="cargo"
            maxLength={30}
            value={form.cargo}
            onChange={handleChange}
          />
          {errors.cargo && <span className='invalid'>{errors.cargo}</span>}
        </p>

        <p>
          <CustomInput
            type="number"
            label="Salário:"
            id="salario"
            name="salario"
            min={0}
            value={form.salario}
            onChange={handleChange}
          />
          {errors.salario && <span className='invalid'>{errors.salario}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Departamento:"
            id="departamento"
            name="departamento"
            maxLength={30}
            value={form.departamento}
            onChange={handleChange}
          />
          {errors.departamento && <span className='invalid'>{errors.departamento}</span>}
        </p>

        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}