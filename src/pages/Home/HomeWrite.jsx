import S from './HomeWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';

function HomeWrite() {
  return (
    <>
      <Header back={true} actions={['i_picture_line']} />
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
