import React from 'react';
import './inputs.scss';

export function CustomInput({ type, reference, label, id, maxLength, minLength, onChange, name, pattern, mask, value}) {
  
  // Função para formatar o valor com base na máscara especificada
  const formatValue = (value) => {
    if (mask === "CPF") {
      return formatCPF(value); // Formata CPF
    } else {
      return value; // Retorna o valor sem formatação para outros campos
    }
  };

  // Função para formatar CPF
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
    const formattedValue = formatValue(e.target.value); // Formata o valor com base na máscara
    onChange({ target: { name, value: formattedValue }}); // Chama a função de mudança de estado do componente pai
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
        required
      />
      <label htmlFor={id}>{label}</label>
    </p>
  );
};