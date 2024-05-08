import React, { useState } from 'react';
import { CustomInput } from '../../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";

export default function ProdutoModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    quantidade: '',
    categoria: '',
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
      newErrors.nome = 'Nome do produto é obrigatório';
    }
    // Adicione mais validações conforme necessário

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Lógica de envio do formulário aqui
      console.log('Dados do produto:', form);
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Produto</h2>
        <p>
          <CustomInput
            type="text"
            label="Nome do Produto:"
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
            type="number"
            label="Preço:"
            id="preco"
            name="preco"
            min={0}
            value={form.preco}
            onChange={handleChange}
          />
          {errors.preco && <span className='invalid'>{errors.preco}</span>}
        </p>

        <p>
          <CustomInput
            type="number"
            label="Quantidade:"
            id="quantidade"
            name="quantidade"
            min={0}
            value={form.quantidade}
            onChange={handleChange}
          />
          {errors.quantidade && <span className='invalid'>{errors.quantidade}</span>}
        </p>

        <p>
          <CustomInput
            type="text"
            label="Categoria:"
            id="categoria"
            name="categoria"
            maxLength={30}
            value={form.categoria}
            onChange={handleChange}
          />
          {errors.categoria && <span className='invalid'>{errors.categoria}</span>}
        </p>

        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}
