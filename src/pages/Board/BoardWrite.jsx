import S from './BoardWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';

function BoardWrite() {
  return (
    <>
      <Header back={true} actions={['i_picture_line']} />
      <main className={S.boardWrite}>
        <div className={S.writeWrap}>
          <input type="text" placeholder="글 제목 입력" />
          {/* 카테고리 선택 */}
          <textarea name="" id=""></textarea>
        </div>
        <footer>
          <Button color="black">다음</Button>
        </footer>
      </main>
    </>
  );
}

export default BoardWrite;
