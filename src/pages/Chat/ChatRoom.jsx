import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import { ChatSpeechbubble } from '@/components/ChatSpeechbubble/ChatSpeechbubble';
import SendMessage from '@/components/SendMessage/SendMessage';

function ChatRoom() {
  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  return (
    <>
      <Header
        back={true}
        contactName="김멋사"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.chatRoom}>
        <div style={{ flex: '1' }}>
          <ChatSpeechbubble />
        </div>
        <SendMessage />
      </main>
    </>
  );
}

export default ChatRoom;
