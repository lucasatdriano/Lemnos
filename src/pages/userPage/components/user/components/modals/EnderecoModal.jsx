import React, { useState } from 'react';
import { CustomInput } from '../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";

export default function EnderecoModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    cep: '',
    nLogradouro: '',
    complemento: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.cep) {
      newErrors.cep = 'CEP é obrigatório';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Lógica de envio do formulário aqui
      console.log('Dados do formulário:', form);
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Endereço</h2>
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

        <p>
          <CustomInput
            type="text"
            label="Número do Logradouro:"
            id="nLogradouro"
            name="nLogradouro"
            maxLength={10}
            value={form.nLogradouro}
            onChange={handleChange}
          />
          {errors.nLogradouro && <span className='invalid'>{errors.nLogradouro}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Complemento:"
            id="complemento"
            name="complemento"
            maxLength={40}
            value={form.complemento}
            onChange={handleChange}
          />
          {errors.complemento && <span className='invalid'>{errors.complemento}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Logradouro:"
            id="logradouro"
            name="logradouro"
            maxLength={50}
            value={form.logradouro}
            onChange={handleChange}
          />
          {errors.logradouro && <span className='invalid'>{errors.logradouro}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Bairro:"
            id="bairro"
            name="bairro"
            maxLength={40}
            value={form.bairro}
            onChange={handleChange}
          />
          {errors.bairro && <span className='invalid'>{errors.bairro}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Cidade:"
            id="cidade"
            name="cidade"
            maxLength={40}
            value={form.cidade}
            onChange={handleChange}
          />
          {errors.cidade && <span className='invalid'>{errors.cidade}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Estado:"
            id="estado"
            name="estado"
            maxLength={2}
            value={form.estado}
            onChange={handleChange}
          />
          {errors.estado && <span className='invalid'>{errors.estado}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="País:"
            id="pais"
            name="pais"
            maxLength={20}
            value={form.pais}
            onChange={handleChange}
          />
          {errors.pais && <span className='invalid'>{errors.pais}</span>}
        </p>

        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}