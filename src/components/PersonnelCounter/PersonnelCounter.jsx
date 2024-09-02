import { useState } from 'react';
import S from './PersonnelCounter.module.css';

function PersonnelCounter() {
  const [count, setCount] = useState(2);

  const increment = () => {
    setCount((prevCount) => (prevCount < 6 ? prevCount + 1 : prevCount));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 2 ? prevCount - 1 : 2));
  };

  return (
    <div className={S.con}>
      <button className={S.btn} onClick={decrement} disabled={count === 2}>
        <span className={`${S.icon} i_minus`}></span>
      </button>
      <span>{count}명</span>
      <button className={S.btn} onClick={increment} disabled={count === 6}>
        <span className={`${S.icon} i_plus`}></span>
      </button>
    </div>
  );
}

export default PersonnelCounter;
