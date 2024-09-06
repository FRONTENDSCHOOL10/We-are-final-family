import S from './ToggleListMenu.module.css';

/* eslint-disable react/prop-types */
function ToggleListMenu({
  validCategories,
  selectedCategories,
  toggleCategory,
}) {
  return (
    <ul className={S.contanier}>
      {validCategories.map((option) => (
        <li key={option.value} className={S.conItem}>
          <button
            className={`${S.contanierBtn} para-md`}
            onClick={() => toggleCategory(option.value)}
          >
            <span className={`${option.icon} `} />
            <span className={S.lable}>{option.label}</span>
            {selectedCategories[option.value] && (
              <span className={`${S.join} lbl-sm`}>참여중</span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ToggleListMenu;
