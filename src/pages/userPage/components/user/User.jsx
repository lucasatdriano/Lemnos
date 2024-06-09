/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ToolTip from '../../../../components/tooltip/ToolTip';
import CustomInput from '../../../../components/inputs/customInput/Inputs';
import EmailModal from './components/modals/EmailModal';
import PasswordModal from './components/modals/PasswordModal';
import EnderecoModal from './components/modals/EnderecoModal';

import AddFuncionarioModal from './components/modals/admin/AddFuncModal';
import AddFornecedorModal from './components/modals/admin/AddFornModal';
import AddProdutoModal from './components/modals/admin/AddProductModal'; 

import HistoricoCompras from './components/history/History';
import UserImg from '../../../../assets/imgLemnos/imgUser.svg';
import { cadastrarFuncionario } from '../../../../services/ApiService';
import { MdLogout } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import './user.scss';

const historicoExemplo = [
  { id: 1, produto: 'Laptop', preco: 25.99 },
  { id: 2, produto: 'Monitor', produto2: 'Laptop', preco: 39.99 },
  { id: 3, produto: 'Gabinete', preco: 49.99 },
  { id: 4, produto: 'Celular', preco: 12.99 },
  { id: 5, produto: 'Teclado', preco: 12.99 },
  { id: 6, produto: 'SSD Kingstom', preco: 12.99 },
  { id: 7, produto: 'Laptop', produto2: 'Mouse', preco: 12.99 },    
  { id: 8, produto: 'Monitor', produto2: 'Teclado', preco: 12.99 },
  { id: 9, produto: 'Laptop', produto2: 'Gabinete', preco: 12.99 },
];

