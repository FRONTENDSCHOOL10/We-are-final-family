import { useState } from 'react';
import PropTypes from 'prop-types';
import S from './ValidationInput.module.css';
import {
  validateId,
  validatePassword,
  validateEmail,
} from '@/utils/validation';
import { func } from 'prop-types';

// 사용방법
// <ValidationInput type="id" label="아이디" info="아뒤입력"/>
// <ValidationInput type="pw" label="비밀번호" info="비번입력"/>
// <ValidationInput type="email" label="이메일" info="이메일@gmail.com" />
// <ValidationInput type="normal" label="적는대로나오겠지?" info="안내 메시지" />

function ValidationInput({
  type = 'text',
  label,
  info = '',
  onChange,
  ...props
}) {
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

  return (
    <div className={S.container}>
      {label && <label className={`${S.label} lbl-md`}>{label}</label>}
      <input
        type={type === 'pw' ? 'password' : type === 'email' ? 'email' : 'text'}
        defaultValue={value}
        onChange={handleChange}
        className={`${S.input} ${error ? S.inputError : ''} para-md`}
        placeholder={info}
        {...props}
      />
      {error && <p className={`${S.error} para-sm`}>{error}</p>}
    </div>
  );
}

ValidationInput.propTypes = {
  type: PropTypes.oneOf(['id', 'pw', 'email', 'normal', 'text']).isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  onChange: func,
};

export default ValidationInput;
