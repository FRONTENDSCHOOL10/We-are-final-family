import S from './HeaderWrite.module.css';
import IconButton from '@/components/IconButton/IconButton';

function HeaderWrite() {
  return (
    <header className={S.header}>
      <IconButton className="i_direction_left" />
    </header>
  );
}

export default HeaderWrite;
