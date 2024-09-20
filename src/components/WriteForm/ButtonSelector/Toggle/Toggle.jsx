import { useState, useEffect, useId } from 'react';
import S from './Toggle.module.css';
import { string, bool, func } from 'prop-types';

Toggle.propTypes = {
  toggleName: string,
  isOn: bool,
  onChange: func,
};

export function Toggle({ toggleName, onChange, isOn = false }) {
  const [isActive, setIsActive] = useState(isOn);
  const id = useId();

  useEffect(() => {
    setIsActive(isOn);
  }, [isOn]);

  const handleChange = (newState) => {
    setIsActive(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className={S.container}>
      <p className="para-md">{toggleName}</p>
      <div className={S.toggleContainer}>
        <input
          type="checkbox"
          id={id}
          className={S.toggleCheckbox}
          checked={isActive}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleChange(!isActive);
            }
          }}
        />
        <label htmlFor={id} className={S.toggleLabel}>
          <span className={S.toggleButton}></span>
        </label>
      </div>
    </div>
  );
}
