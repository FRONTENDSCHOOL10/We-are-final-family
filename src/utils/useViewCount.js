import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabase';
import useListStore from '@/stores/useListStore';

function useViewCount(boardId) {
  const [viewCount, setViewCount] = useState(0);
  const { incrementViewCount } = useListStore();

  useEffect(() => {
    const fetchViewCount = async () => {
      const { data, error } = await supabase
        .from('board')
        .select('view_count')
        .eq('id', boardId)
        .single();

      if (error) {
        console.error('Error fetching view count:', error);
        return;
      }

      setViewCount(data.view_count || 0);
    };

    fetchViewCount();
  }, [boardId]);

  const updateViewCount = async () => {
    const newCount = viewCount + 1;
    const { error } = await supabase
      .from('board')
      .update({ view_count: newCount })
      .eq('id', boardId);

    if (error) {
      console.error('Error updating view count:', error);
      return;
    }

    setViewCount(newCount);
    incrementViewCount(boardId);
  };

  return { viewCount, updateViewCount };
}

export default useViewCount;
