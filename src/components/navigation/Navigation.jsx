import { useState, useId } from 'react';
import S from './Navigation.module.css';

export default function Navigation() {
  const [activeButton, setActiveButton] = useState(null);

  const Btn1 = useId();
  const Btn2 = useId();
  const Btn3 = useId();
  const Btn4 = useId();

  const handleClick = (btnId) => {
    setActiveButton(btnId);
  };

  const getButtonClass = (btnId) => {
    return `${S.btnCon} ${activeButton === btnId ? S.activeBtn : ''}`;
  };

  const getIconClass = (btnId, defaultIcon, activeIcon) => {
    return `${S.icon} ${
      activeButton === btnId ? S[activeIcon] : S[defaultIcon]
    }`;
  };

  return (
    <nav className={S.nav}>
      <button
        className={getButtonClass(Btn1)}
        id={Btn1}
        onClick={() => handleClick(Btn1)}
      >
        <div className={getIconClass(Btn1, 'shipIcon', 'onShipIcon')}></div>
        <label htmlFor={Btn1}>파티모집</label>
      </button>

      <button
        className={getButtonClass(Btn2)}
        id={Btn2}
        onClick={() => handleClick(Btn2)}
      >
        <div className={getIconClass(Btn2, 'boardIcon', 'onBoardIcon')}></div>
        <label htmlFor={Btn2}>게시판</label>
      </button>

      <button
        className={getButtonClass(Btn3)}
        id={Btn3}
        onClick={() => handleClick(Btn3)}
      >
        <div className={getIconClass(Btn3, 'chatIcon', 'onChatIcon')}></div>
        <label htmlFor={Btn3}>채팅</label>
      </button>

      <button
        className={getButtonClass(Btn4)}
        id={Btn4}
        onClick={() => handleClick(Btn4)}
      >
        <div
          className={getIconClass(Btn4, 'profileIcon', 'onProfileIcon')}
        ></div>
        <label htmlFor={Btn4}>내정보</label>
      </button>
    </nav>
  );
}
