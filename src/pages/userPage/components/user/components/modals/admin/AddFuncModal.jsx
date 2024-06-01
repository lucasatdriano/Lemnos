import { useState } from 'react';
import axios from 'axios';
import CustomInput from '../../../../../../../components/inputs/customInput/Inputs';
import UpdateFuncModal from './UpdateFuncModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cadastrarFuncionario, cadastrarEndereco, findIdByEmail, verificarCep, updateFuncionario } from '../../../../../../../services/ApiService';


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
  const [isFuncionarioLoaded, setIsFuncionarioLoaded] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  const baseUri = "http://localhost:8080/api";
  
  const handleFuncionarioListToggle = async () => {
    if (!isFuncionarioListOpen) {
      try {
        const response = await axios.get(`${baseUri}/funcionario`, {
          timeout: 10000,
        });
        
        const funcionariosComId = response.data.map((funcionario, index) => ({
          ...funcionario,
          id: index + 1
        }));
      
        setFuncionarios(funcionariosComId);
        setSelectedFunc(null);
        setIsFuncionarioListOpen(true);
        setForm(initialFormState);
      } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        throw error;
      }
    } else {
      setIsFuncionarioListOpen(false);
    }
  };

  const selectFuncionario = async (id) => {
    try {
      const response = await axios.get(`${baseUri}/funcionario/${id}`, {
        timeout: 10000,
      });
      const funcionario = response.data;
  
      if (!funcionario) {
        throw new Error('Dados do funcionário não encontrados.');
      }
  
      const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
      };
  
      setForm({
        nome: funcionario.nome || '',
        cpf: funcionario.cpf || '',
        dataNasc: formatDate(funcionario.dataNascimento) || '',
        dataAdmissao: formatDate(funcionario.dataAdmissao) || '',
        telefone: funcionario.telefone || '',
        email: funcionario.email || '',
        senha: funcionario.senha || '',
        confSenha: '',
        endereco: funcionario.enderecos.length > 0 ? {
          cep: funcionario.enderecos[0].cep || '',
          numLogradouro: funcionario.enderecos[0].numeroLogradouro || '',
          complemento: funcionario.enderecos[0].complemento || ''
        } : { cep: '', numLogradouro: '', complemento: '' }
      });
      setSelectedFunc(funcionario);
      setIsFuncionarioLoaded(true);
      setIsFuncionarioListOpen(false);
    } catch (error) {
      console.error('Erro ao carregar dados do funcionário:', error);
      toast.error('Erro ao carregar dados do funcionário.');
      throw error;
    }
  };

  const handleChange = (name, value) => {
    if (name.startsWith('endereco.')) {
      const enderecoField = name.split('.')[1];
      setForm(prevForm => ({
        ...prevForm,
        endereco: {
          ...prevForm.endereco,
          [enderecoField]: value
        }
      }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const validateForm = () => {
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    const newErrors = {};

    const birthDate = new Date(form.dataNasc);
    if (birthDate >= today) {
      newErrors.dataNasc = 'A Data de nascimento não pode ser posterior a hoje';
    } else if (birthDate > minBirthDate) {
      newErrors.dataNasc = 'O funcionário deve ter pelo menos 16 anos de idade';
    }
  
    const admissionDate = new Date(form.dataAdmissao);
    if (admissionDate > today) {
      newErrors.dataAdmissao = 'A Data de admissão não pode ser posterior a hoje';
    }
    
    if (!form.confSenha) {
      newErrors.confSenha = 'Confirmar Senha é obrigatório';
    } else if (form.senha != form.confSenha) {
      newErrors.confSenha = 'As Senhas devem ser iguais';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length == 0;
  };

  const handleForm = (form) => {
    return {
      ...form,
      nome: form.nome ? form.nome.toLowerCase() : '',
      cpf: String(form.cpf).replace(/\D/g, ''),
      telefone: String(form.telefone).replace(/\D/g, '').substring(0, 11),
      dataNasc: formatarData(form.dataNasc),
      dataAdmissao: formatarData(form.dataAdmissao),
      endereco: {
        ...form.endereco,
        numLogradouro: form.endereco.numLogradouro ? parseInt(form.endereco.numLogradouro) : null,
        cep: form.endereco && form.endereco.cep ? String(form.endereco.cep).replace(/\D/g, '') : ''
      }
    };
  }

  const handleAdd = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const formattedForm = handleForm(form);
      delete formattedForm.confSenha;
  
      try {
        const cepValido = await verificarCep(formattedForm.endereco.cep);
        if (!cepValido) {
          toast.error('CEP não existente.');
          return;
        }

        let entidadeCadastrada = await cadastrarFuncionario(formattedForm, tipoEntidade);

        if (entidadeCadastrada == true) {
          const id = await findIdByEmail(formattedForm.email, tipoEntidade);
          const enderecoResponse = await cadastrarEndereco(id, formattedForm.endereco, tipoEntidade);
          if(enderecoResponse == true) {
            setForm(initialFormState);
          }
          return;
        }
      } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        toast.error('Erro ao cadastrar funcionário.');
        toast.error(error.response.data.message)
      }
    }
  };
  
  const formatarData = (data) => {
    return `${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)}`;
  };

  const handleDisable = async (id) => {
      axios.delete(`${baseUri}/funcionario/${id}`)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
  }

  const handleUpdate = async (form) => {
    if (validateForm()) {
      const formattedForm = handleForm(form);
      delete formattedForm.confSenha;

      try {
        const cepValido = await verificarCep(formattedForm.endereco.cep);
        if (!cepValido) {
          toast.error('CEP não existente.');
          return;
        }

        let entidadeCadastrada = await updateFuncionario(formattedForm);

        if (entidadeCadastrada == true) {
          const id = await findIdByEmail(formattedForm.email, tipoEntidade);
          await cadastrarEndereco(id, formattedForm.endereco, tipoEntidade);
          // setForm(initialFormState);
          return;
        }
          setSelectedFunc(null);
      } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        toast.error('Erro ao atualizar funcionário.');
        toast.error(error.response.data.message)
      }
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
          <p className='inputNome'>
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
          {!isFuncSelected() ? (
            <button type='button' onClick={handleAdd} disabled={isFuncSelected()}>Adicionar</button>
          ) : (
            <button type='button' onClick={handleDisable} disabled={!isFuncSelected()}>Desativar</button>
          )}
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