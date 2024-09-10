import S from './Board.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

function Board() {
  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.board}>
        <List type="board"></List>
        <FloatingButton />
      </main>
      <Navigation />
    </>
  );
}

export default Board;
