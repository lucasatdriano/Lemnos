import React from 'react';
import './inputs.scss';

export function CustomInput({ type, reference, label, id, maxLength, minLength, 
                              onChange, name, pattern, mask, value, disabled }) {
  
  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
    }
    return '';
  };

  const formatCEP = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{0,5})(\d{0,3})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}-${match[2]}`;
    }
    return '';
  };

  const formatCNPJ = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}.${match[2]}.${match[3]}${match[4] ? `/${match[4]}` : ''}${match[5] ? `-${match[5]}` : ''}`;
    }
    return '';
  };

  const formatTelefone = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return '';
  };

  const handleChange = (e) => {
    let formattedValue = e.target.value;

    if (mask === "CPF") {
      formattedValue = formatCPF(formattedValue);
    } 
    else if (mask === "CEP") {
      formattedValue = formatCEP(formattedValue);
    } 
    else if (mask === "CNPJ") {
      formattedValue = formatCNPJ(formattedValue);
    } 
    else if (mask === "TEL") {
      formattedValue = formatTelefone(formattedValue);
    }

    onChange({ target: { name, value: formattedValue }});
  };

  let inputMode;
  if (mask === "CPF" || mask === "CEP" || mask === "CNPJ" || mask === "TEL") {
    inputMode = "numeric";
  }
  
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
        inputMode={inputMode}
        required
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
};