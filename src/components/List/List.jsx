import ListItem from '@/components/List/ListItem';
import { supabase } from '@/api/supabase';
import { useState, useEffect } from 'react';
import { string, bool, arrayOf } from 'prop-types';
import Error from '@/pages/Error';
import Fallback from '@/pages/Fallback';
import NoneData from '@/pages/NoneData';

// 사용 방법
// <List type="party" />
// <List type="board" />

List.propTypes = {
  type: string,
  category: string,
  location: string,
  sortByInterest: arrayOf(string),
  sortByLatest: bool,
  sortByRecruiting: bool,
  gender: string,
  age: string,
};

function List({
  type,
  category,
  location,
  sortByInterest,
  sortByLatest,
  sortByRecruiting,
  gender,
  age,
}) {
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
          <Error />;
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

          if (Array.isArray(sortByInterest) && sortByInterest.length > 0) {
            filteredData = filteredData.filter((item) =>
              sortByInterest.includes(item.interest)
            );
          }

          // 최신순 정렬
          if (sortByLatest) {
            filteredData = filteredData.sort(
              (a, b) => new Date(b.meet_date) - new Date(a.meet_date)
            );
          }

          // 모집중 정렬
          if (sortByRecruiting) {
            filteredData = filteredData.filter((item) => item.state === true);
          }

          // 성별 필터링
          if (gender && type === 'party') {
            filteredData = filteredData.filter(
              (item) => item.gender === gender
            );
          }

          // 연령 필터링
          if (age && type === 'party') {
            filteredData = filteredData.filter((item) => item.age === age);
          }

          if (type === 'party') {
            filteredData = filteredData.filter(
              (item) => item.state !== undefined
            );
          }

          setData(filteredData);
        } else {
          console.warn('데이터가 없습니다.');
          <NoneData icon="i_close" text="데이터가 없습니다." />;
        }
      } catch (error) {
        console.error('네트워크 에러 발생!', error);
        setError(error);
        <Error />;
      } finally {
        <Fallback />;
      }
    };

    fetchData();
  }, [
    type,
    category,
    location,
    sortByInterest,
    sortByLatest,
    sortByRecruiting,
    gender,
    age,
  ]); // type이 변경될 때마다 데이터 새로 불러오기

  if (error) return <Error />;
  if (data.length === 0)
    return <NoneData icon="i_close" text="데이터가 없습니다." />;

  return (
    <>
      <ul role="group">
        {/* 데이터 리스트 렌더링 */}
        {data.map((item) => {
          return (
            <ListItem
              key={item.id}
              type={type}
              id={item.id}
              state={
                type === 'party'
                  ? item.state
                    ? '모집중'
                    : '모집마감'
                  : undefined
              }
              category={item.category}
              title={item.title}
              currentPeopleCount={item.people}
              peopleCount={item.people}
              date={item.meet_date || '날짜를 불러올 수 없습니다.'}
              place={item.place || '장소를 불러올 수 없습니다.'}
              createDate={item.create_at}
            />
          );
        })}
      </ul>
    </>
  );
}

export default List;
