import { useState, useId } from 'react';
import PropTypes from 'prop-types';
import S from './CheckboxList.module.css';

function Checkbox({
  title,
  content,
  info,
  checked,
  onChange,
  isRequired,
  showButton,
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div className={S.checkboxContainer}>
      <div className={S.checkboxHeader}>
        <div className={S.checkboxTitleArea}>
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className={S.checkboxInput}
          />
          <label htmlFor={id} className={`${S.checkboxLabel} para-sm`}>
            <span
              className={`${S.checkboxIcon} ${checked ? 'i_check' : 'i_check'}`}
            />
            <span className={S.checkboxTitle}>{title}</span>
            {isRequired && <span className={S.requiredText}>필수동의</span>}
          </label>
        </div>
        {showButton && content && (
          <button
            className={`${S.expandButton} para-sm`}
            onClick={() => setExpanded(!expanded)}
          >
            자세히
          </button>
        )}
      </div>
      {expanded && (
        <div className={S.agreementInfo}>
          <p className={`${S.agreementContent} para-sm`}>{content}</p>
          {info && <p className={`${S.agreementInfoText} para-sm`}>{info}</p>}
        </div>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  info: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  showButton: PropTypes.bool,
};

function CheckboxList({ agreements, checkedItems, onCheckChange }) {
  return (
    <div className={S.checkboxList}>
      {agreements.map((agreement, index) => (
        <Checkbox
          key={index}
          title={agreement.title}
          content={agreement.content}
          info={agreement.info}
          checked={checkedItems[index + 1]}
          onChange={(checked) => onCheckChange(index, checked)}
          isRequired={agreement.isRequired}
          showButton={agreement.showButton}
        />
      ))}
    </div>
  );
}

CheckboxList.propTypes = {
  agreements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      info: PropTypes.string,
      isRequired: PropTypes.bool,
      showButton: PropTypes.bool,
    })
  ).isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onCheckChange: PropTypes.func.isRequired,
};

export default CheckboxList;
