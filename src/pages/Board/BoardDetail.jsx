import { useState, useEffect } from 'react';
import S from './BoardDetail.module.css';
import Header from '@/components/App/Header';
import Badge from '@/components/Badge/Badge';
import OptionPopup from '@/components/OptionPopup/OptionPopup';
import SendMessage from '@/components/SendMessage/SendMessage';
import CommentsList from '@/components/CommentsList/CommentsList';
import { supabase } from '@/api/supabase';

function BoardDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [isOptionPopupActive, setIsOptionPopupActive] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const { data, error } = await supabase
          .from('board_comment')
          .select(
            `
            id,
            comment,
            create_at,
            users:user_id (username)
          `
          )
          .order('create_at', { ascending: true });

        if (error) throw error;
        // id를 문자열로 변환
        const processedData = data.map((comment) => ({
          ...comment,
          id: comment.id.toString(),
        }));

        setComments(processedData);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('댓글을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  const handleLikeButton = () => {
    console.log('저장 버튼 클릭');
    setIsLiked((prevState) => !prevState);
  };

  const handleExportButton = () => {
    console.log('내보내기 버튼 클릭');
  };

  const menuOptions = [
    { label: '수정하기', onClick: () => console.log('수정하기 클릭!') },
    { label: '삭제하기', onClick: () => console.log('삭제하기 클릭!') },
  ];

  const handleOptionButton = () => {
    console.log('옵션 버튼 클릭');
    setIsOptionPopupActive((prevState) => !prevState);
  };

  return (
    <>
      <Header
        back={true}
        actions={[
          {
            icon: isLiked ? 'i_like_filled' : 'i_like_line',
            onClick: handleLikeButton,
          },
          { icon: 'i_export', onClick: handleExportButton },
          { icon: 'i_option', onClick: handleOptionButton },
        ]}
      />
      {isOptionPopupActive && <OptionPopup options={menuOptions} />}
      <main className={S.boardDetail}>
        <section className={S.detailWrap}>
          <header>
            <Badge text="자유게시판" variant="category"></Badge>
            <h2 className="hdg-lg">마인부우 어쩌고 저쩌고</h2>
          </header>
          {/* 글 내용 */}
          {/* 이미지 */}
        </section>
        <section className={S.comment}>
          {loading ? (
            <p>댓글을 불러오는 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <CommentsList comments={comments} />
          )}
        </section>
        <footer>
          <SendMessage />
        </footer>
      </main>
    </>
  );
}

export default BoardDetail;
