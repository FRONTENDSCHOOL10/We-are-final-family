import { useEffect, useRef, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import S from './ChatRoom.module.css';
import Header from '@/components/App/Header';
import { ChatSpeechbubble } from '@/components/ChatSpeechbubble/ChatSpeechbubble';
import { useStore } from '@/stores/chatStore';
import { formatDate } from '@/utils/formatDate';
import Spinner from '@/components/App/Spinner';
import ChatSendMessages from './ChatSendMessages';

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
    sendMessage,
  } = useStore();
  const listRef = useRef();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isNewRoom, setIsNewRoom] = useState(false); // 새 방인지 여부 확인

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user.id);
  }, [setCurrentUser]);

  useEffect(() => {
    const loadRoom = async () => {
      if (id === 'new') {
        // 'new'인 경우 새로운 채팅방 생성 준비
        setIsNewRoom(true);
        setIsLoading(false);
      } else if (id) {
        setIsLoading(true);
        await fetchChatRoomById(id);
        setIsLoading(false);
      }
    };

    loadRoom();
  }, [id, fetchChatRoomById]);

  useEffect(() => {
    const loadMessages = async () => {
      if (currentRoom && !isNewRoom) {
        await fetchMessages();
      }
    };
    loadMessages();
  }, [currentRoom, fetchMessages, isNewRoom]);

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

  const handleSendMessage = useCallback(
    async (newMessage) => {
      if (newMessage.trim()) {
        try {
          await sendMessage(newMessage);
          // 메시지 전송 후 스크롤을 맨 아래로 이동
          if (listRef.current) {
            listRef.current.scrollToRow(messages.length);
          }
        } catch (error) {
          console.error('Failed to send message:', error);
          // 여기에 에러 처리 로직 추가 (예: 사용자에게 알림)
        }
      }
    },
    [sendMessage, messages.length]
  );

  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentRoom && !isNewRoom) {
    return <div>채팅방을 찾을 수 없습니다.</div>;
  }
  console.log(currentRoom);

  return (
    <>
      <Header
        back={true}
        contactName={currentRoom?.otherUser?.username || '알 수 없음'}
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
        <ChatSendMessages />
      </main>
    </>
  );
}

export default ChatRoom;
