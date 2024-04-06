import React, { useEffect } from 'react';
import { RiArrowUpLine } from "react-icons/ri";
import imgBtnScroll from '../../assets/btnScroll.png'

export function BackToTopButton() {
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
      } else {
        progressBar.style.display = 'none';
      }

      progressBar.addEventListener('click', () => {
        document.documentElement.scrollTop = 0;
      });
      progressBar.style.background = `conic-gradient(#36CEC4 ${vlScroll}%, #2D3A3A ${vlScroll}%)`;
    };

    window.addEventListener('scroll', cvlScroll);
    window.addEventListener('load', cvlScroll);

    return () => {
      window.removeEventListener('scroll', cvlScroll);
      window.removeEventListener('load', cvlScroll);
    };
  }, []);

  return (
    <section className="scrollBtn">
      <div className="progressBar" id="progressBar">
        <img src={imgBtnScroll} alt="iconArrow" className="arrowUp" />
      </div>
    </section>
  );
};