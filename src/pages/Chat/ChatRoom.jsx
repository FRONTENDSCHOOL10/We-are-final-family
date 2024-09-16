import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import { ChatSpeechbubble } from '@/components/ChatSpeechbubble/ChatSpeechbubble';
import SendMessage from '@/components/SendMessage/SendMessage';
import { useStore } from '@/stores/chatStore';
import { formatDate } from '@/utils/formatDate';
import { useRef } from 'react';
import { useEffect } from 'react';

function ChatRoom() {
  const {
    fetchMessages,
    subscribeToMessages,
    messages,
    currentRoom,
    currentUser,
  } = useStore();
  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      if (currentRoom) {
        await fetchMessages(); // 초기 메시지 불러오기
      }
    };
    loadMessages();
    // 컴포넌트가 언마운트되거나 방을 나갈 때 구독 해제
  }, [currentRoom, fetchMessages, subscribeToMessages]);

  return (
    <>
      <Header
        back={true}
        contactName="김멋사"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main
        className={S.chatRoom}
        ref={chatContainerRef}
        style={{ height: '400px', overflowY: 'scroll' }}
      >
        <div style={{ flex: '1' }}>
          {messages.map((item) => {
            return (
              <ChatSpeechbubble
                mychatdata={item.content}
                key={item.id}
                userId={item.user_id === currentUser}
                time={formatDate(item.created_at)}
              />
            );
          })}
        </div>
        <SendMessage />
      </main>
    </>
  );
}

export default ChatRoom;
