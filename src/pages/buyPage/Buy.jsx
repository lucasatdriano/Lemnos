/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdInfoOutline } from 'react-icons/md';
import { RiShoppingCartLine } from 'react-icons/ri';
import { BsTruck } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa6';
import { PiFileMagnifyingGlass } from 'react-icons/pi';
import { IoCart } from 'react-icons/io5';
import ModalCompleted from './components/ModalCompleted';
import './buy.scss';
import AuthService from '../../services/AuthService';
import { listarCarrinho } from '../../services/UsuarioProdutoService';
import { getCliente } from '../../services/ClienteService';
import { getProdutoById } from '../../services/ProdutoService';

const BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

// Função para formatar CPF
const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para formatar CEP
const formatCEP = (cep) => {
    if (!cep) return '';
    return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
};

export default function BuyPage() {
    const [isModalCompleted, setIsModalCompleted] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [cliente, setCliente] = useState({});
    const [clienteEndereco, setClienteEndereco] = useState({});
    const [valorCompra, setValorCompra] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [loading, setLoading] = useState(true);

    const frete = useSelector((state) => state.frete);
    const selectedPaymentMethod = useSelector(
        (state) => state.payment.selectedPaymentMethod
    );
    const selectedAddress = useSelector(
        (state) => state.payment.selectedAddress
    );
    const descontoRedux = useSelector((state) => state.payment.desconto);

    async function fetchPedido() {
        try {
            if (AuthService.isLoggedIn()) {
                const pedidoResponse = await listarCarrinho();
                const clienteResponse = await getCliente();

                setValorCompra(pedidoResponse.valorTotal);
                setDesconto(descontoRedux);
                setPedido(pedidoResponse || []);
                setCliente(clienteResponse || {});
                setClienteEndereco(clienteResponse.enderecos[0] || {});

                if (pedidoResponse.length === 0) {
                    setCarrinho([]);
                    return;
                }
                const carrinhoDetalhado = await Promise.all(
                    pedidoResponse.produtos.map(async (produto) => {
                        const detalhesProduto = await getProdutoById(
                            produto.id
                        );
                        return { ...produto, ...detalhesProduto };
                    })
                );
                setCarrinho(
                    Array.isArray(carrinhoDetalhado) ? carrinhoDetalhado : []
                );
            }
        } catch (error) {
            console.error('Erro ao obter itens do pedido:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPedido();
    }, []);

    const handleOpenModal = () => {
        setIsModalCompleted(!isModalCompleted);
    };

    return (
        <>
            <main>
                <div className="statusOrder">
                    <div className="status">
                        <IoCart className="iconStatus" />
                        <p>Carrinho</p>
                    </div>
                    <span></span>
                    <div className="status">
                        <FaCreditCard className="iconStatus" />
                        <p>Pagamento</p>
                    </div>
                    <span></span>
                    <div className="status">
                        <FaCheckCircle className="iconStatus" />
                        <p>Confirmação</p>
                    </div>
                </div>
                <div className="loadingDelivery">
                    <div className="loadingBackground"></div>
                    <div className="loadingProgress"></div>
                </div>
                <section className="sectionOrder">
                    <div className="divOrder">
                        <div className="personalData">
                            <div className="titleContainers">
                                <MdInfoOutline className="iconOrder" />
                                <h3>Dados do Cliente</h3>
                            </div>
                            <hr className="hrTitle" />
                            <div className="dataContainer">
                                <div>
                                    <h4 className="titleData">
                                        Dados Pessoais
                                    </h4>
                                    <div className="dataPerson">
                                        <p>Nome: {cliente.nome || ''}</p>
                                        <p>
                                            CPF: {formatCPF(cliente.cpf) || ''}
                                        </p>
                                        <p>Email: {cliente.email || ''}</p>
                                    </div>
                                </div>
                                <hr className="hrData" />
                                <div className="enderecoContainer">
                                    <h4 className="titleData">Endereço</h4>
                                    <div className="dataEnd">
                                        <p>
                                            CEP:{' '}
                                            {formatCEP(selectedAddress.cep) ||
                                                ''}
                                        </p>
                                        <p>
                                            Logradouro:{' '}
                                            {selectedAddress.logradouro || ''}
                                        </p>
                                        <p>
                                            Estado: {selectedAddress.uf || ''}
                                        </p>
                                        <p>
                                            Bairro:{' '}
                                            {selectedAddress.bairro || ''}
                                        </p>
                                        <p>
                                            Cidade:{' '}
                                            {selectedAddress.cidade || ''}
                                        </p>
                                        <p>
                                            Número:{' '}
                                            {selectedAddress.numeroLogradouro ||
                                                ''}
                                        </p>
                                        <p>
                                            Complemento:{' '}
                                            {selectedAddress.complemento || ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shippingCart">
                            <div className="cart">
                                <div className="titleContainers">
                                    <RiShoppingCartLine className="iconOrder" />
                                    <h3>Carrinho</h3>
                                </div>
                                <hr className="hrTitle" />
                                <table className="dataProduct">
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Produto</th>
                                            <th>Quantidade</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrinho.map((produto, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        src={
                                                            produto.imagemPrincipal
                                                        }
                                                        alt={produto.nome}
                                                    />
                                                </td>
                                                <td>
                                                    <p>{produto.nome}</p>
                                                </td>
                                                <td>{produto.qntdProduto}</td>
                                                <td>
                                                    {BRL.format(
                                                        produto.valorTotal
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="delivery">
                                <div className="titleContainers">
                                    <BsTruck className="iconOrder" />
                                    <h3>Frete</h3>
                                </div>
                                <hr className="hrTitle" />
                                <div className="dataDelivery">
                                    <div>
                                        <p>
                                            {frete.metodo}:{' '}
                                            <span>
                                                Chegará até{' '}
                                                {frete.dataEstimadaEnvio}
                                            </span>
                                        </p>
                                        <p className="term">
                                            Prazo de entrega: Em até{' '}
                                            {frete.prazoEntrega} dias.
                                        </p>
                                    </div>
                                    <p>{BRL.format(frete.custo)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="orderSummary">
                        <div className="titleContainers">
                            <PiFileMagnifyingGlass className="iconOrder" />
                            <h3>Resumo</h3>
                        </div>
                        <hr className="hrTitle" />
                        <div className="dataResume">
                            <div className="lineOrder">
                                <p>Valor do Produto:</p>
                                <p>{BRL.format(valorCompra)}</p>
                            </div>
                            <hr className="hrResume" />
                            <div className="lineOrder">
                                <p>Desconto:</p>
                                <p className="discount">
                                    -{BRL.format(desconto)}
                                </p>
                            </div>
                            <hr className="hrResume" />
                            <div className="lineOrder">
                                <p>Frete:</p>
                                <p>{BRL.format(frete.custo)}</p>
                            </div>
                            <hr className="hrResume" />
                            <div className="lineOrder">
                                <p>Forma de Pagamento:</p>
                                <p>{selectedPaymentMethod}</p>
                            </div>
                            <hr className="hrResume" />
                            <h2>
                                {BRL.format(
                                    valorCompra - desconto + frete.custo
                                )}
                            </h2>
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="confirmOrder"
                            >
                                Confirmar Pedido
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            {isModalCompleted && (
                <ModalCompleted onClose={() => setIsModalCompleted(false)} />
            )}
        </>
    );
}
