import { useState } from 'react';
import S from './IconButton.module.css';
import { string, func } from 'prop-types';

// 사용 방법
// <IconButton title="검색" className="i_search" />

IconButton.propTypes = {
  title: string.isRequired, // title="" (문자열로 사용)
  className: string.isRequired, // className="" (문자열로 사용)
  onClick: func,
};

function IconButton({ title, className, onClick }) {
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
    <button
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={S.icon_btn}
      onClick={handleClick}
    >
      <span className={active ? updateClassName : className}></span>
    </button>
  );
}

export default IconButton;
