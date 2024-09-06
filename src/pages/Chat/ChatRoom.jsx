import S from './ChatRoom.module.css';
import SendMessage from '@/components/SendMessage/SendMessage';

function ChatRoom() {
  return (
    <main className={S.chat_room}>
      <div style={{ flex: '1' }}>대화 내용</div>
      <SendMessage />
    </main>
  );
}

export default ChatRoom;
