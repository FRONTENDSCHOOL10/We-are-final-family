import S from './Register.module.css';
import ValidationInput from '@/components/ValidationInput/ValidationInput';
import Button from '@/components/Button/Button';
import { createData } from '@/api/DataService';
import useRegisterStore from '@/stores/useRegisterStore';
import { supabase } from '@/api/supabase';
import { useNavigate } from 'react-router-dom';

const signUp = async (email, password, username, navigate) => {
  try {
    console.log('Starting sign up process for email:', email);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      alert('동일한 이메일이 존재합니다');
      return;
    }
    if (data.user && data.user.id) {
      console.log(
        'Attempting to insert user into public.users. User ID:',
        data.user.id
      );
    }
    createData({
      from: 'users',
      values: { email: email, username: username },
    });
    navigate('/login');
  } catch (error) {
    console.error('Error in signUp process:', error);
    throw error;
  }
};

function Register() {
  const {
    email,
    password,
    username,
    emailError,
    passwordError,
    nameError,
    reset,
  } = useRegisterStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 여기에서 회원가입 로직을 구현합니다.
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Name:', name);

    signUp(email, password, username, navigate);
    // 회원가입 처리 후 상태 초기화

    reset();
  };
  const isFormValid =
    !emailError &&
    !passwordError &&
    !nameError &&
    email &&
    password &&
    username;

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
