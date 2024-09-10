import { useState } from 'react';
import S from './Home.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import PartyCategory from '@/components/PartyCategory/PartyCategory';
import ListFilterButtons from '@/components/ListFilterButtons/ListFilterButtons';
import List from '@/components/List/List';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

function Home() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchButton = () => {
    setIsSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
  };

  const headerActions = isSearchVisible
    ? [{ icon: 'i_close', onClick: handleCloseSearch }]
    : [{ icon: 'i_search', onClick: handleSearchButton }];

  return (
    <>
      <Header
        myLocation={!isSearchVisible}
        search={isSearchVisible}
        actions={headerActions}
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