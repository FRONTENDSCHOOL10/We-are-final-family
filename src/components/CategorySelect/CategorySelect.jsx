import { useState } from 'react';
import S from './CategorySelect.module.css';
import { CategoryOptions } from './data/CategorySelectData';

function CategorySelect() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(value) {
    setSelectedOption(value);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={S.con}>
      <div className={S.selectWrapper} onClick={toggleDropdown}>
        <div className={S.selectedOption}>
          {selectedOption
            ? CategoryOptions.find((opt) => opt.value === selectedOption)?.label
            : '카테고리를 선택해주세요'}
        </div>
        <i
          className={`${isOpen ? 'i_direction_top' : 'i_direction_bottom'} ${
            S.icon
          }`}
        ></i>
      </div>
      {isOpen && (
        <ul className={S.optionList}>
          {CategoryOptions.map((option) => (
            <li
              key={option.value}
              className={S.optionItem}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySelect;
