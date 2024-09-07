import S from './Home.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import PartyCategory from '@/components/PartyCategory/PartyCategory';
import ListFilterButtons from '@/components/ListFilterButtons/ListFilterButtons';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

function Home() {
  return (
    <>
      <Header myLocation={true} actions={['i_search']} />
      <main className={S.home}>
        <PartyCategory />
        <ListFilterButtons filter={true} />
        <List type="party"></List>
        <FloatingButton />
      </main>
      <Navigation />
    </>
  );
}

export default Home;
