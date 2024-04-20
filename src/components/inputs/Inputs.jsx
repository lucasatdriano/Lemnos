import React from 'react';
import PropTypes from 'prop-types';
import './inputs.scss';

export function CustomInput({ type, reference, label, id, maxLength}) {
  return (
    <p className='singleInput'>
      <input
      type={type} 
      ref={reference}
      id={id}
      maxLength={maxLength}
      required
      />
      <label htmlFor={id}>{label}</label>
    </p>
  );
};