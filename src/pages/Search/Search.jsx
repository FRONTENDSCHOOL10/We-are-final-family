import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './Search.module.css';
import Header from '@/components/App/Header';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/board?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Header
        back={true}
        search={true}
        actions={[{ icon: 'i_search', onClick: handleSearch }]}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div className={S.searchWrap}>
        <section>
          <h2 className="hdg-md">인기 검색어</h2>
          <button>인기검색어1</button>
          <button>인기검색어2</button>
          <button>인기검색어3</button>
        </section>
        <section>
          <h2 className="hdg-md">최근 검색어</h2>
          <button>최근검색어1</button>
          <button>최근검색어2</button>
          <button>최근검색어3</button>
        </section>
      </div>
    </>
  );
}

export default Search;
