import { useState, useEffect } from 'react';
import S from './CurrentLocationButton.module.css';

function CurrentLocationButton({ onLocationUpdate, standalone = false }) {
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState('현재 위치');
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if ('permissions' in navigator) {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(status.state);
      status.onchange = () => setPermissionStatus(status.state);
    }
  };

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
          const region2depthName = data.documents[0].region_2depth_name;
          const region3depthName = data.documents[0].region_3depth_name;
          const region4depthName = data.documents[0].region_4depth_name;

          // 전체 지역 이름 조합 (예: 서울특별시 강남구 삼성동)
          const fullRegionName = `${region4depthName}`.trim();

          // 버튼에 표시할 지역 이름 (region4depthName)
          setButtonText(region4depthName);
          setIsLocationSet(true);

          // 로컬 스토리지에 region2depthName와 region3depthName 저장
          localStorage.setItem('region2depthName', region2depthName);
          localStorage.setItem('region3depthName', region3depthName);

          if (onLocationUpdate) {
            onLocationUpdate(fullRegionName, region4depthName);
          }
        } else {
          setButtonText('위치 이름을 가져올 수 없음');
        }
      })
      .catch((error) => {
        console.error('위치 이름을 가져오는 중 오류 발생:', error);
        setButtonText('위치 이름을 가져오는 중 오류 발생');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoading(true);
      setButtonText('로딩 중...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getRegionName(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus('denied');
            setButtonText('위치 권한 필요');
          }
          setIsLoading(false);
          setIsLocationSet(false);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setIsLocationSet(false);
    }
  };

  const handleClick = () => {
    if (permissionStatus === 'granted') {
      requestLocation();
    } else {
      checkPermission();
      requestLocation();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={standalone ? S.standaloneButton : S.button}
      disabled={isLoading}
    >
      <span
        className={isLocationSet ? 'i_location_filled' : 'i_location_line'}
      />
      {buttonText}
    </button>
  );
}

export default CurrentLocationButton;
