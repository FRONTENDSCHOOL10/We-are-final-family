import S from './Search.module.css';
import Header from '@/components/App/Header';

function Search() {
  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  return (
    <>
      <Header
        back={true}
        search={true}
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      ></Header>
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
