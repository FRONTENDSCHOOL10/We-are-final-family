import { create } from 'zustand';
import { supabase } from '@/api/supabase';

export const useStore = create((set, get) => ({
  chatRooms: [],
  currentRoom: null,
  messages: [],
  newMessage: '',
  currentUser: null,
  selectedUser: null,
  sendingMessage: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setNewMessage: (message) => set({ newMessage: message }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setSendingMessage: (value) => set({ sendingMessage: value }),
  setChatRooms: (rooms) => set({ chatRooms: rooms }),
  setMessages: (messages) => set({ messages }),

  fetchChatRoom: async () => {
    const { currentUser, selectedUser } = get();
    if (!currentUser || !selectedUser || currentUser === selectedUser) {
      console.error('currentUser 또는 selectedUser가 없습니다');
      return null;
    }

    try {
      const { data: existingRoom, error: fetchError } = await supabase
        .from('chat_rooms')
        .select('*')
        .or(`user1_id.eq.${currentUser},user2_id.eq.${currentUser}`)
        .or(`user1_id.eq.${selectedUser},user2_id.eq.${selectedUser}`)
        .limit(1);

      if (fetchError) throw new Error('채팅방을 불러오는 중 오류 발생');

      if (existingRoom && existingRoom.length > 0) {
        set({ currentRoom: existingRoom[0] });
        console.log(existingRoom);

        return existingRoom[0];
      } else {
        set({ currentRoom: null });
        return null;
      }
    } catch (error) {
      console.error('Error in fetchChatRoom:', error.message);
      return null;
    }
  },

  fetchOrCreateChatRoom: async () => {
    const { currentUser, selectedUser } = get();
    if (!currentUser || !selectedUser || currentUser === selectedUser) {
      console.error('currentUser 또는 selectedUser가 없습니다');
      return null;
    }

    try {
      const { data: existingRoom, error: fetchError } = await supabase
        .from('chat_rooms')
        .select(
          '*, user1:users!chat_rooms_user1_id_fkey(username), user2:users!chat_rooms_user2_id_fkey(username)'
        )
        .or(`user1_id.eq.${currentUser},user2_id.eq.${currentUser}`)
        .or(`user1_id.eq.${selectedUser},user2_id.eq.${selectedUser}`)
        .limit(1);

      if (fetchError) throw new Error('채팅방을 불러오는 중 오류 발생');

      // 채팅방이 있을 경우 otherUser 정보 추가 후 반환
      if (existingRoom && existingRoom.length > 0) {
        const processedRoom = {
          ...existingRoom[0],
          otherUser:
            existingRoom[0].user1_id === currentUser
              ? existingRoom[0].user2
              : existingRoom[0].user1,
        };

        set({ currentRoom: processedRoom });
        return processedRoom;
      }

      const { data: newRoom, error: insertError } = await supabase
        .from('chat_rooms')
        .insert([{ user1_id: currentUser, user2_id: selectedUser }])
        .select(
          '*, user1:users!chat_rooms_user1_id_fkey(username), user2:users!chat_rooms_user2_id_fkey(username)'
        )
        .single();

      if (insertError) {
        throw new Error('채팅방 생성 오류');
      }

      // otherUser 정보를 포함한 새로 생성된 채팅방 설정 및 반환
      const processedNewRoom = {
        ...newRoom,
        otherUser:
          newRoom.user1_id === currentUser ? newRoom.user2 : newRoom.user1,
      };

      set({ currentRoom: processedNewRoom });
      return processedNewRoom;
    } catch (error) {
      console.error('Error in fetchOrCreateChatRoom:', error.message);
      return null;
    }
  },

  sendMessage: async (content) => {
    const { currentRoom, currentUser, setSendingMessage } = get();
    if (!content.trim() || !currentRoom || !currentUser) return;

    setSendingMessage(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content: content,
          room_id: currentRoom.id,
          user_id: currentUser,
        })
        .select();

      if (error) throw error;

      set((state) => ({
        messages: [...state.messages, data[0]],
        newMessage: '',
      }));

      return data[0];
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setSendingMessage(false);
    }
  },

  fetchMessages: async () => {
    const { currentRoom } = get();
    if (!currentRoom) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('room_id', currentRoom.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      set({ messages: data });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
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
          table: 'chat_messages',
          filter: `room_id=eq.${currentRoom.id}`,
        },
        (payload) => {
          set((state) => ({
            messages: [...state.messages, payload.new],
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  fetchChatRooms: async () => {
    const { currentUser } = get();
    if (!currentUser) {
      console.error('currentUser가 없습니다');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select(
          `
          *,
          user1:users!chat_rooms_user1_id_fkey(id, username),
          user2:users!chat_rooms_user2_id_fkey(id, username)
        `
        )
        .or(`user1_id.eq.${currentUser},user2_id.eq.${currentUser}`);

      if (error) throw error;

      const processedChatRooms = data.map((room) => ({
        ...room,
        otherUser: room.user1_id === currentUser ? room.user2 : room.user1,
      }));

      set({ chatRooms: processedChatRooms });
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  },

  fetchChatRoomById: async (roomId) => {
    if (!roomId) {
      console.error('roomId가 제공되지 않았습니다.');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select(
          `
          *,
          user1:users!chat_rooms_user1_id_fkey(id, username),
          user2:users!chat_rooms_user2_id_fkey(id, username)
        `
        )
        .eq('id', roomId)
        .single();

      if (error) throw error;

      if (!data) {
        console.error('채팅방을 찾을 수 없습니다.');
        return null;
      }

      const { currentUser } = get();
      const processedRoom = {
        ...data,
        otherUser: data.user1_id === currentUser ? data.user2 : data.user1,
      };

      set({ currentRoom: processedRoom });
      return processedRoom;
    } catch (error) {
      console.error('Error fetching chat room by ID:', error);
      return null;
    }
  },
}));
