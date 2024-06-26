import { useState, useEffect } from 'react';
import Card from '../card/Card';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './offerList.scss';
import Loading from '../loading/Loading';
import { listarProdutosFiltrados } from '../../services/UsuarioProdutoService';

export default function OfferList() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDescontos() {
            let allProdutos = [];
            let page = 0;
            const pageSize = 24;
            let hasMore = true;

            try {
                while (hasMore) {
                    const filtro = {};

                    try {
                        const data = await listarProdutosFiltrados(
                            filtro,
                            page,
                            pageSize
                        );
                        if (data.length > 0) {
                            allProdutos = [...allProdutos, ...data];
                            page++;
                        } else {
                            hasMore = false;
                        }
                    } catch (error) {
                        hasMore = false;
                    }
                }
                setProdutos(allProdutos);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchDescontos();
    }, []);

    const produtosComDesconto = produtos.filter(
        (produto) => produto.desconto > 0
    );

    return (
        <div className="offersList">
            {loading ? (
                <Loading />
            ) : (
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 6,
                        perMove: 1,
                        speed: 1000,
                        arrows: true,
                        gap: 350,
                        breakpoints: {
                            1300: {
                                perPage: 5,
                            },
                            860: {
                                perPage: 4,
                            },
                            700: {
                                perPage: 4,
                            },
                        },
                    }}
                >
                    {produtosComDesconto.map((produto) => (
                        <SplideSlide key={produto.id}>
                            <Card produto={produto} />
                        </SplideSlide>
                    ))}
                </Splide>
            )}
        </div>
    );
}
