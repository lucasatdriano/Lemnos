import React, { useState } from 'react';
import './cart.scss';

export function Cart() {
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

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
            <div className='containerMain'>
                <div className='containerCart'>
                    <ul className='listCart'>
                        {carrinho.map(item => (
                            <li key={item.id} className='order'>
                                <div className='labels'>
                                    <p>Produto</p>
                                    <p>Quantidade</p>
                                    <p>Valor</p>
                                </div>
                                <hr />
                                <div className="productDesc">
                                    <img src="" alt="" />
                                    <h4 className='nameProduct'>{item.nome}</h4>
                                    <p className='amount'>
                                        <button type='button' className='buttonQtd' id='minusQtd'>-</button>
                                        <h4 id='qtdNumber'>1</h4>
                                        <button type='button' className='buttonQtd' id='plusQtd'>+</button>
                                        <input
                                            type="number"
                                            value={item.quantidade}
                                            onChange={(e) => handleAlterarQuantidade(item.id, parseInt(e.target.value))}
                                        />
                                    </p>
                                    <h4 className='priceProduct'>{BRL.format(item.quantidade * item.precoUnitario)}</h4>
                                    <p>
                                        <button className="btnRemove" onClick={() => handleRemoverItem(item.id)}> {/* icon */}Remover</button>
                                    </p>
                                </div>                     
                            </li>
                        ))}
                    </ul>
                    <button type="button" className='cleanCart'>
                        Limpar Carrinho 
                        {/* icon */}
                    </button>
                    <div className='delivery'>
                        <h4>Calcular Entrega</h4>
                        <hr />
                        <div className="inputCep">
                            <input type='text' placeholder='Digite seu CEP' />
                            <button type="button">Calcular</button>
                        </div>
                    </div>
                </div>
                <div className='resumeBuy'>
                    <h3>Resumo</h3>
                    <hr />
                    <div className='values'>
                        <p>SubTotal:</p>
                        <p>R$ 1.799,99</p>
                    </div>
                    <hr />
                    <div className='values'>
                        <p>Entrega:</p>
                        <p>R$ 24,90</p>
                    </div>
                    <hr />
                    <div className='values'>
                        <strong>Total:</strong> 
                        <strong>R$ {calcularTotal().toFixed(2)}</strong>
                    </div>
                    <hr />
                    <div className='paymentOptions'>
                        <div className='options'>
                            {/* icon */}
                            <p>
                                <strong>R$ 1.799,99</strong> <br />
                                em 12x de <span>R$ 162,99</span> s/ juros
                            </p>
                        </div>
                        <div className='options'>
                            {/* icon */}
                            <p>
                                <strong>R$ 1.529,99</strong> <br />
                                com desconto à vista no boleto ou pix
                            </p>
                        </div>
                    </div>
                    <button type="button" className='endOrder'>Finalizar Pedido</button>
                </div>
            </div>
        </section>
    );
}