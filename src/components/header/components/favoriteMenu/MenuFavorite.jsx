/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listarProdutosFavoritos, desfavoritarProduto, adicionarProdutoCarrinho } from '../../../../services/apiProductService';
import { auth } from '../../../../services/firebaseConfig';
import AuthService from '../../../../services/authService';
import iconAddCart from '../../../../assets/icons/iconAddCart.svg';
import { IoClose } from "react-icons/io5";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import './menuFavorite.scss';

export default function MenuFavorite({ onClose }) {
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [favorites, setFavorites] = useState([]);
    const [removingIndex, setRemovingIndex] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const baseUri = "https://lemnos-server.up.railway.app/api";

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);

    async function fetchProduto(id) {
        try {
            const response = await axios.get(`${baseUri}/produto/${id}`, {
                timeout: 10000,
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter detalhes do produto:', error);
            return null;
        }
    }

    const fetchFavorites = async () => {
        try {
            if (userEmail) {
                const response = await listarProdutosFavoritos(userEmail);
                const favoritoDetalhado = await Promise.all(response.map(async (produto) => {
                    const detalhesProduto = await fetchProduto(produto.id);
                    return { ...produto, ...detalhesProduto };
                }));
                setFavorites(Array.isArray(favoritoDetalhado) ? favoritoDetalhado : []);
            }
        } catch (error) {
            console.error('Erro ao listar produtos favoritos:', error);
            toast.error('Erro ao listar produtos favoritos.');
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [userEmail]);

    const handleRemoveFavorite = async (index) => {
        setRemovingIndex(index);
        try {
            const produto = favorites[index];
            await desfavoritarProduto(produto, { email: userEmail });
            setTimeout(() => {
                const updatedFavorites = [...favorites];
                updatedFavorites.splice(index, 1);
                setFavorites(updatedFavorites);
                toast.success('Produto removido dos favoritos.');
                setRemovingIndex(null);
            }, 250);
        } catch (error) {
            console.error('Erro ao remover produto dos favoritos:', error);
            toast.error('Erro ao remover produto dos favoritos.');
            setRemovingIndex(null);
        }
    };

    const handleCloseModal = () => {
        onClose();
    };

    const handleAddToCart = async (favorite) => {
        if (AuthService.isLoggedIn()) {
            try {
                await adicionarProdutoCarrinho(favorite, { email: auth.currentUser.email }, 1);
                toast.success('Produto adicionado ao carrinho!');
            } catch (error) {
                console.error('Erro ao adicionar produto ao carrinho:', error);
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
                        {favorites.map((favorite, index) => {
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
                                            {removingIndex === index ? (
                                                <MdFavoriteBorder className='iconFav' />
                                            ) : (
                                                <MdFavorite className='iconFav' onClick={(e) => { handleRemoveFavorite(index); e.stopPropagation(); }} />
                                            )}
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