import React from 'react';
import './inputs.scss';

export function CustomInput({ type, reference, label, id, maxLength, minLength, 
                              onChange, name, pattern, mask, value, disabled}) {
  
  // Função para formatar o CPF
  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
    }
    return '';
  };

  // Função de tratamento de mudanças no campo
  const handleChange = (e) => {
    let formattedValue = e.target.value;

    // Se a máscara for "CPF", formate o valor
    if (mask === "CPF") {
      formattedValue = formatCPF(formattedValue);
       console.log('CPF formatado:', formattedValue);
    }

    // Chama a função de mudança de estado do componente pai
    onChange({ target: { name, value: formattedValue }});
  };
  
  return (
    <p className='singleInput'>
      <input
        type={type} 
        ref={reference}
        id={id}
        name={name}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        onChange={handleChange} // Chama a função handleChange para formatar o valor
        onBlur={handleChange}
        disabled={disabled}
        required
      />
      <label htmlFor={id}>{label}</label>
    </p>
  );
};