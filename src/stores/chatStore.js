import { supabase } from '@/api/supabase';
import { produce } from 'immer';
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  chatRooms: [], // 이머사용해야됨
  currentRoom: null,
  messages: [], // 이머사용해야됨
  newMessage: '',
  currentUser: null, // 현재 사용자 정보
  selectedUser: null, // 선택된 상대방 사용자 정보
  sendingMessage: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setNewMessage: (message) => set({ newMessage: message }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setSendingMessage: (value) => set({ sendingMessage: value }),
  setChatRooms: (rooms) => {
    set(
      produce((draft) => {
        draft.chatRooms = rooms;
      })
    );
  },
  setMessages: (messages) => {
    set(
      produce((draft) => {
        draft.messages = messages;
      })
    );
  },

  //두사용자 간의 채팅방 찾기

  fetchChatRoom: async () => {
    const { currentUser, selectedUser } = get();

    // 기본적인 유효성 검사
    if (!currentUser || !selectedUser || currentUser === selectedUser) {
      console.error('currentUser 또는 selectedUser가 없습니다');
      return null;
    }

    try {
      // 기존 채팅방이 있는지 확인
      const { data: existingRoom, error: fetchError } = await supabase
        .from('chat_rooms')
        .select('*')
        .or(`user1_id.eq.${currentUser},user2_id.eq.${currentUser}`)
        .or(`user1_id.eq.${selectedUser},user2_id.eq.${selectedUser}`)
        .limit(1);

      if (fetchError) {
        throw new Error('채팅방을 불러오는 중 오류 발생');
      }

      // 기존 채팅방이 있을 경우 해당 채팅방을 반환
      if (existingRoom && existingRoom.length > 0) {
        set({ currentRoom: existingRoom[0] });
        return existingRoom[0];
      } else {
        set({ currentRoom: null });
        return;
      }

      // 새로 생성된 채팅방 설정 및 반환
    } catch (error) {
      console.error('Error in fetchOrCreateChatRoom:', error.message);
      return null;
    }
  },

  fetchOrCreateChatRoom: async () => {
    const { currentUser, selectedUser } = get();

    // 기본적인 유효성 검사
    if (!currentUser || !selectedUser || currentUser === selectedUser) {
      console.error('currentUser 또는 selectedUser가 없습니다');
      return null;
    }

    try {
      // 기존 채팅방이 있는지 확인
      const { data: existingRoom, error: fetchError } = await supabase
        .from('chat_rooms')
        .select('*')
        .or(`user1_id.eq.${currentUser},user2_id.eq.${currentUser}`)
        .or(`user1_id.eq.${selectedUser},user2_id.eq.${selectedUser}`)
        .limit(1);

      if (fetchError) {
        throw new Error('채팅방을 불러오는 중 오류 발생');
      }

      // 기존 채팅방이 있을 경우 해당 채팅방을 반환
      if (existingRoom && existingRoom.length > 0) {
        set({ currentRoom: existingRoom[0] });
        return existingRoom[0];
      }

      // 기존 채팅방이 없을 경우 새 채팅방 생성
      const { data: newRoom, error: insertError } = await supabase
        .from('chat_rooms')
        .insert([{ user1_id: currentUser, user2_id: selectedUser }])
        .select()
        .single();

      if (insertError) {
        throw new Error('채팅방 생성 오류');
      }

      // 새로 생성된 채팅방 설정 및 반환

      set({ currentRoom: newRoom });
      return newRoom;
    } catch (error) {
      console.error('Error in fetchOrCreateChatRoom:', error.message);
      return null;
    }
  },

  sendMessage: async () => {
    const { newMessage, currentRoom, currentUser, setSendingMessage } = get();
    if (!newMessage.trim() || !currentRoom || !currentUser) return;

    setSendingMessage(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content: newMessage,
          room_id: currentRoom.id,
          user_id: currentUser,
        })
        .select();

      if (error) throw error;

      set(
        produce((draft) => {
          const newMsg = data[0];
          console.log(newMsg);

          const isDuplicate = draft.messages.some(
            (msg) => msg.id === newMsg.id
          );
          if (!isDuplicate) {
            draft.messages.push(newMsg);
          }
          draft.newMessage = ''; // Clear the message input
          console.log('전송완료');
        })
      );
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  },

  fetchMessages: async () => {
    const { currentRoom } = get();
    console.log(currentRoom);
    const roomId =
      typeof currentRoom === 'string' ? currentRoom : currentRoom?.id;

    if (!roomId) return;
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    console.log(data);

    if (error) console.error('메시지 가져오기 오류:', error);
    else set({ messages: data });
  },

  subscribeToMessages: () => {
    const { currentRoom } = get();
    if (!currentRoom) return;

    // currentRoom이 객체인지 문자열인지 확인하고 적절한 값을 사용
    const roomId =
      typeof currentRoom === 'object' ? currentRoom.id : currentRoom;

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`, // room_id 칼럼 필터 적용
        },
        (payload) => {
          console.log('실시간 데이터 업데이트', payload.new);

          // 여기서 상태 업데이트
          set(
            produce((state) => {
              const isDuplicate = state.messages.some(
                (msg) => msg.id === payload.new.id
              );
              if (!isDuplicate) {
                state.messages.push(payload.new);
              }
            })
          );
        }
      )
      .subscribe();

    console.log('구독성공');

    return () => {
      console.log('구독 취소 시작, roomId:', roomId);
      supabase.removeChannel(channel);
      console.log('구독 취소 완료');
    };
  },

  //채팅룸 패치 함수
  fetchChatRooms1: async () => {
    const currentUser = get().currentUser;
    if (!currentUser) {
      console.error('currentUser가 없습니다');
      return;
    }

    console.log('Current user ID:', currentUser); // 디버깅용

    const { data, error } = await supabase
      .from('chat_rooms')
      .select(
        `
        *,
        user1:users!chat_rooms_user1_id_fkey(id),
        user2:users!chat_rooms_user2_id_fkey(id)
      `
      )
      .or(`user1_id.eq.${currentUser},user2_id.eq.${currentUser}`);

    if (error) {
      console.error('채팅룸 가져오기 오류:', error);
    } else {
      console.log('Raw data from Supabase:', data); // 디버깅용

      // 채팅방 데이터를 처리하여 otherUser 정보를 올바르게 설정
      const processedChatRooms = data.map((room) => ({
        ...room,
        otherUser: room.user1_id === currentUser ? room.user2 : room.user1,
      }));

      set({ chatRooms: processedChatRooms });
      console.log('chatRooms 상태가 업데이트됨:', get().chatRooms);
    }
  },
}));
