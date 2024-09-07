import Header from '@/components/App/Header';
import S from './Search.module.css';

function Search() {
  return (
    <>
      <Header back={true} search={true} actions={['i_search']}></Header>
      <div className={S.searchWrap}>
        <section>
          <h2 className="hdg-md">인기 검색어</h2>
        </section>
        <section>
          <h2 className="hdg-md">최근 검색어</h2>
        </section>
      </div>
    </>
  );
}

export default Search;
