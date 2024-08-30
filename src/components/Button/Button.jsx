import { bool } from 'prop-types';
import S from './Button.module.css';
import { node, string, func } from 'prop-types';

Button.propTypes = {
  onClick: func,
  disabled: bool,
  className: string,
  children: node,
  color: string.isRequired,
};
//porps color 로 [black,primary,white] 전달하면 스타일 입혀짐 문자로 전달해주세요
// disabled 값 true or flase

export function Button({ onClick, disabled, children, color, ...props }) {
  const variantClass = S[color];

  const combineClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const buttonClassName = combineClasses(S.button, variantClass);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}
