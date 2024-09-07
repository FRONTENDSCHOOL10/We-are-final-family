import S from './Interest.module.css';
import Button from '@/components/Button/Button';
import InterestCardList from '@/components/InterestCardList/InterestCardList';
import InterestSelector from '@/components/InterestSelector/InterestSelector';
import { useState, useEffect } from 'react';
import { useSupabase } from '@/api/DataService';
import useInterestStore from '@/stores/InterestStore';
import { useNavigate } from 'react-router-dom';

function Interest() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { interest, subCategory } = useSupabase();
  const saveInterests = useInterestStore((state) => state.saveInterests);
  const selectedInterests = useInterestStore(
    (state) => state.selectedInterests
  );
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState(0);
  useEffect(() => {
    setSelectedCount(selectedInterests.length);
  }, [selectedInterests]);

  function handleSelectInterest(selectedInterest) {
    setSelectedCategory(selectedInterest);
  }

  function handleViewAll() {
    setSelectedCategory(null);
  }

  const filteredSubCategories = selectedCategory
    ? subCategory.filter((sub) => sub.Category.name === selectedCategory.name)
    : subCategory;

  const handleSave = () => {
    saveInterests();
    console.log('Saved interests:', selectedInterests);
    navigate('/register/2');
  };

  return (
    <main className={S.interest}>
      <div className={S.body}>
        <InterestSelector
          interests={interest}
          onSelectInterest={handleSelectInterest}
          onViewAll={handleViewAll}
        />
        <InterestCardList
          subCategories={filteredSubCategories}
          selectedCategory={selectedCategory}
        />
      </div>
      <footer>
        <Button
          onClick={handleSave}
          color="black"
          aria-label="선택 항목 저장하기"
        >
          이대로 저장할래요 ({selectedCount})
        </Button>
        <Button
          to="/register/2"
          className={`${S.lateBtn} para-sm`}
          color="transparent"
          aria-label="건너뛰기"
        >
          나중에 할래요
        </Button>
      </footer>
    </main>
  );
}

export default Interest;
