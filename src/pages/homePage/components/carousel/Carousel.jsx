import React, { useState, useEffect, useRef } from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './carousel.scss';

export const Slide = () => {
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
          <img src="https://via.placeholder.com/400x200" alt="Slide 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="https://via.placeholder.com/400x200" alt="Slide 2" />
        </SplideSlide>
        <SplideSlide>
          <img src="https://via.placeholder.com/400x200" alt="Slide 3" />
        </SplideSlide>
        <SplideSlide>
          <img src="https://via.placeholder.com/400x200" alt="Slide 4" />
        </SplideSlide>
        <SplideSlide>
          <img src="https://via.placeholder.com/400x200" alt="Slide 5" />
        </SplideSlide>
      </Splide>
    </section>
  );
};