import React, { useState, useEffect } from 'react';
import './doubleInput.scss';

export default function DoubleInputRange() {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(8000);
  const [minInputValue, setMinInputValue] = useState(1000);
  const [maxInputValue, setMaxInputValue] = useState(8000);

  const handleMinRangeChange = (event) => {
    const value = parseInt(event.target.value);
    setMinValue(value);
    setMinInputValue(value);
  };

  const handleMaxRangeChange = (event) => {
    const value = parseInt(event.target.value);
    setMaxValue(value);
    setMaxInputValue(value);
  };

  const handleMinInputChange = (event) => {
    const value = parseInt(event.target.value.replace(/[^\d]/g, ''));
    if (!isNaN(value)) {
      setMinValue(value);
      setMinInputValue(value);
    }
  };

  const handleMaxInputChange = (event) => {
    const value = parseInt(event.target.value.replace(/[^\d]/g, ''));
    if (!isNaN(value)) {
      setMaxValue(value);
      setMaxInputValue(value);
    }
  };

  useEffect(() => {
    setArea();
  }, [minValue, maxValue]);

  function setArea() {
    const sliderMaxValue = 10000;
    const range = document.querySelector(".sliderTrack");
    if (range) {
      range.style.left = `${(minValue / sliderMaxValue) * 100}%`;
      range.style.right = `${100 - (maxValue / sliderMaxValue) * 100}%`;
    }
  }

  return (
    <div className='doubleRangeInput'>
      <div className="rangeSlider">
        <div className="sliderTrack"></div>
        <input 
          type="range"
          name='minValue'
          className='minValue' 
          min={0}
          max={10000}
          value={minValue}
          onChange={handleMinRangeChange}
        />
        <input 
          type="range"
          name='maxValue'
          className='maxValue' 
          min={0}
          max={10000}
          value={maxValue}
          onChange={handleMaxRangeChange}
        />
        <div className="inputBox">
          <div className="minBox">
            <div className="inputWrap">
              <span className="inputAddon">R$</span>
              <input 
                type="text" 
                name="minInput" 
                className='inputField minInput' 
                maxLength={5} 
                value={minInputValue}
                onChange={handleMinInputChange}
              />
            </div>
          </div>
          <div className="maxBox">
            <div className="inputWrap">
              <span className="inputAddon">R$</span>
              <input 
                type="text" 
                name="maxInput" 
                className='inputField maxInput' 
                maxLength={5} 
                value={maxInputValue}
                onChange={handleMaxInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
