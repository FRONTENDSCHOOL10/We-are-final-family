import { func, string } from 'prop-types';
import S from './TextInput.module.css';

TextInput.propTypes = {
  type: string,
  value: string,
  onChange: func,
  className: string,
  placeholder: string,
};

function TextInput({ type, value, onChange, className, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`${S.input} ${className}`}
      placeholder={placeholder}
      autoComplete="current-password" //  크롬이 자꾸 오토컴플릿 넣으라네요;
    />
  );
}

export default TextInput;
