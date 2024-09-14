import { useState, useEffect } from 'react';
import S from './ButtonSelector.module.css';
import { Toggle } from './Toggle/Toggle';

function ButtonSelector({
  data,
  label,
  title = 'off',
  toggle = 'off',
  toggleName,
  btnValue,
  onChange,
  onToggleChange,
  isToggleOn,
}) {
  const [selectedOption, setSelectedOption] = useState(data[0]);

  useEffect(() => {
    const option = data.find((item) => item.label === btnValue);
    setSelectedOption(option);
  }, [btnValue, data]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option.label);
    }
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
          <Toggle
            className={S.toggle}
            toggleName={toggleName}
            onChange={onToggleChange}
            isOn={isToggleOn}
          />
        )}
      </div>
    </div>
  );
}

export default ButtonSelector;
