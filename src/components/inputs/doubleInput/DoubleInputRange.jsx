import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './doubleInput.scss';

export default function DoubleInputRange({ minValue, maxValue, setMinValue, setMaxValue }) {
  const [minInputValue, setMinInputValue] = useState(minValue.toString());
  const [maxInputValue, setMaxInputValue] = useState(maxValue.toString());

  const handleMinRangeChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > maxValue) {
      value = maxValue;
      toast.warning('O valor mínimo não pode ser maior que o valor máximo.');
    }
    setMinValue(value);
    setMinInputValue(value.toString());
  };

  const handleMaxRangeChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 10000) {
      value = 10000;
      toast.warning('O valor máximo não pode ser maior que 10000.');
    }
    if (value < minValue) {
      value = minValue;
      toast.warning('O valor máximo não pode ser menor que o valor mínimo.');
    }
    setMaxValue(value);
    setMaxInputValue(value.toString());
  };

  const handleMinInputChange = (event) => {
    let value = event.target.value.replace(/[^\d]/g, '');
    setMinInputValue(value);
  };

  const handleMinInputBlur = () => {
    let value = parseInt(minInputValue, 10);
    if (isNaN(value)) {
      value = 0;
    }
    if (value > maxValue) {
      value = maxValue;
      toast.warning('O valor mínimo não pode ser maior que o valor máximo.');
    }
    setMinValue(value);
    setMinInputValue(value.toString());
  };

  const handleMaxInputChange = (event) => {
    let value = event.target.value.replace(/[^\d]/g, '');
    setMaxInputValue(value);
  };

  const handleMaxInputBlur = () => {
    let value = parseInt(maxInputValue, 10);
    if (isNaN(value)) {
      value = 10000;
    }
    if (value > 10000) {
      value = 10000;
      toast.warning('O valor máximo não pode ser maior que 10000.');
    }
    if (value < minValue) {
      value = minValue;
      toast.warning('O valor máximo não pode ser menor que o valor mínimo.');
    }
    setMaxValue(value);
    setMaxInputValue(value.toString());
  };

  useEffect(() => {
    setMinInputValue(minValue.toString());
    setMaxInputValue(maxValue.toString());
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
            <p>DE</p>
            <div className="inputWrap">
              <span className="inputAddon">R$</span>
              <input 
                type="text" 
                name="minInput" 
                className='inputField minInput' 
                maxLength={5} 
                value={minInputValue}
                onChange={handleMinInputChange}
                onBlur={handleMinInputBlur}
                inputMode='numeric'
              />
            </div>
          </div>
          <div className="maxBox">
            <p>ATÉ</p>
            <div className="inputWrap">
              <span className="inputAddon">R$</span>
              <input 
                type="text" 
                name="maxInput" 
                className='inputField maxInput' 
                maxLength={5} 
                value={maxInputValue}
                onChange={handleMaxInputChange}
                onBlur={handleMaxInputBlur}
                inputMode='numeric'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}