import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './Search.module.css';
import Header from '@/components/App/Header';
import { supabase } from '@/api/supabase';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularSearches();
  }, []);

  async function fetchPopularSearches() {
    try {
      const { data, error } = await supabase
        .from('search_popular')
        .select('title, count')
        .order('count', { ascending: false })
        .limit(10);

      if (error) throw error;

      setPopularSearches(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching popular searches:', error);
      setError('인기 검색어를 불러오는 데 실패했습니다.');
      setLoading(false);
    }
  }

  async function updateSearchPopular(term) {
    try {
      const { data, error } = await supabase
        .from('search_popular')
        .select('count')
        .eq('title', term)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        // 이미 존재하는 검색어인 경우, count 증가
        await supabase
          .from('search_popular')
          .update({ count: data.count + 1 })
          .eq('title', term);
      } else {
        // 새로운 검색어인 경우, 새 레코드 추가
        await supabase.from('search_popular').insert({ title: term, count: 1 });
      }

      // 인기 검색어 목록 갱신
      fetchPopularSearches();
    } catch (error) {
      console.error('Error updating search popular:', error);
    }
  }

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await updateSearchPopular(searchTerm.trim());
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
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            popularSearches.map((item, index) => (
              <span key={index} className={S.popularSearch}>
                {item.title}
              </span>
            ))
          )}
        </section>
        <section>
          <h2 className="hdg-md">최근 검색어</h2>
          <span>최근검색어1</span>
          <span>최근검색어2</span>
          <span>최근검색어3</span>
        </section>
      </div>
    </>
  );
}

export default Search;
