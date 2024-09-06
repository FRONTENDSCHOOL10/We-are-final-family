import { useState } from 'react';
import TextInput from './TextInput';
import S from './ValidationInput.module.css';
import {
  validateId,
  validatePassword,
  validateEmail,
} from '@/utils/validation';

// 사용방법
// <ValidationInput type="id" label="아이디" info="아뒤입력"/>
// <ValidationInput type="pw" label="비밀번호" info="비번입력"/>
// <ValidationInput type="email" label="이메일" info="이메일@gmail.com" />
// <ValidationInput type="normal" label="적는대로나오겠지?" info="안내 메시지" />

function ValidationInput({ type, label, info = '' }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);

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

  return (
    <div className={S.container}>
      <label className={`${S.label} lbl-md`}>{label}</label>
      <TextInput
        type={type === 'pw' ? 'password' : type === 'email' ? 'email' : 'text'}
        value={value}
        onChange={handleChange}
        className={error ? S.inputError : ''}
        placeholder={info}
      />
      {error && <p className={`${S.error} para-sm`}>{error}</p>}
    </div>
  );
}

export default ValidationInput;
