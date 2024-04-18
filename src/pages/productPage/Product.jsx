import React from 'react';
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