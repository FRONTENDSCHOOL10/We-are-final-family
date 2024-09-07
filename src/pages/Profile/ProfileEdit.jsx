import S from './Profile.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import ValidationInput from '@/components/ValidationInput/ValidationInput';

function ProfileEdit() {
  return (
    <>
      <Header title="프로필 수정" actions={['i_close']} />
      <main className={`${S.profile} ${S.profileEdit}`}>
        <ul>
          <li>
            <ValidationInput
              type="normal"
              label="이름(별명)"
              info="이름 또는 별명을 입력해주세요"
            />
          </li>
          <li>
            <ValidationInput
              type="email"
              label="이메일"
              info="이메일 양식에 맞게 입력해주세요"
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="프로필 키워드"
              info="프로필 키워드를 입력해주세요"
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="하는 일"
              info="하는 일을 입력해주세요"
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="회사"
              info="회사를 입력해주세요"
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="학교"
              info="학교를 입력해주세요"
            />
          </li>
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default ProfileEdit;
