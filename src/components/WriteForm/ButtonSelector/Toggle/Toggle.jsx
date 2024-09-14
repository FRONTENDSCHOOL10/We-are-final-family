import { useState, useEffect, useId } from 'react';
import S from './Toggle.module.css';
import { bool, func } from 'prop-types';

Toggle.propTypes = {
  isOn: bool,
  onChange: func,
};

export function Toggle({ toggleName, onChange, isOn = false }) {
  const [isActive, setIsActive] = useState(isOn);
  const id = useId();

  useEffect(() => {
    setIsActive(isOn);
  }, [isOn]);

  const handleChange = (e) => {
    const newState = e.target.checked;
    setIsActive(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className={S.container}>
      <div>{toggleName}</div>
      <div className={S.toggleContainer}>
        <input
          type="checkbox"
          id={id}
          className={S.toggleCheckbox}
          checked={isActive}
          onChange={handleChange}
        />
        <label htmlFor={id} className={S.toggleLabel}>
          <span className={S.toggleButton}></span>
        </label>
      </div>
    </div>
  );
}
