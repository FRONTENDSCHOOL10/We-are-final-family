import S from './FilterModal.module.css'; // CSS 모듈
import { useState } from 'react';
import IconButton from '@/components/IconButton/IconButton';
import { arrayOf, shape, string, func } from 'prop-types';

FilterModal.propTypes = {
  title: string.isRequired,
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  onSelect: func.isRequired,
  onClose: func,
};

function FilterModal({ title, options, onSelect, onClose }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (value) => {
    if (selectedOptions.includes(value)) {
      // 이미 선택된 항목을 다시 클릭한 경우, 선택 해제
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value)
      );
    } else {
      if (selectedOptions.length < 3) {
        // 최대 3개까지 선택 가능
        setSelectedOptions((prevSelected) => [...prevSelected, value]);
      } else {
        alert('최대 3개까지 선택할 수 있습니다.');
      }
    }
  };

  const handleCloseButton = () => {
    console.log('닫기');
    onClose();
  };

  const handleConfirmSelection = () => {
    // 최종 선택된 옵션들을 부모 컴포넌트로 전달
    onSelect(selectedOptions);
    onClose();
  };

  return (
    <div className={S.overlay}>
      <section className={S.filterModal}>
        <header>
          <h3 className="hdg-md">{title}</h3>
          <IconButton
            title="모달창 닫기"
            className="i_close"
            onClick={handleCloseButton}
          />
        </header>

        {/* 선택된 항목 */}
        <div className={S.selectedOptions}>
          <span>선택된 항목: </span>
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <span key={index} className={S.selectedOption}>
                {option}
              </span>
            ))
          ) : (
            <span className={S.noSelection}>없음</span>
          )}
        </div>

        <ul>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`${S.button} para-md ${
                  selectedOptions.includes(option.value) ? S.active : ''
                }`}
                onClick={() => handleOptionClick(option.value)}
                disabled={
                  !selectedOptions.includes(option.value) &&
                  selectedOptions.length >= 3
                } // 최대 선택 개수에 도달했을 때 비활성화
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 확인 버튼 */}
        <button
          type="button"
          className={S.confirmButton}
          onClick={handleConfirmSelection}
          disabled={selectedOptions.length === 0} // 선택된 항목이 없으면 비활성화
        >
          확인
        </button>
      </section>
    </div>
  );
}

export default FilterModal;
