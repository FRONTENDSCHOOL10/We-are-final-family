import S from './Profile.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import Button from '@/components/Button/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabase';

function ProfileView() {
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
          username: userData.username || '미입력',
          email: userData.email || '미입력',
          keyword: profileData?.keyword || '미입력',
          job: profileData?.job || '미입력',
          company: profileData?.company || '미입력',
          school: profileData?.school || '미입력',
          gender: profileData?.gender || '미입력',
          age: profileData?.age || '미입력',
          genderOpen: profileData?.gender_open,
          ageOpen: profileData?.age_open,
        });
      }
    } catch (error) {
      console.error('프로필 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const renderPrivateInfo = (info, isPublic) => {
    return isPublic ? info : '비공개';
  };

  const handleEditClick = () => {
    navigate('/profile/edit');
  };

  const handleClose = () => {
    navigate('/profile');
  };

  const infoItems = [
    { label: '이름(별명)', value: profileData.username },
    { label: '이메일', value: profileData.email },
    { label: '프로필 키워드', value: profileData.keyword },
    { label: '하는 일', value: profileData.job },
    { label: '회사', value: profileData.company },
    { label: '학교', value: profileData.school },
    {
      label: '성별',
      value: renderPrivateInfo(profileData.gender, profileData.genderOpen),
    },
    {
      label: '연령',
      value: renderPrivateInfo(profileData.age, profileData.ageOpen),
    },
  ];

  return (
    <>
      <Header
        title="나의 프로필"
        actions={[
          {
            icon: 'i_close',
            onClick: handleClose,
          },
        ]}
      />
      <main className={`${S.profile} ${S.profileView}`}>
        <h2 className={`${S.viewTitle} lbl-md`}>
          기본 정보
          <Button color="white" onClick={handleEditClick}>
            수정하기
          </Button>
        </h2>
        <ul className={`${S.myInfo} para-md`}>
          {infoItems.map((item, index) => (
            <li key={index}>
              <span className={S.lbl}>{item.label}</span>
              <span className={`${S.val} lbl-sm`}>{item.value}</span>
            </li>
          ))}
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default ProfileView;
