import React from 'react';
import logoHorizontal from '../../assets/imgLemnos/logoHorizontalClaro.svg'; 
import Infos from './components/infos/Infos';
import ToolTip from '../tooltip/ToolTip';
import { RiLinkedinFill, RiInstagramFill, RiTwitterFill, RiFacebookFill } from "react-icons/ri";

export default function Footer() {
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
                        <ToolTip message="Linkedin">
                            <a href="">
                                <RiLinkedinFill className='icon'/>
                            </a>
                        </ToolTip>
                        <ToolTip message="Instagram">
                            <a href="">
                                <RiInstagramFill className='icon'/>
                            </a>
                        </ToolTip>
                        <ToolTip message="Twitter">
                            <a href="">
                                <RiTwitterFill className='icon'/>
                            </a>
                        </ToolTip>
                        <ToolTip message="Facebook">
                            <a href="">
                                <RiFacebookFill className='icon'/>
                            </a>
                        </ToolTip>
                    </div>
                    <hr />
                </div>
            </section>
            <hr className='hrAuthorship'/>
            <div className='authorship'>
                <small>© 2024 Lemnos - Todos os Direitos Reservados. - Por <a href="https://techverse-co.vercel.app" target='_blank'>TechVerse</a></small>
                <small><a href="#">Termos e Condições</a> | <a href="#">Política de Privacidade</a></small>
            </div>
        </footer>
    )
}