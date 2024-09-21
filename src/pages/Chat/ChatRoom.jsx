import { useEffect, useRef, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import { ChatSpeechbubble } from '@/components/ChatSpeechbubble/ChatSpeechbubble';
import SendMessage from '@/components/SendMessage/SendMessage';
import { useStore } from '@/stores/chatStore';
import { formatDate } from '@/utils/formatDate';
import Spinner from '@/components/App/Spinner';

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
    fetchChatRoomById,
  } = useStore();
  const listRef = useRef();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user.id);
  }, [setCurrentUser]);

  useEffect(() => {
    const loadRoom = async () => {
      if (id) {
        setIsLoading(true);
        await fetchChatRoomById(id);
        setIsLoading(false);
      }
    };
    loadRoom();
  }, [id, fetchChatRoomById]);

  useEffect(() => {
    const loadMessages = async () => {
      if (currentRoom) {
        await fetchMessages();
      }
    };
    loadMessages();
  }, [currentRoom, fetchMessages]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribeToMessages]);

  useEffect(() => {
    return () => {
      setCurrentRoom(null);
      setMessages([]);
    };
  }, [setCurrentRoom, setMessages]);

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

  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentRoom) {
    return <div>채팅방을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Header
        back={true}
        contactName={currentRoom.otherUser?.username || '알 수 없음'}
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />

      <main className={S.chatRoom}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={listRef}
              width={width}
              height={height - 65}
              rowCount={messages.length}
              rowHeight={44}
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
