import S from './Chat.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import { ChatProfileCard } from '@/components/ChatProfileCard/ChatProfileCard';
import { useEffect } from 'react';
import { useStore } from '@/stores/chatStore';
import { useNavigate } from 'react-router-dom';
import { Fallback } from '..';

function Chat() {
  const {
    currentUser,
    setSelectedUser,
    setCurrentRoom,
    chatRooms,
    fetchChatRooms,
    setCurrentUser,
    fetchChatRoomById,
  } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user.id);
  }, [setCurrentUser]);

  const handleSearchButton = () => {};

  useEffect(() => {
    fetchChatRooms();
  }, [currentUser, fetchChatRooms]);

  function handleClick(selectedUser, currentRoom) {
    setSelectedUser(selectedUser);
    setCurrentRoom(currentRoom);
    fetchChatRoomById(currentRoom.id);
    navigate(`/chat/room/${currentRoom.id}`);
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
                    handleClick(room.otherUser.id, room);
                  }}
                  id={room.otherUser}
                  name={room.otherUser.username}
                />
              </li>
            ))
          ) : (
            <Fallback />
          )}
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default Chat;
