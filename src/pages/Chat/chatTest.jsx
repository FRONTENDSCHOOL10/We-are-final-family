// import IconPreV from './components/IconPreV/IconPreV';
import { useState } from 'react';
import { getData } from './api/DataService';
import { useEffect } from 'react';
import { UserCard } from './components/UserCard/UserCard';
import { useStore } from './stores/chatStore';
import { useNavigate } from 'react-router-dom';

function Test() {
  const [user, setUser] = useState([]);
  const {
    selectedUser,
    setSelectedUser,
    fetchMessages,
    chatRooms,
    setCurrentRoom,
    currentRoom,
    fetchChatRoom,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getData({
        form: 'users',
        select: 'id, username, email',
        setState: setUser, // React의 setState 함수
      });
      if (result.success) {
        console.log('Users fetched successfully');
      } else {
        console.error('Failed to fetch users:', result.error);
      }
    };
    fetchUsers();
  }, []);

  console.log(user);

  function handleClick(id) {
    setSelectedUser(id);
    fetchChatRoom();
    if (chatRooms) {
      console.log(chatRooms);
      setCurrentRoom(chatRooms.id);
      console.log(currentRoom);

      fetchMessages();
    }
    console.log(selectedUser);
    navigate('/chat/room');
  }
  const rightClick = (e) => {
    e.preventDefault();
    console.log('우클릭');
  };
  return (
    <>
      <div>
        {user.map((i) => {
          return (
            <UserCard
              userId={i.id}
              states="join"
              key={i.id}
              name={i.username}
              onClick={() => {
                handleClick(i.id);
              }}
              onContextMenu={rightClick}
            />
          );
        })}
      </div>
    </>
  );
}

export default Test;
