import React, { useState, useEffect } from 'react';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';
import UpdateFuncModal from './UpdateFuncModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { listarFuncionarios, selecionarFuncionario, cadastrarFuncionario } from '../../../../../../../services/ApiService';

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

export default function FuncionarioModal({ onAddFunc, onUpdate, onClose, tipoEntidade }) {
  const initialFormState = {
    nome: '',
    cpf: '',
    dataNasc: '',
    dataAdmissao: '',
    telefone: '',
    email: '',
    senha: '',
    confSenha: '',
    situacao: 'Ativo',
    endereco: {
      cep: '',
      numLogradouro: '',
      complemento: ''
    }
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [isFuncionarioListOpen, setIsFuncionarioListOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFuncionarioLoaded, setIsFuncionarioLoaded] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);

  const handleFuncionarioListToggle = async () => {
    if (!isFuncionarioListOpen) {
      try {
        const response = await listarFuncionarios();
        if (response) {
          if (response.data) {
            setFuncionarios(response.data);
            setSelectedFunc(null);
            setIsFuncionarioListOpen(true);
          } else {
            toast.error('Erro ao carregar lista de funcionários A.');
          }
        } else {
          toast.error('Erro ao carregar lista de funcionários B.');
        }
      } catch (error) {
        toast.error('Erro ao carregar lista de funcionários C.');
      }
    } else {
      setIsFuncionarioListOpen(false);
    }
  };

  const selectFuncionario = async (id) => {
    try {
      const response = await selecionarFuncionario(id);
      const funcionario = response.data;

      if (!funcionario) {
        throw new Error('Dados do funcionário não encontrados na resposta da API.');
      }

      setForm({
        nome: funcionario.nome || '',
        cpf: funcionario.cpf || '',
        dataNasc: funcionario.dataNasc || '',
        dataAdmissao: funcionario.dataAdmissao || '',
        telefone: funcionario.telefone || '',
        situacao: funcionario.situacao || '',
        email: funcionario.email || '',
        senha: '',
        confSenha: '',
        endereco: funcionario.endereco || {
          cep: '',
          numLogradouro: '',
          complemento: ''
        }
      });
      setSelectedFunc(funcionario);
    } catch (error) {
      toast.error('Erro ao carregar dados do funcionário.', error.message);
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
      newErrors.nome = 'Nome do funcionário é obrigatório';
    } else if (/\d/.test(form.nome)) {
      newErrors.nome = 'O campo Nome não pode conter números';
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
    if (!form.situacao) {
      newErrors.situacao = 'Situação do funcionário é obrigatória';
    }
    if (!form.email) {
      newErrors.email = 'Email é obrigatório';
    }
    if (!form.senha) {
      newErrors.senha = 'Senha é obrigatória';
    }
    if (!form.confSenha) {
      newErrors.confSenha = 'Confirmar Senha é obrigatório';
    } else if (form.senha !== form.confSenha) {
      newErrors.confSenha = 'As Senhas devem ser iguais';
    }
    if (!form.endereco.cep) {
      newErrors.cep = 'Cep é obrigatória';
    }
    if (!form.endereco.numLogradouro) {
      newErrors.numLogradouro = 'Número de Logradouro é obrigatória';
    }
    if (!form.endereco.complemento) {
      newErrors.complemento = 'Complemento é obrigatória';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formattedForm = {
        ...form,
        cpf: form.cpf.replace(/\D/g, ''),
        telefone: form.telefone.replace(/\D/g, '').substring(0, 11),
        dataNasc: formatarData(form.dataNasc),
        dataAdmissao: formatarData(form.dataAdmissao),
        endereco: {
          ...form.endereco,
          cep: form.endereco.cep.replace(/\D/g, '')
        }
      };
      delete formattedForm.confSenha;
  
      console.log(formattedForm);
      
      try {
        await cadastrarFuncionario(formattedForm, tipoEntidade);
        // setForm(initialFormState);
      } catch (error) {
        toast.error('Erro ao adicionar funcionário.', error.message);
      }
    }
  };

  const formatarData = (data) => {
    return `${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)}`;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedForm = {
        ...form,
        cpf: form.cpf.replace(/\D/g, ''),
        telefone: form.telefone.replace(/\D/g, '').substring(0, 11),
        dataNasc: formatarData(form.dataNasc),
        dataAdmissao: formatarData(form.dataAdmissao)
      };
      delete formattedForm.confSenha;

      console.log('Dados do Funcionário atualizados:', form);
      // onUpdate(form); no futuro
      setForm(initialFormState);
      setSelectedFunc(null);
    }
  };

  const isFuncSelected = () => {
    return selectedFunc !== null;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
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
              id="cpfInput"
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
              label="Situação:"
              id="situacao"
              name="situacao"
              maxLength={7}
              value={form.situacao}
              onFocus={handleDropdownToggle}
              onChange={(e) => {
                const upperCaseValue = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
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

          <p>
            <CustomInput
              type="text"
              label="Email:"
              id="email"
              name="email"
              maxLength={40}
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className='invalid'>{errors.email}</span>}
          </p>

          <p>
            <CustomInput
              type={showPassword ? "text" : "password"}
              label="Senha:"
              id="password"
              name="password"
              minLength={8}
              maxLength={16}
              value={form.senha}
              onChange={(e) => handleChange('senha', e.target.value)}
            />
            {showPassword ? 
              <FaRegEyeSlash className='iconPwd' onClick={togglePasswordVisibility} /> 
            : 
              <FaRegEye className='iconPwd' onClick={togglePasswordVisibility} />
            }
            {errors.senha && <span className='invalid'>{errors.senha}</span>}
          </p>

          <p>
            <CustomInput
              type={showConfPassword ? "text" : "password"}
              label="Confirme sua Senha:"
              id="confPassword"
              name="confPassword"
              maxLength={16}
              value={form.confSenha}
              onChange={(e) => handleChange('confSenha', e.target.value)}
            />
            {showConfPassword ? 
              <FaRegEyeSlash className='iconPwd' onClick={toggleConfPasswordVisibility} /> 
            : 
              <FaRegEye className='iconPwd' onClick={toggleConfPasswordVisibility} />
            }
            {errors.confSenha && <span className='invalid'>{errors.confSenha}</span>}
          </p>

        </div>
        <div className="containerButtons">
          <button type='button' onClick={handleAdd} disabled={isFuncSelected()}>Adicionar</button>
          <button type='button' onClick={handleUpdate} disabled={!isFuncSelected()}>Atualizar</button>
          <button type='button' onClick={handleFuncionarioListToggle}>Mostrar Lista</button>
        </div>
        <IoClose onClick={onClose} className='iconClose' />
      </div>
      {isFuncionarioListOpen && (
       <UpdateFuncModal funcionarios={funcionarios} onSelect={selectFuncionario} onClose={handleFuncionarioListToggle} />
      )}
    </div>
  );
}