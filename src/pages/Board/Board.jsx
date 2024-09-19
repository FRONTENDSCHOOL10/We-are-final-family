import S from './Board.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import FilterButton from '@/components/List/FilterButton';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Board() {
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate('/search');
  };

  const handleFloatButton = () => {
    console.log('게시글 작성하기 버튼 클릭');
  };

  const [activeFilter, setActiveFilter] = useState('전체');

  // 필터 버튼 클릭 핸들러
  const handleFilterButtonClick = (filterType) => {
    setActiveFilter(filterType);

    console.log(`필터 선택 : ${filterType}`);
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.board}>
        {/* FilterButton */}
        <div className={S.filters}>
          {['전체', 'Q&A', '자유게시판', '취업준비', '자격증'].map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => handleFilterButtonClick(filter)}
            />
          ))}
        </div>

        {/* <List type="board"></List> */}
        <List type="board" category={activeFilter}></List>

        <FloatingButton onClick={handleFloatButton} />
      </main>
      <Navigation />
    </>
  );
}

export default Board;
