import { useState } from 'react';
import S from './IconButton.module.css';
import { string, func } from 'prop-types';

// 사용 방법
// <IconButton title="검색" className="i_search" onClick={함수명} />

IconButton.propTypes = {
  title: string.isRequired, // title="" (문자열로 사용)
  className: string.isRequired, // className="" (문자열로 사용)
  onClick: func,
};

function IconButton({ title, className, onClick, ...props }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={S.icon_btn}
      onClick={handleClick}
      {...props}
    >
      <span className={className}></span>
    </button>
  );
}

export default IconButton;
