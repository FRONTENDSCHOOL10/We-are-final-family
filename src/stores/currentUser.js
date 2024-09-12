import { create } from 'zustand';

export const currentUser = create(() => ({
  user: '',
}));
