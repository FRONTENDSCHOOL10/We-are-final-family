import S from './Chat.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import { ChatProfileCard } from '@/components/ChatProfileCard/ChatProfileCard';
import { useEffect } from 'react';
import { useStore } from '@/stores/chatStore';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const {
    currentUser,
    setSelectedUser,
    setCurrentRoom,
    chatRooms,
    fetchChatRooms1,
    subscribeToMessages,
    setCurrentUser,
  } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user.id);
  }, [setCurrentUser]);

  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  useEffect(() => {
    fetchChatRooms1();

    if (currentUser) {
      console.log('currentUser가 설정됨:', currentUser);
    } else {
      console.log('currentUser가 아직 설정되지 않음');
    }
  }, [currentUser, fetchChatRooms1]);

  function handleClick(selectedUser, currentRoom) {
    setSelectedUser(selectedUser);
    setCurrentRoom(currentRoom);
    fetchChatRooms1();
    subscribeToMessages();
    navigate('/chat/room');
  } //여기 손봐야됨
  return (
    <>
      <Header
        title="채팅"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.chat}>
        <ul>
          {chatRooms && chatRooms.length > 0 ? (
            chatRooms.map((room) => (
              <li key={room.id}>
                <ChatProfileCard
                  user={room.otherUser}
                  onClick={() => {
                    handleClick(room.otherUser.id, room.id);
                  }}
                  id={room.otherUser}
                />
              </li>
            ))
          ) : (
            <div>is loading</div>
          )}
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default Chat;
