import S from './BoardDetail.module.css';
import Header from '@/components/App/Header';
import Badge from '@/components/Badge/Badge';
import OptionPopup from '@/components/OptionPopup/OptionPopup';
import SendMessage from '@/components/SendMessage/SendMessage';
import CommentsList from '@/components/CommentsList/CommentsList';
import useListStore from '@/stores/useListStore';
import { supabase } from '@/api/supabase';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDateWithTime } from '@/utils/formatDate';
import Fallback from '@/pages/Fallback';
import Error from '@/pages/Error';
import NoneData from '@/pages/NoneData';

function BoardDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [isOptionPopupActive, setIsOptionPopupActive] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

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
        setCommentsError('댓글을 불러오는 데 실패했습니다.');
      } finally {
        setLoadingComments(false);
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

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const encodedId = query.get('q');
  const id = atob(encodedId); // base64 디코딩된 id 값

  const { singleData, error, isLoading, fetchData } = useListStore(); // Zustand 사용

  useEffect(() => {
    fetchData('board', id); // 'board' 테이블에서 특정 id의 데이터 조회
  }, [id, fetchData]);

  if (isLoading) return <Fallback />;
  if (error) return <Error />;
  if (!singleData) return <NoneData />;

  const formattedDate = formatDateWithTime(singleData.create_at);

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
        <section className={S.post}>
          <header className={S.postHeader}>
            <Badge text="자유게시판" variant="category"></Badge>
            <h2 className="hdg-lg">{singleData.title}</h2>
          </header>
          <div className={S.postContent}>
            <ul className="para-md">
              <li aria-label="작성일">
                <span aria-hidden="true" className="i_calendar_filled"></span>
                <span>{formattedDate}</span>
              </li>
              <li aria-label="작성자">
                <span aria-hidden="true" className="i_people_filled"></span>
                <span>{singleData.username}</span>
              </li>
            </ul>
            <p className="para-md">{singleData.content}</p>
          </div>
          {loadingComments ? (
            <p>댓글을 불러오는 중...</p>
          ) : commentsError ? (
            <p>{commentsError}</p>
          ) : (
            <CommentsList comments={comments} />
          )}
        </section>
        <SendMessage />
      </main>
    </>
  );
}

export default BoardDetail;
