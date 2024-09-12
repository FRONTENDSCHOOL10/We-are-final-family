import S from './Home.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import PartyCategory from '@/components/List/PartyCategory';
import FilterButton from '@/components/List/FilterButton';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import FilterModal from '@/components/List/FilterModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabase';
import useHomeStore from '@/stores/useHomeStore';

function Home() {
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

  // 상태 관리
  const [currentUser, setCurrentUser] = useState(null);
  const [userLocation, setUserLocation] = useState('');

  // TODO Zustand 상태 및 함수 가져오기
  // 카테고리
  const { activeCategory, setActiveCategory, activeFilter, updateFilter } =
    useHomeStore();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState('');
  const [currentFilterType, setCurrentFilterType] = useState('');
  const [filterValues, setFilterValues] = useState({}); // 선택된 필터 값을 저장하는 상태

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
  }, []);

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

  // TODO
  // 필터 & 모달
  // Filter options
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
    관심분야: [
      { value: '관심1', label: '관심1' },
      { value: '관심2', label: '관심2' },
    ],
  };

  const handleFilterChange = (filterKey) => {
    if (filterKey === '성별' || filterKey === '연령') {
      setCurrentFilterType(filterKey);
      setIsFilterModalOpen(filterKey);
    } else {
      updateFilter(filterKey, !activeFilter[filterKey]);
    }
  };

  const handleApplyFilter = (filterType, value) => {
    if (filterType === '관심분야') {
      updateFilter(filterType, value);
      setFilterValues((prev) => ({ ...prev, [filterType]: value })); // 관심분야 값 업데이트
    } else {
      updateFilter(filterType, value);
      setFilterValues((prev) => ({ ...prev, [filterType]: value })); // 성별 또는 연령 값 업데이트
    }
    closeFilterModal();
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen('');
  };

  const getFilterLabel = (key) => {
    return filterValues[key] || key;
  };

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

        <List
          type="party"
          category={activeCategory}
          location={userLocation}
          sortByLatest={isSortedByLatest}
          sortByRecruiting={sortByRecruiting}
        />

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
