/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import OrderModal from '../modals/orderModal/OrderModal';
import './order.scss';
import { listarPedido } from '../../../../services/UsuarioProdutoService';
import { getProdutoById } from '../../../../services/ProdutoService';
import Loading from '../../../../components/loading/Loading';

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
            <h2>Histórico de Pedidos</h2>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {pedidos &&
                        pedidos
                            .slice(0, mostrarMais ? pedidos.length : 3)
                            .map((pedido, index) => (
                                <ul className="listItens" key={index}>
                                    <li
                                        onClick={() => handleAbrirModal(pedido)}
                                        className="itensCompra"
                                    >
                                        <h3 className="namesProducts">
                                            Produtos: {pedido.produtos[0].nome}
                                            ...
                                        </h3>
                                        <h3>
                                            Status do pedido: {pedido.status}...
                                        </h3>
                                        <h3>
                                            Valor Total:{' '}
                                            {BRL.format(pedido.valorPedido)}
                                        </h3>
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
