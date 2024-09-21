import S from './BoardDetail.module.css';
import Header from '@/components/App/Header';
import Badge from '@/components/Badge/Badge';
import OptionPopup from '@/components/OptionPopup/OptionPopup';
import SendMessage from '@/components/SendMessage/SendMessage';
import CommentsList from '@/components/CommentsList/CommentsList';
import useListStore from '@/stores/useListStore';
import { supabase } from '@/api/supabase';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDateWithTime } from '@/utils/formatDate';
import Fallback from '@/pages/Fallback';
import Error from '@/pages/Error';
import NoneData from '@/pages/NoneData';
import toast from 'react-hot-toast';
import { retryFetch } from '@/utils/retryFetch';

function BoardDetail() {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!singleData || !singleData.id) return;

    setLoadingComments(true);
    try {
      const fetchCommentsData = async () => {
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
          .eq('board_id', singleData.id)
          .order('create_at', { ascending: true });

        if (error) throw error;
        return data;
      };

      const data = await retryFetch(fetchCommentsData);

      const processedData = data.map((comment) => ({
        ...comment,
        id: comment.id.toString(),
      }));

      setComments(processedData);
    } catch (error) {
      console.error('Error fetching comments:', error);
      if (
        error.message.includes('upstream connect error') ||
        error.message.includes('connection termination')
      ) {
        setCommentsError(
          '서버와의 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
        toast.error('서버 연결 오류. 재연결을 시도합니다.');
        try {
          await reconnectSupabase();
          toast.success('서버에 재연결되었습니다. 페이지를 새로고침해주세요.');
        } catch (reconnectError) {
          toast.error('서버 재연결에 실패했습니다. 나중에 다시 시도해주세요.');
        }
      } else {
        setCommentsError(
          '댓글을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );
        toast.error('댓글 로딩 중 오류가 발생했습니다.');
      }
    } finally {
      setLoadingComments(false);
    }
  }, [singleData, setComments, setLoadingComments, setCommentsError]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSendMessage = useCallback(
    async (message) => {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const { data, error } = await supabase
          .from('board_comment')
          .insert({
            board_id: singleData.id,
            user_id: userData.user.id,
            comment: message,
          })
          .select('id, comment, create_at, users:user_id (username)')
          .single();

        if (error) throw error;

        setComments((prevComments) => [
          ...prevComments,
          { ...data, id: data.id.toString() },
        ]);

        toast.success('댓글이 성공적으로 작성되었습니다.');
      } catch (error) {
        console.error('Error sending comment:', error);
        toast.error('댓글 작성에 실패했습니다.');
      }
    },
    [singleData]
  );

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
            {singleData.board_img && (
              <div className={S.boardImage}>
                <img src={singleData.board_img} alt="게시글 이미지" />
              </div>
            )}
          </div>
          {loadingComments ? (
            <p>댓글을 불러오는 중...</p>
          ) : commentsError ? (
            <p>{commentsError}</p>
          ) : (
            <CommentsList comments={comments} />
          )}
        </section>
        <SendMessage onSendMessage={handleSendMessage} />
      </main>
    </>
  );
}

export default BoardDetail;
