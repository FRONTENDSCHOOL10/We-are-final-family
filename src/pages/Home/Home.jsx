import S from './Home.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import PartyCategory from '@/components/List/PartyCategory';
import FilterButton from '@/components/List/FilterButton';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import FilterModal from '@/components/List/FilterModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabase';
import useHomeStore from '@/stores/useHomeStore';
import { useState } from 'react';
import { getData } from '@/api/DataService';
import Fallback from '@/pages/Fallback';
import Error from '@/pages/Error';

function Home() {
  // 상태 관리
  const {
    activeCategory,
    setActiveCategory,
    activeFilter,
    updateFilter,
    isFilterModalOpen,
    setIsFilterModalOpen,
    // currentFilterType,
    setCurrentFilterType,
    filterValues,
    setFilterValues,
    currentUser,
    setCurrentUser,
    userLocation,
    setUserLocation,
  } = useHomeStore();
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [interestOptions, setInterestOptions] = useState([]);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [error, setError] = useState(null);

  // navigate
  const navigate = useNavigate();

  // 검색 버튼
  const handleSearchButton = () => {
    navigate('/search');
  };

  // 작성 버튼
  const handleFloatButton = () => {
    navigate('/home/write');
  };

  // 로그인 유저 정보
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
      }
    };

    fetchUser();

    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(savedLocation);
    }
  }, [setCurrentUser, setUserLocation]);

  // 내 위치
  const handleLocationUpdate = async (location) => {
    setUserLocation(location);

    // 로그인한 사용자 위치 정보
    if (currentUser) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ location })
          .eq('id', currentUser.id);

        if (error) throw error;
        console.log(`위치 업데이트 성공: ${location}`);
        localStorage.setItem('userLocation', location); // 로컬 스토리지 저장
      } catch (error) {
        console.error('위치 업데이트 실패:', error.message);
      }
    } else {
      console.log('로그인된 사용자가 아님.');
    }
  };

  // 카테고리
  const handleCategoryClick = (label) => {
    setActiveCategory(label);
    console.log(`카테고리 선택 : ${label}`);
  };

  useEffect(() => {
    const loadInterests = async () => {
      setLoadingInterests(true);
      const response = await getData({
        form: 'interest_sub',
        select: 'name',
        setState: (data) => {
          const formattedData = data.map((item) => ({
            value: item.name,
            label: item.name,
          }));
          setInterestOptions(formattedData);
        },
      });

      if (!response.success) {
        setError(response.error);
      }

      setLoadingInterests(false);
    };

    loadInterests();
  }, []);

  // 필터링 버튼 모달 옵션
  const filterOptions = {
    성별: [
      { value: '누구나', label: '누구나' },
      { value: '남성', label: '남성' },
      { value: '여성', label: '여성' },
    ],
    연령: [
      { value: '누구나', label: '누구나' },
      { value: '10대', label: '10대' },
      { value: '20대', label: '20대' },
      { value: '30대', label: '30대' },
      { value: '40대', label: '40대' },
      { value: '50대 이상', label: '50대 이상' },
    ],
    관심분야: interestOptions,
  };

  const handleFilterChange = (filterKey) => {
    if (
      filterKey === '관심분야' ||
      filterKey === '성별' ||
      filterKey === '연령'
    ) {
      setCurrentFilterType(filterKey);
      setIsFilterModalOpen(filterKey);
    } else {
      updateFilter(filterKey, !activeFilter[filterKey]);
    }
  };

  const handleApplyFilter = (filterType, value) => {
    if (filterType === '관심분야') {
      const selectedValues = value; // 배열
      setFilterValues((prev) => ({
        ...prev,
        [filterType]: selectedValues,
      }));
      updateFilter(filterType, selectedValues); // 필터 적용
    } else {
      updateFilter(filterType, value); // 단일 선택
      setFilterValues((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }

    if (filterType === '성별') {
      setSelectedGender(value);
    }

    if (filterType === '연령') {
      setSelectedAge(value);
    }

    closeFilterModal();
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen('');
  };

  const getFilterLabel = (key) => {
    return filterValues[key] || key;
  };

  // 관심분야
  const sortByInterest = Array.isArray(activeFilter['관심분야'])
    ? activeFilter['관심분야']
    : []; // 기본값으로 빈 배열 제공

  // 최신순
  const isSortedByLatest = activeFilter['최신순'];

  // 모집중
  const sortByRecruiting = activeFilter['모집중'];

  return (
    <>
      <Header
        myLocation={true}
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
        onLocationUpdate={handleLocationUpdate} // 사용자 위치 업데이트 콜백
      />
      <main className={S.home}>
        <PartyCategory
          isActive={activeCategory}
          onClick={handleCategoryClick}
        />

        {/* FilterButton */}
        <div className={S.filters}>
          {Object.keys(activeFilter).map((item) => (
            <FilterButton
              key={item}
              label={getFilterLabel(item)} // 선택된 값 또는 기본값을 label로 설정
              onClick={() => handleFilterChange(item)}
              isActive={!!activeFilter[item]} // Ensure isActive is a boolean
              iconType={item === '관심분야' ? 'i_menu' : ''}
            />
          ))}
        </div>

        {/* <List
          type="party"
          category={activeCategory}
          location={userLocation}
          sortByInterest={sortByInterest}
          sortByLatest={isSortedByLatest}
          sortByRecruiting={sortByRecruiting}
          gender={selectedGender}
          age={selectedAge}
        /> */}
        {error ? (
          <Error />
        ) : loadingInterests ? (
          <Fallback />
        ) : (
          <List
            type="party"
            category={activeCategory}
            location={userLocation}
            sortByInterest={sortByInterest}
            sortByLatest={isSortedByLatest}
            sortByRecruiting={sortByRecruiting}
            gender={selectedGender}
            age={selectedAge}
          />
        )}

        <FloatingButton onClick={handleFloatButton} />
      </main>
      <Navigation />

      {isFilterModalOpen && (
        <FilterModal
          title={isFilterModalOpen}
          onClose={closeFilterModal}
          filterOptions={filterOptions}
          onApply={(filterType, value) => handleApplyFilter(filterType, value)}
        />
      )}
    </>
  );
}

export default Home;
