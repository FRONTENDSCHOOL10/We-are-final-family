import S from './CategoryModalMenu.module.css';

/* eslint-disable react/prop-types */
function CategoryModalMenu({
  validCategories,
  selectedCategories,
  toggleCategory,
}) {
  return (
    <div className={S.con}>
      {validCategories.map((option) => (
        <div key={option.value} className={S.conItem}>
          <button
            className={S.conbtn}
            onClick={() => toggleCategory(option.value)}
          >
            <span className={`${S.img} ${option.icon}`} />
            {option.label}
            {selectedCategories[option.value] && (
              <span className={S.join}>참여중</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryModalMenu;
