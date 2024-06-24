import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import UserImg from '../../assets/imgLemnos/imgUser.svg';
import ToolTip from '../../components/tooltip/ToolTip';
import CustomInput from '../../components/inputs/customInput/Inputs';
import EnderecoModal from './components/modals/EnderecoModal';
import HistoricoCompras from './components/order/Order';
import AddProdutoModal from './components/modals/admin/AddProductModal';
import AddFornecedorModal from './components/modals/admin/AddFornModal';
import AddFuncionarioModal from './components/modals/admin/AddFuncModal';
import { auth } from '../../services/configurations/FirebaseConfig';
import { toast } from 'react-toastify';
import { MdLogout } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { setUserImg } from '../../store/actions/userActions';
import { getCliente, updateCliente } from '../../services/ClienteService';
import {
    getFuncionarioByToken,
    updateFuncionario,
} from '../../services/FuncionarioService';
import Loading from '../../components/loading/Loading';

const User = ({ onLogout, userImg, setUserImg }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [selectedEndereco, setSelectedEndereco] = useState(null);
    const [selectedCep, setSelectedCep] = useState(null);
    const [isEnderecoSelected, setIsEnderecoSelected] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showEnderecoModal, setShowEnderecoModal] = useState(false);
    const [endereco, setEndereco] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showAddProdutoModal, setShowAddProdutoModal] = useState(false);
    const [showAddFuncionarioModal, setShowAddFuncionarioModal] = useState(false);
    const [showAddFornecedorModal, setShowAddFornecedorModal] = useState(false);
    const [form, setForm] = useState({
        nome: '',
        email: '',
        enderecos: [],
    });

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
    }, [setUserImg]);

    useEffect(() => {
        const storedPhotoURL = localStorage.getItem('userImg');
        if (storedPhotoURL) {
            setUserImg(storedPhotoURL);
        } else {
            setUserImg(UserImg);
        }
    }, [setUserImg]);

    async function fetchUsuario() {
        setLoading(true);
        try {
            const usuario =
                AuthService.getRole() === 'CLIENTE'
                    ? await getCliente()
                    : await getFuncionarioByToken();

            const updatedForm = {
                nome: usuario.nome,
                email: usuario.email,
                enderecos:
                    usuario.enderecos?.map((endereco) => ({
                        cep: endereco.cep,
                        logradouro: endereco.logradouro,
                        estado: endereco.uf,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        numero: endereco.numeroLogradouro,
                        complemento: endereco.complemento,
                    })) || [],
            };

            setForm(updatedForm);
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
            console.error('Erro ao obter os dados do Usuário', error);
            navigate('/login');
            AuthService.logout();
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === 'nome') {
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
        setShowEnderecoModal(false);
        setShowAddProdutoModal(false);
        setShowAddFuncionarioModal(false);
        setShowAddFornecedorModal(false);
        const htmlTag = document.querySelector('html');
        htmlTag.classList.remove('modalOpen');
    };

    const handleSaveChanges = async () => {
        const usuario = {
            nome: form.nome,
            email: form.email,
        };

        if (AuthService.getRole() === 'CLIENTE') {
            await updateCliente(usuario);
        } else {
            await updateFuncionario(usuario);
        }

        setIsEditing(!isEditing);
        toast.success('Dados atualizados!');
    };

    const handleSelectEndereco = (index, cep) => {
        if(selectedEndereco == index) {
            setSelectedEndereco(null);
            setSelectedCep(null);
            setIsEnderecoSelected(false);
        } else {
            setSelectedEndereco(index);
            setSelectedCep(cep);
            setIsEnderecoSelected(true);
        }
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
                                id="nome"
                                name="nome"
                                maxLength={40}
                                minLength={5}
                                value={form.nome}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
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

            <hr className="hrSeparate" />
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
                                Pedidos
                            </button>
                        </div>
                        {endereco ? (
                            form.enderecos.length >= 1 ? (
                                <div className="allEnderecos">
                                    <h2>Endereços</h2>
                                    {form.enderecos.map((endereco, index) => (
                                        <div
                                            key={index}
                                            className={`dataEnd ${selectedEndereco === index ? 'selected' : ''}`}
                                            onClick={() => handleSelectEndereco(index, endereco.cep)}
                                        >
                                            <p>{endereco.logradouro || ''}</p>
                                            <p><span className="fixo">Número:</span> {endereco.numero || ''}, {endereco.complemento || ''}</p>
                                            <p><span className="fixo">CEP:</span> {endereco.cep || ''} - {endereco.cidade || ''}, {endereco.estado || ''}</p>
                                        </div>
                                    ))}
                                    {form.enderecos.length < 3 && (
                                        isEnderecoSelected 
                                        ? (
                                            <div className='buttons'>
                                                <button type="button" onClick={() => toast.warn("Não implementado")}>
                                                    Apagar Endereço
                                                </button>
                                                <button type="button" onClick={() => toast.warn("Não implementado")}>
                                                    Alterar Endereço
                                                </button>
                                            </div>
                                        )
                                        : (
                                            <button type="button" onClick={() => handleShowModal('endereco')}>
                                                Adicionar mais um Endereço
                                            </button>
                                        )
                                    )}
                                </div>
                            ) : (
                                <button type="button" onClick={() => handleShowModal('endereco')}>
                                    Adicionar Endereço
                                </button>
                            )
                        ) : (
                            <div className="historyOrders">
                                <HistoricoCompras />
                            </div>
                        )}
                    </div>
                ) : AuthService.getRole() === 'ADMIN' ? (
                    <div className="adminPage">
                        <hr className="hrFuncionario" />
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
                        <hr className="hrFuncionario" />
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

            {showEnderecoModal && (
                <EnderecoModal onClose={() => handleCloseModal('endereco')} />
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

const mapStateToProps = (state) => ({
    userImg: state.user.userImg,
});

const mapDispatchToProps = {
    setUserImg,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
