import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const MAX_INTERESTS = 6;

const useInterestStore = create(
  persist(
    (set, get) => ({
      selectedInterests: [],
      addInterest: (interest) => set((state) => {
        if (state.selectedInterests.length < MAX_INTERESTS) {
          return { selectedInterests: [...state.selectedInterests, interest] };
        }
        return state; // 최대 개수에 도달하면 상태를 변경하지 않습니다.
      }),
      removeInterest: (interestId) =>
        set((state) => ({
          selectedInterests: state.selectedInterests.filter(
            (interest) => interest.id !== interestId
          ),
        })),
      clearInterests: () => set({ selectedInterests: [] }),
      saveInterests: () =>
        set((state) => ({ savedInterests: [...state.selectedInterests] })),
      savedInterests: [],
      canAddMore: () => get().selectedInterests.length < MAX_INTERESTS,
    }),
    {
      name: 'interest-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useInterestStore;