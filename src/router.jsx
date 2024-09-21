import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import {
  Intro,
  Login,
  Interest,
  Register,
  Search,
  SearchBoard,
  Home,
  HomeDetail,
  HomeWrite,
  HomeWriteNext,
  Board,
  BoardDetail,
  BoardWrite,
  Chat,
  ChatRoom,
  Profile,
  ProfileView,
  ProfileEdit,
  Error,
} from '@/pages';

import Test from '@/Test'; // 테스트 완료 시 제거

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'test', element: <Test /> }, // 테스트 완료 시 제거
      { path: '', element: <Intro /> },
      { path: 'login', text: '로그인', element: <Login /> },
      {
        path: 'register',
        text: '회원가입',
        children: [
          { index: true, element: <Interest /> },
          { path: '1', element: <Interest /> },
          { path: '2', element: <Register /> },
        ],
      },
      { path: 'interest', element: <Interest /> },
      {
        path: 'search',
        text: '검색',
        children: [
          { index: true, element: <Search /> },
          { path: 'searchboard', element: <SearchBoard /> },
        ],
      },
      {
        path: 'home',
        children: [
          { index: true, text: '파티모집', element: <Home /> },
          { path: 'detail', text: '파티모집 상세', element: <HomeDetail /> },
          { path: 'write', text: '파티모집 글 쓰기', element: <HomeWrite /> },
          {
            path: 'write/2',
            text: '파티모집 글 쓰기',
            element: <HomeWriteNext />,
          },
        ],
      },
      {
        path: 'board',
        children: [
          { index: true, text: '게시판', element: <Board /> },
          { path: 'detail', text: '게시판 상세', element: <BoardDetail /> },
          { path: 'write', text: '게시판 글 쓰기', element: <BoardWrite /> },
        ],
      },
      {
        path: 'chat',
        children: [
          { index: true, element: <Chat /> },
          { path: 'room/:id', element: <ChatRoom /> },
        ],
      },
      {
        path: 'profile',
        children: [
          { index: true, element: <Profile /> },
          { path: 'view', element: <ProfileView /> },
          { path: 'edit', element: <ProfileEdit /> },
        ],
      },
    ],
  },
  { path: '*', element: <Error /> },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
