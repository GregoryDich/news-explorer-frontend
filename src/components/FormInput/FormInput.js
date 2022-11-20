import React from 'react';
import './FormInput.css';

function FormInput({
  type,
  name,
  placeholder,
  setIsValid,
  setValues,
  values,
  isOpen,
}) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    if (isOpen) {
      setValue('');
      setError('');
      setValues({});
    }
  }, [isOpen, setValues]);
  const handleChange = (e) => {
    setValue(e.target.value);
    setError(e.target.validationMessage);
    setIsValid(e.target.closest('form').checkValidity());
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className='form__input-container'>
      <span className={`form__input-title form__input-${name.toLowerCase()}`}>
        {name}
      </span>
      <input
        onChange={handleChange}
        value={value}
        className='form__input'
        type={type}
        name={name.toLowerCase()}
        placeholder={`Enter ${placeholder}`}
        required
      />
      <span className={`form__input-error error-${name.toLowerCase()}`}>
        {error}
      </span>
    </div>
  );
}

export default FormInput;
