import S from './HomeDetail.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import Badge from '@/components/Badge/Badge';
import { JoinPartyList } from '@/components/JoinPartyList/JoinPartyList';
import { PendingList } from '@/components/PendingList/PendingLsit';

function HomeDetail() {
  return (
    <>
      <Header back={true} actions={['i_like_line', 'i_export', 'i_option']} />
      <main className={S.homeDetail}>
        <div className={S.detailWrap}>
          <section className={S.post}>
            <Badge text="모집중" variant="recruit"></Badge>
            <Badge text="스터디" variant="category"></Badge>
            피그마 스터디 하실 분~
          </section>
          <section className={S.state}>
            <JoinPartyList />
            <PendingList />
          </section>
        </div>
        <footer>
          <Button color="black">채팅방으로 이동</Button>
        </footer>
      </main>
    </>
  );
}

export default HomeDetail;
