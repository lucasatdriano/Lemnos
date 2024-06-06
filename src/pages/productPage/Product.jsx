import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './product.scss';
import iconAddCart from '../../assets/icons/iconAddCart.svg';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import OfferList from '../../components/lists/OfferList';

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const baseUri = "http://localhost:8080/api";

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseUri}/produto/${id}`, {
                    timeout: 10000,
                });
                setProduct(response.data);
                setMainImage(response.data.imagemPrincipal);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/Error404');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const handleAddToCart = () => {
        if (product) {
            console.log("Produto adicionado ao carrinho:", product.nome);
        }
    };

    const handleAddToFavorites = () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };
    
    const hasDiscount = product && product.desconto > 0;

    return (
        <main className="productContainer">
            <hr />
            {product && (
                <>
                <section className='containerMain'>
                    <section className='productMain'>
                        <div className="containerImages">
                            <img src={mainImage} alt={product.nome} className='imageMain' />
                            {hasDiscount && <p className='offerDescont'>{product.desconto}%</p>}
                            <div className="optionsImages">
                                <img
                                    src={product.imagemPrincipal}
                                    alt='Main'
                                    onClick={() => handleImageClick(product.imagemPrincipal)}
                                />
                                {product.imagens && product.imagens.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`img${index}`}
                                        onClick={() => handleImageClick(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="containerInfos">
                            <div className="sectionIcons">
                                <div className="rating">
                                    <input type="radio" id="star-1" name="star-radio" value="star-1" />
                                    <label htmlFor="star-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                    </label>
                                    <input type="radio" id="star-2" name="star-radio" value="star-1" />
                                    <label htmlFor="star-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                    </label>
                                    <input type="radio" id="star-3" name="star-radio" value="star-1" />
                                    <label htmlFor="star-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                    </label>
                                    <input type="radio" id="star-4" name="star-radio" value="star-1" />
                                    <label htmlFor="star-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                    </label>
                                    <input type="radio" id="star-5" name="star-radio" value="star-1" />
                                    <label htmlFor="star-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
                                    </label>
                                </div>
                                {isFavorite ? (
                                    <MdFavorite className='iconFav' onClick={handleAddToFavorites} />
                                ) : (
                                    <MdFavoriteBorder className='iconFav' onClick={handleAddToFavorites} />
                                )}
                            </div>
                            <h3 className='productName'>{product.nome}</h3>
                            {hasDiscount && <p className='priceOrigin'>{BRL.format(product.valorTotal)}</p>}
                            <p className="productPrice">À vista <br />
                                <span>{BRL.format(product.valorComDesconto)}</span> <br />
                                E no PIX com 15% de desconto
                            </p>
                            <p className='priceFees'>
                                Ou no Cartão <br />
                               Em até 12x de <span>{BRL.format(product.valorComDesconto / 12)}</span> sem juros 
                            </p>
                            <button className='addCart' onClick={handleAddToCart}>
                                Adicionar ao Carrinho
                                <img src={iconAddCart} alt="icon add Cart" className='iconAdd' />
                            </button>
                        </div>
                    </section>
                    <section className='containerDetails'>
                        <div className='containerDescription'>
                            <h3>Descrição do Produto</h3>
                            <p>{product.descricao}</p>
                        </div>
                        <div className='containerSpecifications'>
                            <p className='specification'>
                                <strong>Nome:</strong>
                                <p>{product.nome}</p>
                            </p>
                            <p className='specification'>
                                <strong>Marca:</strong>
                                <p>{product.fabricante}</p>
                            </p>
                            <p className='specification'>
                                <strong>Categoria:</strong>
                                <p>{product.categoria}</p>
                            </p>
                            <p className='specification'>
                                <strong>SubCategoria:</strong>
                                <p>{product.subCategoria}</p>
                            </p>
                            <p className='specification'>
                                <strong>Comprimento:</strong>
                                <p>{product.comprimento}cm</p>
                            </p>
                            <p className='specification'>
                                <strong>Altura:</strong>
                                <p>{product.altura}cm</p>
                            </p>
                            <p className='specification'>
                                <strong>Largura:</strong>
                                <p>{product.largura}cm</p>
                            </p>
                            <p className='specification'>
                                <strong>Peso:</strong>
                                <p>{product.peso}kg</p>
                            </p>
                        </div>
                    </section>
                </section>
                <section className='offers'>
                    <h2>Produtos Similares</h2>
                    <OfferList />
                </section>
                </>
            )}
        </main>
    );
}