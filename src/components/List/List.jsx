import ListItem from '@/components/ListItem/ListItem';
import { supabase } from '@/api/supabase';
import { useState, useEffect } from 'react';
import { string } from 'prop-types';

// 사용 방법
// <List type="party" />
// <List type="board" />

List.propTypes = {
  type: string, // type=""
};

function List({ type }) {
  const [data, setData] = useState([]); // 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableName = type === 'party' ? 'Party' : 'Board';
        const { data: fetchedData, error } = await supabase
          .from(tableName)
          .select('*');

        if (error) {
          console.error('에러 발생!', error);
          setError(error);
        } else if (fetchedData && fetchedData.length > 0) {
          console.log('데이터 불러오기 성공:', fetchedData);
          setData(fetchedData);
        } else {
          console.warn('데이터가 없습니다.');
        }
      } catch (error) {
        console.error('네트워크 에러 발생!', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]); // type이 변경될 때마다 데이터 새로 불러오기

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: 데이터를 가져오는 중 오류가 발생했습니다.</p>;

  return (
    <>
      {/* 데이터 리스트 렌더링 */}
      {data.map((item, index) => {
        return (
          <ListItem
            key={index}
            state={
              type === 'party'
                ? item.state
                  ? '모집중'
                  : '모집마감'
                : undefined
            }
            category={item.category}
            title={item.title}
            currentPeopleCount={1}
            peopleCount={item.people}
            date={item.date || '날짜를 불러올 수 없습니다.'}
            place={item.place || '장소를 불러올 수 없습니다.'}
            writeDate={item.write}
            type={type}
          />
        );
      })}
    </>
  );
}

export default List;
