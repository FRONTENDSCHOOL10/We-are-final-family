import InterestCard from './InterestCard';
import S from './InterestCardList.module.css';
import PropTypes from 'prop-types';
import useInterestStore from '@/stores/InterestStore';
import { Fallback } from '@/pages';

function InterestCardList({ subCategories }) {
  const { selectedInterests, addInterest, removeInterest } = useInterestStore();

  if (!subCategories.length) return <Fallback />;

  const handleToggle = (subCategory) => {
    const isSelected = selectedInterests.some(
      (item) => item.id === subCategory.id
    );
    if (isSelected) {
      removeInterest(subCategory.id);
    } else {
      addInterest({
        id: subCategory.id,
        name: subCategory.name,
        category: subCategory.Category.name,
      });
    }
  };

  return (
    <div className={S.container}>
      {subCategories.map((subCategory) => (
        <InterestCard
          key={subCategory.id}
          id={subCategory.id}
          interest={subCategory.Category.name}
          isSelected={selectedInterests.some(
            (item) => item.id === subCategory.id
          )}
          onToggle={() => handleToggle(subCategory)}
        >
          {subCategory.name}
        </InterestCard>
      ))}
    </div>
  );
}

InterestCardList.propTypes = {
  subCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default InterestCardList;
