import { GenderSelectorData } from './data/GenderSelectorData';
import S from './GenderSelectorButtons.module.css';

/* eslint-disable react/prop-types */
function GenderSelectorButtons({ onGenderSelect, selectedGender }) {
  const handleGenderSelect = (id) => {
    if (onGenderSelect) {
      onGenderSelect(id);
    }
  };

  return (
    <div className={S.con}>
      <span className={S.selectedOption}>누구나 또는 성별을 설정해주세요.</span>
      <div className={S.buttonGroup}>
        {GenderSelectorData.map((option) => (
          <button
            key={option.id}
            onClick={() => handleGenderSelect(option.id)}
            className={`${S.button} ${
              selectedGender === option.id ? S.selectedButton : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenderSelectorButtons;
