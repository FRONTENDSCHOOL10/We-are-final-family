import S from './ButtonSelector.module.css';
import { useState, useEffect } from 'react';
import { Toggle } from './Toggle/Toggle';
import { arrayOf, oneOf, shape, string, func, bool } from 'prop-types';

ButtonSelector.propTypes = {
  data: arrayOf(
    shape({
      id: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  label: string.isRequired,
  title: oneOf(['on', 'off']),
  toggle: oneOf(['on', 'off']),
  toggleName: string,
  btnValue: string.isRequired,
  onChange: func.isRequired,
  onToggleChange: func,
  isToggleOn: bool,
};

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
    <>
      <span className="lbl-md">{label}</span>
      {title === 'on' && (
        <>
          <span className="lbl-md">{selectedOption.label}</span>
          <span className={`${S.guidance} para-sm`}>{getGuidanceText()}</span>
        </>
      )}
      <ul
        role="group"
        aria-label={`${label} 옵션 목록`}
        className={S.optionList}
      >
        {data.map((item) => (
          <li key={item.id}>
            <button
              className={`${S.optionBtn} para-md ${
                selectedOption === item ? S.selected : ''
              }`}
              onClick={() => handleOptionClick(item)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {toggle === 'on' && (
        <Toggle
          className={S.toggle}
          toggleName={toggleName}
          onChange={onToggleChange}
          isOn={isToggleOn}
        />
      )}
    </>
  );
}

export default ButtonSelector;
