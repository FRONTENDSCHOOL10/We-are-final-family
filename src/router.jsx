import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import {
  Intro,
  Login,
  Interest,
  Register,
  Home,
  HomeDetail,
  HomeWrite,
  Board,
  Chat,
  ChatRoom,
  Profile,
  ProfileView,
  ProfileEdit,
} from '@/pages';
import Test from '@/Test'; // 테스트 완료 시 제거

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'test', element: <Test /> }, // 테스트 완료 시 제거
      { path: '', element: <Intro /> },
      { path: 'login', element: <Login /> },
      {
        path: 'register',
        children: [
          { index: true, element: <Interest /> },
          { path: '1', element: <Interest /> },
          { path: '2', element: <Register /> },
        ],
      },
      {
        path: 'home',
        children: [
          { index: true, element: <Home /> },
          { path: 'detail', element: <HomeDetail /> },
          { path: 'write', element: <HomeWrite /> },
        ],
      },
      { path: 'board', element: <Board /> },
      {
        path: 'chat',
        children: [
          { index: true, element: <Chat /> },
          { path: 'room', element: <ChatRoom /> },
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
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
