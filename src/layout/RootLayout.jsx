import { useLocation } from 'react-router-dom';
import S from './RootLayout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

function RootLayout() {
  const location = useLocation();
  const path = location.pathname;

  const showHeader = ![
    '/',
    '/login',
    '/register',
    '/register/1',
    '/register/2',
    '/profile',
  ].includes(path);

  // Navigation을 제외할 경로 추가
  const noNavigationPaths = [
    '/chat/room',
    '/write-post',
    '/profile/view',
    '/profile/edit',
  ];

  const showNavigation =
    !noNavigationPaths.includes(path) &&
    (path.startsWith('/home') ||
      path.startsWith('/board') ||
      path.startsWith('/chat') ||
      path.startsWith('/profile'));

  const getHeaderProps = () => {
    switch (path) {
      case '/home':
        return { myLocation: true, actions: ['i_search'] };
      case '/home/detail':
        return { back: true, actions: ['i_like_line', 'i_export', 'i_option'] };
      case '/home/write':
        return { back: true, actions: ['i_picture_line'] };
      case '/board':
        return { back: true, actions: ['i_search'] };
      case '/chat':
        return { title: '채팅', actions: ['i_search'] };
      case '/chat/room':
        return { back: true, contactName: '김멋사', actions: ['i_search'] };
      case '/profile/view':
        return { title: '프로필 수정', actions: ['i_close'] };
      case '/profile/edit':
        return { title: '기본 정보', actions: ['i_close'] };
      default:
        return {}; // 기본 프롭스
    }
  };

  const headerProps = getHeaderProps();

  return (
    <div className={S.root}>
      {showHeader && <Header {...headerProps} />}
      <Outlet />
      {showNavigation && <Navigation />}
    </div>
  );
}

export default RootLayout;
