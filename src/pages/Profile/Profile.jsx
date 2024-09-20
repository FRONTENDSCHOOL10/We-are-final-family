import S from './Profile.module.css';
import Fallback from '@/pages/Fallback';
import UserCard from '@/components/UserCard/UserCard';
import Navigation from '@/components/App/Navigation';
import ProfileList from '@/components/ProfileList/ProfileList';
import { supabase } from '@/api/supabase';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserRecordsCount } from '@/utils/useUserRecordsCount';
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
          setUserName(data?.username || '');
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
          setProfileImgUrl(data?.profile_img || '');
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
        const fileName = `${userData.user.id}.${fileExt}`;
        const filePath = `${userData.user.id}/${fileName}`;

        // 파일 업로드
        const { error: uploadError } = await supabase.storage
          .from('profile_img')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // 업로드된 파일의 공개 URL 가져오기
        const { data: urlData } = supabase.storage
          .from('profile_img')
          .getPublicUrl(filePath);

        // URL에 타임스탬프 추가
        const publicUrl = `${urlData.publicUrl}?t=${new Date().getTime()}`;

        // users 테이블 업데이트
        const { error: updateError } = await supabase
          .from('users')
          .update({ profile_img: publicUrl })
          .eq('id', userData.user.id);

        if (updateError) throw updateError;

        // 이미지 로드 후 상태 업데이트
        const img = new Image();
        img.onload = () => {
          setProfileImgUrl(publicUrl);
          toast.success('프로필 이미지가 업데이트되었습니다.');
          setIsLoading(false);
        };
        img.onerror = () => {
          console.error('Error loading image');
          toast.error('이미지 로드에 실패했습니다.');
          setIsLoading(false);
        };
        img.src = publicUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('이미지 업로드에 실패했습니다.');
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return <Fallback />;
  }

  // JSX를 깔곰하게~
  const menuItems = [
    {
      label: '저장한 글',
      icon: 'i_like_filled',
      onClick: () => console.log('저장한 글 클릭'),
    },
    {
      label: '나의 파티',
      icon: 'i_certificate',
      onClick: () => console.log('나의 파티 클릭'),
    },
    {
      label: '내 프로필',
      icon: 'i_profile_filled',
      onClick: handleProfileClick,
    },
  ];

  const settingItems = [
    { label: '설정', onClick: () => console.log('설정 클릭') },
    { label: '공지사항', onClick: () => console.log('공지사항 클릭') },
    { label: '서비스 정보', onClick: () => console.log('서비스 정보 클릭') },
    { label: '로그아웃', onClick: handleLogout, className: S.logout },
    { label: '탈퇴하기', onClick: () => console.log('탈퇴하기 클릭') },
  ];

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
        <ul className={`${S.myMenu} para-sm`}>
          {menuItems.map((item, index) => (
            <ProfileList
              key={index}
              label={item.label}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </ul>
        <ul className={`${S.settingMenu} para-md`}>
          {settingItems.map((item, index) => (
            <ProfileList
              key={index}
              label={item.label}
              onClick={item.onClick}
              className={item.className}
            />
          ))}
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default Profile;
