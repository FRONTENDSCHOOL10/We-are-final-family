import S from './Register.module.css';
import ValidationInput from '@/components/ValidationInput/ValidationInput';
import Button from '@/components/Button/Button';
import useRegisterStore from '@/components/ValidationInput/useRegisterStore';
import { useSupabase } from '@/api/DataService';

function Register() {
  const { email, password, name, emailError, passwordError, nameError, reset } =
    useRegisterStore();
  const { createUser } = useSupabase();
  const data = {
    email: email,
    password: password,
    username: name,
  };

  const handleSubmit = () => {
    // 여기에서 회원가입 로직을 구현합니다.
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Name:', name);
    // 회원가입 처리 후 상태 초기화

    createUser(data);

    reset();
  };

  const isFormValid =
    !emailError && !passwordError && !nameError && email && password && name;

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
      <form className={S.body}>
        <ValidationInput
          type="email"
          label="이메일"
          info="이메일을 입력해주세요"
        />
        <ValidationInput
          type="pw"
          label="비밀번호"
          info="비밀번호를 입력해주세요"
        />
        <ValidationInput type="normal" label="이름" info="와추얼네임" />
      </form>
      <footer>
        <Button
          color="black"
          aria-label="회원가입"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          회원가입
        </Button>
      </footer>
    </main>
  );
}

export default Register;
