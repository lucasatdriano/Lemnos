import React, { useState } from 'react';
import './CarrinhoDeCompras.css'; // Importe seu arquivo CSS de estilos

export function CarrinhoDeCompras() {
    const [carrinho, setCarrinho] = useState([
        { id: 1, nome: 'Produto A', quantidade: 2, precoUnitario: 50 },
        { id: 2, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
        // Adicione mais itens ao carrinho conforme necessário
    ]);

    const calcularTotal = () => {
        return carrinho.reduce((total, item) => total + (item.quantidade * item.precoUnitario), 0);
    }

    const handleRemoverItem = (id) => {
        const novoCarrinho = carrinho.filter(item => item.id !== id);
        setCarrinho(novoCarrinho);
    }

    const handleAlterarQuantidade = (id, novaQuantidade) => {
        const novoCarrinho = carrinho.map(item => {
            if (item.id === id) {
                return { ...item, quantidade: novaQuantidade };
            }
            return item;
        });
        setCarrinho(novoCarrinho);
    }

    return (
        <section>
            <div className="title">
                <hr />
                    <h2>Meu Carrinho</h2>
                <hr />
            </div>
            <div>
                <div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <button type="button">Limpar Carrinho {/* icon */}</button>
                    <div>
                        <h4>Calcular Entrega</h4>
                        <hr />
                    </div>
                </div>
                <div>
                    <h3>Resumo</h3>
                    <hr />
                    <div>
                        <p>SubTotal:</p>
                        <p>R$ 1.799,99</p>
                    </div>
                    <hr />
                    <div>
                        <p>Entrega:</p>
                        <p>R$ 24,90</p>
                    </div>
                    <hr />
                    <div>
                        <strong>Total:</strong> 
                        <strong>R$ {calcularTotal().toFixed(2)}</strong>
                    </div>
                    <hr />
                    <div>
                        <div>
                            {/* icon */}
                            <p>
                                <strong>R$ 1.799,99</strong> <br />
                                em 12x de <span>R$ 162,99</span> s/ juros
                            </p>
                        </div>
                        <div>
                            {/* icon */}
                            <p>
                                <strong>R$ 1.529,99</strong> <br />
                                com desconto à vista no boleto ou pix
                            </p>
                        </div>
                    </div>
                    <button type="button">Finalizar Pedido</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {carrinho.map(item => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.quantidade}
                                    onChange={(e) => handleAlterarQuantidade(item.id, parseInt(e.target.value))}
                                />
                            </td>
                            <td>R$ {item.quantidade * item.precoUnitario}</td>
                            <td>
                                <button className="botao-acao" onClick={() => handleRemoverItem(item.id)}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}