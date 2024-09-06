import S from './Board.module.css';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import List from '@/components/List/List';

function Board() {
  return (
    <main className={S.board}>
      <List type="board"></List>
      <FloatingButton />
    </main>
  );
}

export default Board;
