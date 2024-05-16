import React, { useState } from 'react';
import './doubleInput.scss';

export default function DoubleInputRange() {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const [minValue, setMinValue] = useState(100);
  const [maxValue, setMaxValue] = useState(1000);

  const setLeftValue = (event) => {
    let value = event.target.value;
    let min = parseInt(event.target.min);
    let max = parseInt(event.target.max);

    value = Math.min(parseInt(value), parseInt(maxValue) - 1);

    let percent = ((value - min) / (max - min)) * 100;

    document.getElementById('sliderRange').style.left = percent + '%';
    document.getElementById('dotLeft').style.left = percent + '%';
    document.getElementById('titleMin').innerText = value;
    setMinValue(value);
  };

  const setRightValue = (event) => {
    let value = event.target.value;
    let min = parseInt(event.target.min);
    let max = parseInt(event.target.max);

    value = Math.max(parseInt(value), parseInt(minValue) + 1);

    let percent = ((value - min) / (max - min)) * 100;

    document.getElementById('sliderRange').style.right = (100 - percent) + '%';
    document.getElementById('dotRight').style.right = (100 - percent) + '%';
    document.getElementById('titleMax').innerText = value;
    setMaxValue(value);
  };

  return (
    <div className='doubleRangeInput'>
      <div className='sliderValue'>
        <label id='titleMin' className='sliderValueTitle' htmlFor="min">{BRL.format(minValue)}</label>
        <label id='titleMax' className='sliderValueTitle' htmlFor="max">{BRL.format(maxValue)}</label>
      </div>
      <div className="doubleSlider">
        <div className="doubleSliderBody">
          <div className="doubleSliderTrack">
              <div id='sliderRange' className="doubleSliderRange"></div>
              <div id="dotLeft" className="doubleSliderDot left"></div>
              <div id="dotRight" className="doubleSliderDot right"></div>
          </div>

          <input
            type="range"
            id="min"
            className='doubleSliderInput'
            min={0}
            max={10000}
            value={minValue}
            onChange={setLeftValue}
          />
          <input
            type="range"
            id="max"
            className='doubleSliderInput'
            min={0}
            max={10000}
            value={maxValue}
            onChange={setRightValue}
          />
        </div>
      </div>
    </div>
  );
};