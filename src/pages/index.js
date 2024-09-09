import { lazy } from 'react';

// Intro (인트로)
export { default as Intro } from './Intro/Intro';

// Sign In/Up (로그인 / 회원가입)
export { default as Login } from './Login/Login';
export { default as Interest } from './Register/Interest';
export { default as Register } from './Register/Register';

// Search (검색)
export { default as Search } from './Search/Search';

// Home (파티모집)
export const Home = lazy(() => import('./Home/Home'));
export const HomeDetail = lazy(() => import('./Home/HomeDetail'));
export { default as HomeWrite } from './Home/HomeWrite';

// Board (게시판)
export const Board = lazy(() => import('./Board/Board'));
export const BoardDetail = lazy(() => import('./Board/BoardDetail'));
export { default as BoardWrite } from './Board/BoardWrite';

// Chat (채팅)
export { default as Chat } from './Chat/Chat';
export const ChatRoom = lazy(() => import('./Chat/ChatRoom'));

// Profile (프로필)
export { default as Profile } from './Profile/Profile';
export { default as ProfileView } from './Profile/ProfileView';
export { default as ProfileEdit } from './Profile/ProfileEdit';

// 기타
export { default as Error } from './Error';
export { default as Fallback } from './Fallback';
