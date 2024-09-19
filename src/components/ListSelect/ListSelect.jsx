import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import S from './ListSelect.module.css';
import { fetchListData } from '@/utils/fetchListData';

function ListSelect({ title = '카테고리를 선택해주세요', type = 'A' }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await fetchListData(type);
      setOptions(data);
      setIsLoading(false);
    }
    loadData();
  }, [type]);

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
        <div
          className={S.selectWrapper}
          onClick={toggleDropdown}
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleDropdown();
            }
          }}
        >
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
              {isLoading ? (
                <li className={S.loadingItem}>데이터 로딩 중...</li>
              ) : options.length === 0 ? (
                <li className={S.noDataItem}>데이터가 없습니다.</li>
              ) : (
                options.map((option) => (
                  <li
                    key={option.value}
                    className={S.optionItem}
                    tabIndex="0"
                    onClick={() => handleChange(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleChange(option.value);
                      }
                    }}
                  >
                    {option.label}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

ListSelect.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['A', 'B']),
};

export default ListSelect;
