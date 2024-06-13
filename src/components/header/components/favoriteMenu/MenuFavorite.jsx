/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './menuFavorite.scss';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../../services/authService';
import iconAddCart from '../../../../assets/icons/iconAddCart.svg';
import { toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import { MdFavorite } from 'react-icons/md';
import { getProdutoById } from '../../../../services/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import { listarProdutosFavoritos, adicionarProdutoCarrinho, desfavoritarProduto } from '../../../../services/apiProductService';
import React, { useState, useEffect } from 'react';

export default function MenuFavorite({ onClose }) {
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            if (AuthService.isLoggedIn()) {
                const response = await listarProdutosFavoritos();
                const favoritoDetalhado = await Promise.all(response.map(async (produto) => {
                    const detalhesProduto = await getProdutoById(produto.id);
                    return { ...produto, ...detalhesProduto };
                }));
                setFavorites(Array.isArray(favoritoDetalhado) ? favoritoDetalhado : []);
            }
        } catch (error) {
            console.error('Erro ao listar produtos favoritos:', error);
        }
    };

    const handleRemoveFavorite = async (produto, e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const success = await desfavoritarProduto(produto);
            if (success) {
                fetchFavorites();
            }
        } catch (error) {
            toast.error('Erro ao remover produto dos favoritos.');
        }
    };

    const handleCloseModal = () => {
        onClose();
    };

    const handleAddToCart = async (favorite) => {
        if (AuthService.isLoggedIn()) {
            try {
                await adicionarProdutoCarrinho(favorite, 1);
                toast.success('Produto adicionado ao carrinho!');
            } catch (error) {
                toast.error('Erro ao adicionar produto ao carrinho.');
            }
        } else {
            toast.warning('Você precisa estar logado para adicionar produtos ao carrinho.');
            navigate('/login');
        }
    };

    return (
        <div onClick={handleCloseModal} className='modal'>
            <div className='menuFavorite' onClick={(e) => e.stopPropagation()}>
                <IoClose className='iconClose' onClick={handleCloseModal}/>       
                <div className="title">
                    <hr />
                    <h2>Meus Favoritos</h2>
                    <hr />
                </div>
                {favorites.length === 0 ? (
                    <div className="emptyFavMessage">
                        <h2 className='textEmpty'>Você não tem nenhum item adicionado aos Favoritos.</h2>
                        <button className='btnBack' onClick={() => { navigate('/productFilter'); handleCloseModal(); }}>Adicione itens aos Favoritos</button>
                    </div>
                ) : (
                    <ul className='listaFavoritos'>
                       {favorites.map((favorite) => {
                            const hasDiscount = favorite.desconto > 0;
                            return (
                                <li key={favorite.id} className='itemFav'>
                                    <Link to={`/product/${favorite.id}`} className="favLink">
                                        {hasDiscount && <p className='offerDescont'>{favorite.desconto}%</p>}
                                        <img 
                                            src={favorite.imagemPrincipal} 
                                            alt={favorite.nome} 
                                            className='productImage' 
                                        />
                                        <div className='containerInfosFav'>
                                            <MdFavorite 
                                                className='iconFav'  
                                                onClick={(e) => handleRemoveFavorite(favorite, e) } 
                                            />
                                        </div>
                                        <div className='productDetails'>
                                            <h2 className='productName'>{favorite.nome}</h2>
                                            {hasDiscount && <p className='offerPrice'>{BRL.format(favorite.valorTotal)}</p>}
                                            <p className="productPrice">À vista <br />
                                                <span>{BRL.format(favorite.valorComDesconto)}</span> <br />
                                                no PIX com 15% de desconto
                                            </p>
                                        </div>
                                    </Link>
                                    <button 
                                        type="button" 
                                        className='btnAdd' 
                                        onClick={() => handleAddToCart(favorite)}
                                    >
                                        Adicionar ao Carrinho
                                        <img src={iconAddCart} alt="icon add Cart" className='iconAdd' />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}