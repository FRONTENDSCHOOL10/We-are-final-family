import S from './HeaderSearch.module.css';
import IconButton from '@/components/IconButton/IconButton';

function HeaderSearch() {
  return (
    <header className={S.header}>
      <IconButton className="i_direction_left" />
      <input
        type="text"
        className={`${S.inputField} para-md`}
        placeholder="검색어를 입력해주세요"
      />
      <IconButton className="i_search" />
    </header>
  );
}

export default HeaderSearch;
