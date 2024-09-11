import S from './Home.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import PartyCategory from '@/components/List/PartyCategory';
import FilterButton from '@/components/List/FilterButton';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabase';

function Home() {
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate('/search');
  };

  const handleFloatButton = () => {
    console.log('파티모집 글 작성하기 버튼 클릭');
  };

  // 상태 관리
  const [activeCategory, setActiveCategory] = useState('전체');
  const [userLocation, setUserLocation] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    관심분야: false,
    최신순: true,
    모집중: true,
    성별: false,
    연령: false,
  });
  const [currentUser, setCurrentUser] = useState(null);

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

  // 카테고리
  const handleCategoryClick = (label) => {
    setActiveCategory(label);
    console.log(`카테고리 선택 : ${label}`);
  };

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

  // 필터 버튼 클릭 핸들러
  const handleFilterButtonClick = (filterType) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: !prevFilters[filterType],
    }));

    console.log(`필터 선택 : ${filterType}`);
  };

  // 모집중
  const showRecruiting = activeFilters['모집중'];

  // 최신순
  const isSortedByLatest = activeFilters['최신순'];

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
          {['관심분야', '최신순', '모집중', '성별', '연령'].map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={activeFilters[filter]}
              onClick={() => handleFilterButtonClick(filter)}
              iconType={
                filter === '관심분야'
                  ? 'i_menu'
                  : activeFilters[filter]
                  ? 'i_check'
                  : ''
              }
            />
          ))}
        </div>

        <List
          type="party"
          category={activeCategory}
          location={userLocation}
          sortByLatest={isSortedByLatest}
          showRecruiting={showRecruiting}
        />

        <FloatingButton onClick={handleFloatButton} />
      </main>
      <Navigation />
    </>
  );
}

export default Home;
