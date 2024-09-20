import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import { ChatSpeechbubble } from '@/components/ChatSpeechbubble/ChatSpeechbubble';
import SendMessage from '@/components/SendMessage/SendMessage';
import { useStore } from '@/stores/chatStore';
import { formatDate } from '@/utils/formatDate';
import { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { AutoSizer, List } from 'react-virtualized';

function ChatRoom() {
  const {
    fetchMessages,
    subscribeToMessages,
    messages,
    currentRoom,
    currentUser,
    setCurrentUser,
    setCurrentRoom,
    setMessages,
  } = useStore();
  const listRef = useRef();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user.id);
  }, [setCurrentUser]);

  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  useEffect(() => {
    const loadMessages = async () => {
      if (currentRoom) {
        console.log(messages);

        await fetchMessages(); // 초기 메시지 불러오기
      }
    };

    loadMessages();
  }, [currentRoom, fetchMessages]);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe;

    const handleSubscription = async () => {
      try {
        unsubscribe = await subscribeToMessages();
        if (isMounted) {
          console.log('구독 성공');
        }
      } catch (error) {
        console.error('구독 실패:', error);
      }
    };

    handleSubscription();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        console.log('구독 취소');
        unsubscribe();
      }
    };
  }, [subscribeToMessages]);
  console.log(currentRoom);

  //언마운트시 currentRoom 초기화
  useEffect(() => {
    return () => {
      setCurrentRoom(null);
      console.log(currentRoom);
    };
  }, [setCurrentRoom]);

  //컴포넌트 언마운트시 메시지값 초기화
  useEffect(() => {
    return () => {
      setMessages([]);
      console.log(messages);
    };
  }, [setMessages]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToRow(messages.length - 1);
    }
  }, [messages]);

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const item = messages[index];
      return (
        <div key={key} style={style}>
          <ChatSpeechbubble
            mychatdata={item.content}
            userId={item.user_id === currentUser}
            time={formatDate(item.created_at)}
          />
        </div>
      );
    },
    [messages, currentUser]
  );

  return (
    <>
      <Header
        back={true}
        contactName="김멋사"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.chatRoom}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={listRef}
              width={width}
              height={height - 65} // SendMessage 컴포넌트의 높이를 고려하여 조정
              rowCount={messages.length}
              rowHeight={44} // ChatSpeechbubble의 높이
              rowRenderer={rowRenderer}
              scrollToIndex={messages.length - 1}
            />
          )}
        </AutoSizer>
        <SendMessage />
      </main>
    </>
  );
}

export default ChatRoom;
