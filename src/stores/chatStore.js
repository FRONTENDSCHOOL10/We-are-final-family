import { supabase } from '@/api/supabase';
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  chatRooms: [],
  currentRoom: null,
  messages: [],
  newMessage: '',
  currentUser: null, // 현재 사용자 정보
  selectedUser: null, // 선택된 상대방 사용자 정보

  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setNewMessage: (message) => set({ newMessage: message }),

  fetchOrCreateChatRoom: async () => {
    const { currentUser, selectedUser } = get();
    if (!currentUser || !selectedUser) {
      console.error('currentUser 또는 selectedUser가 없습니다');
      return null;
    }

    // 두 사용자 간의 기존 채팅방 찾기
    const { data: existingRoom } = await supabase
      .from('chat_rooms')
      .select('*')
      .or(`user1_id.eq.${currentUser.id},user2_id.eq.${currentUser.id}`)
      .or(`user1_id.eq.${selectedUser.id},user2_id.eq.${selectedUser.id}`)
      .limit(1);

    if (existingRoom && existingRoom.length > 0) {
      set({ currentRoom: existingRoom[0] });
      return existingRoom[0];
    }

    // 새 채팅방 생성
    const { data: newRoom, error } = await supabase
      .from('chat_rooms')
      .insert({ user1_id: currentUser.id, user2_id: selectedUser.id })
      .select()
      .single();

    if (error) {
      console.error('채팅방 생성 오류:', error);
      return null;
    }

    set({ currentRoom: newRoom });
    return newRoom;
  },

  sendMessage: async () => {
    const { newMessage, currentRoom, currentUser } = get();
    if (!newMessage.trim() || !currentRoom || !currentUser) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content: newMessage,
          room_id: currentRoom.id,
          user_id: currentUser.id,
        })
        .select();

      if (error) throw error;

      set((state) => ({
        messages: [...state.messages, data[0]],
        newMessage: '',
      }));

      console.log('메시지가 성공적으로 전송되었습니다:', data[0]);
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error.message);
    }
  },

  fetchMessages: async () => {
    const { currentRoom } = get();
    if (!currentRoom) return;
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', currentRoom.id)
      .order('created_at', { ascending: true });

    if (error) console.error('메시지 가져오기 오류:', error);
    else set({ messages: data });
  },

  subscribeToMessages: () => {
    const { currentRoom } = get();
    if (!currentRoom) return;

    const channel = supabase
      .channel(`room-${currentRoom.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${currentRoom.id}`,
        },
        (payload) => {
          set((state) => ({ messages: [...state.messages, payload.new] }));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  },
  //채팅룸 패치 함수
  fetchChatRooms: async () => {
    const currentUser = get().currentUser;
    if (!currentUser) {
      console.error('currentUser가 없습니다');
      return;
    }

    const { data, error } = await supabase
      .from('chat_rooms')
      .select(
        `
        *,
        otherUser:users!chat_rooms_user2_id_fkey(id)
      `
      )
      .eq('user1_id', currentUser); // 여기서 currentUser가 제대로 설정되었는지 확인

    if (error) {
      console.error('채팅룸 가져오기 오류:', error);
    } else {
      console.log('채팅방 데이터:', data); // 가져온 데이터를 로그로 출력

      set({ chatRooms: data }); // 배열 데이터를 그대로 chatRooms로 설정
      console.log('chatRooms 상태가 업데이트됨:', get().chatRooms); // 상태 업데이트 후 로그 출력
    }
  },
}));
