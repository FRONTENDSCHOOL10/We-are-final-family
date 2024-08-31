import S from './HeaderBoard.module.css';
import IconButton from '@/components/IconButton/IconButton';

function HeaderBoard() {
  return (
    <header className={S.header}>
      <IconButton className="i_direction_left" />
      <IconButton className="i_search" />
    </header>
  );
}

export default HeaderBoard;
