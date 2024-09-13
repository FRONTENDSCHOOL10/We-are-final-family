import { useState } from 'react';
import S from './ButtonSelector.module.css';
import { Toggle } from './Toggle/Toggle';

function ButtonSelector({
  data,
  label,
  title = 'off',
  toggle = 'off',
  toggleName,
}) {
  const [selectedOption, setSelectedOption] = useState(data[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getGuidanceText = () => {
    if (label === '성별') {
      return '누구나 또는 성별을 설정해주세요';
    } else if (label === '연령') {
      return '누구나 또는 연령을 설정해주세요';
    }
    return '';
  };

  return (
    <div>
      <div className={S.container}>
        <div className={`${S.labelContainer} lbl-md`}>
          <span className="para-md">{label}</span>
          {title === 'on' && (
            <span className="para-md">{selectedOption.label}</span>
          )}
        </div>
        <div className={S.btnOption}>
          {title === 'on' && (
            <span className={`${S.guidance} para-sm`}>{getGuidanceText()}</span>
          )}
          <div className={S.optionsWrapper}>
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
      </div>
      <div>
        {toggle === 'on' && (
          <Toggle className={S.toggle} toggleName={toggleName} />
        )}
      </div>
    </div>
  );
}

export default ButtonSelector;
