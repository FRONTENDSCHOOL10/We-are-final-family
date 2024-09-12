import { getData } from '@/api/DataService';
import S from './Chat.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import { ChatProfileCard } from '@/components/ChatProfileCard/ChatProfileCard';
import { useState, useEffect } from 'react';
import { useStore } from '@/stores/chatStore';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [chatRoomIds, setChatRoomIds] = useState([]);
  const store = useStore();
  const navigate = useNavigate();

  const handleSearchButton = () => {
    console.log('검색 버튼 클릭');
  };

  // 첫 번째 useEffect에서 currentUser 및 selectedUser 설정
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      console.error('currentUser가 존재하지 않음');
      return;
    }
    store.setCurrentUser(user.id);
    store.setSelectedUser('3165e8a4-3a48-46a2-b208-c4abe3b59e3b');
  }, []);

  // 두 번째 useEffect에서 chatRoomIds 가져오기 및 fetchChatRooms 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData({
          form: 'chat_rooms',
          select: 'id',
          setState: setChatRoomIds,
        });
        console.log('fetchData에서 받은 데이터:', data);
        setChatRoomIds(data);
      } catch (error) {
        console.error('채팅방 ID 가져오기 오류:', error);
      }
    };

    // store.currentUser가 설정된 후에만 실행
    if (store.currentUser) {
      console.log('currentUser가 설정됨:', store.currentUser);
      fetchData();
    } else {
      console.log('currentUser가 아직 설정되지 않음');
    }
  }, [store.currentUser]); // currentUser가 설정된 후에만 실행되도록 의존성 설정

  // chatRoomIds가 변경될 때 fetchChatRooms 호출
  useEffect(() => {
    if (store.currentUser) {
      console.log('chatRoomIds가 변경됨:', chatRoomIds);

      store.fetchChatRooms(chatRoomIds);
      console.log('채팅방 정보:', store.chatRooms); // 채팅방 정보 로그 출력
    }
  }, [chatRoomIds, store.currentUser]);

  useEffect(() => {
    if (store.chatRooms.length > 0) {
      console.log('채팅방 정보가 업데이트됨:', store.chatRooms); // chatRooms가 업데이트되었는지 확인
    } else {
      console.log('chatRooms가 아직 비어있음');
    }
  }, [store.chatRooms]); // chatRooms가 업데이트될 때마다 호출

  function handleClick(selectedUser) {
    store.setSelectedUser(selectedUser);
    console.log(store.selectedUser);

    store.fetchChatRooms();
    navigate('/chat/room');
  }
  return (
    <>
      <Header
        title="채팅"
        actions={[{ icon: 'i_search', onClick: handleSearchButton }]}
      />
      <main className={S.chat}>
        <ul>
          {store.chatRooms && store.chatRooms.length > 0 ? (
            store.chatRooms.map((room) => (
              <li key={room.id}>
                <ChatProfileCard
                  user={room.otherUser}
                  onClick={() => {
                    handleClick(room.otherUser.id);
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
