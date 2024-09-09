import { string } from 'prop-types';
import TextInput from './TextInput';
import S from './ValidationInput.module.css';
import useRegisterStore from '@/stores/useRegisterStore';

ValidationInput.propTypes = {
  type: string,
  label: string,
  info: string,
};

function ValidationInput({ type, label, info = '' }) {
  const store = useRegisterStore();

  let value, error, setValue;

  switch (type) {
    case 'id':
      value = store.id;
      error = store.idError;
      setValue = store.setId;
      break;
    case 'pw':
      value = store.password;
      error = store.passwordError;
      setValue = store.setPassword;
      break;
    case 'email':
      value = store.email;
      error = store.emailError;
      setValue = store.setEmail;
      break;
    case 'normal':
    default:
      value = store.username;
      error = store.nameError;
      setValue = store.setName;
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  return (
    <div className={S.container}>
      <label className={`${S.label} lbl-md`}>{label}</label>
      <TextInput
        type={type === 'pw' ? 'password' : type === 'email' ? 'email' : 'text'}
        value={value}
        onChange={handleChange}
        className={`${error ? S.inputError : ''} para-md`}
        placeholder={info}
      />
      {error && <p className={`${S.error} para-sm`}>{error}</p>}
    </div>
  );
}

export default ValidationInput;
