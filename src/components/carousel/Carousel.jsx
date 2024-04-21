import React from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './carousel.scss'

export function Slide() {
  return (
    <section className='carousel'>
      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          autoplay: true,
          pauseOnHover: true,
          gap: '1rem',
          speed: 1000, 
          rewind: true,
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