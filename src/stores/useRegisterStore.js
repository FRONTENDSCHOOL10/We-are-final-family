import { create } from 'zustand';
import {
  validateId,
  validatePassword,
  validateEmail,
} from '@/utils/validation';

const useRegisterStore = create((set) => ({
  id: '',
  password: '',
  email: '',
  username: '',
  idError: '',
  passwordError: '',
  emailError: '',
  nameError: '',

  setId: (id) =>
    set({
      id,
      idError: validateId(id),
    }),

  setPassword: (password) =>
    set({
      password,
      passwordError: validatePassword(password),
    }),

  setEmail: (email) =>
    set({
      email,
      emailError: validateEmail(email),
    }),

  setName: (username) =>
    set({
      username,
      nameError: '', // 이름에 대한 특별한 유효성 검사가 없다고 가정
    }),

  reset: () =>
    set({
      id: '',
      password: '',
      email: '',
      name: '',
      idError: '',
      passwordError: '',
      emailError: '',
      nameError: '',
    }),
}));

export default useRegisterStore;
