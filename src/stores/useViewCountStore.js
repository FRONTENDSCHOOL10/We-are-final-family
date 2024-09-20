import { create } from 'zustand';
import { supabase } from '@/api/supabase';

const useViewCountStore = create((set) => ({
  viewCounts: {},

  fetchViewCount: async (boardId) => {
    try {
      const { data, error } = await supabase
        .from('board')
        .select('view_count')
        .eq('id', boardId)
        .single();

      if (error) throw error;

      set((state) => ({
        viewCounts: { ...state.viewCounts, [boardId]: data.view_count || 0 },
      }));
    } catch (error) {
      console.error('Error fetching view count:', error);
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
