import clsx from 'clsx';
import S from './Button.module.css';
import { node, string, func, bool } from 'prop-types';
import { Link } from 'react-router-dom';

Button.propTypes = {
  onClick: func,
  disabled: bool,
  className: string,
  children: node,
  color: string.isRequired,
  type: string,
  to: string,
};
//porps color 로 [black,primary,white] 전달하면 스타일 입혀짐 문자로 전달해주세요
// disabled 값 true or flase
// type 값 string 필수로 입력
// to 속성 들어오면 link 태그로 변함

function Button({
  onClick,
  disabled,
  children,
  color,
  type = 'button',
  to,
  ...props
}) {
  const variantClass = S[color];

  const buttonClassName = clsx(S.button, variantClass);

  return !to ? (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClassName} hdg-md`}
      {...props}
    >
      {children}
    </button>
  ) : (
    <Link
      style={{
        textDecoration: 'none',
      }}
      to={to}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClassName} hdg-md`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default Button;
