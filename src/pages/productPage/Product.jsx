import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './product.scss';
import img from '../../assets/imgLemnos/logoHorizontal.svg'
import iconAddCart from '../../assets/icons/iconAddCart.svg';
import { MdFavoriteBorder, MdFavorite  } from "react-icons/md";
import OfferList from '../../components/lists/OfferList'

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

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

    useEffect(() => {
        setMainImage("https://via.placeholder.com/150");
    }, []);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const handleAddToCart = () => {
        console.log("Produto adicionado ao carrinho:", productData.name);
    };

    const handleAddToFavorites = () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };

    // useEffect(() => {
    //   fetchProductById(id)
    //     .then(data => setProduct(data))
    //     .catch(error => console.error('Error fetching product:', error));
    // }, [id]);
    
    // if (!product) {
    //     navigate('/Error404');
    //     return null;
    // }

    return (
        <main className="productContainer">
            <hr />
            <section className='containerMain'>
                <section className='productMain'>
                    <div className="containerImages">
                    <img src={mainImage} alt="Main" className='imageMain'/>
                        <div className="optionsImages">
                            {[
                                "https://via.placeholder.com/150",
                                "https://via.placeholder.com/150/0000FF/808080",
                                "https://via.placeholder.com/150/FF0000/FFFFFF",
                                "https://via.placeholder.com/150/00FF00/000000"
                            ].map((image, index) => (
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
                        {isFavorite ? (
                            <MdFavorite className='iconFav' onClick={handleAddToFavorites}/>
                        ) : (
                            <MdFavoriteBorder className='iconFav' onClick={handleAddToFavorites}/>
                        )}
                        <h3 className='productName'>{productData.name}</h3>
                        <p className='priceOrigin'>{BRL.format(productData.price)}</p>
                        <p className="productPrice">À vista <br />
                            <span>{BRL.format(productData.price - (productData.price / 100 * productData.Discount))}</span>  <br />
                            E no PIX com 15% de desconto
                        </p>
                        <p className='priceFees'>
                            Ou no Cartão <br />
                            Em até 12x de <span>{BRL.format((productData.price - (productData.price / 100 * productData.Discount)) / 12)}</span> sem juros
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
                        <p>{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}{productData.description}</p>
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
                            <strong>Categoria:</strong>
                            <p>{productData.category}</p>
                        </p>
                        <p className='specification'>
                            <strong>SubCategoria:</strong>
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
                </section>
            </section>
            <section className='offers'>
                <h2>Produtos Similares</h2>
                <OfferList  />
            </section>
        </main>
    );
  }