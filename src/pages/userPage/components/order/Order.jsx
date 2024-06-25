/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import OrderModal from '../modals/orderModal/OrderModal';
import './order.scss';
import { listarPedido } from '../../../../services/UsuarioProdutoService';
import { getProdutoById } from '../../../../services/ProdutoService';
import Loading from '../../../../components/loading/Loading';

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

export default function historicoCompras() {
    const BRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    const [mostrarMais, setMostrarMais] = useState(false);
    const [compraSelecionada, setCompraSelecionada] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pedidos, setPedidos] = useState([]);

    async function fetchPedidos() {
        setLoading(true);
        try {
            const pedidosResponse = await listarPedido();

            if (!pedidosResponse || pedidosResponse.length === 0) {
                console.error('A resposta de pedidos está vazia.');
                return;
            }

            const pedidosDetalhados = await Promise.all(
                pedidosResponse.map(async (pedido) => {
                    const descricao = pedido.descricao;
                    const items = descricao.split('\n').filter(Boolean);

                    const detalhesProdutos = await Promise.all(
                        items.map(async (item) => {
                            const [idProduto, quantidade] = item.split(', ');
                            const detalhesProduto =
                                await getProdutoById(idProduto);
                            return {
                                id: idProduto,
                                quantidade: Number(quantidade),
                                ...detalhesProduto,
                            };
                        })
                    );

                    return {
                        ...pedido,
                        produtos: detalhesProdutos,
                    };
                })
            );

            setPedidos(pedidosDetalhados);
        } catch (error) {
            console.error('Erro ao obter pedidos', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPedidos();
    }, []);

    const handleToggleMostrar = () => {
        setMostrarMais(!mostrarMais);
    };

    const handleAbrirModal = (pedido) => {
        setCompraSelecionada(pedido);
    };

    return (
        <div className="containerHistory">
            <h2>Pedidos</h2>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {pedidos &&
                        pedidos
                            .slice(0, mostrarMais ? pedidos.length : 3)
                            .map((pedido, index) => (
                                <ul className="listItens" key={index}>
                                    <li onClick={() => handleAbrirModal(pedido)} className="itensCompra">
                                        <p><span className='bold'>Data:</span> {formatarData(pedido.dataPedido)}</p>
                                        <hr />
                                        <div className="details">
                                            <p><span className='bold'>Pagamento</span><br />{pedido.metodoPagamento}</p>
                                            <p><span className='bold'>Status</span><br /><span className={pedido.status == "Pedido entregue" ? "greenStatus" : "statusColor"}>{pedido.status}</span></p>
                                            <p><span className='bold'>Valor</span><br />{BRL.format(pedido.valorPedido)}</p>
                                        </div>

                                    </li>
                                </ul>
                            ))}
                    {!mostrarMais && pedidos && pedidos.length > 3 && (
                        <a className="btnMost" onClick={handleToggleMostrar}>
                            Mostrar Mais
                        </a>
                    )}
                    {compraSelecionada && (
                        <OrderModal
                            pedido={compraSelecionada}
                            onClose={() => setCompraSelecionada(null)}
                        />
                    )}
                </>
            )}
        </div>
    );
}
