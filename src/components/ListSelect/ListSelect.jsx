import { useState, useEffect, useRef } from 'react';
import S from './ListSelect.module.css';
import { CategoryOptions as CategorySelectData } from './data/CategorySelectData';
import { CategoryOptions as TitleSelectData } from './data/TitleSelectData';

function ListSelect({ title = '카테고리를 선택해주세요', dataSource }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const options = dataSource === 'title' ? TitleSelectData : CategorySelectData;

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleChange(value) {
    setSelectedOption(value);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {isOpen && (
        <div className={S.overlay} onClick={() => setIsOpen(false)}></div>
      )}
      <div className={`${S.con} para-md`} ref={selectRef}>
        <div className={S.selectWrapper} onClick={toggleDropdown}>
          <div className={S.selectedOption}>
            {selectedOption
              ? options.find((opt) => opt.value === selectedOption)?.label
              : title}
          </div>
          <span
            className={`${isOpen ? 'i_direction_top' : 'i_direction_bottom'} ${
              S.icon
            }`}
          ></span>
        </div>

        {isOpen && (
          <div className={S.optionListWrapper}>
            <div className={S.closeButtonWrapper}>
              <span className={S.title}>{title}</span>
              <button
                className={S.closeButton}
                onClick={() => setIsOpen(false)}
              >
                <span className={`${S.closeIcon} i_close`} />
              </button>
            </div>
            <ul className={S.optionList}>
              {options.map((option) => (
                <li
                  key={option.value}
                  className={S.optionItem}
                  onClick={() => handleChange(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default ListSelect;
