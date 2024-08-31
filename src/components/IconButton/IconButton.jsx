import { useState } from 'react';
import S from './IconButton.module.css';
import PropTypes from 'prop-types';

function IconButton({ className }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
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
  className: PropTypes.string.isRequired, // className="" (문자열로 사용)
};

export default IconButton;
