import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './product.scss';

export function Product({ products }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  
    if (!products || !product) {
        navigate('/Error404');
        return null;
    }
  
    const product = products.find(product => product.id === parseInt(id));
  
    return (
        <div className="productDetailsOverlay">
        <div className="productDetailsContainer">
            <h2 className="productName">{product.name}</h2>

            <p className="productPrice">À vista <br />
              <span>{BRL.format(product.price)}</span> <br />
              no PIX com 15% de desconto
            </p>
            <img src={product.image} alt={product.name} className="productImage" />
        </div>
        </div>
    );
  }