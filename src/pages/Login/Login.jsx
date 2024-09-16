import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './Login.module.css';
import Button from '@/components/Button/Button';
import ValidationInput from '@/components/ValidationInput/ValidationInput';
import { supabase } from '@/api/supabase';
import useInterestStore from '@/stores/InterestStore';
import { getData } from '@/api/DataService';
import { useStore } from '@/stores/chatStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { clearInterests } = useInterestStore();
  const { setCurrentUser } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      console.log('Attempting to sign in with:', email);
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        console.error('Supabase auth error:', authError);
        if (authError.message === 'Invalid login credentials') {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          setError(`로그인 오류: ${authError.message}`);
        }
        return;
      }

      if (!authData.user) {
        setError('사용자 인증에 실패했습니다.');
        return;
      }

      console.log('Sign in successful, fetching user data');

      // getData 함수를 사용하여 특정 사용자 정보만 가져오기
      getData({
        form: 'users',
        select: '*',
        setState: (userData) => {
          console.log('User data received:', userData);
          const currentUser = userData.find(
            (user) => user.id === authData.user.id
          );
          if (currentUser) {
            console.log('Current user found:', currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            clearInterests();
            navigate('/home');
          } else {
            console.error('User not found in the users table');
            setError(
              '사용자 정보를 찾을 수 없습니다. 관리자에게 문의해주세요.'
            );
          }
        },
      });

      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        return;
      }
      setCurrentUser(user.id);
    } catch (error) {
      console.error('Login error:', error);
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <main className={S.login}>
      <header>
        <h1 className="hdg-lg">
          파티구함을 이용하시려면
          <br />
          로그인을 해주세요!
        </h1>
      </header>
      <form onSubmit={handleLogin} className={S.body}>
        <ValidationInput
          type="email"
          label="이메일"
          onChange={setEmail}
          required
        />
        <ValidationInput
          type="pw"
          label="비밀번호"
          onChange={setPassword}
          required
        />
        {error && <p className={`${S.error} para-sm`}>{error}</p>}
      </form>
      <footer>
        <Button
          type="submit"
          color="black"
          aria-label="로그인"
          onClick={handleLogin}
        >
          로그인
        </Button>
      </footer>
    </main>
  );
}

export default Login;
