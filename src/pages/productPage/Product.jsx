import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './product.scss';

export function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [product, setProduct] = useState(null);

    // useEffect(() => {
    //   // Aqui você faria uma solicitação para sua fonte de dados (API, banco de dados, etc.)
    //   // para buscar os detalhes do produto com base no ID fornecido na rota.
    //   // Suponha que você tenha uma função fetchProductById que retorna os detalhes do produto.
    //   fetchProductById(id)
    //     .then(data => setProduct(data))
    //     .catch(error => console.error('Error fetching product:', error));
    // }, [id]);
    
    if (!product) {
        navigate('/Error404');
        return null;
    }

    return (
        <div className="productContainer">
            <hr />
            <div className='containerMain'>
                <div className="containerImages">
                    <img src="" alt="" className='mainImage'/>
                    <div className="optionsImages">
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="containerInfos">
                    {/* icon favorite */}
                    <h3 className='productName'>Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)</h3>
                    <p className='priceOrigin'>R$ 2.049,99</p>
                    <p className="productPrice">À vista <br />
                        <span>R$ 1.799,99</span> <br />
                        no PIX com 15% de desconto
                    </p>
                    <p className='priceFees'>No Cartão <br />
                        <span>R$ 1.959,99</span> <br />
                        Em até 12x de R$ 162,99 sem juros no cartão
                    </p>
                    <button className='addCart'>
                        Adicionar ao Carrinho
                        {/* icon */}
                    </button>
                </div>
            </div>
        </div>
    );
  }