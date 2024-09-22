import { supabase } from '@/api/supabase';
import { useState, useEffect } from 'react';

export const useUserRecordsCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);

        // 현재 로그인한 사용자의 정보를 가져옵니다
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (user) {
          // party 테이블과 board 테이블에서 user_id가 현재 사용자의 id와 일치하는 레코드 수를 가져옵니다
          const { count: partyCount, error: partyError } = await supabase
            .from('party')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

          if (partyError) throw partyError;

          const { count: boardCount, error: boardError } = await supabase
            .from('board')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

          if (boardError) throw boardError;

          // 두 테이블의 레코드 수를 합칩니다
          setCount(partyCount + boardCount);
        } else {
          throw new Error('No user logged in');
        }
      } catch (error) {
        console.error('Error fetching record count:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행됩니다

  return { count, loading, error };
};
