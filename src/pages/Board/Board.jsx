import S from './Board.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

function Board() {
  return (
    <>
      <Header back={true} actions={['i_search']} />
      <main className={S.board}>
        <List type="board"></List>
        <FloatingButton />
      </main>
      <Navigation />
    </>
  );
}

export default Board;
