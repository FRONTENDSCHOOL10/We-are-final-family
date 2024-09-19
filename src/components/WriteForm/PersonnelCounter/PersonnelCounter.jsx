import S from './PersonnelCounter.module.css';
import PropTypes from 'prop-types';

function PersonnelCounter({ label, value, onChange }) {
  const increment = () => {
    onChange(value < 6 ? value + 1 : value);
  };

  const decrement = () => {
    onChange(value > 2 ? value - 1 : 2);
  };

  return (
    <div className={S.container}>
      <span className={`${S.label} para-md`}>{label}</span>
      <div className={`${S.counter} para-md`}>
        <button className={S.btn} onClick={decrement} disabled={value === 2}>
          <span className={`${S.icon} i_minus`}></span>
        </button>
        <span>{value}명</span>
        <button className={S.btn} onClick={increment} disabled={value === 6}>
          <span className={`${S.icon} i_plus`}></span>
        </button>
      </div>
    </div>
  );
}

PersonnelCounter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PersonnelCounter;
