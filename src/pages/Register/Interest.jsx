import S from './Interest.module.css';
import Button from '@/components/Button/Button';
import InterestCardList from '@/components/InterestCardList/InterestCardList';
import InterestSelector from '@/components/InterestSelector/InterestSelector';
import { useState } from 'react';
import { useSupabase } from '@/api/DataService';

function Interest() {
  const [selectedInterest, setSelectedInterest] = useState(null);
  const { interest, subCategory } = useSupabase();

  function handleSelectInterest(selectedInterest) {
    setSelectedInterest(selectedInterest);
  }

  const filteredSubCategories = selectedInterest
    ? subCategory.filter((sub) => sub.Category.name === selectedInterest.name)
    : subCategory;

  return (
    <main className={S.interest}>
      <div className={S.body}>
        <InterestSelector
          interests={interest}
          onSelectInterest={handleSelectInterest}
        />
        <InterestCardList
          subCategories={filteredSubCategories}
          selectedInterest={selectedInterest}
        />
      </div>
      <footer>
        <Button to="/register/2" color="black" aria-label="선택 항목 저장하기">
          이대로 저장할래요
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
