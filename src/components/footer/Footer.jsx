import React from 'react';
import logoHorizontal from '../../assets/logoHorizontalClaro.svg'; 
import { Infos } from './components/infos/Infos';
import { RiLinkedinFill, RiInstagramFill, RiTwitterFill, RiFacebookFill } from "react-icons/ri";

export function Footer() {
    return (
        <footer>
            <Infos />
            <section id="footerContent">
                <a href="#"><img src={ logoHorizontal } alt='logo'></img></a>
                <nav className='navLinks'>
                    <ul>
                        <h3>Institucional</h3>
                        <li>Quem Somos</li>
                        <li>Localização</li>
                        <li>Nossas Lojas</li>
                        <li>Blog</li>
                    </ul>
                    <ul>
                        <h3>Ajuda</h3>
                        <li>SAC</li>
                        <li>Fale Conosco</li>
                        <li>Termos de Aceite</li>
                        <li>Politicas de Privacidade</li>
                    </ul>
                    <ul>
                        <h3>Dúvidas</h3>
                        <li>Entrega</li>
                        <li>Garantia</li>
                        <li>Como Comprar</li>
                        <li>Formas de Pagamento</li>
                        <li>Sobre Boletos</li>
                    </ul>
                </nav>
                <div className='iconsNav'>
                    <div className="icons">
                        <RiLinkedinFill className='icon'/>
                        <RiInstagramFill className='icon'/>
                        <RiTwitterFill className='icon'/>
                        <RiFacebookFill className='icon'/>
                    </div>
                    <hr />
                </div>
            </section>
            <hr />
            <div className='authorship'>
                <small>© 2024 Lemnos Shop - All rights reserved. - By <a href="">TechVerse</a></small>
                <small><a href="#">Term And Conditions | Privacy Policy</a></small>
            </div>
        </footer>
    )
}