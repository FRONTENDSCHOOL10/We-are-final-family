import React, { useState } from 'react';
import PropTypes from 'prop-types';
import S from './ValidationInput.module.css';
import {
  validateId,
  validatePassword,
  validateEmail,
} from '@/utils/validation';

const ValidationInput = React.forwardRef(function ValidationInput(
  { type = 'text', label, info = '', onChange, onKeyDown, ...props },
  ref
) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChange?.(inputValue);

    if (type === 'normal') {
      setError('');
      return;
    }

    console.log(inputValue);

    let validationError = '';
    if (type === 'id') {
      validationError = validateId(inputValue);
    } else if (type === 'pw') {
      validationError = validatePassword(inputValue);
    } else if (type === 'email') {
      validationError = validateEmail(inputValue);
    }
    setError(validationError);
  }

  function handleKeyDown(e) {
    onKeyDown?.(e);
  }

  return (
    <div className={S.container}>
      {label && <label className={`${S.label} lbl-md`}>{label}</label>}
      <input
        ref={ref}
        type={type === 'pw' ? 'password' : type === 'email' ? 'email' : 'text'}
        defaultValue={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`${S.input} ${error ? S.inputError : ''} para-md`}
        placeholder={info}
        {...props}
      />
      {error && <p className={`${S.error} para-sm`}>{error}</p>}
    </div>
  );
});

ValidationInput.propTypes = {
  type: PropTypes.oneOf(['id', 'pw', 'email', 'normal', 'text']).isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default ValidationInput;
