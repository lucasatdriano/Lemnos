import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.scss';
import { MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaMinus, FaPlus, FaRegCreditCard, FaBarcode } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

export function Cart() {
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [cep, setCep] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('');

    let priceDelivery = 0;

    switch (deliveryOption) {
        case 'sedex':
            priceDelivery = 26.99;
            break;
        case 'jadlog':
            priceDelivery = 32.99;
            break;
        case 'express':
            priceDelivery = 45.99;
            break;
        default:
            priceDelivery = 0;
    }

    const handleDeliveryOptionChange = (option) => {
        setDeliveryOption(option);
    };

    const [carrinho, setCarrinho] = useState([
        { id: 1, nome: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)', quantidade: 1, precoUnitario: 1799.99 },
        { id: 2, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
        { id: 3, nome: 'Produto B', quantidade: 1, precoUnitario: 30 },
    ]);

    const handleCepChange = (event) => {
        let formattedCep = event.target.value.replace(/\D/g, '');
        if (formattedCep.length > 5) {
            formattedCep = formattedCep.replace(/^(\d{5})(\d)/, '$1-$2');
        } 
        setCep(formattedCep);
        if (cep.length !== 10) {
            setShowOptions(false);
        }
    }

    const handleCalculateDelivery = () => {
        if (cep.length === 9 && cep.match(/^\d{5}-\d{3}$/)) {
            setShowOptions(true);
        } else {
            setShowOptions(false);
        }
    }

    const calcularSubTotal = () => {
        return carrinho.reduce((total, item) => total + (item.quantidade * item.precoUnitario), 0);
    }

    const calcularTotal = () => {
        return calcularSubTotal() + priceDelivery;
    }

    const handleRemoverItem = (id) => {
        const novoCarrinho = carrinho.filter(item => item.id !== id);
        setCarrinho(novoCarrinho);
    }

    const handleAlterarQuantidade = (id, operacao) => {
        const novoCarrinho = carrinho.map(item => {
            if (item.id === id) {
                let novaQuantidade = item.quantidade;
                if (operacao === 'aumentar') {
                    novaQuantidade++;
                } else if (operacao === 'diminuir' && novaQuantidade > 1) {
                    novaQuantidade--;
                }
                return { ...item, quantidade: novaQuantidade };
            }
            return item;
        });
        setCarrinho(novoCarrinho);
    }

    const limparCarrinho = () => {
        setCarrinho([]);
    }

    const finalizarPedido = () => {
        if (carrinho.length === 0) {
            alert("Por favor, adicione algum item no carrinho.");
        } else if(cep.length !== 9) {
            alert("Por favor, adicione o seu CEP.")
        } else if (deliveryOption === '') {
            alert("Por favor, selecione uma opção de entrega.");
        } else {
            limparCarrinho();
            setShowOptions(false);
            setDeliveryOption('');
            setCep('');
            alert("Compra finalizada com sucesso!");
        }
    }

    return (
        <main>
            <div className="title">
                <hr className='hrTitle'/>
                    <h2>Meu Carrinho</h2>
                <hr className='hrTitle'/>
            </div>
            <section className='containerMain'>
                <div className='containerCart'>
                {carrinho.length === 0 ? (
                    <div className="emptyCartMessage">
                        <h2 className='textEmpty'>O seu carrinho está vazio.</h2>
                        <button className='btnBackBuy' onClick={() => navigate('/')}>Voltar para às compras</button>
                    </div>
                ) : (
                    <ul className='listCart'>
                        {carrinho.map(item => (
                            <li key={item.id} className='order'>
                                <div className='labels'>
                                    <p>Produto</p>
                                    <div className='labelsNumber'>
                                        <p>Quantidade</p>
                                        <p>Valor</p>
                                    </div>
                                </div>
                                <hr className='hrLabels'/>
                                <div className="productDesc">
                                    <img src="" alt="" />
                                    <h4 className='nameProduct'>{item.nome}</h4>
                                    <p className='amount'>
                                        <button 
                                        type='button' 
                                        className='buttonQtd' 
                                        id='minusQtd' 
                                        onClick={() => handleAlterarQuantidade(item.id, 'diminuir')}
                                        >
                                            <FaMinus />
                                        </button>
                                        <h4 id='qtdNumber'>{item.quantidade}</h4>
                                        <button 
                                        type='button' 
                                        className='buttonQtd' 
                                        id='plusQtd' 
                                        onClick={() => handleAlterarQuantidade(item.id, 'aumentar')}
                                        >
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
                    )}
                    <button type="button" className='cleanCart' onClick={limparCarrinho}>
                        Limpar Carrinho 
                        <MdDelete className='icon'/>
                    </button>
                    <div className='delivery'>
                        <h4>Calcular Entrega</h4>
                        <hr className='hrDelivery'/>
                        <div className="inputCep">
                            <input
                                type="text"
                                placeholder="Digite seu CEP"
                                value={cep}
                                onChange={handleCepChange}
                                maxLength={9}
                                pattern="\d{5}-?\d{3}"
                            />
                            <button type="button" className='calcDelivery' onClick={handleCalculateDelivery}>
                                Calcular
                                <TbTruckDelivery className='icon'/>
                            </button>
                            <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target='_blank' className='SearchCep'>Não sei meu CEP</a>
                        </div>
                        {showOptions && (
                            <div>
                                <div className='optionsDelivery'>
                                    <label class="radio-container">
                                        <input 
                                            type="radio" name="optionsDel" id="rbSedex" className='rbDelivery'
                                            onClick={() => handleDeliveryOptionChange('sedex')} 
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label htmlFor='rbSedex' className='labelOp'>
                                        <strong>Sedex:</strong>
                                        <p>Prazo de entrega: até 7 dias úteis</p>
                                    </label> 
                                    <strong>{BRL.format(26.99)}</strong>
                                </div>
                                <div className='optionsDelivery'>
                                    <label class="radio-container">
                                        <input 
                                            type="radio" name="optionsDel" id="rbJadLog" className='rbDelivery'
                                            onClick={() => handleDeliveryOptionChange('jadlog')}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label htmlFor='rbJadLog' className='labelOp'>
                                        <strong>JadLog:</strong>
                                        <p>Prazo de entrega: até 5 dias úteis</p>
                                    </label>  
                                    <strong>{BRL.format(32.99)}</strong>
                                </div>
                                <div className='optionsDelivery'>
                                    <label class="radio-container">
                                        <input 
                                            type="radio" name="optionsDel" id="rbExpress" className='rbDelivery'
                                            onClick={() => handleDeliveryOptionChange('express')}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label htmlFor='rbExpress' className='labelOp'>
                                        <strong>Express:</strong>
                                        <p>Prazo de entrega: até 12 dias úteis</p>
                                    </label> 
                                    <strong>{BRL.format(45.99)}</strong>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='resumeBuy'>
                    <h3>Resumo</h3>
                    <hr className='hrResume'/>
                    <div className='values'>
                        <p>SubTotal:</p>
                        <p>{BRL.format(calcularSubTotal())}</p>
                    </div>
                    <hr className='hrValues'/>
                    <div className='values'>
                        <p>Entrega:</p>
                        <p>{BRL.format(priceDelivery)}</p>
                    </div>
                    <hr className='hrValues'/>
                    <div className='values'>
                        <strong>Total:</strong> 
                        <strong>{BRL.format(calcularTotal())}</strong>
                    </div>
                    <hr className='hrOptions'/>
                    <div className='paymentOptions'>
                        <div className='options'>
                            <FaRegCreditCard className='icon'/>
                            <p>
                                <strong>{BRL.format(calcularTotal())}</strong> <br />
                                em 12x de <span>{BRL.format(calcularTotal() / 12)}</span> s/ juros
                            </p>
                        </div>
                        <div className='options'>
                            <FaBarcode className='icon'/>
                            <p>
                                <strong>{BRL.format(calcularTotal() - (calcularTotal() / 100 * 15))}</strong> <br />
                                com desconto à vista no boleto ou pix
                            </p>
                        </div>
                    </div>
                    <button type="button" className='endOrder' onClick={() => finalizarPedido()}>Finalizar Pedido</button>
                </div>
            </section>
        </main>
    );
}