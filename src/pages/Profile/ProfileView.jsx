import S from './Profile.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import Button from '@/components/Button/Button';

function ProfileView() {
  return (
    <>
      <Header title="나의 프로필" actions={['i_close']} />
      <main className={`${S.profile} ${S.profileView}`}>
        <h2 className={`${S.viewTitle} lbl-md`}>
          기본 정보
          <Button color="white">수정하기</Button>
        </h2>
        <ul className={`${S.myInfo} para-md`}>
          <li>
            <span className={S.lbl}>이름(별명)</span>
            <span className={`${S.val} lbl-sm`}>김멋사</span>
          </li>
          <li>
            <span className={S.lbl}>이메일</span>
            <span className={`${S.val} lbl-sm`}>partypeople@gmail.com</span>
          </li>
          <li>
            <span className={S.lbl}>프로필 키워드</span>
            <span className={`${S.val} lbl-sm`}>미입력</span>
          </li>
          <li>
            <span className={S.lbl}>회사</span>
            <span className={`${S.val} lbl-sm`}>미입력</span>
          </li>
          <li>
            <span className={S.lbl}>학교</span>
            <span className={`${S.val} lbl-sm`}>미입력</span>
          </li>
          <li>
            <span className={S.lbl}>성별</span>
            <span className={`${S.val} lbl-sm`}>미입력</span>
          </li>
          <li>
            <span className={S.lbl}>연령</span>
            <span className={`${S.val} lbl-sm`}>미입력</span>
          </li>
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default ProfileView;
