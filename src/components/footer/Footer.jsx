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
                        <li><a href="#">Quem Somos</a></li>
                        <li><a href="#">Nossas Lojas</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                    <ul>
                        <h3>Ajuda</h3>
                        <li><a href="#">SAC</a></li>
                        <li><a href="#">Fale Conosco</a></li>
                        <li><a href="#">Termos de Aceite</a></li>
                        <li><a href="#">Politicas de Privacidade</a></li>
                    </ul>
                    <ul>
                        <h3>Dúvidas</h3>
                        <li><a href="#">Entrega</a></li>
                        <li><a href="#">Garantia</a></li>
                        <li><a href="#">Como Comprar</a></li>
                        <li><a href="#">Formas de Pagamento</a></li>
                        <li><a href="#">Sobre Boletos</a></li>
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
            <hr className='hrAuthorship'/>
            <div className='authorship'>
                <small>© 2024 Lemnos - All rights reserved. - By <a href="https://tech-verse-sooty.vercel.app" target='_blank'>TechVerse</a></small>
                <small><a href="#">Term And Conditions</a> | <a href="#">Privacy Policy</a></small>
            </div>
        </footer>
    )
}