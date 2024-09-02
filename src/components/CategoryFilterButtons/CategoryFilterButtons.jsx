import { useState } from 'react';
import S from './CategoryFilterButtons.module.css';
import CategoryModal from './CategoryModal';
import { filterOptions } from './data/CategoryFilterButtonsData';

function CategoryFilterButtons() {
  const [showModal, setShowModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    latest: false,
    recruiting: false,
    anyone: false,
  });

  function toggleFilter(filter) {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  }

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <div className={S.container}>
      <button
        className={`${S.categoryButton} ${showModal ? S.active : ''}`}
        onClick={toggleModal}
      >
        <span className="i_menu" />
        <span>주제</span>
      </button>
      {filterOptions.map(({ key, label }) => (
        <button
          key={key}
          className={`${S.filterButton} ${activeFilters[key] ? S.active : ''}`}
          onClick={() => toggleFilter(key)}
        >
          {activeFilters[key] && <span className="i_check" />}
          {label}
        </button>
      ))}
      <CategoryModal isOpen={showModal} onClose={toggleModal} />
    </div>
  );
}

export default CategoryFilterButtons;
