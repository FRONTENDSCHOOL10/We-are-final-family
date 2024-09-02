import { useState } from 'react';
import TextInput from './TextInput';
import S from './ValidationInput.module.css';

//  사용방법
// <ValidationInput type="id" label="아이디" />
// <ValidationInput type="pw" label="비밀번호" />

/* eslint-disable react/prop-types */
function ValidationInput({ type, label }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (type === 'id') {
      validateId(inputValue);
    } else if (type === 'pw') {
      validatePassword(inputValue);
    }
  }

  function validateId(id) {
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(id)) {
      setError('아이디는 영문자와 숫자만 사용 가능합니다.');
    } else if (id.length < 4) {
      setError('아이디는 4자 이상이어야 합니다.');
    } else if (!/^[a-zA-Z0-9]+$/.test(id)) {
      setError('아이디는 영문자와 숫자만 사용 가능합니다.');
    } else if (!/[a-zA-Z]/.test(id)) {
      setError('아이디는 최소 하나의 영문자를 포함해야 합니다.');
    } else {
      setError('');
    }
  }

  function validatePassword(password) {
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError('비밀번호는 대문자, 소문자, 숫자를 모두 포함해야 합니다.');
    } else {
      setError('');
    }
  }

  return (
    <div className={S.container}>
      <label className={S.label}>{label}</label>
      <TextInput
        type={type === 'pw' ? 'password' : 'text'}
        value={value}
        onChange={handleChange}
        className={error ? S.inputError : ''}
      />
      {error && <p className={S.error}>{error}</p>}
    </div>
  );
}

export default ValidationInput;
