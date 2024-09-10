import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './Interest.module.css';
import Button from '@/components/Button/Button';
import InterestCardList from '@/components/InterestCardList/InterestCardList';
import InterestSelector from '@/components/InterestSelector/InterestSelector';
import { getData } from '@/api/DataService';
import useInterestStore from '@/stores/InterestStore';

function Interest() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [interest, setInterest] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { saveInterests, selectedInterests, canAddMore } = useInterestStore();
  const selectedCount = selectedInterests.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interestResult = await getData({
          form: 'interest',
          select: '*',
          setState: setInterest,
        });

        if (!interestResult.success) {
          throw new Error('Failed to fetch interest data');
        }

        const subCategoryResult = await getData({
          form: 'interest_sub',
          select: 'id, name, Category:category_id (name)',
          setState: setSubCategory,
        });

        if (!subCategoryResult.success) {
          throw new Error('Failed to fetch sub_category data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  const handleSelectInterest = useCallback((selectedInterest) => {
    setSelectedCategory(selectedInterest);
  }, []);

  const handleViewAll = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const filteredSubCategories = selectedCategory
    ? subCategory.filter((sub) => sub.Category.name === selectedCategory.name)
    : subCategory;

  const handleSave = useCallback(() => {
    if (selectedCount === 0) {
      setError('최소 1개의 관심사를 선택해주세요.');
      return;
    }
    saveInterests();
    console.log('Saved interests:', selectedInterests);
    navigate('/register/2');
  }, [saveInterests, selectedInterests, navigate, selectedCount]);

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
        {!canAddMore() && (
          <p className={`${S.maxWarning} para-sm`}>
            최대 6개의 관심사를 선택할 수 있습니다.
          </p>
        )}
        {error && <p className={`${S.error} para-sm`}>{error}</p>}
      </div>
      <footer>
        <Button
          onClick={handleSave}
          color="black"
          aria-label="선택 항목 저장하기"
          disabled={selectedCount === 0}
        >
          이대로 저장할래요 ({selectedCount}/6)
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
