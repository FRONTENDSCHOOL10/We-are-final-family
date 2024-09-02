import { useState } from 'react';
import S from './IconButton.module.css';
import { string, func } from 'prop-types';

function IconButton({ className, onClick }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);

    if (className === 'i_option' && onClick) {
      onClick();
    }
  };

  const updateClassName = className.endsWith('_line')
    ? `${className.replace('_line', '_filled')}`
    : className;

  return (
    <button className={S.icon_btn} onClick={handleClick}>
      <span className={active ? updateClassName : className}></span>
    </button>
  );
}

IconButton.propTypes = {
  className: string.isRequired, // className="" (문자열로 사용)
  onClick: func,
};

export default IconButton;
