import S from './Profile.module.css';
import Navigation from '@/components/App/Navigation';

function Profile() {
  return (
    <>
      <main className={S.profile}>
        <ul className={S.myMenu}>
          <li>
            <span className="i_like_filled"></span>저장한 글
          </li>
          <li>
            <span className="i_certificate"></span>나의 파티
          </li>
          <li>
            <span className="i_profile_filled"></span>내 프로필
          </li>
        </ul>
        <ul className={S.settingMenu}>
          <li>설정</li>
          <li>공지사항</li>
          <li>서비스 정보</li>
          <li>로그아웃</li>
          <li>탈퇴하기</li>
        </ul>
      </main>
      ;
      <Navigation />
    </>
  );
}

export default Profile;
