import S from './Register.module.css';
import ValidationInput from '@/components/ValidationInput/ValidationInput';
import Button from '@/components/Button/Button';
import { createData } from '@/api/DataService';
import useRegisterStore from '@/stores/useRegisterStore';
import { supabase } from '@/api/supabase';
import Modal from '@/components/Modal/Modal';
import { validateEmail, validatePassword } from '@/utils/validation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const signUp = async (email, password, username) => {
  try {
    console.log('Starting sign up process for email:', email);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      toast.error('동일한 이메일이 존재합니다.');
      throw new Error();
    } else if (data.user && data.user.id) {
      console.log(
        'Attempting to insert user into public.users. User ID:',
        data.user.id
      );
    }
    createData({
      from: 'users',
      values: { email: email, username: username },
    });
  } catch (error) {
    console.error('Error in signUp process:', error);
    throw error;
  }
};

function Register() {
  const { email, password, username, setEmail, reset, setPassword, setName } =
    useRegisterStore();
  const [active, setActive] = useState('');
  const handleSubmit = async () => {
    try {
      // 회원가입 로직 실행
      await signUp(email, password, username);

      // 회원가입 성공 시 상태 초기화 및 활성화
      reset();
      setActive(true);
    } catch (error) {
      // 오류가 발생하면 여기서 처리
      console.error('회원가입 중 오류가 발생했습니다:', error);
      // 오류 처리 로직 (필요하다면 사용자에게 알림을 줄 수 있음)
    }
  };
  const isFormValid =
    validateEmail(email) === '' &&
    validatePassword(password) === '' &&
    username;
  console.log(isFormValid);

  return (
    <main className={S.register}>
      <div>
        <Toaster />
      </div>
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
          onChange={setEmail}
        />
        <ValidationInput
          type="pw"
          label="비밀번호"
          info="비밀번호를 입력해주세요"
          onChange={setPassword}
        />
        <ValidationInput
          type="normal"
          label="이름"
          info="와추얼네임"
          onChange={setName}
        />
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
        <div
          style={{
            display: active ? 'block' : 'none',
          }}
        >
          <Modal
            title="인증 메일 발송"
            desc={`인증메일이 발송되었습니다.\n 입력하신 메일로 돌아가 \n인증을 완료해주세요`}
            buttons={[
              {
                type: 'submit',
                to: '/login',
                color: 'black',
                label: '확인',
                action: 'confirm',
              },
            ]}
          />
        </div>
      </footer>
    </main>
  );
}

export default Register;
