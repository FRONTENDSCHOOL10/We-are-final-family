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
        <h2 className={S.modalTitle}>카테고리 선택</h2>
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
        <button className={S.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default CategoryModal;
