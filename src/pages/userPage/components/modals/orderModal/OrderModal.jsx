/* eslint-disable react/prop-types */
import './orderModal.scss';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getPedido } from '../../../../../services/UsuarioProdutoService';
import { getProdutoById } from '../../../../../services/ProdutoService';

const BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

export default function OrderModal({ pedido, onClose }) {
    const [detalhesCompra, setDetalhesCompra] = useState([]);

    useEffect(() => {
        async function fetchDetalhesCompra(idPedido) {
            try {
                const pedidoDetalhado = await getPedido(idPedido);

                const descricao = pedidoDetalhado.descricao;
                const items = descricao.split('\n').filter(Boolean);

                const detalhesProdutos = await Promise.all(
                    items.map(async (item) => {
                        const [idProduto, quantidade] = item.split(', ');
                        const detalhesProduto = await getProdutoById(idProduto);
                        return {
                            id: idProduto,
                            quantidade: Number(quantidade),
                            ...detalhesProduto,
                        };
                    })
                );

                const detalhesCompraAtualizado = {
                    ...pedidoDetalhado,
                    produtos: detalhesProdutos,
                };
                setDetalhesCompra(detalhesCompraAtualizado);
                console.log(detalhesCompra);
            } catch (error) {
                console.error('Erro ao obter detalhes da compra:', error);
            }
        }

        if (pedido && pedido.id) {
            fetchDetalhesCompra(pedido.id);
        }
    }, [pedido]);

    if (!detalhesCompra) {
        return null;
    }

    console.log(detalhesCompra);

    return (
        <div className="modal" onClick={onClose}>
            <div
                className="containerModalOrder"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Informações do Pedido</h2>
                <section className="sectionOrderModal">
                    <div className="containerDetailsOrder">
                        <h3 className="titleOrder">Detalhe do Pedido:</h3>
                        <div className="detailsTable">
                            <p className="labelDetails">Status do Pedido</p>
                            <p>{detalhesCompra.status}</p>
                            <p className="labelDetails">Forma de Pagamento</p>
                            <p>{detalhesCompra.metodoPagamento}</p>
                            <p className="labelDetails">
                                Quantidade de Produtos
                            </p>
                            <p>{detalhesCompra.qtdProdutos}</p>
                            <p className="labelDetails">Data do Pedido</p>
                            <p>{formatarData(detalhesCompra.dataPedido)}</p>
                            <p className="labelDetails">Valor Total</p>
                            <p>
                                {BRL.format(
                                    detalhesCompra.valorPedido +
                                        detalhesCompra.valorFrete
                                )}
                            </p>
                        </div>
                    </div>
                    <ul className="containerProductsOrder">
                        <h3 className="titleOrder">Produtos:</h3>
                        {detalhesCompra.produtos &&
                            detalhesCompra.produtos.map((produto, index) => (
                                <li key={index} className="purchasedProducts">
                                    <div className="infosProduct">
                                        <img
                                            src={produto.imagemPrincipal}
                                            alt={produto.nome}
                                            className="imgProduct"
                                        />
                                        <div className="dataProduct">
                                            <h4 className="nameProduct">
                                                {produto.nome}
                                            </h4>
                                            <p>
                                                Categoria: {produto.categoria}
                                            </p>
                                            <p>
                                                SubCategoria:{' '}
                                                {produto.subCategoria}
                                            </p>
                                            <p>Marca: {produto.fabricante}</p>
                                            <p>
                                                Quantidade Comprada:{' '}
                                                {produto.quantidade}
                                            </p>
                                        </div>
                                    </div>
                                    <h4 className="priceProduct">
                                        Preço:{' '}
                                        {BRL.format(produto.valorComDesconto)}
                                    </h4>
                                </li>
                            ))}
                    </ul>
                </section>
                <IoClose onClick={onClose} className="iconClose" />
            </div>
        </div>
    );
}
