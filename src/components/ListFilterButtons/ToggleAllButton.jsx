import S from './ToggleAllButton.module.css';

/* eslint-disable react/prop-types */
function ToggleAllButton({
  validCategories = [],
  selectedCategories = {},
  onClick,
}) {
  const allSelected =
    Array.isArray(validCategories) &&
    validCategories.length > 0 &&
    validCategories.every((option) => selectedCategories[option.value]);

  return (
    <>
      <button className={S.btn} onClick={onClick}>
        <span className="i_emoji" />
        <span className="para-md">
          {allSelected ? '전체 해제' : '전체 선택'}
        </span>
      </button>
    </>
  );
}

export default ToggleAllButton;
