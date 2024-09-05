import S from './ToggleListMenu.module.css';

/* eslint-disable react/prop-types */
function ToggleListMenu({
  validCategories,
  selectedCategories,
  toggleCategory,
}) {
  return (
    <div className={S.contanier}>
      {validCategories.map((option) => (
        <div key={option.value} className={S.conItem}>
          <button
            className={`${S.contanierBtn} para-md`}
            onClick={() => toggleCategory(option.value)}
          >
            <div className={S.btnImgName}>
              <span className={`${S.btnimg} ${option.icon} `} />
              <div className={S.btnName}>{option.label}</div>
            </div>
            {selectedCategories[option.value] && (
              <span className={`${S.join} lbl-sm`}>참여중</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToggleListMenu;
