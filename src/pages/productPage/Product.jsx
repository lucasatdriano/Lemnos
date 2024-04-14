import React from 'react';
import { useParams } from 'react-router-dom';
import './product.scss';

export function Product({ products }) {
    const { id } = useParams();
    // const history = useHistory();

    const product = products.find(product => product.id === parseInt(id));
  
    if (!product) {
        history.push('/Error404');
        return null;
    }

    return (
        <div className="productDetailsOverlay">
        <div className="productDetailsContainer">
            <h2 className="productName">{product.name}</h2>
            <p className="productPrice">À vista <br />
              <span>R${product.price}</span> <br />
              no PIX com 15% de desconto
            </p>
            <img src={product.image} alt={product.name} className="productImage" />
        </div>
        </div>
    );
}