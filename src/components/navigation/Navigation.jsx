import { useState } from 'react';
import S from './Navigation.module.css';
import { navigationOptions } from './Data/navigationData';

export default function Navigation() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (value) => {
    setActiveButton(value);
  };

  const getButtonClass = (value) => {
    return `${S.btnCon} ${activeButton === value ? S.activeBtn : ''}`;
  };

  const getIconClass = (value, defaultIcon, activeIcon) => {
    return `${S.icon} ${
      activeButton === value ? S[activeIcon] : S[defaultIcon]
    }`;
  };

  return (
    <div>
      <nav className={S.nav}>
        {navigationOptions.map((option) => (
          <button
            key={option.value}
            className={getButtonClass(option.value)}
            onClick={() => handleClick(option.value)}
          >
            <div
              className={getIconClass(
                option.value,
                option.defaultIcon,
                option.activeIcon
              )}
            ></div>
            <label>{option.label}</label>
          </button>
        ))}
      </nav>
    </div>
  );
}
