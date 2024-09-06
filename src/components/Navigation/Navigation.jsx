import { useState } from 'react';
import { Link } from 'react-router-dom';
import S from './Navigation.module.css';
import '@/styles/iconfonts.css';
import { NavigationData } from './data/NavigationData';

function Navigation() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (value) => {
    setActiveButton(value);
  };

  const getLinkClass = (value) => {
    return `${S.btnCon} ${activeButton === value ? S.activeBtn : ''}`;
  };

  const getIconClass = (value, defaultIcon, activeIcon) => {
    return `${activeButton === value ? activeIcon : defaultIcon}`;
  };

  return (
    <nav className={S.nav}>
      {NavigationData.map((option) => (
        <Link
          key={option.value}
          to={option.path}
          className={getLinkClass(option.value)}
          onClick={() => handleClick(option.value)}
        >
          <span
            className={getIconClass(
              option.value,
              option.defaultIcon,
              option.activeIcon
            )}
          />
          <label>{option.label}</label>
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
