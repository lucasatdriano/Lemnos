import React, { useState, useEffect, useRef } from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import imgBanner1 from '../../../../assets/banners/banner1.svg';
import imgBanner2 from '../../../../assets/banners/banner2.svg';
import imgBanner3 from '../../../../assets/banners/banner3.svg';
import imgBanner4 from '../../../../assets/banners/banner4.svg';
import imgBanner5 from '../../../../assets/banners/banner5.svg';
import './carousel.scss';

export default function Slide() {
  const [isHovered, setIsHovered] = useState(false);
  const splideRef = useRef(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [splideOptions, setSplideOptions] = useState({
    type: 'loop',
    perPage: 1,
    pauseOnHover: false,
    speed: 1000,
    rewind: true,
  });

  const nextSlide = () => {
    const splide = splideRef.current.splide;
    splide.go('+1');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoplayPaused) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplayPaused]); 

  return (
    <section className='carousel'>
      <Splide
        options={splideOptions}
        ref={splideRef}
        onMouseEnter={() => {
          setIsHovered(true);
          setAutoplayPaused(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setTimeout(() => setAutoplayPaused(false), 100);
        }}
      >
        <SplideSlide>
          <img src={imgBanner1} alt="Slide 1" />
        </SplideSlide>
        <SplideSlide>
          <img src={imgBanner2} alt="Slide 2" />
        </SplideSlide>
        <SplideSlide>
          <img src={imgBanner3} alt="Slide 3" />
        </SplideSlide>
        <SplideSlide>
        <img src={imgBanner4} alt="Slide 4" />
        </SplideSlide>
        <SplideSlide>
        <img src={imgBanner5} alt="Slide 5" />
        </SplideSlide>
      </Splide>
    </section>
  );
};