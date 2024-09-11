import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './Search.module.css';
import Header from '@/components/App/Header';
import { supabase } from '@/api/supabase';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularSearches, setPopularSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularSearches();
    fetchRecentSearches();
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

  async function fetchRecentSearches() {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || !currentUser.id) {
        console.log('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      const { data, error } = await supabase
        .from('search_recent')
        .select(
          'recent_1, recent_2, recent_3, recent_4, recent_5, recent_6, recent_7, recent_8, recent_9, recent_10'
        )
        .eq('userid', currentUser.id)
        .single();

      if (error) throw error;

      const recentSearches = Object.values(data).filter(Boolean);
      setRecentSearches(recentSearches);
    } catch (error) {
      console.error('Error fetching recent searches:', error);
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
        await supabase
          .from('search_popular')
          .update({ count: data.count + 1 })
          .eq('title', term);
      } else {
        await supabase.from('search_popular').insert({ title: term, count: 1 });
      }

      fetchPopularSearches();
    } catch (error) {
      console.error('Error updating search popular:', error);
    }
  }

  async function addRecentSearch(term) {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || !currentUser.id) {
        console.log('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      // 현재 사용자의 최근 검색어 가져오기
      const { data, error } = await supabase
        .from('search_recent')
        .select(
          'recent_1, recent_2, recent_3, recent_4, recent_5, recent_6, recent_7, recent_8, recent_9, recent_10'
        )
        .eq('userid', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      // 새로운 검색어 목록 생성
      let newRecentSearches = [term];
      if (data) {
        // 기존 데이터에서 중복 제거 및 새 검색어 추가
        const existingSearches = Object.values(data).filter(Boolean);
        newRecentSearches = [
          term,
          ...existingSearches.filter((search) => search !== term),
        ];
      }
      newRecentSearches = newRecentSearches.slice(0, 10); // 최대 10개만 유지

      // Supabase에 업데이트할 데이터 준비
      const updateData = {
        userid: currentUser.id,
      };
      newRecentSearches.forEach((search, index) => {
        updateData[`recent_${index + 1}`] = search;
      });

      if (data) {
        // 기존 데이터가 있으면 업데이트
        const { error: updateError } = await supabase
          .from('search_recent')
          .update(updateData)
          .eq('userid', currentUser.id);

        if (updateError) throw updateError;
      } else {
        // 기존 데이터가 없으면 새로 삽입
        const { error: insertError } = await supabase
          .from('search_recent')
          .insert([updateData]);

        if (insertError) throw insertError;
      }

      // 최근 검색어 목록 다시 불러오기
      fetchRecentSearches();
    } catch (error) {
      console.error('Error adding recent search:', error);
    }
  }

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await updateSearchPopular(searchTerm.trim());
      await addRecentSearch(searchTerm.trim());
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
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <span key={index} className={S.recentSearch}>
                {item}
              </span>
            ))
          ) : (
            <p>최근 검색어가 없습니다.</p>
          )}
        </section>
      </div>
    </>
  );
}

export default Search;
