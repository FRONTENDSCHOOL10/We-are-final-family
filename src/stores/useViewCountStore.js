import { create } from 'zustand';
import { supabase } from '@/api/supabase';

const useViewCountStore = create((set) => ({
  viewCounts: {},

  fetchViewCount: async (boardId) => {
    try {
      const { data, error } = await supabase
        .from('board')
        .select('view_count')
        .eq('id', boardId);

      if (error) throw error;

      // 데이터가 있으면 첫 번째 항목의 view_count를 사용하고, 없으면 0을 사용
      const viewCount = data && data.length > 0 ? data[0].view_count : 0;

      set((state) => ({
        viewCounts: { ...state.viewCounts, [boardId]: viewCount },
      }));
    } catch (error) {
      console.error('Error fetching view count:', error);
      // 오류 발생 시 해당 boardId의 조회수를 0으로 설정
      set((state) => ({
        viewCounts: { ...state.viewCounts, [boardId]: 0 },
      }));
    }
  },

  incrementViewCount: async (boardId) => {
    try {
      const currentCount =
        useViewCountStore.getState().viewCounts[boardId] || 0;
      const newCount = currentCount + 1;

      const { error } = await supabase
        .from('board')
        .update({ view_count: newCount })
        .eq('id', boardId);

      if (error) throw error;

      set((state) => ({
        viewCounts: { ...state.viewCounts, [boardId]: newCount },
      }));
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  },
}));

export default useViewCountStore;
