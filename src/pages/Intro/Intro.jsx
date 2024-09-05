import Button from '@/components/Button/Button';
import Logo from '@/components/Logo/Logo';
import S from './Intro.module.css';
import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  function handleStart() {
    navigate('/test');
  }

  return (
    <div className={S.intro}>
      {/* 로고 + 타이틀 */}
      <div className={S.logoContainer}>
        <h1 className="hdg-xxl">
          <Logo W="7rem" H="7rem" />
          파티구함
        </h1>

        {/* 텍스트 */}
        <p className="para-md">
          함께 배우고 적용하며
          <br />
          성장해보세요!
        </p>
      </div>

      {/* 버튼 */}
      <div className={S.buttonContainer}>
        <Button type="button" color="primary" onClick={handleStart}>
          시작하기
        </Button>
        <p className="para-sm">
          이미 계정이 있나요?{' '}
          <button type="button" className={`${S.loginBtn} lbl-sm`}>
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}

export default Intro;
