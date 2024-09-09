import { useState, useEffect } from 'react';
import S from './ListFilterButtons.module.css';
import ListModal from './ListModal';
import { filterOptions } from './data/ListFilterButtonsData';

// 사용방법
// <ListFilterButtons filter={true} />
// <ListFilterButtons filter={false} />

function ListFilterButtons({ filter }) {
  const [showModal, setShowModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    latest: false,
    recruiting: false,
    anyone: false,
  });

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  function toggleFilter(filterKey) {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  }

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <div className={`${S.container} para-md`}>
      {filter && (
        <button
          className={`${S.categoryButton} ${showModal ? S.active : ''}`}
          onClick={toggleModal}
        >
          <span className={`${S.icon} i_menu`} />
          관심분야
        </button>
      )}
      {filterOptions.map(({ key, label }) => (
        <button
          key={key}
          className={`${S.filterButton} para-md ${
            activeFilters[key] ? S.active : ''
          }`}
          onClick={() => toggleFilter(key)}
        >
          {activeFilters[key] && <span className={`${S.icon} i_check`} />}
          {label}
        </button>
      ))}
      <ListModal isOpen={showModal} onClose={toggleModal} />
    </div>
  );
}

export default ListFilterButtons;
