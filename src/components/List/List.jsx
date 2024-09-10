import ListItem from '@/components/List/ListItem';
import { supabase } from '@/api/supabase';
import { useState, useEffect } from 'react';
import { string, bool } from 'prop-types';
import Error from '@/pages/Error';
import Fallback from '@/pages/Fallback';

// 사용 방법
// <List type="party" />
// <List type="board" />

List.propTypes = {
  type: string, // type=""
  category: string,
  location: string,
  sortByLatest: bool,
  showRecruiting: bool,
};

function List({ type, category, location, sortByLatest, showRecruiting }) {
  const [data, setData] = useState([]); // 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableName = type === 'party' ? 'party' : 'board';
        const { data: fetchedData, error } = await supabase
          .from(tableName)
          .select('*');

        if (error) {
          console.error('에러 발생!', error);
          setError(error);
        } else if (fetchedData && fetchedData.length > 0) {
          console.log('데이터 불러오기 성공:', fetchedData);

          let filteredData = fetchedData;

          // 카테고리 필터링
          if (category !== '전체') {
            filteredData = filteredData.filter(
              (item) => item.category === category
            );
          }

          // 사용자 위치 필터링
          if (location) {
            filteredData = filteredData.filter((item) =>
              item.place.includes(location)
            );
          }

          // 모집중 필터
          if (showRecruiting) {
            filteredData = filteredData.filter((item) => item.state === true);
          }

          // 최신순 정렬
          if (sortByLatest) {
            filteredData = filteredData.sort(
              (a, b) => new Date(b.meet_date) - new Date(a.meet_date)
            );
          }

          if (type === 'party') {
            filteredData = filteredData.filter(
              (item) => item.state !== undefined
            );
          }

          setData(filteredData);
        } else {
          console.warn('데이터가 없습니다.');
        }
      } catch (error) {
        console.error('네트워크 에러 발생!', error);
        setError(error);
      } finally {
        <Fallback />;
      }
    };

    fetchData();
  }, [type, category, location, showRecruiting, sortByLatest]); // type이 변경될 때마다 데이터 새로 불러오기

  if (error) return <Error />;
  if (data.length === 0) return <p>데이터가 없습니다.</p>;

  return (
    <>
      <ul role="group">
        {/* 데이터 리스트 렌더링 */}
        {data.map((item, index) => {
          return (
            <ListItem
              key={index}
              type={type}
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
              date={item.meet_date || '날짜를 불러올 수 없습니다.'}
              place={item.place || '장소를 불러올 수 없습니다.'}
              writeDate={item.write}
            />
          );
        })}
      </ul>
    </>
  );
}

export default List;
