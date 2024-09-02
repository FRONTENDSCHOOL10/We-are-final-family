import S from './TextInput.module.css';

/* eslint-disable react/prop-types */
function TextInput({ type = 'text', value, onChange, className }) {
  return (
    <input
      className={`${S.input} ${className}`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
