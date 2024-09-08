import { node, string, number, bool, func } from 'prop-types';
import S from './InterestCard.module.css';

function InterestCard({ children, interest, id, isSelected, onToggle }) {
  const componentClass = isSelected
    ? `${S.component} ${S.componentActive}`
    : `${S.component}`;

  const inputId = `interest-${id}`;

  return (
    <div className={`${S.btn} ${componentClass}`}>
      <input
        type="checkbox"
        id={inputId}
        name={inputId}
        checked={isSelected}
        onChange={onToggle}
        className={S.hiddenCheckbox}
      />
      <label htmlFor={inputId} className={S.label}>
        <div className={S.textContainer}>
          <span className="para-sm">{interest}</span>
          <p className="para-md">{children}</p>
        </div>

        {isSelected ? (
          <span className={`${S.icon} i_check`}></span>
        ) : (
          <span className={`${S.icon} i_plus`}></span>
        )}
      </label>
    </div>
  );
}

InterestCard.propTypes = {
  children: node.isRequired,
  interest: string.isRequired,
  id: number.isRequired,
  isSelected: bool.isRequired,
  onToggle: func.isRequired,
};

export default InterestCard;
