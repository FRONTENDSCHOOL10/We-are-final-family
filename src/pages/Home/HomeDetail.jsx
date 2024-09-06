import S from './HomeDetail.module.css';
import Button from '@/components/Button/Button';
import Badge from '@/components/Badge/Badge';
import { JoinPartyList } from '@/components/JoinPartyList/JoinPartyList';

function HomeDetail() {
  return (
    <main className={S.home_detail}>
      <section className={S.post}>
        <Badge text="모집중" variant="recruit"></Badge>
        <Badge text="스터디" variant="category"></Badge>
        피그마 스터디 하실 분~
      </section>
      <section>
        <JoinPartyList />
      </section>
      <Button color="black">채팅방으로 이동</Button>
    </main>
  );
}

export default HomeDetail;
