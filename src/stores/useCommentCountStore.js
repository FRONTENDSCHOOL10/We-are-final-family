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
          [boardId]: count || 0, // 댓글이 없는 경우 0으로 설정
        },
      }));
    } catch (error) {
      console.error(
        'Error fetching comment count:',
        error.message,
        error.details
      );
      // 에러가 발생해도 댓글 수를 0으로 설정
      set((state) => ({
        commentCounts: {
          ...state.commentCounts,
          [boardId]: 0,
        },
      }));
    }
  },
}));

export default useCommentCountStore;
