import React from 'react';
import './FormInput.css';

function FormInput({ type, name, placeholder }) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('Test error');
  return (
    <div className='form__input-container'>
      <span className='form__input-title'>{name}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='form__input'
        type={type}
        name={name.toLowerCase()}
        placeholder={`Enter ${placeholder}`}
        required
      />
      <span className='form__input-error'>{error}</span>
    </div>
  );
}

export default FormInput;
