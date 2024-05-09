import React, { useState } from 'react';
import { CustomInput } from '../../../../../../components/inputs/Inputs';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";

// Lista de siglas dos estados do Brasil
const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
  'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO'
];

const Dropdown = ({ isOpen, options, onSelect, filterFunction }) => {
  const filteredOptions = filterFunction ? options.filter(filterFunction) : options;

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      {isOpen &&
        filteredOptions.map((option, index) => (
          <div key={index} className="dropdown-item" onClick={() => onSelect(option)}>
            {option}
          </div>
        ))
      }
    </div>
  );
};

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (name, value) => {
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
            mask="CEP"
            maxLength={9}
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: e.target.value })}
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
            label="Logradouro:"
            id="logradouro"
            name="logradouro"
            maxLength={50}
            value={form.logradouro}
            onChange={(e) => handleChange('logradouro', e.target.value)}
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
            onChange={(e) => handleChange('bairro', e.target.value)}
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
            onChange={(e) => handleChange('cidade', e.target.value)}
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
            onFocus={handleDropdownToggle}
            onChange={(e) => {
              const upperCaseValue = e.target.value.toUpperCase();
              handleSearch(upperCaseValue);
              handleChange('estado', upperCaseValue);
            }}
          />
          {isDropdownOpen ? 
            <RiArrowDropUpLine className='iconDrop' onClick={handleDropdownToggle}/> 
          : 
            <RiArrowDropDownLine className='iconDrop' onClick={handleDropdownToggle}/>
          }
          <Dropdown
            isOpen={isDropdownOpen}
            options={estados}
            onSelect={(option) => {
              handleChange('estado', option);
              setIsDropdownOpen(false);
            }}
            filterFunction={(option) => option.toLowerCase().includes(searchTerm.toLowerCase())}
          />
        </p>

        <p>
          <CustomInput
            type="text"
            label="País:"
            id="pais"
            name="pais"
            maxLength={20}
            value={form.pais}
            onChange={(e) => setForm({ ...form, pais: e.target.value })}
          />
          {errors.pais && <span className='invalid'>{errors.pais}</span>}
        </p>

        <button type='button' onClick={handleSave}>Salvar</button>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
    </div>
  );
}
