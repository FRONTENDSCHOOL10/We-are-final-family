import S from './FillterButton.module.css';
import { string, bool, func } from 'prop-types';

FilterButton.propTypes = {
  label: string.isRequired,
  onClick: func.isRequired,
  isActive: bool,
  iconType: string,
};

function FilterButton({ label, onClick, isActive, iconType }) {
  return (
    <button
      className={`${S.FillterButton} para-md ${isActive ? S.active : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {isActive ? (
        <span className="i_check"></span>
      ) : (
        iconType && <span className={iconType}></span>
      )}
      {label}
    </button>
  );
}

export default FilterButton;
