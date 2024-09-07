import S from './Chat.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import { ChatProfileCard } from '@/components/ChatProfileCard/ChatProfileCard';

function Chat() {
  return (
    <>
      <Header title="채팅" actions={['i_search']} />
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
