import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './about.scss';
import LogoHorizontalLight from '../../assets/imgLemnos/logoHorizontal.svg';
import LogoHorizontalDark from '../../assets/imgLemnos/logoHorizontalClaro.svg';
import TechFesto from '../../assets/imgLemnos/imgMascote.svg';
import { cadastrarProduto } from '../../services/ProdutoService';
import { cadastrarFornecedor } from '../../services/FornecedorService';

export default function About() {
    useEffect(() => {
        ScrollReveal().reveal('.text', {
            origin: 'left',
            distance: '100px',
            duration: 1000,
            delay: 0,
            easing: 'ease-out',
            opacity: 0,
            scale: 1,
            reset: false,
        });

        ScrollReveal().reveal('.logoDark, .logoLight, .imgMascot', {
            origin: 'right',
            distance: '100px',
            duration: 1000,
            delay: 0,
            easing: 'ease-out',
            opacity: 0,
            scale: 1,
            reset: false,
        });

        ScrollReveal().reveal('.item', {
            origin: 'bottom',
            distance: '100px',
            duration: 1000,
            delay: 0,
            easing: 'ease-out',
            opacity: 0,
            scale: 1,
            reset: false,
        });
    }, []);
    
    // const handleProdutos = () => {
    //     processarProdutos();
    // }

    // const handleFornecedores = () => {
    //     processarFornecedores();
    // }

    // async function processarFornecedores() {
    //   for (const fornecedor of fornecedores) {
    //     const resultado = await cadastrarFornecedor(fornecedor, 'fornecedor');
    //     if (resultado) {
    //       console.log('Fornecedor cadastrado com sucesso:', resultado);
    //     } else {
    //       console.log('Falha ao cadastrar Fornecedor:');
    //     }
    //   }
    // }

    // async function processarProdutos() {
    //   for (const produto of produtos) {
    //     try {
    //       const resultado = await cadastrarProduto(produto);
    //       if (resultado) {
    //         console.log('Produto cadastrado com sucesso:', resultado);
    //       } else {
    //         console.log('Falha ao cadastrar produto:', produto.nome, resultado.error);
    //       }
    //     } catch (error) {
    //       console.error('Erro ao cadastrar produto:', produto.nome, error);
    //       throw error;
    //     }
    //   }
    // }

    return (
        <main>
            <section className="contentAbout">
                <div className="title">
                    <hr />
                    <h2>Sobre</h2>
                    <hr />
                </div>

                <div className="content">
                    {/* <button onClick={handleProdutos}>Cadastrar produtos</button>
                    <button onClick={handleFornecedores}>Cadastrar Fornecedores</button> */}
                    <p className="text">
                        Desde sua fundação em 2023, a Lemnos lidera o mercado
                        tecnológico com a sua inovação, oferecendo uma ampla
                        gama de produtos de ponta.
                        <br />
                        <br />
                        Comprometida em tornar a tecnologia mais acessível, a
                        empresa garante produtos de alta qualidade e uma
                        experiência de compra excepcional, com uma equipe
                        especializada que busca constantemente expandir seus
                        serviços e produtos.
                        <br />
                        <br />
                        Bem-vindo à Lemnos, onde a paixão pela tecnologia e a
                        busca pela excelência definem o futuro da inovação
                        tecnológica.
                    </p>
                    <img
                        className="logoDark"
                        src={LogoHorizontalLight}
                        alt="logo"
                    />
                    <img
                        className="logoLight"
                        src={LogoHorizontalDark}
                        alt="logo"
                    />
                </div>
            </section>

            <section className="contentValues">
                <div className="content">
                    <div className="item">
                        <h3>Missão</h3>
                        <p>
                            Na Lemnos, buscamos democratizar o acesso à
                            tecnologia através de produtos inovadores a preços
                            acessíveis. Nosso compromisso é oferecer produtos de
                            alta qualidade que conectem e capacitem nossos
                            clientes em todas as áreas de suas vidas.
                        </p>
                    </div>
                    <div className="item">
                        <h3>Plataforma</h3>
                        <p>
                            A plataforma Lemnos oferece uma vitrine digital
                            intuitiva com uma ampla gama de produtos
                            tecnológicos de ponta, proporcionando uma
                            experiência de compra simplificada e personalizada.
                        </p>
                    </div>
                    <div className="item">
                        <h3>Valores</h3>
                        <p>
                            Na Lemnos, priorizamos a excelência e a satisfação
                            do cliente, oferecendo tecnologia e soluções
                            adaptadas às suas necessidades. Nosso ambiente
                            acolhedor e informativo atende tanto entusiastas
                            quanto iniciantes.
                        </p>
                    </div>
                </div>
            </section>

            <section className="contentMascot">
                <div className="title">
                    <hr />
                    <h2>TechFesto</h2>
                    <hr />
                </div>

                <div className="content">
                    <p className="text">
                        Na Lemnos, nosso mascote, TechFesto, personifica a fusão
                        entre a mitologia antiga e a inovação contemporânea,
                        simbolizando nossa busca pela excelência e progresso
                        tecnológico.
                        <br />
                        <br />
                        Como guardião tecnológico, ele embarca em uma jornada
                        com nossos clientes, utilizando seu conhecimento para
                        desvendar novas possibilidades.
                        <br />
                        <br />
                        Junte-se a TechFesto e à comunidade Lemnos na busca pela
                        excelência e inovação, onde a inspiração mitológica
                        impulsiona a tecnologia do futuro.
                    </p>
                    <img
                        src={TechFesto}
                        alt="Mascote TechFesto"
                        className="imgMascot"
                    />
                </div>
            </section>
        </main>
    );
}