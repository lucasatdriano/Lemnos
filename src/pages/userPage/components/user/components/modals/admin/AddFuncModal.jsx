import React, { useState } from 'react';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';
import UpdateFuncModal from './UpdateFuncModal';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const situacao = ['Ativo', 'Inativo'];

const funcionarios = [
  {
    id: 1,
    nome: 'João Silva',
    cpf: '123.456.789-00',
    dataNasc: '1990-01-01',
    dataAdmissao: '2020-01-01',
    telefone: '(11) 91234-5678',
    cep: '12345-678',
    nLogradouro: '123',
    complemento: 'Apto 101',
    situacao: 'Ativo',
  },
  {
    id: 2,
    nome: 'Maria Souza',
    cpf: '987.654.321-00',
    dataNasc: '1985-05-15',
    dataAdmissao: '2018-03-10',
    telefone: '(11) 98765-4321',
    cep: '54321-876',
    nLogradouro: '456',
    complemento: 'Casa',
    situacao: 'Inativo',
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

export default function FuncionarioModal({ onSave, onUpdate, onClose }) {
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
  const [isFuncionarioListOpen, setIsFuncionarioListOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFuncionarioLoaded, setIsFuncionarioLoaded] = useState(false);


  const handleFuncionarioListToggle = () => {
    setIsFuncionarioListOpen(!isFuncionarioListOpen);
    setIsFuncionarioLoaded(false);
  };

  const selectFuncionario = (funcionario) => {
    setForm(funcionario);
    setIsFuncionarioListOpen(false);
    setIsFuncionarioLoaded(true);
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

  const handleUpdate = (e) => {
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
      console.log('Dados do funcionário atualizados:', form);
      onUpdate(form);
      onClose();
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="containerModal" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar/Atualizar Funcionário</h2>
        <div className="modalFuncionario">
          <p>
            <CustomInput
              type="text"
              label="Nome do Funcionário:"
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
              type="text"
              label="CPF:"
              id="cpf"
              name="cpf"
              mask="CPF"
              minLength={14}
              maxLength={14}
              value={form.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
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
              onChange={(e) => handleChange('dataNasc', e.target.value)}
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
              onChange={(e) => handleChange('dataAdmissao', e.target.value)}
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
              onChange={(e) => handleChange('telefone', e.target.value)}
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
              onChange={(e) => handleChange('cep', e.target.value)}
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
              maxLength={50}
              value={form.complemento}
              onChange={(e) => handleChange('complemento', e.target.value)}
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
              disabled={!isFuncionarioLoaded}
            />
            {isDropdownOpen ? 
              <RiArrowDropUpLine className='iconDrop' onClick={handleDropdownToggle}/> 
            : 
              <RiArrowDropDownLine className='iconDrop' onClick={handleDropdownToggle}/>
            }
            {isFuncionarioLoaded && (
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
        </div>
        <div className="containerButtons">
          <button type='button' onClick={handleSave}>Adicionar</button>
          <button type='button' onClick={handleUpdate}>Atualizar</button>
          <button type='button' onClick={handleFuncionarioListToggle}>Mostrar Lista</button>
        </div>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
      {isFuncionarioListOpen && (
        <UpdateFuncModal funcionarios={funcionarios} onSelect={selectFuncionario} onClose={onClose} />
      )}
    </div>
  );
}