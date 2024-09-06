import S from './Home.module.css';
import PartyCategory from '@/components/PartyCategory/PartyCategory';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import List from '@/components/List/List';

function Home() {
  return (
    <main className={S.home}>
      <PartyCategory />
      <List type="party"></List>
      <FloatingButton />
    </main>
  );
}

export default Home;
