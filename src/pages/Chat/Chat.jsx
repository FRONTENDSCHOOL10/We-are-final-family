import S from './Chat.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import { ChatProfileCard } from '@/components/ChatProfileCard/ChatProfileCard';

function Chat() {
  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  return (
    <>
      <Header
        title="채팅"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.chat}>
        <ul>
          <li>
            <ChatProfileCard />
          </li>
          <li>
            <ChatProfileCard />
          </li>
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default Chat;
