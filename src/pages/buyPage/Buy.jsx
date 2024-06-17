import { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { RiShoppingCartLine } from 'react-icons/ri';
import { BsTruck } from 'react-icons/bs';
import { PiFileMagnifyingGlass } from 'react-icons/pi';
import ModalCompleted from './components/ModalCompleted';
import './buy.scss';

export default function BuyPage() {
    const BRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    const [isModalCompleted, setIsModalCompleted] = useState(false);

    const handleOpenModal = () => {
        setIsModalCompleted(!isModalCompleted);
    };

    return (
        <>
            <main>
                <div className="loadingDelivery"></div>
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
                                        <p>Nome:</p>
                                        <p>CPF:</p>
                                        <p>Email:</p>
                                    </div>
                                </div>
                                <hr className="hrData" />
                                <div>
                                    <h4 className="titleData">Endereço</h4>
                                    <div className="dataEnd">
                                        <p>CEP:</p>
                                        <p>Logradouro:</p>
                                        <p>Estado:</p>
                                        <p>Bairro:</p>
                                        <p>Cidade:</p>
                                        <p>Número:</p>
                                        <p>Complemento:</p>
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
                                <ul>
                                    <li>
                                        <div className="dataProduct">
                                            <img src="" alt="" />
                                            <p>Nome do Produto</p>
                                        </div>
                                        <p>1</p>
                                        <p>{BRL.format(600)}</p>
                                    </li>
                                    <hr />
                                </ul>
                            </div>
                            <div className="delivery">
                                <hr className="hrTitle" />
                                <div className="titleContainers">
                                    <BsTruck className="iconOrder" />
                                    <h3>Frete</h3>
                                </div>
                                <hr className="hrTitle" />
                                <div className="dataDelivery">
                                    <p>
                                        Sedex:{' '}
                                        <span>Chegará até 23/06/2024</span>
                                        <p className="term">
                                            Prazo de entrega: em até 7 dias.
                                        </p>
                                    </p>
                                    <p>{BRL.format(26)}</p>
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
                                <p>{BRL.format(600)}</p>
                            </div>
                            <hr className="hrResume" />
                            <div className="lineOrder">
                                <p>Desconto:</p>
                                <p className="discount">-{BRL.format(30)}</p>
                            </div>
                            <hr className="hrResume" />
                            <div className="lineOrder">
                                <p>Frete:</p>
                                <p>{BRL.format(26)}</p>
                            </div>
                            <hr className="hrResume" />
                            <div className="lineOrder">
                                <p>Forma de Pagamento:</p>
                                <p>Boleto</p>
                            </div>
                            <hr className="hrResume" />
                            <h2>{BRL.format(570)}</h2>
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="confirmOrder"
                            >
                                Finalizar Pedido
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            {isModalCompleted && <ModalCompleted onClose={handleOpenModal} />}
        </>
    );
}
