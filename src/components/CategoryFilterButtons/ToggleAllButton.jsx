import S from './ToggleAllButton.module.css';

/* eslint-disable react/prop-types */
function ToggleAllButton({ validCategories, selectedCategories, onClick }) {
  const allSelected = validCategories.every(
    (option) => selectedCategories[option.value]
  );

  return (
    <>
      <button className={S.btn} onClick={onClick}>
        <span className={`${S.img} i_emoji`} />
        {allSelected ? '전체 해제' : '전체 선택'}
      </button>
    </>
  );
}

export default ToggleAllButton;
