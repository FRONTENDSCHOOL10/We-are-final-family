import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useHomeWriteStore = create(
  persist(
    (set, get) => ({
      title: '',
      interest: '',
      category: '',
      description: '',
      personnel: 2,
      date: new Date(),
      time: '오전 07:00',
      location: '',
      gender: '누구나',
      age: '누구나',

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
      image: null,
      setImage: (image) => set({ image }),

      reset: () => {
        set({
          title: '',
          interest: '',
          category: '',
          description: '',
          personnel: 2,
          date: new Date(),
          time: '오전 07:00',
          location: '',
          gender: '누구나',
          age: '누구나',
          image: null,
        });

        localStorage.removeItem('home-write-storage');
      },

      isFormValid: () => {
        const state = get();
        return (
          state.title.trim() !== '' &&
          state.interest !== '' &&
          state.category !== '' &&
          state.description.trim() !== '' &&
          Number(state.personnel) > 0 &&
          (state.date instanceof Date ||
            (typeof state.date === 'string' && state.date !== '')) &&
          state.time !== '' &&
          state.location.trim() !== ''
        );
      },
    }),
    {
      name: 'home-write-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useHomeWriteStore;
