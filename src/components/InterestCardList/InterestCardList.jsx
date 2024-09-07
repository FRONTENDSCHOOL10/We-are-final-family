import InterestCard from './InterestCard';
import S from './InterestCardList.module.css';
import PropTypes from 'prop-types';

function InterestCardList({ subCategories }) {
  if (!subCategories.length) return <div>Loading...</div>;

  return (
    <div className={S.container}>
      {subCategories.map((subCategory) => (
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
