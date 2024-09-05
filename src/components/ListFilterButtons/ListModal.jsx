import { useState, useEffect } from 'react';
import S from './ListModal.module.css';
import { CategoryOptions } from '@/components/ListSelect/data/CategorySelectData';
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

  const validCategories = CategoryOptions.filter(
    (option) => option.value !== ''
  );

  function toggleCategory(value) {
    setSelectedCategories((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  }

  function toggleAll() {
    const allSelected = validCategories.every(
      (option) => selectedCategories[option.value]
    );
    const newSelectedCategories = {};
    validCategories.forEach((option) => {
      newSelectedCategories[option.value] = !allSelected;
    });
    setSelectedCategories(newSelectedCategories);
  }

  if (!isOpen && !animationClass) return null;

  return (
    <div
      className={`${S.modalOverlay} ${animationClass}`}
      onClick={handleOverlayClick}
    >
      <div className={S.modalContent}>
        <div className={S.modalHeader}>
          <div className={S.modalList}>
            <div className={S.modalHeaderText}>
              <h2 className={`${S.modalHeaderTitle} para-md`}>주제 목록</h2>
              <span className={`${S.modalDetail} para-sm`}>
                주제에 참여하고 관심있는 게시글을 둘러보세요.
              </span>
            </div>
            <button className={S.closeButton} onClick={onClose}>
              <span className={`${S.closeIcon} i_close`} />
            </button>
          </div>
          <ToggleAllButton
            validCategories={validCategories}
            selectedCategories={selectedCategories}
            onClick={toggleAll}
          />
          <ToggleListMenu
            validCategories={validCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
