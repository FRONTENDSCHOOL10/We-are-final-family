import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useHomeWriteStore = create(
  persist(
    (set) => ({
      title: '',
      interest: '',
      category: '',
      content: '',
      personnel: 2,
      date: new Date(),
      time: '오전 07:00',
      location: '',
      setTitle: (title) => set({ title }),
      setInterest: (interest) => set({ interest }),
      setCategory: (category) => set({ category }),
      setContent: (content) => set({ content }),
      setPersonnel: (personnel) => set({ personnel }),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      setLocation: (location) => set({ location }),
      reset: () =>
        set({
          title: '',
          interest: '',
          category: '',
          content: '',
          personnel: 2,
          date: new Date(),
          time: '오전 07:00',
          location: '',
        }),
    }),
    {
      name: 'home-write-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useHomeWriteStore;
