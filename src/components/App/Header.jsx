import S from './Header.module.css';
import IconButton from '@/components/IconButton/IconButton';
import { string, bool, array, func } from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabase';

Header.propTypes = {
  title: string,
  contactName: string,
  back: bool,
  myLocation: bool,
  search: bool,
  actions: array,
  onLocationUpdate: func,
  onInputChange: func,
  onKeyPress: func,
};

const iconButtonActions = [
  { className: 'i_search', title: '검색하기' },
  { className: 'i_like_line', title: '저장하기' },
  { className: 'i_export', title: '공유하기' },
  { className: 'i_close', title: '닫기' },
  { className: 'i_menu', title: '메뉴 열기' },
];

function Header({
  title,
  contactName,
  back = false,
  myLocation = false,
  search = false,
  actions = [],
  onLocationUpdate,
  onInputChange,
  onKeyPress,
}) {
  const navigate = useNavigate();

  const handleBackButton = () => {
    console.log('뒤로가기 버튼 클릭');
    navigate(-1); // 이전 페이지로 이동
  };

  // 내 위치 버튼
  const [location, setLocation] = useState('내 위치'); // 현재 위치 텍스트 (예: 구로구)
  const [isLocationActive, setIsLocationActive] = useState(false); // 위치 아이콘 상태

  useEffect(() => {
    if (myLocation) {
      const fetchUserLocation = async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(); // 현재 로그인한 사용자 가져오기

        if (error) {
          console.error('사용자 정보를 가져오는 중 오류 발생:', error);
          return;
        }

        if (!user) {
          console.error('사용자를 찾을 수 없음');
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('users')
          .select('location')
          .eq('email', user.email) // 이메일을 기준으로 사용자 조회
          .single(); // 단일 사용자만 조회

        if (fetchError) {
          console.error('사용자 위치를 가져오는 중 오류 발생:', fetchError);
        } else {
          const userLocation = data?.location;
          if (userLocation) {
            setLocation(userLocation);
            setIsLocationActive(true);
          } else {
            const storedLocation = localStorage.getItem('location');
            if (storedLocation) {
              setLocation(storedLocation);
              setIsLocationActive(true);
            }
          }
        }
      };

      fetchUserLocation();
    }
  }, [myLocation]);

  const getRegionName = (latitude, longitude) => {
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

    fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.documents && data.documents.length > 0) {
          const regionName = data.documents[0].region_2depth_name; // 예: 구로구
          setLocation(regionName);
          localStorage.setItem('location', regionName);
          onLocationUpdate(regionName);
        } else {
          setLocation('위치 이름을 가져올 수 없음');
        }
      })
      .catch((error) => {
        console.error('위치 이름을 가져오는 중 오류 발생:', error);
        setLocation('위치 이름을 가져오는 중 오류 발생');
      });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getRegionName(latitude, longitude); // 좌표를 사용하여 지역명 가져오기
          setIsLocationActive(true);
        },
        (error) => {
          console.error('위치 정보를 가져오는 중 오류 발생:', error);
          setLocation('위치 정보를 가져올 수 없음');
        }
      );
    } else {
      setLocation('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }
  };

  const getTitle = (className) => {
    const action = iconButtonActions.find(
      (item) => item.className === className
    );
    return action ? action.title : '';
  };

  return (
    <header className={S.header}>
      {/* 채팅 or 프로필 수정 */}
      {title && <h1 className="hdg-lg">{title}</h1>}

      {/* 뒤로가기 아이콘 */}
      {back && (
        <IconButton
          title="뒤로 가기"
          className="i_direction_left"
          onClick={handleBackButton}
        />
      )}

      {/* 위치 변경 버튼 */}
      {myLocation && (
        <button
          title={location}
          aria-label={location}
          aria-pressed={isLocationActive}
          className={`${S.locationBtn} hdg-lg`}
          onClick={handleLocationClick}
        >
          <span
            className={
              isLocationActive ? 'i_location_filled' : 'i_location_line'
            }
          ></span>
          {isLocationActive ? location : '내 위치'}
        </button>
      )}

      {/* 채팅방 : 대화상대 */}
      {contactName && <p className="lbl-md">{contactName}</p>}

      {/* 검색 필드 */}
      {search && (
        <input
          type="search"
          className={`${S.inputField} para-md`}
          placeholder="검색어를 입력해주세요"
          aria-label="검색어를 입력해주세요"
          onChange={onInputChange}
          onKeyPress={onKeyPress}
        />
      )}

      {/* 우측 아이콘 버튼 */}
      {actions && (
        <ul role="group" aria-label="옵션 버튼 그룹">
          {actions.map((action, index) => (
            <li key={index}>
              <IconButton
                title={getTitle(action)}
                className={action.icon}
                onClick={action.onClick}
              />
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Header;
