import S from './RootLayout.module.css';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Fallback } from '@/pages';

function RootLayout() {
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
