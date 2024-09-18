import { useNavigate } from 'react-router-dom';
import S from './Profile.module.css';
import Navigation from '@/components/App/Navigation';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '@/api/supabase';
import { useUserRecordsCount } from '@/utils/useUserRecordsCount';
import toast from 'react-hot-toast';
import UserCard from '@/components/UserCard/UserCard';
import { clearLocalStorage } from '@/utils/clearLocalStorage'; // clearLocalStorage 함수 import

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const { count } = useUserRecordsCount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      await Promise.all([fetchUserName(), fetchProfileImage()]);
      setIsLoading(false);
    }
    loadData();
  }, []);

  function handleLogout() {
    clearLocalStorage(); // 로컬 스토리지 초기화
    navigate('/'); // 인트로 페이지로 이동
    toast.success('로그아웃되었습니다.');
  }

  async function fetchUserName() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('username')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data && data.username) {
          setUserName(data.username);
        }
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }

  async function fetchProfileImage() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('profile_img')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data && data.profile_img) {
          setProfileImgUrl(data.profile_img);
        }
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }

  function handleProfileClick() {
    navigate('/profile/view');
  }

  function handleProfileImg() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const fileExt = file.name.split('.').pop();
        const fileName = `${userData.user.id}_${Date.now()}.${fileExt}`;
        const filePath = `${userData.user.id}/${fileName}`;

        // 파일 업로드
        const { error: uploadError } = await supabase.storage
          .from('profile_img')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // 업로드된 파일의 공개 URL 가져오기
        const { data: urlData } = supabase.storage
          .from('profile_img')
          .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        // users 테이블 업데이트
        const { error: updateError } = await supabase
          .from('users')
          .update({ profile_img: publicUrl })
          .eq('id', userData.user.id);

        if (updateError) throw updateError;

        setProfileImgUrl(publicUrl);
        toast.success('프로필 이미지가 업데이트되었습니다.');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('이미지 업로드에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트
  }

  return (
    <>
      <main className={S.profile}>
        <UserCard
          userId={1}
          states="profile"
          onClick={handleProfileImg}
          image={profileImgUrl}
          username={userName}
          postCount={count}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <ul className={S.myMenu}>
          <li>
            <span className="i_like_filled"></span>저장한 글
          </li>
          <li>
            <span className="i_certificate"></span>나의 파티
          </li>
          <li
            onClick={handleProfileClick}
            onKeyDown={(e) => e.key === 'Enter' && handleProfileClick()}
          >
            <span className="i_profile_filled"></span>내 프로필
          </li>
        </ul>
        <ul className={S.settingMenu}>
          <li>설정</li>
          <li>공지사항</li>
          <li>서비스 정보</li>
          <li className={S.logout} onClick={handleLogout}>
            로그아웃
          </li>
          <li>탈퇴하기</li>
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default Profile;
