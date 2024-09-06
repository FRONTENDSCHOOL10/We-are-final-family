import S from './TextInput.module.css';

function TextInput({ type, value, onChange, className, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`${S.input} ${className}`}
      placeholder={placeholder}
    />
  );
}

export default TextInput;