export default function User({ onLogout }) {
  const [admin, setAdmin] = useState(false);
  const [form, setForm] = useState({
    name: "Lucas Adriano Tavares Gonçalves",
    cpf: "",
    email: 'lucasatdriano@gmail.com',
    password: '',
  });
  const [username, setUsername] = useState(form.name.split(" ")[0]);
  
  const [errors, setErrors] = useState({
    cpf: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEnderecoModal, setShowEnderecoModal] = useState(false);

  const [showAddProdutoModal, setShowAddProdutoModal] = useState(false);
  const [showAddFuncionarioModal, setShowAddFuncionarioModal] = useState(false);
  const [showAddFornecedorModal, setShowAddFornecedorModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseAllModals();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "name") {
      const firstName = value.split(" ")[0];
      setUsername(firstName);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };

  const handleSaveChanges = () => {
    console.log('Dados atualizados:', form);
  };

  const handleEmailSave = (newEmail) => {
    setForm(prevForm => ({
      ...prevForm,
      email: newEmail
    }));
    console.log("Novo email:", newEmail);
  };

  const handleShowModal = (modalName) => {
    switch (modalName) {
      case 'email':
        setShowEmailModal(true);
        break;
      case 'password':
        setShowPasswordModal(true);
        break;
      case 'endereco':
        setShowEnderecoModal(true);
        break;
      case 'addProduto':
        setShowAddProdutoModal(true);
        break;
      case 'addFuncionario':
        setShowAddFuncionarioModal(true);
        break;
      case 'addFornecedor':
        setShowAddFornecedorModal(true);
        break;
      default:
        break;
    }
    const htmlTag = document.querySelector('html');
    htmlTag.classList.add('modalOpen');
  };

  const handleCloseModal = (modalName) => {
    switch (modalName) {
      case 'email':
        setShowEmailModal(false);
        break;
      case 'password':
        setShowPasswordModal(false);
        break;
      case 'endereco':
        setShowEnderecoModal(false);
        break;
      case 'addProduto':
        setShowAddProdutoModal(false);
        break;
      case 'addFuncionario':
        setShowAddFuncionarioModal(false);
        break;
      case 'addFornecedor':
        setShowAddFornecedorModal(false);
        break;
      default:
        break;
    }
    const htmlTag = document.querySelector('html');
    htmlTag.classList.remove('modalOpen');
  };

  const handleCloseAllModals = () => {
    setShowEmailModal(false);
    setShowPasswordModal(false);
    setShowEnderecoModal(false);
    setShowAddProdutoModal(false);
    setShowAddFuncionarioModal(false);
    setShowAddFornecedorModal(false);
    const htmlTag = document.querySelector('html');
    htmlTag.classList.remove('modalOpen');
  };

  const handlePasswordSave = (newPassword) => {
    console.log("Nova senha:", newPassword);
  };

  const handleEnderecoSave = (enderecoData) => {
    console.log("Endereço salvo:", enderecoData);
  };

  const handleAddProduto = (produtoData) => {
    console.log("Produto adicionado:", produtoData);
  };

  const handleAddFuncionario = async (funcionario) => {
    try {
      await cadastrarFuncionario(funcionario);
      toast.success(`Funcionário Cadastrado Com Sucesso!!`);
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  
  const handleAddFornecedor = (fornecedorData) => {
    console.log("Fornecedor adicionado:", fornecedorData);
  };

  return (
    <section className="userContainer">
        <div className="userData">
            <div className="user">
            <img src={UserImg} alt="user" />
            <h3>{username}</h3>
            </div>
            <div className='configUser'>
              <ToolTip message="Editar Perfil">
                <FaRegEdit className='icon' onClick={handleEditProfile}/>
              </ToolTip>
              <ToolTip message="Fazer Logout">
                <MdLogout className='icon' onClick={onLogout} />
              </ToolTip>
            </div>
        </div>

        <hr className='lineUser' />

        <div className="updateInfos">
          <div className="updateInputs">
            <p>
              <CustomInput
                type="text"
                label="Nome Completo:"
                id="name"
                name="name"
                maxLength={40}
                minLength={5}
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              {errors.name && <span className='invalid'>{errors.name}</span>}
            </p>

            <p>
              <CustomInput
                type="text"
                label="Email:"
                id="emailUser"
                name="email"
                maxLength={40}
                value={form.email}
                onChange={handleChange}
                disabled={true}
              />
              {errors.email && <span className='invalid'>{errors.email}</span>}
            </p>

          </div>
          <div className="containerButtons">
            <div className='updateButtons'>
              <button type="button" onClick={() => handleShowModal('password')} disabled={!isEditing}>Alterar Senha</button>
              <button type="button" onClick={handleSaveChanges} disabled={!isEditing}>Salvar Alterações</button>
              <button type="button" onClick={() => handleShowModal('endereco')} disabled={!isEditing}>Adicionar Endereço</button>
            </div>
          </div>
        </div>

        <hr />
        {admin ? (
          <HistoricoCompras compras={historicoExemplo}/>
        ) : (
          <div className='adminPage'>
            <button type="button" onClick={() => handleShowModal('addProduto')}>Adicionar Produto</button>
            <button type="button" onClick={() => handleShowModal('addFuncionario')}>Adicionar Funcionário</button>
            <button type="button" onClick={() => handleShowModal('addFornecedor')}>Adicionar Fornecedor</button>
          </div>
        )}

        {showEmailModal && (
          <EmailModal onSave={handleEmailSave} onClose={() => handleCloseModal('email')} />
        )}

        {showPasswordModal && (
          <PasswordModal onSave={handlePasswordSave} onClose={() => handleCloseModal('password')} />
        )}

        {showEnderecoModal && (
          <EnderecoModal onSave={handleEnderecoSave} onClose={() => handleCloseModal('endereco')} />
        )}

        {showAddProdutoModal && (
          <AddProdutoModal onSave={handleAddProduto} onClose={() => handleCloseModal('addProduto')} />
        )}

        {showAddFuncionarioModal && (
          <AddFuncionarioModal tipoEntidade="funcionario" onAddFunc={handleAddFuncionario} onClose={() => handleCloseModal('addFuncionario')} />
        )}

        {showAddFornecedorModal && (
          <AddFornecedorModal tipoEntidade="fornecedor" onSave={handleAddFornecedor} onClose={() => handleCloseModal('addFornecedor')} />
        )}
    </section>
  );
}
