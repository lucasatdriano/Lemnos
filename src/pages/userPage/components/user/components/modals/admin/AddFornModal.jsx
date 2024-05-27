import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';
import UpdateFornModal from './UpdateFornModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { cadastrarFornecedor, cadastrarEndereco } from '../../../../../../../services/ApiService';

export default function FornecedorModal({ onSave, onUpdate, onClose, tipoEntidade }) {
  const initialFormState = {
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    endereco: {
      cep: '',
      numLogradouro: '',
      complemento: ''
    }
  };
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFornecedorListOpen, setIsFornecedorListOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFornecedorLoaded, setIsFornecedorLoaded] = useState(false);
  const [selectedForn, setSelectedForn] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);
  const [nextId, setNextId] = useState(0);

  const baseUri = "http://localhost:8080/api";

  const handleFornecedorListToggle = async () => {
    if (!isFornecedorListOpen) {
      try {
        const response = await axios.get(`${baseUri}/fornecedor`);
        
        const fornecedoresComId = response.data.map((fornecedor, index) => ({
          ...fornecedor,
          id: index
        }));
      
        setFornecedores(fornecedoresComId);
        setSelectedForn(null);
        setIsFornecedorListOpen(true);
      } catch (error) {
        console.error('Erro ao listar fornecedor:', error);
        throw error;
      }
    } else {
      setIsFornecedorListOpen(false);
    }
  };

  const selectFornecedor = async (id) => {
    try {
      const response = await axios.get(`${baseUri}/fornecedor/${id}`);
      const fornecedor = response.data;
  
      if (!fornecedor) {
        throw new Error('Dados do fornecedor não encontrados.');
      }
  
      setForm({
        nome: fornecedor.nome || '',
        cnpj: fornecedor.cnpj || '',
        telefone: fornecedor.telefone || '',
        email: fornecedor.email || '',
        endereco: {
          cep: fornecedor.endereco ? fornecedor.endereco.cep || '' : '',
          numLogradouro: fornecedor.endereco ? fornecedor.endereco.numLogradouro || '' : '',
          complemento: fornecedor.endereco ? fornecedor.endereco.complemento || '' : ''
        }
      });
  
      setSelectedForn(fornecedor);
      setIsFornecedorLoaded(true);
      setIsFornecedorListOpen(false);
    } catch (error) {
      console.error('Erro ao carregar dados do fornecedor:', error);
      toast.error('Erro ao carregar dados do fornecedor.');
      throw error;
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nome) {
      newErrors.nome = 'O Nome do fornecedor é obrigatório';
    }
    if (!form.email) {
      newErrors.email = 'O Email do fornecedor é obrigatório';
    }
    if (!form.telefone) {
      newErrors.telefone = 'O Telefone é obrigatório';
    }
    if (!form.cnpj) {
      newErrors.cnpj = 'O CNPJ é obrigatório';
    }
    if (!form.endereco.cep) {
      newErrors.cep = 'O Cep é obrigatório';
    }
    if (!form.endereco.numLogradouro) {
      newErrors.numLogradouro = 'O Número de Logradouro é obrigatório';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const formattedForm = {
        ...form,
        cnpj: form.cnpj.replace(/\D/g, ''),
        telefone: form.telefone.replace(/\D/g, '').substring(0, 11),
        endereco: {
          ...form.endereco,
          cep: form.endereco.cep.replace(/\D/g, '')
        },
        id: nextId
      };
  
      console.log(formattedForm);
      await cadastrarFornecedor(formattedForm, tipoEntidade);
      await cadastrarEndereco(formattedForm.id, tipoEntidade, formattedForm.endereco);
      setNextId(prevId => prevId + 1);
      setForm(initialFormState);
  
      // try {
      //   const enderecoResponse = await cadastrarEndereco(formattedForm.id, tipoEntidade, formattedForm.endereco);

      //   if (enderecoResponse && enderecoResponse.success) {
      //     await cadastrarFornecedor(formattedForm, tipoEntidade);
          
      //     setNextId(prevId => prevId + 1);
      //     setForm(initialFormState);
      //   }
      // } catch (error) {
      //   throw error;
      // }
    }  
  };
 
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`${baseUri}/fornecedor/${selectedForn.id}`, form);
        console.log('Fornecedor atualizado:', response.data);
        onUpdate(form);
        setForm(initialFormState);
        setSelectedForn(null);
      } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        throw error;
      }
    }
  };

  const isFornSelected = () => {
    return selectedForn !== null;
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar/Atualizar Fornecedor</h2>
        <div className="modalFornecedor">
          <p className='inputNome'>
            <CustomInput
              type="text"
              label="Nome do Fornecedor:"
              id="nome"
              name="nome"
              maxLength={50}
              value={form.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
            />
            {errors.nome && <span className='invalid'>{errors.nome}</span>}
          </p>

          <p>
            <CustomInput
              type="email"
              label="Email:"
              id="email"
              name="email"
              maxLength={50}
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className='invalid'>{errors.email}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Telefone:"
              id="telefone"
              name="telefone"
              mask="TEL"
              minLength={15}
              maxLength={15}
              value={form.telefone}
              onChange={(e) => handleChange('telefone', e.target.value)}
            />
            {errors.telefone && <span className='invalid'>{errors.telefone}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="CNPJ:"
              id="cnpj"
              name="cnpj"
              mask="CNPJ"
              minLength={18}
              maxLength={18}
              value={form.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
            />
            {errors.cnpj && <span className='invalid'>{errors.cnpj}</span>}
          </p>

          <p>
            <CustomInput
            type="text"
            label="CEP:"
            id="cep"
            name="cep"
            mask='CEP'
            maxLength={9}
            value={form.endereco.cep}
            onChange={(e) => handleChange('endereco', { ...form.endereco, cep: e.target.value })}
            />
            {errors.cep && <span className='invalid'>{errors.cep}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Número do Logradouro:"
              id="numeroLogradouro"
              name="numeroLogradouro"
              maxLength={6}
              value={form.endereco.numLogradouro}
              onChange={(e) => handleChange('endereco', { ...form.endereco, numLogradouro: e.target.value })}
            />
            {errors.numLogradouro && <span className='invalid'>{errors.numLogradouro}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Complemento:"
              id="complemento"
              name="complemento"
              maxLength={20}
              value={form.endereco.complemento}
              onChange={(e) => handleChange('endereco', { ...form.endereco, complemento: e.target.value })}
            />
            {errors.complemento && <span className='invalid'>{errors.complemento}</span>}
          </p>

        </div>
        <div className="containerButtons">
          <button type='button' onClick={handleAdd} disabled={isFornSelected()} >Adicionar</button>
          <button type='button' onClick={handleUpdate} disabled={!isFornSelected()} >Atualizar</button>
          <button type='button' onClick={handleFornecedorListToggle}>Mostrar Lista</button>
        </div>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
      {isFornecedorListOpen && (
        <UpdateFornModal fornecedores={fornecedores} onSelect={selectFornecedor} onClose={handleFornecedorListToggle} />
      )}
    </div>
  );
}
