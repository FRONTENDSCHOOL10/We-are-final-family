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

      if (data && data.length > 0) {
        setPopularSearches(data);
      } else {
        setPopularSearches([]); // 데이터가 없을 경우 빈 배열 설정
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching popular searches:', error);
      setError('인기 검색어를 불러오는 데 실패했습니다.');
      setPopularSearches([]); // 오류 발생 시 빈 배열 설정
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
      setRecentSearches([]); // 오류 발생 시 빈 배열 설정
    }
  }

  async function updateSearchPopular(term) {
    try {
      console.log('Updating search popular for term:', term);
      const { data, error } = await supabase
        .from('search_popular')
        .select('*')
        .eq('title', term)
        .maybeSingle();

      console.log('Query result:', data, error);

      if (error) {
        throw error;
      }

      if (!data) {
        // 결과가 없으면 새 항목 삽입
        console.log('Inserting new search term');
        const { data: insertData, error: insertError } = await supabase
          .from('search_popular')
          .insert({ title: term, count: 1 })
          .select()
          .single();

        console.log('Insert result:', insertData, insertError);

        if (insertError) throw insertError;
      } else {
        // 결과가 있으면 카운트 증가
        console.log('Updating existing search term');
        const { data: updateData, error: updateError } = await supabase
          .from('search_popular')
          .update({ count: data.count + 1 })
          .eq('title', term)
          .select()
          .single();

        console.log('Update result:', updateData, updateError);

        if (updateError) throw updateError;
      }

      await fetchPopularSearches();
    } catch (error) {
      console.error('Error in updateSearchPopular:', error);
    }
  }

  async function addRecentSearch(term) {
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

      if (error && error.code !== 'PGRST116') throw error;

      let newRecentSearches = [term];
      if (data) {
        const existingSearches = Object.values(data).filter(Boolean);
        newRecentSearches = [
          term,
          ...existingSearches.filter((search) => search !== term),
        ];
      }
      newRecentSearches = newRecentSearches.slice(0, 10);

      const updateData = {
        userid: currentUser.id,
      };
      newRecentSearches.forEach((search, index) => {
        updateData[`recent_${index + 1}`] = search;
      });

      if (data) {
        const { error: updateError } = await supabase
          .from('search_recent')
          .update(updateData)
          .eq('userid', currentUser.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('search_recent')
          .insert([updateData]);

        if (insertError) throw insertError;
      }

      fetchRecentSearches();
    } catch (error) {
      console.error('Error adding recent search:', error);
    }
  }

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        await updateSearchPopular(searchTerm.trim());
        await addRecentSearch(searchTerm.trim());
        navigate(`/search/searchboard?q=${encodeURIComponent(searchTerm)}`);
      } catch (error) {
        console.error('Search error:', error);
        setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSearchClick = async (term) => {
    setSearchTerm(term);
    try {
      await updateSearchPopular(term);
      await addRecentSearch(term);
      navigate(`/search/searchboard?q=${encodeURIComponent(term)}`);
    } catch (error) {
      console.error('Search click error:', error);
      setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
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
        <section className={S.searchContainer}>
          <h2 className="hdg-md">인기 검색어</h2>
          <div className={S.popularSearchesContainer}>
            {loading ? (
              <p>로딩 중...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              popularSearches.map((item, index) => (
                <span
                  key={index}
                  className={`${S.popularSearch} para-md`}
                  onClick={() => handleSearchClick(item.title)}
                >
                  {item.title}
                </span>
              ))
            )}
          </div>
        </section>
        <section className={S.searchContainer}>
          <h2 className="hdg-md">최근 검색어</h2>
          <div className={S.recentSearchesContainer}>
            {recentSearches.length > 0 ? (
              recentSearches.map((item, index) => (
                <span
                  key={index}
                  className={`${S.recentSearch} para-md`}
                  onClick={() => handleSearchClick(item)}
                >
                  {item}
                </span>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Search;
