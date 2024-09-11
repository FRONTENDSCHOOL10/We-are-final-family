import S from './Home.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import PartyCategory from '@/components/PartyCategory/PartyCategory';
import ListFilterButtons from '@/components/ListFilterButtons/ListFilterButtons';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate('/search');
  };
  return (
    <>
      <Header
        myLocation={true}
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
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
