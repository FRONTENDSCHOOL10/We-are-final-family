import { useState } from 'react';
import PropTypes from 'prop-types';
import S from './ValidationInput.module.css';
import {
  validateId,
  validatePassword,
  validateEmail,
} from '@/utils/validation';

function ValidationInput({
  type = 'text',
  label,
  info = '',
  onChange,
  onKeyDown,
  value,
  showError = true,
  ...props
}) {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const inputValue = e.target.value;
    onChange?.(inputValue);

    if (type === 'normal') {
      setError('');
      return;
    }

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

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  const inputStyle = value === '미입력' ? { color: 'var(--gray-600)' } : {};

  return (
    <div className={S.container}>
      {label && <label className={`${S.label} lbl-md`}>{label}</label>}
      <div className={S.inputWrapper}>
        <input
          type={
            type === 'pw'
              ? showPassword
                ? 'text'
                : 'password'
              : type === 'email'
              ? 'email'
              : 'text'
          }
          defaultValue={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`${S.input} ${
            error && showError ? S.inputError : ''
          } para-md`}
          placeholder={info}
          style={inputStyle}
          {...props}
        />
        {type === 'pw' && (
          <button
            type="button"
            className={S.togglePassword}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '숨기기' : '보기'}
          </button>
        )}
      </div>
      {error && showError && <p className={`${S.error} para-sm`}>{error}</p>}
    </div>
  );
}

ValidationInput.propTypes = {
  type: PropTypes.oneOf(['id', 'pw', 'email', 'normal', 'text']).isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  showError: PropTypes.bool,
};

export default ValidationInput;
