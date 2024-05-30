import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Range, getTrackBackground } from 'react-range';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './doubleInput.scss';

const STEP = 1;
const MIN = 0;
const MAX = 10000;

export default function DoubleInputRange({ minValue, maxValue, setMinValue, setMaxValue }) {
  const [values, setValues] = useState([minValue, maxValue]);

  useEffect(() => {
    setValues([minValue, maxValue]);
  }, [minValue, maxValue]);

  const handleRangeChange = (newValues) => {
    setValues(newValues);
  };

  const handleRangeFinalChange = (newValues) => {
    const [newMin, newMax] = newValues;
    setMinValue(newMin);
    setMaxValue(newMax);
  };

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setValues([value, values[1]]);
    }
  };

  const handleMinInputBlur = () => {
    const [minVal, maxVal] = values;
    if (isNaN(minVal) || minVal < MIN) {
      toast.warning('O valor mínimo não pode ser menor que 0.');
      setMinValue(MIN);
      setValues([MIN, maxVal]);
    } else if (minVal > maxVal) {
      toast.warning('O valor mínimo não pode ser maior que o valor máximo.');
      setMinValue(maxVal);
      setValues([maxVal, maxVal]);
    } else {
      setMinValue(minVal);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setValues([values[0], value]);
    }
  };

  const handleMaxInputBlur = () => {
    const [minVal, maxVal] = values;
    if (isNaN(maxVal) || maxVal > MAX) {
      toast.warning('O valor máximo não pode ser maior que 10000.');
      setMaxValue(MAX);
      setValues([minVal, MAX]);
    } else if (maxVal < minVal) {
      toast.warning('O valor máximo não pode ser menor que o valor mínimo.');
      setMaxValue(minVal);
      setValues([minVal, minVal]);
    } else {
      setMaxValue(maxVal);
    }
  };

  return (
    <div className="doubleRangeInput">
      <ToastContainer />
      <div className="rangeSlider">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={handleRangeChange}
          onFinalChange={handleRangeFinalChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                borderRadius: '5px',
                height: '6px',
                width: '100%',
                background: getTrackBackground({
                  values,
                  colors: ['#415352', '#36CEC4', '#415352'],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '25px',
                width: '25px',
                borderRadius: '50%',
                backgroundColor: '#50817e',
                border: '1px solid #50817e',
              }}
            />
          )}
        />
        <div className="inputBox">
          <div className="minBox">
            <p>DE</p>
            <div className="inputWrap">
              <span className="inputAddon">R$</span>
              <input
                type="text"
                className="inputField minInput"
                value={values[0]}
                onChange={handleMinInputChange}
                onBlur={handleMinInputBlur}
                inputMode="numeric"
                min={MIN}
                max={MAX}
              />
            </div>
          </div>
          <div className="maxBox">
            <p>ATÉ</p>
            <div className="inputWrap">
              <span className="inputAddon">R$</span>
              <input
                type="text"
                className="inputField maxInput"
                value={values[1]}
                onChange={handleMaxInputChange}
                onBlur={handleMaxInputBlur}
                inputMode="numeric"
                min={MIN}
                max={MAX}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DoubleInputRange.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  setMinValue: PropTypes.func.isRequired,
  setMaxValue: PropTypes.func.isRequired,
};