import { create } from 'zustand';
import {
  validateId,
  validatePassword,
  validateEmail,
} from '@/utils/validation';

const useRegisterStore = create((set) => ({
  id: '',
  password: 'R12345678',
  email: '97power@naver.com',
  name: '곰영한',
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

  setName: (name) =>
    set({
      name,
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
