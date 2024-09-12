import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import { ChatSpeechbubble } from '@/components/ChatSpeechbubble/ChatSpeechbubble';
import SendMessage from '@/components/SendMessage/SendMessage';
import { useStore } from '@/stores/chatStore';
import { formatDate } from '@/utils/formatDate';
import { useEffect } from 'react';

function ChatRoom() {
  const store = useStore();
  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };
  useEffect(() => {
    if (store.currentRoom) store.fetchMessages(store.currentRoom);

    const unsubscribe = store.subscribeToMessages(store.currentRoom);
    return unsubscribe;
  }, [store.currentRoom]);

  console.log(store.currentRoom);
  console.log(store.messages);
  console.log(store.chatRoom);

  store.messages.map((item, index) => {
    console.log(item.content);
    console.log(index);
  });

  return (
    <>
      <Header
        back={true}
        contactName="김멋사"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.chatRoom}>
        <div style={{ flex: '1' }}>
          {store.messages.map((item) => {
            return (
              <ChatSpeechbubble
                mychatdata={item.content}
                key={item.id}
                userId={item.id}
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
