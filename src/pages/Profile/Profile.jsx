import { useNavigate } from 'react-router-dom';
import S from './Profile.module.css';
import Navigation from '@/components/App/Navigation';
import { ProfileImg } from './../../components/ProfileImg/ProfileImg';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '@/api/supabase';
import { useUserRecordsCount } from '@/utils/useUserRecordsCount';

import toast from 'react-hot-toast';

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const { count } = useUserRecordsCount();

  useEffect(() => {
    fetchUserName(), fetchProfileImage();
  }, []);

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

  function handlePorfileImg() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      try {
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
            upsert: true, // 이 옵션을 추가합니다
          });

        if (uploadError) throw uploadError;

        // 업로드된 파일의 공개 URL 가져오기
        const { data: urlData, error: urlError } = supabase.storage
          .from('profile_img')
          .getPublicUrl(filePath);

        if (urlError) throw urlError;

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
      }
    }
  }

  return (
    <>
      <main className={S.profile}>
        <ProfileImg
          width="4rem"
          height="4rem"
          display=""
          onClick={handlePorfileImg}
          image={profileImgUrl}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <span>{`${userName}`}</span>
        <span>작성글 {count}</span>

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
          <li>로그아웃</li>
          <li>탈퇴하기</li>
        </ul>
      </main>
      <Navigation />
    </>
  );
}

export default Profile;
