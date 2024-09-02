import { useState } from 'react';
import S from './CategoryModal.module.css';
import { CategoryOptions } from '@/components/CategorySelect/data/CategorySelectData';
import ToggleAllButton from './ToggleAllButton';
import CategoryModalMenu from './CategoryModalMenu';

/* eslint-disable react/prop-types */
function CategoryModal({ isOpen, onClose }) {
  const [selectedCategories, setSelectedCategories] = useState({});

  if (!isOpen) return null;

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

  return (
    <div className={S.modalOverlay}>
      <div className={S.modalContent}>
        <div className={S.modalList}>
          <div className={S.modalTitleContent}>
            <h2 className={S.modalTitle}>주제 목록</h2>
            <span>주제에 참여하고 관심있는 게시글을 둘러보세요.</span>
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
        <CategoryModalMenu
          validCategories={validCategories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />
      </div>
    </div>
  );
}

export default CategoryModal;
