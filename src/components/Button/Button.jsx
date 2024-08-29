import { bool } from 'prop-types';
import S from './Button.module.css';
import { node, string, func } from 'prop-types';
import PropTypes from 'prop-types';

Button.propTypes = {
  onClick: func,
  disabled: bool,
  active: bool,
  className: string,
  children: node,
  style: PropTypes.shape({
    background: string,
    color: string,
    border: string,
  }),
};

export function Button({
  onClick,
  disabled,
  active,
  children,
  className,
  style = { background: '', color: 'var(--white)', border: '' },
  ...props
}) {
  const buttonClassName = [
    S.button,
    disabled ? S.disabled : '',
    active ? S.active : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    /*
  onClick 에 핸들링 함수를 전달하여 기능구현가능 
  disabled '불리안값 true = 버튼클릭가능 false = 버튼클릭못함'
  style background: '', color: 'var(--white)', border: ''  = 기본값
  프롭스로 배경색상 글자색상 테두리 변경가능 1px solid black 으로 전달해줘야됨 string 값으로

  추가기능 필요하면 말해주세요 
  */

    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
