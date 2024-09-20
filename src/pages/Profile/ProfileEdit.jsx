import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './Profile.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import ValidationInput from '@/components/ValidationInput/ValidationInput';
import WriteForm from '@/components/WriteForm/WriteForm';
import SignUpList from '@/components/SignUpList/SignUpList';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { supabase } from '@/api/supabase';

function ProfileEdit() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    keyword: '',
    job: '',
    company: '',
    school: '',
    gender: '',
    age: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', desc: '' });
  const [isGenderPublic, setIsGenderPublic] = useState();
  // const [isAgePublic, setIsAgePublic] = useState();
  const [isAgePublic, setIsAgePublic] = useState(false);
  const [childData, setChildData] = useState('');

  const isAllTrue = Array.isArray(childData) && childData.every((data) => data);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('username, email')
          .eq('id', user.id)
          .single();

        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select(
            'keyword, job, company, school, gender, age, gender_open, age_open'
          )
          .eq('id', user.id)
          .single();

        if (userError || profileError) {
          throw userError || profileError;
        }

        setProfileData({
          username: userData.username || '',
          email: userData.email || '',
          keyword: profileData?.keyword || '',
          job: profileData?.job || '',
          company: profileData?.company || '',
          school: profileData?.school || '',
          gender: profileData?.gender || '',
          age: profileData?.age || '',
        });

        setIsGenderPublic(profileData?.gender_open || false);
        setIsAgePublic(profileData?.age_open || false);
      }
    } catch (error) {
      console.error('프로필 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const handleInputChange = (field) => (value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderToggleChange = async (isPublic) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      setIsGenderPublic(isPublic);
    } catch (error) {
      console.error('성별 공개 설정 업데이트 중 오류 발생:', error);
    }
  };

  const handleAgeToggleChange = async (isPublic) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      setIsAgePublic(isPublic);
    } catch (error) {
      console.error('연령 공개 설정 업데이트 중 오류 발생:', error);
    }
  };

  const handleSave = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      const { error: userError } = await supabase
        .from('users')
        .update({
          username: profileData.username || '미입력',
          email: profileData.email || '미입력',
        })
        .eq('id', user.id);

      if (userError) throw userError;

      const { data: existingProfile, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      let profileError;
      if (existingProfile) {
        const { error } = await supabase
          .from('users')
          .update({
            keyword: profileData.keyword || '미입력',
            job: profileData.job || '미입력',
            company: profileData.company || '미입력',
            school: profileData.school || '미입력',
            gender: profileData.gender || '미입력',
            age: profileData.age || '미입력',
            gender_open: isGenderPublic,
            age_open: isAgePublic,
          })
          .eq('id', user.id);
        profileError = error;
      } else {
        const { error } = await supabase.from('users').insert({
          id: user.id,
          keyword: profileData.keyword || '미입력',
          job: profileData.job || '미입력',
          company: profileData.company || '미입력',
          school: profileData.school || '미입력',
          gender: profileData.gender || '미입력',
          age: profileData.age || '미입력',
          gender_open: isGenderPublic,
          age_open: isAgePublic,
        });
        profileError = error;
      }

      if (profileError) throw profileError;

      setModalContent({
        title: '저장 완료',
        desc: '프로필이 성공적으로 저장되었습니다.',
      });
      setShowModal(true);
    } catch (error) {
      console.error('프로필 저장 중 오류 발생:', error);
      setModalContent({
        title: '저장 실패',
        desc: '프로필 저장에 실패했습니다. 다시 시도해주세요.',
      });
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalContent.title === '저장 완료') {
      navigate('/profile/view');
    }
  };

  const handleDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <>
      <Header
        title="프로필 수정"
        actions={[
          { icon: 'i_close', onClick: () => navigate('/profile/view') },
        ]}
      />
      <main className={`${S.profile} ${S.profileEdit}`}>
        <ul>
          <li>
            <ValidationInput
              type="normal"
              label="이름(별명)"
              info="이름 또는 별명을 입력해주세요"
              value={profileData.username}
              onChange={handleInputChange('username')}
            />
          </li>
          <li>
            <ValidationInput
              type="email"
              label="이메일"
              info="이메일 양식에 맞게 입력해주세요"
              value={profileData.email}
              onChange={handleInputChange('email')}
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="프로필 키워드"
              info="프로필 키워드를 입력해주세요"
              value={profileData.keyword}
              onChange={handleInputChange('keyword')}
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="하는 일"
              info="하는 일을 입력해주세요"
              value={profileData.job}
              onChange={handleInputChange('job')}
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="회사"
              info="회사를 입력해주세요"
              value={profileData.company}
              onChange={handleInputChange('company')}
            />
          </li>
          <li>
            <ValidationInput
              type="normal"
              label="학교"
              info="학교를 입력해주세요"
              value={profileData.school}
              onChange={handleInputChange('school')}
            />
          </li>
          <li>
            <WriteForm
              label="성별"
              toggleName="전체 공개"
              toggle="on"
              type="profile"
              value={isGenderPublic}
              btnValue={profileData.gender}
              onChange={handleInputChange('gender')}
              onToggleChange={handleGenderToggleChange}
              isToggleOn={isGenderPublic}
            />
          </li>
          <li>
            <WriteForm
              label="연령"
              toggleName="전체 공개"
              toggle="on"
              type="profile"
              value={isAgePublic}
              btnValue={profileData.age}
              onChange={handleInputChange('age')}
              onToggleChange={handleAgeToggleChange}
              isToggleOn={isAgePublic}
            />
          </li>
        </ul>
        <SignUpList sendDataToParent={handleDataFromChild} />
        <div className={S.buttonForm}>
          <Button
            color="white"
            type="button"
            onClick={() => navigate('/profile/view')}
          >
            취소
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={handleSave}
            disabled={!isAllTrue}
          >
            저장
          </Button>
        </div>
        <div className={S.reset}>
          <button type="button" className={`${S.resetBtn} para-sm`}>
            정보 초기화 및 이용 동의 철회
          </button>
        </div>
      </main>
      <Navigation />
      {showModal && (
        <Modal
          title={modalContent.title}
          desc={modalContent.desc}
          buttons={[
            {
              type: 'button',
              color: 'primary',
              label: '확인',
              action: 'confirm',
            },
          ]}
          onConfirm={handleModalClose}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default ProfileEdit;
