import ListItem from '@/components/List/ListItem';
// import { supabase } from '@/api/supabase';
import { useEffect } from 'react';
import { string, bool, arrayOf } from 'prop-types';
import Error from '@/pages/Error';
import Fallback from '@/pages/Fallback';
import NoneData from '@/pages/NoneData';
import useListStore from '@/stores/useListStore';

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
  const { data, error, isLoading, fetchData } = useListStore();

  useEffect(() => {
    const tableName = type === 'party' ? 'party' : 'board';

    fetchData(tableName);
  }, [type, fetchData]);

  if (isLoading) return <Fallback />;
  if (error) return <Error />;
  if (data.length === 0)
    return <NoneData icon="i_close" text="데이터가 없습니다." />;

  // 필터링과 정렬 적용
  let filteredData = data;

  if (category !== '전체') {
    filteredData = filteredData.filter((item) => item.category === category);
  }

  if (location) {
    filteredData = filteredData.filter((item) => item.place.includes(location));
  }

  if (Array.isArray(sortByInterest) && sortByInterest.length > 0) {
    filteredData = filteredData.filter((item) =>
      sortByInterest.includes(item.interest)
    );
  }

  if (sortByLatest) {
    filteredData = filteredData.sort(
      (a, b) => new Date(b.meet_date) - new Date(a.meet_date)
    );
  }

  if (sortByRecruiting) {
    filteredData = filteredData.filter((item) => item.state === true);
  }

  if (gender && type === 'party') {
    filteredData = filteredData.filter((item) => item.gender === gender);
  }

  if (age && type === 'party') {
    filteredData = filteredData.filter((item) => item.age === age);
  }

  return (
    <>
      <ul role="group">
        {/* 데이터 리스트 렌더링 */}
        {filteredData.map((item) => {
          return (
            <ListItem
              key={item.id}
              id={item.id}
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
              currentPeopleCount={item.people}
              peopleCount={item.people}
              date={item.meet_date || '날짜를 불러올 수 없습니다.'}
              place={item.place || '장소를 불러올 수 없습니다.'}
              createDate={item.create_at}
              onClick={() => console.log(`${item.id} 클릭됨`)}
            />
          );
        })}
      </ul>
    </>
  );
}

export default List;
