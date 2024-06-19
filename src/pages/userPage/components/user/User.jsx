/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './user.scss';
import 'react-toastify/dist/ReactToastify.css';
import UserImg from '../../../../assets/imgLemnos/imgUser.svg';
import ToolTip from '../../../../components/tooltip/ToolTip';
import EmailModal from './components/modals/EmailModal';
import AuthService from '../../../../services/AuthService';
import CustomInput from '../../../../components/inputs/customInput/Inputs';
import PasswordModal from './components/modals/PasswordModal';
import EnderecoModal from './components/modals/EnderecoModal';
import AddProdutoModal from './components/modals/admin/AddProductModal';
import HistoricoCompras from './components/history/History';
import AddFornecedorModal from './components/modals/admin/AddFornModal';
import AddFuncionarioModal from './components/modals/admin/AddFuncModal';
import { auth } from '../../../../services/configurations/FirebaseConfig';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { MdLogout } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { setUserImg } from '../../../../actions/userActions';
import { getCliente, updateCliente } from '../../../../services/ClienteService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFuncionarioByToken } from '../../../../services/FuncionarioService';

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

const User = ({ onLogout, clearUserImg, userImg, setUserImg }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showEnderecoModal, setShowEnderecoModal] = useState(false);
    const [showAddProdutoModal, setShowAddProdutoModal] = useState(false);
    const [endereco, setEndereco] = useState(true);
    const [showAddFuncionarioModal, setShowAddFuncionarioModal] =
        useState(false);
    const [showAddFornecedorModal, setShowAddFornecedorModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({ cpf: false });

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

    useEffect(() => {
        fetchUsuario();
    }, [clearUserImg]);

    useEffect(() => {
        const storedPhotoURL = localStorage.getItem('userImg');
        if (storedPhotoURL) {
            setUserImg(storedPhotoURL);
        } else {
            // Carregar a imagem padrão ou inicial
            setUserImg(UserImg);
        }
    }, [setUserImg]);

    async function fetchUsuario() {
        try {
            const usuario =
                AuthService.getRole() === 'CLIENTE'
                    ? await getCliente()
                    : await getFuncionarioByToken();

            setForm({ name: usuario.nome, email: usuario.email });
            setUsername(usuario.nome.split(' ')[0]);

            if (AuthService.isLoggedInWithGoogle()) {
                const currentUser = auth.currentUser;
                if (
                    currentUser &&
                    currentUser.providerData.some(
                        (provider) => provider.providerId === 'google.com'
                    )
                ) {
                    const photoURL = currentUser.photoURL;
                    AuthService.setGoogleProfilePhoto(photoURL);
                    setUserImg(photoURL);
                }
            } else {
                const storedPhotoURL = AuthService.getGoogleProfilePhoto();
                setUserImg(storedPhotoURL || UserImg);
            }
        } catch (error) {
            toast.error('Erro ao obter os dados do Usuário');
            navigate('/login');
            AuthService.logout();
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === 'name') {
            const firstName = value.split(' ')[0];
            setUsername(firstName);
        }
    };

    const handleEditProfile = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleViewHistory = () => {
        setEndereco(false);
    };
    
    const handleViewEndereco = () => {
        setEndereco(true);
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

    const handleSaveChanges = async () => {
        const cliente = {
            nome: form.name
        }
        await updateCliente(cliente);
        setIsEditing(!isEditing);
        toast.success('Dados atualizados!');
    };

    return (
        <section className="userContainer">
            <section>
                <div className="userData">
                    <div className="user">
                        <img src={userImg} alt="user" />
                        <h3>{username}</h3>
                    </div>
                    <div className="configUser">
                        <ToolTip message="Editar Perfil">
                            <FaRegEdit
                                className="icon"
                                onClick={handleEditProfile}
                            />
                        </ToolTip>
                        <ToolTip message="Fazer Logout">
                            <MdLogout className="icon" onClick={onLogout} />
                        </ToolTip>
                    </div>
                </div>

                <hr className="lineUser" />

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
                            {errors.name && (
                                <span className="invalid">{errors.name}</span>
                            )}
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
                            {errors.email && (
                                <span className="invalid">{errors.email}</span>
                            )}
                        </p>
                    </div>
                    <div className="containerButtons">
                        <div className="updateButtons">
                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                disabled={!isEditing}
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <hr />
            <section>
                {AuthService.getRole() === 'CLIENTE' ? (
                    <div className="clientePage">
                        <div className="selectBtn">
                            <button
                                type="button"
                                className="btnView"
                                onClick={handleViewEndereco}
                            >
                                Endereços
                            </button>
                            <button
                                type="button"
                                className="btnView"
                                onClick={handleViewHistory}
                            >
                                Pedido
                            </button>
                        </div>
                        {endereco ? (
                            <button
                                type="button"
                                onClick={() => handleShowModal('endereco')}
                            >
                                Adicionar Endereço
                            </button>
                        ) : (
                            <div className="historyOrders">
                                <HistoricoCompras compras={historicoExemplo} />
                            </div>
                        )}
                    </div>
                ) : AuthService.getRole() === 'ADMIN' ? (
                    <div className="adminPage">
                        <button
                            type="button"
                            onClick={() => handleShowModal('addProduto')}
                        >
                            Adicionar Produto
                        </button>
                        <button
                            type="button"
                            onClick={() => handleShowModal('addFuncionario')}
                        >
                            Adicionar Funcionário
                        </button>
                        <button
                            type="button"
                            onClick={() => handleShowModal('addFornecedor')}
                        >
                            Adicionar Fornecedor
                        </button>
                    </div>
                ) : (
                    <div className="funcionarioPage">
                        <button
                            type="button"
                            onClick={() => handleShowModal('addProduto')}
                        >
                            Adicionar Produto
                        </button>
                        <button
                            type="button"
                            onClick={() => handleShowModal('addFornecedor')}
                        >
                            Adicionar Fornecedor
                        </button>
                    </div>
                )}
            </section>

            {showEmailModal && (
                <EmailModal onClose={() => handleCloseModal('email')} />
            )}

            {showPasswordModal && (
                <PasswordModal
                    onSave={handlePasswordSave}
                    onClose={() => handleCloseModal('password')}
                />
            )}

            {showEnderecoModal && (
                <EnderecoModal
                    // onSave={handleEnderecoSave}
                    onClose={() => handleCloseModal('endereco')}
                />
            )}

            {showAddProdutoModal && (
                <AddProdutoModal
                    onClose={() => handleCloseModal('addProduto')}
                />
            )}

            {showAddFuncionarioModal && (
                <AddFuncionarioModal
                    tipoEntidade="funcionario"
                    onClose={() => handleCloseModal('addFuncionario')}
                />
            )}

            {showAddFornecedorModal && (
                <AddFornecedorModal
                    tipoEntidade="fornecedor"
                    onClose={() => handleCloseModal('addFornecedor')}
                />
            )}
        </section>
    );
};

// Mapeamento do estado e das ações do Redux
const mapStateToProps = (state) => ({
    userImg: state.user.userImg,
});

const mapDispatchToProps = {
    setUserImg,
};

// Conectar o componente ao Redux
export default connect(mapStateToProps, mapDispatchToProps)(User);
