import S from './Header.module.css';
import IconButton from '@/components/IconButton/IconButton';
import { string, bool, array, func } from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHomeStore from '@/stores/useHomeStore';

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
    navigate(-1); // 이전 페이지로 이동
  };

  // 내 위치 버튼
  const [location, setLocation] = useState('내 위치'); // 현재 위치 텍스트 (예: 구로구)
  const [isLocationActive, setIsLocationActive] = useState(false); // 위치 아이콘 상태
  const { userLocation, setUserLocation } = useHomeStore();

  // 사용자의 위치가 저장되어 있을 경우
  useEffect(() => {
    if (myLocation && userLocation) {
      setLocation(userLocation);
      setIsLocationActive(true);
    }
  }, [myLocation, userLocation]);

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
          setIsLocationActive(true);
          setUserLocation(regionName); // Zustand 스토어에 위치 정보 업데이트
          onLocationUpdate(regionName); // Home 페이지에서 콜백으로 위치 정보 업데이트
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
          // setIsLocationActive(true);
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
                className={action.icon || ''} // 여기에 className 추가
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
