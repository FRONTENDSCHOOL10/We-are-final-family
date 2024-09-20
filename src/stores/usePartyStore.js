import { supabase } from '@/api/supabase';
import { create } from 'zustand';

export const usePartyStore = create((set, get) => ({
  joinArray: [],
  pendingArray: [],
  pendingUsers: [],
  updateJoinArray: (newJoinArray) => set({ joinArray: newJoinArray }),
  updatePendingArray: (newPendingArray) =>
    set({ pendingArray: newPendingArray }),
  updatePendingUsers: async (pendingArray) => {
    const users = await fetchUsersByPendingArray(pendingArray);
    set({ pendingUsers: users });
  },
  movePendingToJoin: () => {
    const { joinArray, pendingArray } = get();
    const newJoinArray = [
      ...joinArray,
      ...pendingArray.filter((value) => value !== null && value !== ''),
    ];
    set({ joinArray: newJoinArray, pendingArray: [] });
  },
  fetchAndSetPartyData: async (partyId) => {
    const data = await fetchPartyData(partyId);
    if (data) {
      const { joinArray, pendingArray } = processPartyData(data);
      set({ joinArray, pendingArray });
      await get().updatePendingUsers(pendingArray);
    }
  },
}));

async function fetchPartyData(partyId) {
  const { data, error } = await supabase
    .from('party_detail')
    .select('*')
    .eq('id', partyId)
    .single();

  if (error) {
    console.error('Error fetching party data:', error);
    return null;
  }

  return data;
}

function processPartyData(partyData) {
  const joinKeys = ['join_1', 'join_2', 'join_3', 'join_4', 'join_5', 'join_6'];
  const pendingKeys = [
    'pending_1',
    'pending_2',
    'pending_3',
    'pending_4',
    'pending_5',
    'pending_6',
  ];

  const joinArray = joinKeys
    .map((key) => partyData[key])
    .filter((value) => value !== null && value !== '');
  const pendingArray = pendingKeys
    .map((key) => partyData[key])
    .filter((value) => value !== null && value !== '');

  return { joinArray, pendingArray };
}

async function fetchUsersByPendingArray(pendingArray) {
  if (!pendingArray || pendingArray.length === 0) return [];

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .in('id', pendingArray);

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data;
}
