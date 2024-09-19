import S from './RootLayout.module.css';
import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Fallback } from '@/pages';
import { supabase } from '@/api/supabase';

function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    const checkUserAuth = async () => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/register/1',
        '/register/2',
      ]; // 로그인 관련 경로

      // 사용자 정보가 로컬 스토리지에 존재하는지 확인
      if (storedUser && storedUser.id) {
        try {
          // Supabase에서 현재 사용자 정보 가져오기
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser();

          // Supabase 사용자 정보와 로컬 스토리지 사용자 정보 비교
          if (error || !user || user.id !== storedUser.id) {
            // 인증 실패시, 인트로 화면으로 리다이렉트
            if (!publicRoutes.includes(location.pathname)) {
              navigate('/');
            }
          }
        } catch (error) {
          console.error('Error fetching user from Supabase:', error);
          // 오류 발생 시 인트로 화면으로 리다이렉트
          if (!publicRoutes.includes(location.pathname)) {
            navigate('/');
          }
        }
      } else {
        // 로컬 스토리지에 사용자 정보가 없는 경우, 인트로 화면으로 리다이렉트
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/');
        }
      }
    };

    checkUserAuth();
  }, [navigate, location.pathname]);

  return (
    <div className={S.root}>
      <Helmet>
        <title>파티구함</title>
        <meta
          name="description"
          content="스터디, 프로젝트, 자기 계발을 위한 다양한 파티를 찾아보세요. 관심사에 맞는 파티를 구하고 함께 성장할 수 있는 자유로운 스터디 커뮤니티 플랫폼입니다. 누구나 쉽게 참여할 수 있습니다."
        />
        <meta
          property="og:title"
          content="파티구함 - 자유로운 스터디 커뮤니티 플랫폼"
        />
        <meta
          property="twitter:title"
          content="파티구함 - 자유로운 스터디 커뮤니티 플랫폼"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://github.com/FRONTENDSCHOOL10/we-are-final-family"
        />
        <meta
          property="og:description"
          content="스터디, 프로젝트, 자기 계발을 위한 다양한 파티를 찾아보세요. 관심사에 맞는 파티를 구하고 함께 성장할 수 있는 자유로운 스터디 커뮤니티 플랫폼입니다. 누구나 쉽게 참여할 수 있습니다."
        />
        <meta
          property="og:image"
          content="https://github.com/FRONTENDSCHOOL10/we-are-final-family/blob/Develop/public/logo_192.png"
        />
        <meta property="og:site_name" content="파티구함" />
        <meta
          property="og:site_author"
          content="우리는 파이널 7ㅏ조쿠(we-are-final-family)"
        />
      </Helmet>
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default RootLayout;
