import { supabase } from '@/api/supabase';
import { create } from 'zustand';

export const usePartyStore = create((set, get) => ({
  currentParty: [],
  joinArray: [],
  joinUsers: [],
  pendingArray: [],
  pendingUsers: [],
  updateJoinArray: (newJoinArray) => set({ joinArray: newJoinArray }),
  updateJoinUsers: async (joinArray) => {
    const users = await fetchUsersByPendingArray(joinArray);
    set({ joinUsers: users });
  },
  updatePendingArray: (newPendingArray) =>
    set({ pendingArray: newPendingArray }),
  updatePendingUsers: async (pendingArray) => {
    const users = await fetchUsersByPendingArray(pendingArray);
    set({ pendingUsers: users });
  },

  fetchAndSetPartyData: async (partyId) => {
    const data = await fetchPartyData(partyId);
    get().currentParty = data;
    if (data) {
      const { joinArray, pendingArray } = processPartyData(data);
      set({ joinArray, pendingArray });
      await get().updatePendingUsers(pendingArray);
      await get().updateJoinUsers(joinArray);
    }
  },
  moveTopending: async (partyId, userId) => {
    // party_detail에서 partyId에 해당하는 데이터 가져오기
    const { data, error } = await supabase
      .from('party_detail')
      .select('*')
      .eq('id', partyId)
      .single();

    if (error) {
      console.error('파티 데이터를 가져오는 중 오류 발생:', error);
      return;
    }

    console.log('가져온 데이터:', data); // 가져온 데이터 출력

    // userId에 해당하는 pending 값을 찾기
    for (let i = 1; i <= 6; i++) {
      const pendingKey = `pending_${i}`;

      // userId와 일치하는 pending 값이 있는지 확인 (공백 제거)
      const pendingValue = data[pendingKey]?.trim(); // pending 값의 공백 제거
      const trimmedUserId = userId.trim(); // userId의 공백 제거

      if (pendingValue === trimmedUserId) {
        // join_1부터 join_6까지 중 비어있는(null) 필드 찾기
        for (let j = 1; j <= 6; j++) {
          const joinKey = `join_${j}`;

          if (data[joinKey] === null) {
            // join 필드가 비어 있는 경우
            const { error: updateError } = await supabase
              .from('party_detail')
              .update({ [joinKey]: trimmedUserId, [pendingKey]: null }) // pending 값을 join으로 이동, pending은 null로 설정
              .eq('id', partyId); // 특정 partyId의 데이터를 업데이트

            if (updateError) {
              console.error(
                '파티 데이터를 업데이트하는 중 오류 발생:',
                updateError
              );
              return;
            }

            console.log(`${joinKey}이 성공적으로 업데이트되었습니다.`);
            return; // 작업 완료 후 함수 종료
          }
        }
      }
    }

    console.log('해당 userId에 대한 비어있는 join 필드가 없습니다.');
  },
  cancelData: async (partyId, userId) => {
    // party_detail에서 partyId에 해당하는 데이터 가져오기
    const { data, error } = await supabase
      .from('party_detail')
      .select('*')
      .eq('id', partyId)
      .single();

    if (error) {
      console.error('파티 데이터를 가져오는 중 오류 발생:', error);
      return;
    }

    console.log('가져온 데이터:', data); // 가져온 데이터 확인

    // pending_1부터 pending_6까지 순회하여 userId와 동일한 값을 찾기
    for (let i = 1; i <= 6; i++) {
      const pendingKey = `pending_${i}`;

      if (data[pendingKey] === userId) {
        // 동일한 값이 있으면 해당 pending 값을 null로 변경
        const { error: updateError } = await supabase
          .from('party_detail')
          .update({ [pendingKey]: null })
          .eq('id', partyId);

        if (updateError) {
          console.error(
            'pending 값을 null로 변경하는 중 오류 발생:',
            updateError
          );
          return;
        }

        console.log(`${pendingKey}의 값이 성공적으로 null로 변경되었습니다.`);
        return; // 업데이트 완료 후 함수 종료
      }
    }

    console.log('해당 userId와 일치하는 pending 값이 없습니다.');
  },
}));

async function fetchPartyData(partyId) {
  const { data, error } = await supabase
    .from('party_detail')
    .select('*')
    .eq('id', partyId)
    .single();

  if (error) {
    console.error('Error fetching party data:', error);
    return null;
  }

  return data;
}

function processPartyData(partyData) {
  const joinKeys = ['join_1', 'join_2', 'join_3', 'join_4', 'join_5', 'join_6'];
  const pendingKeys = [
    'pending_1',
    'pending_2',
    'pending_3',
    'pending_4',
    'pending_5',
    'pending_6',
  ];

  const joinArray = joinKeys
    .map((key) => partyData[key])
    .filter((value) => value !== null && value !== '');
  const pendingArray = pendingKeys
    .map((key) => partyData[key])
    .filter((value) => value !== null && value !== '');

  return { joinArray, pendingArray };
}

async function fetchUsersByPendingArray(pendingArray) {
  if (!pendingArray || pendingArray.length === 0) return [];

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .in('id', pendingArray);

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data;
}
