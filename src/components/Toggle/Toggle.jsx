import { useState, useEffect } from 'react';
import styles from './Toggle.module.css';
import { bool, func } from 'prop-types';

Toggle.propTypes = {
  initialState: bool,
  onChange: func,
};

export function Toggle({ initialState = false, onChange }) {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    setIsActive(initialState);
  }, [initialState]);

  const handleChange = (e) => {
    const newState = e.target.checked;
    setIsActive(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <input
        type="checkbox"
        id="toggle"
        className={styles.toggleCheckbox}
        checked={isActive}
        onChange={handleChange}
      />
      <label htmlFor="toggle" className={styles.toggleLabel}>
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
}
