import { useState } from 'react';
import S from './PeopleCounter.module.css';

function PeopleCounter({ label }) {
  const [count, setCount] = useState(2);

  const increment = () => {
    setCount((prevCount) => (prevCount < 6 ? prevCount + 1 : prevCount));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 2 ? prevCount - 1 : 2));
  };

  return (
    <div className={S.container}>
      <span className={`${S.label} para-md`}>{label}</span>
      <div className={`${S.counter} para-md`}>
        <button className={S.btn} onClick={decrement} disabled={count === 2}>
          <span className={`${S.icon} i_minus`}></span>
        </button>
        <span>{count}명</span>
        <button className={S.btn} onClick={increment} disabled={count === 6}>
          <span className={`${S.icon} i_plus`}></span>
        </button>
      </div>
    </div>
  );
}

export default PeopleCounter;
