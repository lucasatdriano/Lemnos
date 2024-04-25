import React, { useState } from 'react';
import './cart.scss';
import { MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaMinus, FaPlus  } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

export function Cart() {
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const priceDelivery = 24.99; 

    const [carrinho, setCarrinho] = useState([
        { id: 1, nome: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)', quantidade: 1, precoUnitario: 1799.99 },
        { id: 2, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
        { id: 3, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
        { id: 4, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
        { id: 5, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
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
                                        <button type='button' className='buttonQtd' id='minusQtd'>
                                            <FaMinus />
                                        </button>
                                        <h4 id='qtdNumber'>1</h4>
                                        <button type='button' className='buttonQtd' id='plusQtd'>
                                            <FaPlus />
                                        </button>
                                    </p>
                                    <h4 className='priceProduct'>{BRL.format(item.quantidade * item.precoUnitario)}</h4>
                                    <p>
                                        <button className="btnRemove" onClick={() => handleRemoverItem(item.id)}>
                                            <TiDeleteOutline />
                                        </button>
                                    </p>
                                </div>                     
                            </li>
                        ))}
                    </ul>
                    <button type="button" className='cleanCart'>
                        Limpar Carrinho 
                        <MdDelete className='icon'/>
                    </button>
                    <div className='delivery'>
                        <h4>Calcular Entrega</h4>
                        <hr />
                        <div className="inputCep">
                            <input type='text' placeholder='Digite seu CEP' />
                            <button type="button" className='calcDelivery'>
                                Calcular
                                <TbTruckDelivery className='icon'/>
                            </button>
                            <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target='_blank' className='SearchCep'>Não sei meu CEP</a>
                        </div>
                       
                    </div>
                </div>
                <div className='resumeBuy'>
                    <h3>Resumo</h3>
                    <hr />
                    <div className='values'>
                        <p>SubTotal:</p>
                        <p>{BRL.format(calcularTotal())}</p>
                    </div>
                    <hr />
                    <div className='values'>
                        <p>Entrega:</p>
                        <p>{BRL.format(priceDelivery)}</p>
                    </div>
                    <hr />
                    <div className='values'>
                        <strong>Total:</strong> 
                        <strong>{BRL.format(calcularTotal() + priceDelivery)}</strong>
                    </div>
                    <hr />
                    <div className='paymentOptions'>
                        <div className='options'>
                            {/* icon */}
                            <p>
                                <strong>{BRL.format(calcularTotal())}</strong> <br />
                                em 12x de <span>{BRL.format(calcularTotal() / 12)}</span> s/ juros
                            </p>
                        </div>
                        <div className='options'>
                            {/* icon */}
                            <p>
                                <strong>{BRL.format(calcularTotal() - (calcularTotal() / 100 * 15))}</strong> <br />
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