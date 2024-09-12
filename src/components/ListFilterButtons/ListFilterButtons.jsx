import { useState, useEffect } from 'react';
import S from './ListFilterButtons.module.css';
import ListModal from './ListModal';
import {
  filterOptions,
  searchFilterOptions,
} from './data/ListFilterButtonsData';
import PropTypes from 'prop-types';

function ListFilterButtons({
  filter,
  optionsType = 'filterOptions',

  onChange,
  activeFilter,
}) {
  const [showModal, setShowModal] = useState(false);

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
    if (onChange) {
      onChange(filterKey);
    }
  }

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  const options =
    optionsType === 'filterOptions' ? filterOptions : searchFilterOptions;

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
      {options.map(({ key, label }) => (
        <button
          key={key}
          className={`${S.filterButton} para-md ${
            activeFilter === key ? S.active : ''
          }`}
          onClick={() => toggleFilter(key)}
        >
          {activeFilter === key && <span className={`${S.icon} i_check`} />}
          {label}
        </button>
      ))}
      <ListModal isOpen={showModal} onClose={toggleModal} />
    </div>
  );
}

ListFilterButtons.propTypes = {
  filter: PropTypes.bool,
  optionsType: PropTypes.oneOf(['filterOptions', 'searchFilterOptions']),
  singleSelect: PropTypes.bool,
  onChange: PropTypes.func,
  activeFilter: PropTypes.string,
};

export default ListFilterButtons;
