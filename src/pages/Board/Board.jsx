import S from './Board.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import { useNavigate } from 'react-router-dom';

function Board() {
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate('/search');
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
