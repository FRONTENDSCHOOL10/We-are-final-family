import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import S from './ListModal.module.css';
import ToggleAllButton from './ToggleAllButton';
import ToggleListMenu from './ToggleListMenu';

function CategoryModal({ isOpen, onClose }) {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass(S.slideIn);
    } else {
      setAnimationClass(S.slideOut);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function toggleCategory(value) {
    setSelectedCategories((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  }

  if (!isOpen && !animationClass) return null;

  return (
    <div
      className={`${S.modalOverlay} ${animationClass}`}
      onClick={handleOverlayClick}
    >
      <article className={S.modalContent}>
        <header className={S.modalHeader}>
          <div className={S.modalHeaderText}>
            <h2 className={`${S.modalHeaderTitle} para-md`}>관심분야</h2>
            <span className={`${S.modalDetail} para-sm`}>
              관심있는 분야에 참여하고 관련된 게시글을 둘러보세요.
            </span>
          </div>
          <button className={S.closeButton} onClick={onClose}>
            <span className={`${S.closeIcon} i_close`} />
          </button>
        </header>
        <ToggleAllButton selectedCategories={selectedCategories} />
        <ToggleListMenu
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />
      </article>
    </div>
  );
}

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CategoryModal;
