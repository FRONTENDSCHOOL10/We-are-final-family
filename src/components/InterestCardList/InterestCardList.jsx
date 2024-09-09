import InterestCard from './InterestCard';
import { DataService } from '@/api/DataService';
import S from './InterestCardList.module.css';

function InterestCardList() {
  const { interest } = DataService();
  const { subCategory } = DataService();

  if (!interest.length) return <div>Loading...</div>;

  return (
    <div className={S.container}>
      {subCategory.map((subCategory) => (
        <InterestCard
          key={subCategory.id}
          active={false}
          interest={subCategory.Category.name}
        >
          {subCategory.name}
        </InterestCard>
      ))}
    </div>
  );
}

export default InterestCardList;
