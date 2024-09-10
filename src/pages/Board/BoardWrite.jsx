import S from './BoardWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';

function BoardWrite() {
  const handlePictureClick = () => {
    console.log('이미지 업로드 버튼 클릭');
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_picture_line', onClick: handlePictureClick }]}
      />
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
