import { Button } from '@/components/Button/Button';
import Logo from '@/components/Logo/Logo';
import S from './Intro.module.css';
import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  function handleStart() {
    navigate('/test');
  }

  return (
    <div className={S.container}>
      <div className={S.content}>
        <div className={S.hello}>
          <Logo W="7rem" H="7rem" />
          <h1>파티구함</h1>
          <div className={S.helloText}>
            <span>함께 배우고 적용하며</span>
            <span>성장해보세요!</span>
          </div>
        </div>
      </div>

      <div className={S.start}>
        <Button color={'primary'} disabled={false} onClick={handleStart}>
          시작하기
        </Button>
        <div className={S.welcome}>
          <span>이미계정이 있나요?</span>
          <button className={S.loginBtn}>로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
