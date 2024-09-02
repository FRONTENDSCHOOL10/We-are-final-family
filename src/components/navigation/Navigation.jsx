import { useState } from 'react';
import S from './Navigation.module.css';
import '@/styles/iconfonts.css';
import { NavigationData } from './data/NavigationData';

export default function Navigation() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (value) => {
    setActiveButton(value);
  };

  const getButtonClass = (value) => {
    return `${S.btnCon} ${activeButton === value ? S.activeBtn : ''}`;
  };

  const getIconClass = (value, defaultIcon, activeIcon) => {
    return `${activeButton === value ? activeIcon : defaultIcon}`;
  };

  return (
    <nav className={S.nav}>
      {NavigationData.map((option) => (
        <button
          key={option.value}
          className={getButtonClass(option.value)}
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
        </button>
      ))}
    </nav>
  );
}
