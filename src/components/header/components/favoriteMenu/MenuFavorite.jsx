/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { IoClose } from "react-icons/io5";
import './menuFavorite.scss';
import { listarProdutosFavoritos, desfavoritarProduto } from '../../../../services/apiProductService';
import { auth } from '../../../../services/firebaseConfig';
import axios from 'axios';

export default function MenuFavorite({ onClose }) {
    const navigate = useNavigate();
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [favorites, setFavorites] = useState([]);
    const [removingIndex, setRemovingIndex] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const baseUri = "http://localhost:8080/api";

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
                        {favorites.map((favorite, index) => (
                            <li key={index} className='productFav'>
                                <img src={favorite.imagemPrincipal} alt={favorite.nome} />
                                <div className='containerInfosFav'>
                                    {removingIndex === index ? (
                                        <MdFavoriteBorder className='iconFav' />
                                    ) : (
                                        <MdFavorite className='iconFav' onClick={(e) => { handleRemoveFavorite(index); e.stopPropagation(); }} />
                                    )}
                                    <h3>{favorite.nome}</h3>
                                    <p>{BRL.format(favorite.valorComDesconto)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}