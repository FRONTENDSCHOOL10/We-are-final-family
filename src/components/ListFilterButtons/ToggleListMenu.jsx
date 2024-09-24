import NoneData from '@/pages/NoneData';
import S from './ToggleListMenu.module.css';

/* eslint-disable react/prop-types */
function ToggleListMenu({
  validCategories = [],
  selectedCategories = {},
  toggleCategory,
}) {
  const hasValidCategories =
    Array.isArray(validCategories) && validCategories.length > 0;

  return (
    <ul className={S.contanier}>
      {hasValidCategories ? (
        validCategories.map((option) => (
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
        ))
      ) : (
        <NoneData icon="i_close" text="검색 결과가 없습니다." />
      )}
    </ul>
  );
}

export default ToggleListMenu;
