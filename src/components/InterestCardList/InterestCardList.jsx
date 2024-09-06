import InterestCard from './InterestCard';
import { useSupabase } from '@/api/DataService';
import S from './InterestCardList.module.css';

function InterestCardList() {
  const { interest } = useSupabase();
  const { subCategory } = useSupabase();

  if (!interest.length) return <div>Loading...</div>;

  return (
    <div className={S.container}>
      {subCategory.map((subCategory) => (
        <InterestCard key={subCategory.id} active={false}>
          {subCategory.Category.name}
          {subCategory.name}
        </InterestCard>
      ))}
    </div>
  );
}

export default InterestCardList;
