import S from './Register.module.css';
import ValidationInput from '@/components/ValidationInput/ValidationInput';
import Button from '@/components/Button/Button';

function Register() {
  return (
    <main className={S.register}>
      <header>
        <h1 className="hdg-lg">
          안녕하세요.
          <br />
          파티구함에 처음 오셨나요?
        </h1>
        <p className="para-md">아래 양식에 맞게 새로 가입해주세요.</p>
      </header>
      <div className={S.body}>
        <ValidationInput type="email" label="이메일" />
        <ValidationInput type="pw" label="비밀번호" />
        <ValidationInput type="text" label="이름" />
      </div>
      <footer>
        <Button to="/login" color="black" aria-label="회원가입">
          회원가입
        </Button>
      </footer>
    </main>
  );
}

export default Register;
