/* eslint-disable react/prop-types */
import './card.scss';
import './cardOffer.scss';
import { Link, useNavigate } from 'react-router-dom';
import iconAddCart from '../../assets/icons/iconAddCart.svg';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AuthService from '../../services/authService';
import {
    adicionarFavorito,
    adicionarProdutoCarrinho,
    desfavoritarProduto,
    listarProdutosFavoritos,
} from '../../services/apiProductService';

export default function Card({ produto }) {
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const setInfo = async () => {
            if (AuthService.isLoggedIn()) {
                try {
                    const favorites = await listarProdutosFavoritos();
                    const isFavorited = favorites.some(
                        (fav) => fav.id === produto.id
                    );
                    setIsFavorite(isFavorited);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        setInfo();
    }, [produto.id]);

    async function handleAddToCart() {
        if (AuthService.isLoggedIn()) {
            try {
                await adicionarProdutoCarrinho(produto, 1);
                toast.success('Produto adicionado ao carrinho!');
            } catch (error) {
                console.error('Erro ao adicionar produto ao carrinho:', error);
                toast.error('Erro ao adicionar produto ao carrinho.');
            }
        } else {
            toast.warning(
                'Você precisa estar logado para adicionar produtos ao carrinho.'
            );
            navigate('/login');
        }
    }

    const handleAddToFavorites = async () => {
        if (AuthService.isLoggedIn()) {
            try {
                console.log('Adicionando favorito para o produto:', produto.id);
                await adicionarFavorito(produto.id);
                toast.success('Produto adicionado aos favoritos!');
                setIsFavorite(true);
            } catch (error) {
                console.error(
                    'Erro ao adicionar produto aos favoritos:',
                    error
                );
                toast.error('Erro ao adicionar produto aos favoritos.');
            }
        } else {
            toast.warning(
                'Você precisa estar logado para adicionar produtos aos favoritos.'
            );
            navigate('/login');
        }
    };

    const handleRemoveToFavorites = async () => {
        if (AuthService.isLoggedIn()) {
            try {
                console.log('Removendo favorito para o produto:', produto.id);
                await desfavoritarProduto(produto.id);
                toast.success('Produto removido dos favoritos');
                setIsFavorite(false);
            } catch (error) {
                console.error('Erro ao remover produto dos favoritos:', error);
                toast.error('Erro ao remover produto dos favoritos.');
            }
        } else {
            toast.warning(
                'Você precisa estar logado para remover produtos dos favoritos.'
            );
            navigate('/login');
        }
    };

    const hasDiscount = produto.desconto > 0;

    return (
        <>
            <div className="descont">
                <div className={hasDiscount ? 'offerCard' : 'productCard'}>
                    <Link
                        to={`/product/${produto.id}`}
                        className={hasDiscount ? 'offerLink' : 'productLink'}
                    >
                        {hasDiscount && (
                            <p className="offerDescont">{produto.desconto}%</p>
                        )}
                        {isFavorite ? (
                            <MdFavorite
                                className="iconFav"
                                onClick={handleRemoveToFavorites}
                            />
                        ) : (
                            <MdFavoriteBorder
                                className="iconFav"
                                onClick={handleAddToFavorites}
                            />
                        )}
                        <img
                            src={produto.imagemPrincipal}
                            alt={produto.nome}
                            className={
                                hasDiscount ? 'offerImage' : 'productImage'
                            }
                        />
                        <div
                            className={
                                hasDiscount ? 'offerDetails' : 'productDetails'
                            }
                        >
                            <h2
                                className={
                                    hasDiscount ? 'offerName' : 'productName'
                                }
                            >
                                {produto.nome}
                            </h2>
                            {hasDiscount ? (
                                <>
                                    <p className="offerPrice">
                                        {BRL.format(produto.valorTotal)}
                                    </p>
                                    <p className="offerPriceDescont">
                                        À vista <br />
                                        <span>
                                            {BRL.format(
                                                produto.valorComDesconto
                                            )}
                                        </span>{' '}
                                        <br />
                                        no PIX com 15% de desconto
                                    </p>
                                </>
                            ) : (
                                <p className="productPrice">
                                    À vista <br />
                                    <span>
                                        {BRL.format(produto.valorTotal)}
                                    </span>{' '}
                                    <br />
                                    no PIX com 15% de desconto
                                </p>
                            )}
                        </div>
                    </Link>
                    <button
                        type="button"
                        className="btnAdd"
                        onClick={handleAddToCart}
                    >
                        Adicionar ao Carrinho
                        <img
                            src={iconAddCart}
                            alt="icon add Cart"
                            className="iconAdd"
                        />
                    </button>
                </div>
            </div>
        </>
    );
}
