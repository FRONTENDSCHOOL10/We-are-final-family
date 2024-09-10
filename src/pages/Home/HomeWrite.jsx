import S from './HomeWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';

function HomeWrite() {
  const handlePictureClick = () => {
    console.log('이미지 업로드 버튼 클릭');
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_picture_line', onClick: handlePictureClick }]}
      />
      <main className={S.homeWrite}>
        <div className={S.writeWrap}>컴포넌트 넣기</div>
        <footer>
          <Button color="black">다음</Button>
        </footer>
      </main>
    </>
  );
}

export default HomeWrite;
