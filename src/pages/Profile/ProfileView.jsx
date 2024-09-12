import { useState, useEffect } from 'react';
import S from './Profile.module.css';
import Header from '@/components/App/Header';
import Navigation from '@/components/App/Navigation';
import Button from '@/components/Button/Button';
import { supabase } from '@/api/supabase';

function ProfileView() {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    keyword: '',
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
          .from('users_profile')
          .select('keyword, company, school, gender, age')
          .eq('user_id', user.id)
          .single();

        if (userError || profileError) {
          throw userError || profileError;
        }

        setProfileData({
          username: userData.username || '미입력',
          email: userData.email || '미입력',
          keyword: profileData?.keyword || '미입력',
          company: profileData?.company || '미입력',
          school: profileData?.school || '미입력',
          gender: profileData?.gender || '미입력',
          age: profileData?.age ? profileData.age.toString() : '미입력',
        });
      }
    } catch (error) {
      console.error('프로필 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  return (
    <>
      <Header title="나의 프로필" actions={['i_close']} />
      <main className={`${S.profile} ${S.profileView}`}>
        <h2 className={`${S.viewTitle} lbl-md`}>
          기본 정보
          <Button color="white">수정하기</Button>
        </h2>
        <ul className={`${S.myInfo} para-md`}>
          <li>
            <span className={S.lbl}>이름(별명)</span>
            <span className={`${S.val} lbl-sm`}>{profileData.username}</span>
          </li>
          <li>
            <span className={S.lbl}>이메일</span>
            <span className={`${S.val} lbl-sm`}>{profileData.email}</span>
          </li>
          <li>
            <span className={S.lbl}>프로필 키워드</span>
            <span className={`${S.val} lbl-sm`}>{profileData.keyword}</span>
          </li>
          <li>
            <span className={S.lbl}>회사</span>
            <span className={`${S.val} lbl-sm`}>{profileData.company}</span>
          </li>
          <li>
            <span className={S.lbl}>학교</span>
            <span className={`${S.val} lbl-sm`}>{profileData.school}</span>
          </li>
          <li>
            <span className={S.lbl}>성별</span>
            <span className={`${S.val} lbl-sm`}>{profileData.gender}</span>
          </li>
          <li>
            <span className={S.lbl}>연령</span>
            <span className={`${S.val} lbl-sm`}>{profileData.age}</span>
          </li>
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default ProfileView;
