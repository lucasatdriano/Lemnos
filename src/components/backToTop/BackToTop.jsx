import React, { useEffect, useState } from 'react';
import { RiArrowUpLine } from "react-icons/ri";
import imgBtnScroll from '../../assets/btnScrollToTop.png'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cvlScroll = () => {
      const progressBar = document.getElementById('progressBar');
      const position = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const vlScroll = Math.round((position * 100) / height);

      if (position > 100) {
        progressBar.style.display = 'grid';
        progressBar.classList.add('visible');
        
      } else {
        progressBar.style.display = 'none';
        progressBar.classList.remove('visible');
      }

      progressBar.style.background = `conic-gradient(#36CEC4 ${vlScroll}%, #2D3A3A ${vlScroll}%)`;
    };

    window.addEventListener('scroll', cvlScroll);
    window.addEventListener('load', cvlScroll);

    return () => {
      window.removeEventListener('scroll', cvlScroll);
      window.removeEventListener('load', cvlScroll);
    };
  }, []);

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
    window.removeEventListener('scroll', cvlScroll);
  };

  return (
    <section className="scrollBtn">
      <div className={`progressBar ${isVisible ? 'visible' : ''}`} id="progressBar" onClick={scrollToTop}>
        <img src={imgBtnScroll} alt="iconArrow" className="arrowUp" />
      </div>
    </section>
  );
};