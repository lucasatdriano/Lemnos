import React from 'react';
import './inputs.scss';

export function CustomInput({ type, reference, label, id, maxLength, minLength, 
                              onChange, name, pattern, mask, value, disabled}) {
  
  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
    }
    return '';
  };

  const handleChange = (e) => {
    let formattedValue = e.target.value;

    if (mask === "CPF") {
      formattedValue = formatCPF(formattedValue);
       console.log('CPF formatado:', formattedValue);
    }

    onChange({ target: { name, value: formattedValue }});
  };
  
  return (
    <span className='singleInput'>
      <input
        type={type} 
        ref={reference}
        id={id}
        name={name}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        onChange={handleChange}
        onBlur={handleChange}
        disabled={disabled}
        required
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
};