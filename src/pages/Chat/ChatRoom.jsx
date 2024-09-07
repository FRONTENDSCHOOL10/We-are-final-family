import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import SendMessage from '@/components/SendMessage/SendMessage';

function ChatRoom() {
  return (
    <>
      <Header back={true} contactName="김멋사" actions={['i_search']} />
      <main className={S.chatRoom}>
        <div style={{ flex: '1' }}>대화 내용</div>
        <SendMessage />
      </main>
    </>
  );
}

export default ChatRoom;
