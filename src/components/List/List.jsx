import { useEffect, useCallback, useRef, useState } from 'react';
import ListItem from '@/components/List/ListItem';
import { string, bool, arrayOf } from 'prop-types';
import Error from '@/pages/Error';
import Fallback from '@/pages/Fallback';
import NoneData from '@/pages/NoneData';
import useListStore from '@/stores/useListStore';
// import { supabase } from '@/api/supabase';

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
  const { data, error, isLoading, fetchData, hasMore, resetPagination } =
    useListStore();
  const observer = useRef();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          fetchData(type === 'party' ? 'party' : 'board').then(() => {
            setIsLoadingMore(false);
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchData, type, isLoadingMore]
  );

  useEffect(() => {
    resetPagination();
    fetchData(type === 'party' ? 'party' : 'board');
  }, [
    type,
    category,
    location,
    sortByInterest,
    sortByLatest,
    sortByRecruiting,
    gender,
    age,
    fetchData,
    resetPagination,
  ]);

  // 필터링과 정렬 적용
  let filteredData = data;

  if (category !== '전체') {
    filteredData = filteredData.filter((item) => item.category === category);
  }

  if (location) {
    filteredData = filteredData.filter((item) =>
      item.location_1 ? item.location_1.includes(location) : false
    );
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

  if (isLoading && filteredData.length === 0) return <Fallback />;
  if (error) return <Error />;

  const noneDataText =
    type === 'party'
      ? '일치하는 파티가 없습니다.'
      : '일치하는 게시글이 없습니다.';

  if (filteredData.length === 0) {
    console.log('filteredData is empty, rendering NoneData');
    return <NoneData icon="i_close" text={noneDataText} />;
  }

  return (
    <>
      <ul role="group">
        {filteredData.map((item, index) => {
          if (filteredData.length === index + 1) {
            return (
              <div ref={lastElementRef} key={item.id}>
                <ListItem
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
                  currentPeopleCount={item.currentPeopleCount || 1}
                  peopleCount={item.people}
                  date={item.meet_date || '날짜를 불러올 수 없습니다.'}
                  place={item.location_2 || '장소를 불러올 수 없습니다.'}
                  createDate={item.create_at}
                  onClick={() => console.log(`${item.id} 클릭됨`)}
                  boardImg={item.board_img}
                />
              </div>
            );
          } else {
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
                currentPeopleCount={item.currentPeopleCount || 1}
                peopleCount={item.people}
                date={item.meet_date || '날짜를 불러올 수 없습니다.'}
                place={item.location_2 || '장소를 불러올 수 없습니다.'}
                createDate={item.create_at}
                onClick={() => console.log(`${item.id} 클릭됨`)}
                boardImg={item.board_img}
              />
            );
          }
        })}
      </ul>
      {isLoadingMore && <Fallback />}
    </>
  );
}

export default List;
