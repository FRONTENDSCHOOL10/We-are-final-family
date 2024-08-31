import S from './HeaderDetail.module.css';
import IconButton from '@/components/IconButton/IconButton';

function HeaderDetail() {
  return (
    <header className={S.header}>
      <IconButton className="i_direction_left" />
      <ul role="group">
        <li>
          <IconButton className="i_like_line" />
        </li>
        <li>
          <IconButton className="i_export" />
        </li>
        <li>
          <IconButton className="i_option" />
        </li>
      </ul>
    </header>
  );
}

export default HeaderDetail;
