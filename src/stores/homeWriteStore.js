import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useHomeWriteStore = create(
  persist(
    (set) => ({
      title: '',
      interest: '',
      category: '',
      description: '',
      personnel: 2,
      date: new Date(),
      time: '오전 07:00',
      location: '',
      gender: '',
      age: '',
      setTitle: (title) => set({ title }),
      setInterest: (interest) => set({ interest }),
      setCategory: (category) => set({ category }),
      setDescription: (description) => set({ description }),
      setPersonnel: (personnel) => set({ personnel }),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      setLocation: (location) => set({ location }),
      setGender: (gender) => set({ gender }),
      setAge: (age) => set({ age }),
      reset: () =>
        set({
          title: '',
          interest: '',
          category: '',
          description: '',
          personnel: 2,
          date: new Date(),
          time: '오전 07:00',
          location: '',
          gender: '',
          age: '',
        }),
    }),
    {
      name: 'home-write-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useHomeWriteStore;
