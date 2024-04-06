import React from 'react';
//import PropTypes from 'prop-types';
import './inputs.scss';

export function CustomInput({ type, reference, label }) {
  return (
    <div className='singleInput'>
      <input
      type={type} 
      ref={reference} 
      required
      />
      <label>{label}</label>
    </div>
  );
};

// CustomInput.defaultProps = {
//   type: 'text',
// };

// CustomInput.propTypes = {
//   label: PropTypes.string.isRequired,
//   reference: PropTypes.shape().isRequired,
//   type: PropTypes.string,
// };