import { create } from 'zustand';
import { supabase } from '@/api/supabase';

const useListStore = create((set) => ({
  data: [],
  singleData: null,
  error: null,
  isLoading: false,

  fetchData: async (tableName, id = null) => {
    set({ isLoading: true, error: null }); // 로딩 시작

    try {
      // 전체 데이터를 가져올지, 특정 데이터를 가져올지 분기 처리
      let query = supabase.from(tableName).select('*');

      if (id) {
        // 특정 ID가 있는 경우, 단일 데이터 조회
        query = query.eq('id', id).single();
      }

      const { data: fetchData, error } = await query;

      if (error) {
        console.error('에러뜸ㅋ', error.message);
        set({ error: error.message, data: [], singleData: null });
      } else {
        if (id) {
          // 단일 데이터를 가져왔을 때는 singleData에 저장
          set({ singleData: fetchData, error: null });
        } else {
          set({ data: fetchData, error: null });
        }
      }
    } catch (error) {
      console.error('네트워크 에러 😵‍💫', error.message);
      // set({ error: error.message, data: [] });
      set({ error: error.message, data: [], singleData: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useListStore;
