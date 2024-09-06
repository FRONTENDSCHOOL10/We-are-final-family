import S from './Interest.module.css';
import Button from '@/components/Button/Button';
import InterestCard from '@/components/InterestCard/InterestCard';

function Interest() {
  return (
    <main className={S.interest}>
      <Button color="white">
        <span className="i_target"></span>관심분야 선택하기
      </Button>
      <div className={S.body}>
        <InterestCard />
      </div>
      <Button color="black">이대로 저장할래요</Button>
      <button type="button">나중에 할래요</button>
    </main>
  );
}

export default Interest;
