import { create } from 'zustand';

const useRegisterStore = create((set) => ({
  id: '',
  password: '',
  email: '',
  username: '',
  active: false,

  setId: (id) =>
    set({
      id,
    }),

  setPassword: (password) =>
    set({
      password,
    }),

  setEmail: (email) =>
    set({
      email,
    }),

  setName: (username) =>
    set({
      username,
    }),
  setACtive: () =>
    set({
      active: true,
    }),

  reset: () =>
    set({
      id: '',
      password: '',
      email: '',
      name: '',
      active: false,
    }),
}));

export default useRegisterStore;
