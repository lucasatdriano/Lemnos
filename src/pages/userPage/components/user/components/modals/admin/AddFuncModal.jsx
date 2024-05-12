import React, { useState } from 'react';
import CustomInput from '../../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const situacao = ['Ativo', 'Inativo'];

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

export default function FuncionarioModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNasc: '',
    dataAdmissao: '',
    telefone: '',
    cep: '',
    nLogradouro: '',
    complemento: '',
    situacao: '',
  });
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
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
    if (!form.nLogradouro) {
      newErrors.nLogradouro = 'Número do logradouro é obrigatório';
    }
    if (!form.complemento) {
      newErrors.complemento = 'Complemento é obrigatório';
    }
    if (!form.situacao) {
      newErrors.situacao = 'Situação do funcionário é obrigatória';
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
        <div className="modalFuncionario">
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
              minLength={14}
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
              minLength={15}
              maxLength={15}
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
              mask='CEP'
              minLength={9}
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
              maxLength={50}
              value={form.complemento}
              onChange={handleChange}
            />
            {errors.complemento && <span className='invalid'>{errors.complemento}</span>}
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
            />
            {isDropdownOpen ? 
              <RiArrowDropUpLine className='iconDrop' onClick={handleDropdownToggle}/> 
            : 
              <RiArrowDropDownLine className='iconDrop' onClick={handleDropdownToggle}/>
            }
            <Dropdown
              isOpen={isDropdownOpen}
              options={situacao}
              onSelect={(option) => {
                handleChange('situacao', option);
                setIsDropdownOpen(false);
              }}
              filterFunction={(option) => option.toLowerCase().includes(searchTerm.toLowerCase())}
            />
            {errors.situacao && <span className='invalid'>{errors.situacao}</span>}
          </p>
        </div>
        <button type='button' onClick={handleSave}>Adicionar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}