import React, { useState } from 'react';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';
import UpdateFornModal from './UpdateFornModal';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const situacao = ['Ativo', 'Inativo'];

const fornecedores = [
  {
    nome: 'Fornecedor 1',
    email: 'fornecedor1@example.com',
    telefone: '123456789',
    cnpj: '12345678901234',
    situacao: 'Ativo',
    nLogradouro: '123',
    complemento: 'Apto 1',
    cep: '12345-678'
  },
  {
    nome: 'Fornecedor 2',
    email: 'fornecedor2@example.com',
    telefone: '987654321',
    cnpj: '98765432109876',
    situacao: 'Inativo',
    nLogradouro: '456',
    complemento: 'Apto 2',
    cep: '98765-432'
  },
];

const Dropdown = ({ isOpen, options, onSelect, filterFunction }) => {
  const filteredOptions = filterFunction ? options.filter(filterFunction) : options;

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      {isOpen &&
        filteredOptions.map((option, index) => (
          <div key={index} className="dropdown-situacao" onClick={() => onSelect(option)}>
            {option}
          </div>
        ))
      }
    </div>
  );
};

export default function FornecedorModal({ onSave, onUpdate, onClose, tipoEntidade }) {
  const initialFormState = {
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    situacao: 'Ativo',
    nLogradouro: '',
    complemento: '',
    cep: ''
  };
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFornecedorListOpen, setIsFornecedorListOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFornecedorLoaded, setIsFornecedorLoaded] = useState(false);
  const [selectedForn, setSelectedForn] = useState(null);

  const handleFornecedorListToggle = () => {
    setIsFornecedorListOpen(!isFornecedorListOpen);
    setIsFornecedorLoaded(false);
    if (!isFornecedorListOpen) {
      setSelectedForn(null);
    }
  };

  const selectFornecedor = (fornecedor) => {
    setForm(fornecedor);
    setIsFornecedorListOpen(false);
    setSelectedForn(fornecedor);
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
      newErrors.nome = 'O Campo Nome do fornecedor é obrigatório';
    }
    if (!form.email) {
      newErrors.email = 'O Campo Email do fornecedor é obrigatório';
    }
    if (!form.telefone) {
      newErrors.telefone = 'O Campo Telefone é obrigatório';
    }
    if (!form.cnpj) {
      newErrors.cnpj = 'O Campo CNPJ é obrigatório';
    }
    if (!form.nLogradouro) {
      newErrors.nLogradouro = 'O Campo Número do logradouro é obrigatório';
    }
    if (!form.complemento) {
      newErrors.complemento = 'O Campo Complemento é obrigatório';
    }
    if (!form.cep) {
      newErrors.cep = 'O Campo CEP é obrigatório';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dados do Funcionário:', form);
      onSave(form);
      setForm(initialFormState);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dados do Funcionário atualizados:', form);
      // onUpdate(form); no futuro
      setForm(initialFormState);
      setSelectedForn(null);
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
          <p>
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
              label="Situação:"
              id="situacao"
              name="situacao"
              maxLength={7}
              value={form.situacao}
              onFocus={handleDropdownToggle}
              onChange={(e) => {
                const upperCaseValue = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1); // Capitalize a primeira letra
                handleChange('situacao', upperCaseValue);
                handleSearch(upperCaseValue);
              }}
              disabled={!isFornecedorLoaded}
            />
            {isDropdownOpen ? 
              <RiArrowDropUpLine className='iconDrop' onClick={handleDropdownToggle}/> 
            : 
              <RiArrowDropDownLine className='iconDrop' onClick={handleDropdownToggle}/>
            }
             {isFornecedorLoaded && (
              <>
                <Dropdown
                  isOpen={isDropdownOpen}
                  options={situacao}
                  onSelect={(option) => {
                    handleChange('situacao', option);
                    setIsDropdownOpen(false);
                  }}
                  filterFunction={(option) => option.toLowerCase().includes(searchTerm.toLowerCase())}
                />
              </>
            )}
            {errors.situacao && <span className='invalid'>{errors.situacao}</span>}
          </p>

          <p>
            <CustomInput
              type="text"
              label="Número do Logradouro:"
              id="nLogradouro"
              name="nLogradouro"
              maxLength={10}
              value={form.nLogradouro}
              onChange={(e) => handleChange('nLogradouro', e.target.value)}
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
              onChange={(e) => handleChange('complemento', e.target.value)}
            />
            {errors.complemento && <span className='invalid'>{errors.complemento}</span>}
          </p>
          <p>
            <CustomInput
              type="text"
              label="CEP:"
              id="cep"
              name="cep"
              mask="CEP"
              minLength={9}
              maxLength={9}
              value={form.cep}
              onChange={(e) => handleChange('cep', e.target.value)}
            />
            {errors.cep && <span className='invalid'>{errors.cep}</span>}
          </p>
        </div>
        <div className="containerButtons">
          <button type='button' onClick={handleSave} disabled={isFornSelected()} >Adicionar</button>
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
