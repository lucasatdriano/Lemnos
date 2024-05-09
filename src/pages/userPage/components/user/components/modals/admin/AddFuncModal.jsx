import React, { useState } from 'react';
import { CustomInput } from '../../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";

export default function FuncionarioModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNasc: '',
    dataAdmissao: '',
    telefone: '',
    cep: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.nome) {
      newErrors.nome = 'Nome do funcionário é obrigatório';
    }
    if (!form.cpf) {
      newErrors.cpf = 'CPF do funcionário é obrigatório';
    }
    if (!form.dataNasc) {
      newErrors.dataNasc = 'Data de nascimento é obrigatória';
    }
    if (!form.dataAdmissao) {
      newErrors.dataAdmissao = 'Data de admissão é obrigatória';
    }
    if (!form.telefone) {
      newErrors.telefone = 'Telefone do funcionário é obrigatório';
    }
    if (!form.cep) {
      newErrors.cep = 'CEP do funcionário é obrigatório';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
            label="CPF:"
            id="cpf"
            name="cpf"
            mask="CPF"
            maxLength={14}
            value={form.cpf}
            onChange={handleChange}
          />
          {errors.cpf && <span className='invalid'>{errors.cpf}</span>}
        </p>

        <p>
          <CustomInput
            type="date"
            label="Data de Nascimento:"
            id="dataNasc"
            name="dataNasc"
            value={form.dataNasc}
            onChange={handleChange}
          />
          {errors.dataNasc && <span className='invalid'>{errors.dataNasc}</span>}
        </p>

        <p>
          <CustomInput
            type="date"
            label="Data de Admissão:"
            id="dataAdmissao"
            name="dataAdmissao"
            value={form.dataAdmissao}
            onChange={handleChange}
          />
          {errors.dataAdmissao && <span className='invalid'>{errors.dataAdmissao}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Telefone:"
            id="telefone"
            name="telefone"
            mask="TEL"
            maxLength={14}
            value={form.telefone}
            onChange={handleChange}
          />
          {errors.telefone && <span className='invalid'>{errors.telefone}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="CEP:"
            id="cep"
            name="cep"
            maxLength={9}
            value={form.cep}
            onChange={handleChange}
          />
          {errors.cep && <span className='invalid'>{errors.cep}</span>}
        </p>

        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}
