import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './AgreementForm.module.css';
import CheckboxList from './CheckboxList';

function AgreementForm({ agreements, sendDataToParent }) {
  const [checkedItems, setCheckedItems] = useState(
    new Array(agreements.length + 1).fill(false)
  );

  const handleAllCheck = (checked) => {
    setCheckedItems(new Array(agreements.length + 1).fill(checked));
  };

  useEffect(() => {
    sendDataToParent(checkedItems);
  }, [checkedItems, sendDataToParent]);

  const handleSingleCheck = (index, checked) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index + 1] = checked;
    newCheckedItems[0] = newCheckedItems.slice(1).every(Boolean);
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className={S.agreementForm}>
      <h2 className={S.agreementFormTitle}>이용약관 동의</h2>
      <div className={S.checkboxContainer}>
        <input
          type="checkbox"
          id="all-check"
          checked={checkedItems[0]}
          onChange={(e) => handleAllCheck(e.target.checked)}
          className={S.checkboxInput}
        />
        <label htmlFor="all-check" className={S.checkboxLabel}>
          <span
            className={`${S.checkboxIcon} ${
              checkedItems[0] ? 'i_check' : 'i_check'
            }`}
          />
          <span className={`${S.checkboxTitle} para-md`}>
            아래 내용에 전체 동의합니다.
          </span>
          <span className={`${S.requiredText} para-md`}>필수 동의</span>
        </label>
      </div>
      <CheckboxList
        agreements={agreements}
        checkedItems={checkedItems}
        onCheckChange={handleSingleCheck}
      />
    </div>
  );
}

AgreementForm.propTypes = {
  agreements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      info: PropTypes.string,
      isRequired: PropTypes.bool,
      showButton: PropTypes.bool,
    })
  ).isRequired,
  sendDataToParent: PropTypes.func.isRequired,
};

export default AgreementForm;
