import { useState } from 'react';
import S from './HeaderHome.module.css';
import IconButton from '@/components/IconButton/IconButton';

function HeaderHome() {
  const [location, setLocation] = useState('i_location_line');

  const handleClick = () => {
    setLocation((prevClass) =>
      prevClass === 'i_location_line' ? 'i_location_filled' : 'i_location_line'
    );
  };

  return (
    <header className={S.header}>
      <button className={S.location_btn} onClick={handleClick}>
        <span className={location}></span>
        <span className="hdg-lg">신도림동</span>
      </button>
      <IconButton className="i_search" />
    </header>
  );
}

export default HeaderHome;
