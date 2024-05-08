import React, { useState } from 'react';
import { CustomInput } from '../../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";

export default function FornecedorModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
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
      newErrors.nome = 'Nome do fornecedor é obrigatório';
    }
    // Adicione mais validações conforme necessário

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Lógica de envio do formulário aqui
      console.log('Dados do fornecedor:', form);
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Fornecedor</h2>
        <p>
          <CustomInput
            type="text"
            label="Nome do Fornecedor:"
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
            label="CNPJ:"
            id="cnpj"
            name="cnpj"
            maxLength={18}
            value={form.cnpj}
            onChange={handleChange}
          />
          {errors.cnpj && <span className='invalid'>{errors.cnpj}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Endereço:"
            id="endereco"
            name="endereco"
            maxLength={100}
            value={form.endereco}
            onChange={handleChange}
          />
          {errors.endereco && <span className='invalid'>{errors.endereco}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Telefone:"
            id="telefone"
            name="telefone"
            maxLength={15}
            value={form.telefone}
            onChange={handleChange}
          />
          {errors.telefone && <span className='invalid'>{errors.telefone}</span>}
        </p>

        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}