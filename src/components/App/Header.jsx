import { useState } from 'react';
import S from './Header.module.css';
import { string, bool, array, func } from 'prop-types';
import IconButton from '@/components/IconButton/IconButton';
import { useNavigate } from 'react-router-dom';

// 사용 방법
// <Header back={true}></Header>
// <Header back={true} actions={{icon: 'i_search', onClick: handleSearchButton}}></Header>
// <Header back={true} actions={[{icon: isLiked ? 'i_like_filled' : 'i_like_line', onClick: handleLikeButton}, { icon: 'i_export', onClick: handleExportButton }, { icon: 'i_option', onClick: handleOptionButton }]} />
// <Header myLocation={true} actions={['i_search']}></Header>
// <Header back={true} search={true} actions={['i_search']}></Header>
// <Header title="프로필 수정" actions={['i_close']}></Header>
// <Header title="채팅" actions={['i_search']}></Header>
// <Header back={true} contactName="김멋사" actions={['i_menu']}></Header>

Header.propTypes = {
  title: string, // title=""
  contactName: string, // contactName=""
  back: bool, // back={boolean}
  myLocation: bool, // myLocation={boolean}
  search: bool, // search={boolean}
  actions: array, // actions={[{icon: 'i_example', onClick: handleOnClick}, {icon: 'i_example', onClick: handleOnClick}]}
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
  onInputChange,
  onKeyPress,
}) {
  // 내 위치 버튼
  const [location, setLocation] = useState(''); // 현재 위치 텍스트 (예: 구로구)
  const [isLocationActive, setIsLocationActive] = useState(false); // 위치 아이콘 상태

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
        } else {
          setLocation('Unable to fetch location name');
        }
      })
      .catch((error) => {
        console.error('Error fetching location name:', error);
        setLocation('Error fetching location name');
      });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getRegionName(latitude, longitude); // 좌표를 사용하여 지역명 가져오기
          setIsLocationActive((prevState) => !prevState); // 아이콘 클래스 토글
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation('Unable to fetch location');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  };

  const getTitle = (className) => {
    const action = iconButtonActions.find(
      (item) => item.className === className
    );
    return action ? action.title : '';
  };

  const navigate = useNavigate();

  const handleBackButton = () => {
    console.log('뒤로가기 버튼 클릭');
    navigate(-1); // 이전 페이지로 이동
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
          title={isLocationActive ? location : '내 위치'}
          aria-label={isLocationActive ? location : '내 위치'}
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
