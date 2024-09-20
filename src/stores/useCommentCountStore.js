import { create } from 'zustand';
import { supabase } from '@/api/supabase';

const useCommentCountStore = create((set) => ({
  commentCounts: {},
  fetchCommentCount: async (boardId) => {
    try {
      const { count, error } = await supabase
        .from('board_comment')
        .select('*', { count: 'exact', head: true })
        .eq('board_id', boardId);

      if (error) throw error;

      set((state) => ({
        commentCounts: {
          ...state.commentCounts,
          [boardId]: count,
        },
      }));
    } catch (error) {
      console.error('Error fetching comment count:', error);
    }
  },
}));

export default useCommentCountStore;
