import S from './PartyCategory.module.css';
import { string, func } from 'prop-types';

PartyCategory.propTypes = {
  isActive: string,
  onClick: func.isRequired,
};

function PartyCategory({ isActive, onClick }) {
  const categories = [
    { icon: '🙌', label: '전체' },
    { icon: '📝', label: '스터디' },
    { icon: '💻', label: '프로젝트' },
    { icon: '⚡', label: '오프라인' },
    { icon: '🏆', label: '공모전' },
  ];

  return (
    <ul className={S.party_category}>
      {categories.map((category) => (
        <li key={category.label} className={S.list_item}>
          <button
            type="button"
            className={`${S.button} ${
              isActive === category.label ? S.active : ''
            }`}
            aria-pressed={isActive === category.label}
            onClick={() => {
              onClick(category.label);
            }}
            aria-label={category.label}
          >
            <span className={S.icon_circle} aria-hidden="true">
              {category.icon}
            </span>
            <span className="para-md">{category.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PartyCategory;
