import { useState, useEffect } from 'react';
import Card from '../card/Card';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './offerList.scss';
import { getAllProdutos } from '../../services/ProdutoService';
import Loading from '../loading/Loading';

export default function OfferList() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDescontos() {
            const data = await getAllProdutos();
            setProdutos(data);
            setLoading(false);
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
                        type: 'carousel',
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
