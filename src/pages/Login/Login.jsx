import S from './Login.module.css';
import Button from '@/components/Button/Button';
import ValidationInput from '@/components/ValidationInput/ValidationInput';

function Login() {
  return (
    <main className={S.login}>
      <header>
        <h1 className="hdg-lg">
          파티구함을 이용하시려면
          <br />
          로그인을 해주세요!
        </h1>
      </header>
      <div className={S.body}>
        <ValidationInput type="email" label="이메일" />
        <ValidationInput type="pw" label="비밀번호" />
      </div>
      <footer>
        <Button to="/home" color="black" aria-label="로그인">
          로그인
        </Button>
      </footer>
    </main>
  );
}

export default Login;
