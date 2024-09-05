import { useState } from 'react';
import S from './ButtonSelector.module.css';

function ButtonSelector({ data, label }) {
  const [selectedOption, setSelectedOption] = useState(data[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getGuidanceText = () => {
    if (label === '성별') {
      return '누구나 또는 성별을 설정해주세요';
    } else if (label === '나이') {
      return '누구나 또는 나이대를 설정해주세요';
    }
    return '';
  };

  return (
    <div className={S.container}>
      <div className={S.labelContainer}>
        <span className="para-md">{label}</span>
        <span className="para-md">{selectedOption.label}</span>
      </div>
      <div className={S.optionsWrapper}>
        <span className={`${S.guidance} para-sm`}>{getGuidanceText()}</span>
        <div className={S.optionsContainer}>
          {data.map((item) => (
            <button
              className={`${S.optionBtn} para-md ${
                selectedOption === item ? S.selected : ''
              }`}
              key={item.id}
              onClick={() => handleOptionClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ButtonSelector;
