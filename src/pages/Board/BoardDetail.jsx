import S from './BoardDetail.module.css';
import Header from '@/components/App/Header';
import Badge from '@/components/Badge/Badge';
import SendMessage from '@/components/SendMessage/SendMessage';
import CommentsList from '@/components/CommentsList/CommentsList';

function BoardDetail() {
  return (
    <>
      <Header back={true} actions={['i_like_line', 'i_export', 'i_option']} />
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
          <CommentsList />
        </section>
        <footer>
          <SendMessage />
        </footer>
      </main>
    </>
  );
}

export default BoardDetail;
