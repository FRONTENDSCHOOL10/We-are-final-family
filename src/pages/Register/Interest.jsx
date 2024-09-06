import S from './Interest.module.css';
import Button from '@/components/Button/Button';
import InterestCardList from '@/components/InterestCardList/InterestCardList';
import InterestSelector from '@/components/InterestSelector/InterestSelector';
import { useState } from 'react';

function Interest() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  function handleSelectInterest(interest) {
    setSelectedInterests((prev) => [...prev, interest]);
  }

  return (
    <main className={S.interest}>
      <InterestSelector onSelectInterest={handleSelectInterest} />
      <div className={S.body}>
        <InterestCardList interests={selectedInterests} />
      </div>
      <Button color="black">이대로 저장할래요</Button>
      <button type="button">나중에 할래요</button>
    </main>
  );
}

export default Interest;
