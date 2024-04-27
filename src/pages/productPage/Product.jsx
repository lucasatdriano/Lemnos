import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './product.scss';

export function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [product, setProduct] = useState(null);

    const productData = {
        name: "Apple 27\" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)",
        price: 2049.99,
        Discount: 12,
        description: "Descrição do produto...",
        brand: "Apple",
        category: "Eletrônicos",
        subCategory: "Computadores",
        length: "50cm",
        height: "30cm",
        width: "20cm",
        weight: "5kg"
    };

    // useEffect(() => {
    //   // Aqui você faria uma solicitação para sua fonte de dados (API, banco de dados, etc.)
    //   // para buscar os detalhes do produto com base no ID fornecido na rota.
    //   // Suponha que você tenha uma função fetchProductById que retorna os detalhes do produto.
    //   fetchProductById(id)
    //     .then(data => setProduct(data))
    //     .catch(error => console.error('Error fetching product:', error));
    // }, [id]);
    
    // if (!product) {
    //     navigate('/Error404');
    //     return null;
    // }

    return (
        <section className="productContainer">
            <hr />
            <div className='containerMain'>
                <div className="containerImages">
                    <img src='' alt="img1" className='mainImage'/>
                    <div className="optionsImages">
                        <img src='' alt="img1" />
                        <img src='' alt="img2" />
                        <img src='' alt="img3" />
                        <img src='' alt="img4" />
                    </div>
                </div>
                <div className="containerInfos">
                    {/* icon favorite Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5) */}
                    <h3 className='productName'>{productData.name}</h3>
                    <p className='priceOrigin'>{BRL.format(productData.price)}</p>
                    <p className="productPrice">À vista <br />
                        <span>{BRL.format(productData.price - (productData.price / 100 * productData.Discount))}</span>
                    </p>
                    <p className='productPricePix'><span>{BRL.format( (productData.price - (productData.price / 100 * productData.Discount) - (productData.price - (productData.price / 100 * productData.Discount)) / 100 * 15) )}</span>  <br />
                        No PIX com 15% de desconto</p>
                    <p className='priceFees'>
                        Ou no Cartão <br />
                        Em até 12x de {BRL.format((productData.price - (productData.price / 100 * productData.Discount)) / 12)} sem juros no cartão
                    </p>
                    <button className='addCart'>
                        Adicionar ao Carrinho
                        {/* icon */}
                    </button>
                </div>
                <div className='containerDetails'>
                    <div className='containerDescription'>
                        <h3>Descrição do Produto</h3>
                        <p>{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}</p>
                    </div>
                    <div className='containerSpecifications'>
                        <p className='specification'>
                            <strong>Nome:</strong>
                            <p>{productData.name}</p>
                        </p>
                        <p className='specification'>
                            <strong>Marca:</strong>
                            <p>{productData.brand}</p>
                        </p>
                        <p className='specification'>
                            <strong>Categoria</strong>
                            <p>{productData.category}</p>
                        </p>
                        <p className='specification'>
                            <strong>SubCategoria</strong>
                            <p>{productData.subCategory}</p>
                        </p>
                        <p className='specification'>
                            <strong>Comprimento:</strong>
                            <p>{productData.length}</p>
                        </p>
                        <p className='specification'>
                            <strong>Altura:</strong>
                            <p>{productData.height}</p>
                        </p>
                        <p className='specification'>
                            <strong>Largura:</strong>
                            <p>{productData.width}</p>
                        </p>
                        <p className='specification'>
                            <strong>Peso:</strong>
                            <p>{productData.weight}</p>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
  }