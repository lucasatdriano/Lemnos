import React from 'react';
import './about.scss'

export function About() {
  return (
    <>
      <main>
        <section className='contentAbout'>
            <div className="title">
                <hr />
                <h2>Sobre</h2>
                <hr />
            </div>

            <div className="content">
                <p>Desde sua fundação em 2023, a Lemnos lidera o mercado tecnológico 
                    com a sua inovação, oferecendo uma ampla gama de 
                    produtos de ponta.
                    <br /><br />
                    Comprometida em tornar a tecnologia mais acessível, a 
                    empresa garante produtos de alta qualidade e uma experiência 
                    de  compra excepcional, com uma equipe especializada que 
                    busca  constantemente expandir seus serviços e produtos. 
                    <br /><br />
                    Bem-vindo à Lemnos, onde a paixão pela tecnologia e a busca 
                    pela excelência definem o futuro da inovação tecnológica.
                </p>
                <img src="" alt="" />
            </div>
        </section>

        <section className='contentValues'>
            <div className='content'>
                <div className="item">
                    <h3>Missão</h3>
                    <p>Na Lemnos, buscamos democratizar o acesso à tecnologia 
                        através de produtos inovadores a preços acessíveis. 
                        Nosso compromisso é oferecer produtos de alta qualidade 
                        que conectem e capacitem nossos clientes em todas as 
                        áreas de suas vidas.
                    </p>
                </div>
                <div className="item">
                    <h3>Plataforma</h3>
                    <p>A plataforma Lemnos é uma vitrine digital completa e 
                        intuitiva, oferecendo diversos produtos tecnológicos de 
                        última geração. Projetada para simplificar a experiência 
                        de compra, proporciona navegação fácil e atendimento 
                        personalizado, garantindo uma jornada de compra 
                        excepcional.
                    </p>
                </div>
                <div className="item">
                    <h3>Valores</h3>
                    <p>Na Lemnos, comprometemo-nos com a excelência em cada 
                        interação, buscando capacitar os clientes com tecnologia 
                        e oferecer soluções alinhadas às suas necessidades. Seja 
                        um entusiasta ou iniciante, proporcionamos um ambiente 
                        acolhedor e informativo.
                    </p>
                </div>
            </div>
        </section>

        <section className='contentMascot'>
            <div className="title">
                <hr />
                <h2>TechFesto</h2>
                <hr />
            </div>

            <div className="content">
                <p>Na Lemnos, nosso mascote, TechFesto, personifica a fusão
                     entre a mitologia antiga e a inovação contemporânea, 
                     simbolizando nossa busca pela excelência e progresso 
                     tecnológico. 
                    <br /><br />
                    Como guardião tecnológico, ele embarca em uma jornada com
                     nossos clientes, utilizando seu conhecimento para desvendar 
                     novas possibilidades.
                    <br /><br />
                    Junte-se a TechFesto e à comunidade Lemnos na busca pela
                     excelência e inovação, onde a inspiração mitológica 
                     impulsiona a tecnologia do futuro.
                </p>
                <img src="" alt="" />
            </div>
        </section>
      </main>
    </>
  )
}