import { useState } from 'react';
import S from './PartyCategory.module.css';

// 사용 방법
// <PartyCategory />

function PartyCategory() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = [
    { icon: '🙌', label: '전체' },
    { icon: '📝', label: '스터디' },
    { icon: '💻', label: '프로젝트' },
    { icon: '⚡', label: '오프라인' },
    { icon: '🏆', label: '공모전' },
  ];

  const handleCategoryClick = (label) => {
    setActiveCategory(label);
  };

  return (
    <ul className={S.party_category}>
      {categories.map((category) => (
        <li key={category.label} className={S.list_item}>
          {' '}
          <button
            type="button"
            className={`${S.button} ${
              activeCategory === category.label ? S.active : ''
            }`}
            aria-pressed={activeCategory === category.label}
            onClick={() => handleCategoryClick(category.label)}
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
