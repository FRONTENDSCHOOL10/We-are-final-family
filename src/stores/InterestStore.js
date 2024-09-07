import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useInterestStore = create(
  persist(
    (set) => ({
      selectedInterests: [],
      addInterest: (interest) =>
        set((state) => ({
          selectedInterests: [...state.selectedInterests, interest],
        })),
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
    }),
    {
      name: 'interest-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useInterestStore;
