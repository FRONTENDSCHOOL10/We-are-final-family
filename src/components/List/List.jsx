import ListItem from '@/components/ListItem/ListItem';
import { supabase } from '@/services/supabase';
import { useState, useEffect } from 'react';

function Test() {
  const [party, setParty] = useState([]); // 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchPartyData = async () => {
      try {
        const { data: Party, error } = await supabase.from('Party').select('*');

        if (error) {
          console.error('에러 발생!', error);
          setError(error);
        } else if (Party && Party.length > 0) {
          console.log('데이터 불러오기 성공:', Party);
          setParty(Party);
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

    fetchPartyData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: 데이터를 가져오는 중 오류가 발생했습니다.</p>;

  return (
    <>
      {/* 파티 데이터 리스트 렌더링 */}
      {party.map((partyData, index) => {
        return (
          <ListItem
            key={index}
            state={partyData.state ? '모집중' : '모집마감'}
            category={partyData.category}
            title={partyData.title}
            currentPeopleCount={1}
            peopleCount={partyData.people}
            date={partyData.date || '언젠데'}
            place={partyData.place || '어딘데'}
            writeDate={partyData.write}
          />
        );
      })}
    </>
  );
}

export default Test;
