import Button from '@/components/Button/Button';
import Logo from '@/components/Logo/Logo';
import S from './Intro.module.css';

function Intro() {
  return (
    <main className={S.intro}>
      {/* 로고 + 타이틀 */}
      <div className={S.logo_container}>
        <Logo W="7rem" H="7rem" />
        <h1 className="hdg-xxl">파티구함</h1>

        {/* 텍스트 */}
        <p className="para-md">
          함께 배우고 적용하며
          <br />
          성장해보세요!
        </p>
      </div>

      {/* 버튼 */}
      <div className={S.button_container}>
        <Button to={'/register'} color="primary">
          시작하기
        </Button>
        <p className="para-sm">
          이미 계정이 있나요?{' '}
          <Button
            to={'/login'}
            color="transparent"
            className={`${S.login_btn} lbl-sm`}
          >
            로그인
          </Button>
        </p>
      </div>
    </main>
  );
}

export default Intro;
